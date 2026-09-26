// LOCAL-TEST-ONLY — not used in production; safe to remove before deployment.
// Test harness: runs the real server (`node index.js`) as a child process
// against an in-memory MongoDB and a fake S3 endpoint, so the tests exercise
// the API exactly as the frontend does — no real .env, AWS or database needed.
import { spawn } from "node:child_process";
import http from "node:http";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const backendDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const freePort = () =>
  new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.once("error", reject);
    srv.listen(0, () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
  });

// Minimal S3 stand-in: accepts PutObject; set `fakeS3.fail = true` to make it return 500.
function startFakeS3(port) {
  const state = { fail: false, puts: [] };
  const server = http.createServer((req, res) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      if (state.fail) {
        res.writeHead(500, { "Content-Type": "application/xml" });
        res.end("<Error><Code>InternalError</Code><Message>fake failure</Message></Error>");
        return;
      }
      if (req.method === "PUT") state.puts.push({ url: req.url, bytes: Buffer.concat(chunks).length });
      res.writeHead(200, { ETag: '"fake-etag"' });
      res.end();
    });
  });
  return new Promise((resolve) => server.listen(port, () => resolve({ server, state })));
}

export async function startStack() {
  // TEST_MONGO_URL (e.g. a throwaway Docker mongo, see run-in-docker.sh) wins;
  // otherwise an in-memory MongoDB is started. Each run uses a fresh database.
  const external = process.env.TEST_MONGO_URL;
  const mongo = external ? null : await MongoMemoryServer.create();
  const dbName = `dreamstay_test_${Date.now().toString(36)}`;
  const mongoUrl = external ? `${external.replace(/\/+$/, "")}/${dbName}` : mongo.getUri(dbName);
  const [apiPort, s3Port] = await Promise.all([freePort(), freePort()]);
  const fakeS3 = await startFakeS3(s3Port);

  const logs = [];
  const child = spawn(process.execPath, ["index.js"], {
    cwd: backendDir,
    env: {
      ...process.env,
      NODE_ENV: "test",
      PORT: String(apiPort),
      MONGO_URL: mongoUrl,
      SECRET_KEY: "test-secret-key",
      AWS: "test-access-key",
      AWS_SK: "test-secret-access-key",
      S3_ENDPOINT: `http://127.0.0.1:${s3Port}`,
      CLOUD_DOMAIN: "http://cdn.test",
      MAILER_ID: "",
      MAILER_PASS: "",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  child.stdout.on("data", (d) => logs.push(String(d)));
  child.stderr.on("data", (d) => logs.push(String(d)));

  const baseUrl = `http://127.0.0.1:${apiPort}/v1`;
  const deadline = Date.now() + 30000;
  try {
    for (;;) {
      if (child.exitCode !== null) throw new Error(`server exited early:\n${logs.join("")}`);
      try {
        await fetch(`${baseUrl}/__ready`);
        break;
      } catch {
        if (Date.now() > deadline) throw new Error(`server did not start:\n${logs.join("")}`);
        await new Promise((r) => setTimeout(r, 150));
      }
    }
  } catch (err) {
    // Don't leave mongod / the fake S3 running, or the test process never exits.
    child.kill("SIGKILL");
    await new Promise((r) => fakeS3.server.close(r));
    if (mongo) await mongo.stop();
    throw err;
  }

  const db = await mongoose.createConnection(mongoUrl).asPromise();

  async function stop() {
    child.kill("SIGTERM");
    await new Promise((r) => (child.exitCode !== null ? r() : child.once("exit", r)));
    if (external) await db.dropDatabase();
    await db.close();
    await new Promise((r) => fakeS3.server.close(r));
    if (mongo) await mongo.stop();
  }

  return { baseUrl, db, fakeS3: fakeS3.state, logs, stop };
}

// Small fetch wrapper that never throws on HTTP errors.
export function client(baseUrl) {
  return async function api(method, route, { token, body, form } = {}) {
    const headers = {};
    if (token !== undefined) headers.Authorization = `Bearer ${token}`;
    let payload;
    if (form) payload = form;
    else if (body !== undefined) {
      headers["Content-Type"] = "application/json";
      payload = JSON.stringify(body);
    }
    const res = await fetch(`${baseUrl}${route}`, { method, headers, body: payload });
    const text = await res.text();
    let json;
    try { json = JSON.parse(text); } catch { json = undefined; }
    return { status: res.status, json, text };
  };
}

let counter = 0;
export const unique = (prefix) => `${prefix}${Date.now().toString(36)}${(counter++).toString(36)}`;

// YYYY-MM-DD, `days` from today (UTC), as the date inputs send it.
export const dateOffset = (days) => {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};
