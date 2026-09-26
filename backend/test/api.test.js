// LOCAL-TEST-ONLY — not used in production; safe to remove before deployment.
// End-to-end API tests. Run: npm test (Node 22; see test/run-in-docker.sh)
// Each test states the behaviour the app must have; see test/helpers.js for the harness.
import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import { startStack, client, unique, dateOffset } from "./helpers.js";

let stack;
let api;
let db;

before(async () => {
  stack = await startStack();
  api = client(stack.baseUrl);
  db = stack.db;
});

after(async () => {
  if (stack) await stack.stop();
});

// ── fixtures ────────────────────────────────────────────────────────────────
const PASSWORD = "secret123";

async function newUser() {
  const email = `${unique("u")}@test.dev`;
  const res = await api("POST", "/user/signup", {
    body: { name: "Guest", username: unique("guest"), email, password: PASSWORD },
  });
  assert.equal(res.status, 200, `user signup failed: ${res.text}`);
  const doc = await db.collection("users").findOne({ email });
  return { token: res.json.token, id: String(doc._id), email, res };
}

async function newOwner() {
  const email = `${unique("o")}@test.dev`;
  const res = await api("POST", "/owner/signup", {
    body: { name: "Owner", phone: 9876543210, email, idProof: "ID123", password: PASSWORD },
  });
  assert.equal(res.status, 200, `owner signup failed: ${res.text}`);
  const doc = await db.collection("owners").findOne({ email });
  return { token: res.json.token, id: String(doc._id), email, res };
}

async function newAdmin() {
  const username = unique("admin");
  await db.collection("admins").insertOne({ username, password: "adminpass1" }); // plaintext, like existing data
  const res = await api("POST", "/admin/signin", { body: { username, password: "adminpass1" } });
  assert.equal(res.status, 200, `admin signin failed: ${res.text}`);
  return { token: res.json.token, username, res };
}

async function insertHotel(ownerId, overrides = {}) {
  const doc = {
    name: unique("Hotel "),
    area: "Sector 17",
    city: unique("City"),
    state: "Punjab",
    price: "1000",
    unmarriedFriendly: true,
    Image: "http://cdn.test/hotel.jpg",
    AcRoomA: true,
    NonAcRoomA: true,
    TotalAc: 2,
    TotalNonAc: 2,
    status: true,
    createdBy: ownerId,
    ...overrides,
  };
  const { insertedId } = await db.collection("hotels").insertOne(doc);
  return { ...doc, _id: insertedId, id: String(insertedId) };
}

async function insertBooking({ hotelId, userId, from, to, rooms = 1, RoomType = "AC", bill = 1000 }) {
  await db.collection("bookings").insertOne({
    fromDate: new Date(from),
    toDate: new Date(to),
    rooms,
    bill,
    RoomType,
    bookedBy: [new mongoose.Types.ObjectId(userId)],
    hotelId: [new mongoose.Types.ObjectId(hotelId)],
  });
}

const hotelDoc = (id) => db.collection("hotels").findOne({ _id: new mongoose.Types.ObjectId(id) });

async function search(body) {
  const res = await api("POST", "/user/searchHotel", { body });
  return res;
}
const ids = (list) => (Array.isArray(list) ? list.map((h) => String(h._id)) : []);

// ── authentication & roles ──────────────────────────────────────────────────
describe("authentication and roles", () => {
  it("missing token returns 401 instead of crashing", async () => {
    const res = await api("GET", "/owner/getHotels");
    assert.equal(res.status, 401);
  });

  it("invalid token returns 401", async () => {
    const res = await api("GET", "/owner/getHotels", { token: "not-a-real-token" });
    assert.equal(res.status, 401);
  });

  it("a guest cannot use admin routes", async () => {
    const guest = await newUser();
    const owner = await newOwner();
    const h = await insertHotel(owner.id);
    assert.equal((await api("GET", "/admin/allhotels", { token: guest.token })).status, 403);
    assert.equal((await api("GET", "/admin/getallbookings", { token: guest.token })).status, 403);
    const del = await api("DELETE", "/admin/deleteHotel", { token: guest.token, body: { id: h.id } });
    assert.equal(del.status, 403);
    const after = await hotelDoc(h.id);
    assert.ok(after, "hotel must still exist");
    assert.notEqual(after.isDeleted, true, "hotel must not be marked removed");
  });

  it("a guest cannot use owner routes", async () => {
    const guest = await newUser();
    assert.equal((await api("GET", "/owner/getHotels", { token: guest.token })).status, 403);
  });

  it("an owner cannot use admin routes", async () => {
    const owner = await newOwner();
    assert.equal((await api("GET", "/admin/allhotels", { token: owner.token })).status, 403);
  });

  it("sign-up and sign-in responses keep the fields the frontend reads", async () => {
    const u = await newUser();
    assert.equal(typeof u.res.json.token, "string");
    assert.equal(u.res.json.name, "Guest");
    const signin = await api("POST", "/user/signin", { body: { email: u.email, password: PASSWORD } });
    assert.equal(signin.status, 200);
    assert.equal(signin.json.name, "Guest");
    assert.equal(typeof signin.json.token, "string");

    const o = await newOwner();
    assert.equal(o.res.json.ownername, "Owner");
    const osignin = await api("POST", "/owner/signin", { body: { email: o.email, password: PASSWORD } });
    assert.equal(osignin.status, 200);
    assert.equal(osignin.json.ownername, "Owner");

    const a = await newAdmin();
    assert.equal(a.res.json.username, a.username);
    assert.equal(typeof a.res.json.token, "string");
  });

  it("a wrong password is rejected", async () => {
    const u = await newUser();
    const res = await api("POST", "/user/signin", { body: { email: u.email, password: "wrongpass" } });
    assert.equal(res.status, 401);
  });
});

// ── admin ───────────────────────────────────────────────────────────────────
describe("admin", () => {
  it("an existing plain-text admin can sign in and the password is re-hashed", async () => {
    const a = await newAdmin();
    const stored = await db.collection("admins").findOne({ username: a.username });
    assert.match(stored.password, /^\$2[aby]\$/, "password should now be a bcrypt hash");
    const again = await api("POST", "/admin/signin", { body: { username: a.username, password: "adminpass1" } });
    assert.equal(again.status, 200, "sign-in must still work after re-hashing");
    const wrong = await api("POST", "/admin/signin", { body: { username: a.username, password: "wrongpass1" } });
    assert.ok(wrong.status >= 400);
  });

  it("an admin can add admins, up to 3 in total", async () => {
    await db.collection("admins").deleteMany({});
    const a = await newAdmin(); // 1
    const add2 = await api("POST", "/admin/add", { token: a.token, body: { username: unique("adm"), password: "adminpass2" } });
    assert.equal(add2.status, 200, `add admin failed: ${add2.text}`);
    const add3 = await api("POST", "/admin/add", { token: a.token, body: { username: unique("adm"), password: "adminpass3" } });
    assert.equal(add3.status, 200);
    const add4 = await api("POST", "/admin/add", { token: a.token, body: { username: unique("adm"), password: "adminpass4" } });
    assert.ok(add4.status >= 400, "4th admin must be refused");
    assert.equal(await db.collection("admins").countDocuments(), 3);
    const newest = await db.collection("admins").find().sort({ _id: -1 }).limit(1).next();
    assert.match(newest.password, /^\$2[aby]\$/, "new admin passwords are hashed");
  });

  it("warning an unknown owner returns 404 instead of crashing", async () => {
    const a = await newAdmin();
    const res = await api("POST", "/admin/sendWarning", {
      token: a.token,
      body: { createdBy: String(new mongoose.Types.ObjectId()) },
    });
    assert.equal(res.status, 404);
  });

  it("admin delete marks the hotel removed and keeps its bookings", async () => {
    const a = await newAdmin();
    const owner = await newOwner();
    const guest = await newUser();
    const h = await insertHotel(owner.id);
    await insertBooking({ hotelId: h.id, userId: guest.id, from: dateOffset(10), to: dateOffset(12) });
    const res = await api("DELETE", "/admin/deleteHotel", { token: a.token, body: { id: h.id } });
    assert.equal(res.status, 200);
    const doc = await hotelDoc(h.id);
    assert.ok(doc, "hotel document is kept");
    assert.equal(doc.isDeleted, true);
    assert.equal(await db.collection("bookings").countDocuments({ hotelId: h._id }), 1, "bookings are kept");
  });
});

// ── owner ───────────────────────────────────────────────────────────────────
describe("owner", () => {
  it("deletes the hotel that was clicked, not the owner's first hotel", async () => {
    const owner = await newOwner();
    const first = await insertHotel(owner.id);
    const second = await insertHotel(owner.id);
    const res = await api("DELETE", "/owner/delHotel", { token: owner.token, body: { id: second.id } });
    assert.equal(res.status, 200);
    assert.equal((await hotelDoc(second.id)).isDeleted, true);
    const firstAfter = await hotelDoc(first.id);
    assert.ok(firstAfter);
    assert.notEqual(firstAfter.isDeleted, true);
    const list = await api("GET", "/owner/getHotels", { token: owner.token });
    assert.deepEqual(ids(list.json), [first.id], "removed hotels are hidden from the owner's list");
  });

  it("cannot delete another owner's hotel", async () => {
    const owner1 = await newOwner();
    const owner2 = await newOwner();
    const h = await insertHotel(owner1.id);
    const res = await api("DELETE", "/owner/delHotel", { token: owner2.token, body: { id: h.id } });
    assert.equal(res.status, 404);
    assert.notEqual((await hotelDoc(h.id)).isDeleted, true);
  });

  it("can edit their own hotel, and only that hotel", async () => {
    const owner = await newOwner();
    const target = await insertHotel(owner.id);
    const other = await insertHotel(owner.id);
    const res = await api("PUT", "/owner/updatehotel", {
      token: owner.token,
      body: { id: target.id, name: "Renamed Stay", price: 1500, TotalAc: 4 },
    });
    assert.equal(res.status, 200, `update failed: ${res.text}`);
    const t = await hotelDoc(target.id);
    assert.equal(t.name, "Renamed Stay");
    assert.equal(String(t.price), "1500");
    assert.equal(t.TotalAc, 4);
    assert.equal(t.createdBy, owner.id, "owner cannot be changed");
    const o = await hotelDoc(other.id);
    assert.equal(o.name, other.name, "other hotels are untouched");
  });

  it("cannot edit another owner's hotel", async () => {
    const owner1 = await newOwner();
    const owner2 = await newOwner();
    const h = await insertHotel(owner1.id);
    const res = await api("PUT", "/owner/updatehotel", { token: owner2.token, body: { id: h.id, name: "Hijacked" } });
    assert.equal(res.status, 404);
    assert.equal((await hotelDoc(h.id)).name, h.name);
  });

  it("owner bookings include the guest's email and the hotel image", async () => {
    const owner = await newOwner();
    const guest = await newUser();
    const h = await insertHotel(owner.id, { Image: "http://cdn.test/owner-view.jpg" });
    await insertBooking({ hotelId: h.id, userId: guest.id, from: dateOffset(20), to: dateOffset(21) });
    const res = await api("GET", "/owner/bookings", { token: owner.token });
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.json));
    assert.equal(res.json.length, 1);
    assert.equal(res.json[0].bookedBy[0].email, guest.email);
    assert.equal(res.json[0].hotelId[0].Image, "http://cdn.test/owner-view.jpg");
  });
});

// ── search ──────────────────────────────────────────────────────────────────
describe("search", () => {
  const range = { fromDate: dateOffset(30), toDate: dateOffset(32) };

  it("Non-AC searches use Non-AC capacity", async () => {
    const owner = await newOwner();
    const h = await insertHotel(owner.id, { TotalAc: 0, TotalNonAc: 3 });
    const res = await search({ value: h.city, ...range, rooms: 1, RoomType: "NonAc" });
    assert.equal(res.status, 200);
    assert.ok(ids(res.json).includes(h.id));
  });

  it("AC bookings do not reduce Non-AC availability", async () => {
    const owner = await newOwner();
    const guest = await newUser();
    const h = await insertHotel(owner.id, { TotalAc: 1, TotalNonAc: 1 });
    await insertBooking({ hotelId: h.id, userId: guest.id, from: range.fromDate, to: range.toDate, rooms: 1, RoomType: "AC" });
    const nonAc = await search({ value: h.city, ...range, rooms: 1, RoomType: "NonAc" });
    assert.ok(ids(nonAc.json).includes(h.id), "Non-AC room is still free");
    const ac = await search({ value: h.city, ...range, rooms: 1, RoomType: "AC" });
    assert.ok(!ids(ac.json).includes(h.id), "AC is full");
  });

  it("the last free room can be found", async () => {
    const owner = await newOwner();
    const guest = await newUser();
    const h = await insertHotel(owner.id, { TotalAc: 2 });
    await insertBooking({ hotelId: h.id, userId: guest.id, from: range.fromDate, to: range.toDate, rooms: 1, RoomType: "AC" });
    const res = await search({ value: h.city, ...range, rooms: 1, RoomType: "AC" });
    assert.ok(ids(res.json).includes(h.id));
  });

  it("rooms sent as text are counted as a number", async () => {
    const owner = await newOwner();
    const guest = await newUser();
    const h = await insertHotel(owner.id, { TotalAc: 5 });
    await insertBooking({ hotelId: h.id, userId: guest.id, from: range.fromDate, to: range.toDate, rooms: 3, RoomType: "AC" });
    const res = await search({ value: h.city, ...range, rooms: "2", RoomType: "AC" });
    assert.ok(ids(res.json).includes(h.id));
  });

  it("bookings on other dates do not count", async () => {
    const owner = await newOwner();
    const guest = await newUser();
    const h = await insertHotel(owner.id, { TotalAc: 1 });
    await insertBooking({ hotelId: h.id, userId: guest.id, from: dateOffset(1), to: dateOffset(2), rooms: 1, RoomType: "AC" });
    const res = await search({ value: h.city, ...range, rooms: 1, RoomType: "AC" });
    assert.ok(ids(res.json).includes(h.id));
  });

  it("matches by name, area or city prefix, case-insensitively", async () => {
    const owner = await newOwner();
    const h = await insertHotel(owner.id, { name: unique("Grandview"), area: unique("Lakeside") });
    for (const value of [h.name.slice(0, 6).toLowerCase(), h.area.slice(0, 5).toUpperCase(), h.city.slice(0, 5)]) {
      const res = await search({ value, ...range, rooms: 1, RoomType: "AC" });
      assert.ok(ids(res.json).includes(h.id), `prefix "${value}" should match`);
    }
  });

  it("special characters in the search text do not break search", async () => {
    const res = await search({ value: "(", ...range, rooms: 1, RoomType: "AC" });
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.json), `expected a list, got: ${res.text}`);
  });

  it("removed hotels do not appear in search", async () => {
    const owner = await newOwner();
    const h = await insertHotel(owner.id, { isDeleted: true, deletedAt: new Date() });
    const res = await search({ value: h.city, ...range, rooms: 1, RoomType: "AC" });
    assert.ok(!ids(res.json).includes(h.id));
  });

  it("an invalid date range returns 400", async () => {
    const res = await search({ value: "a", fromDate: dateOffset(5), toDate: dateOffset(2), rooms: 1, RoomType: "AC" });
    assert.equal(res.status, 400);
  });
});

// ── public hotel list (landing page) ────────────────────────────────────────
describe("public hotel list", () => {
  it("lists the newest hotels from the database, hiding removed ones", async () => {
    const owner = await newOwner();
    const kept = await insertHotel(owner.id, { name: unique("Listed ") });
    const removed = await insertHotel(owner.id, { isDeleted: true, deletedAt: new Date() });
    const newest = await insertHotel(owner.id, { name: unique("Newest ") });
    const res = await api("GET", "/user/hotels?limit=24");
    assert.equal(res.status, 200);
    const got = ids(res.json);
    assert.ok(got.includes(kept.id) && got.includes(newest.id));
    assert.ok(!got.includes(removed.id));
    assert.equal(got[0], newest.id, "newest first");
    assert.equal(res.json[0].createdBy, undefined, "owner id is not exposed");
    assert.equal(res.json[0].name, newest.name);
  });

  it("caps the page size", async () => {
    const res = await api("GET", "/user/hotels?limit=1000");
    assert.equal(res.status, 200);
    assert.ok(res.json.length <= 24);
    const def = await api("GET", "/user/hotels");
    assert.ok(def.json.length <= 6);
  });
});

// ── booking ─────────────────────────────────────────────────────────────────
describe("booking", () => {
  it("the server computes the bill with the app's formula", async () => {
    const owner = await newOwner();
    const guest = await newUser();
    const h = await insertHotel(owner.id, { price: "1000", TotalAc: 5 });
    const res = await api("POST", "/user/bookH", {
      token: guest.token,
      body: { hotelId: h.id, fromDate: dateOffset(40), toDate: dateOffset(43), rooms: 2, RoomType: "AC", bill: 1 },
    });
    assert.equal(res.status, 200, `booking failed: ${res.text}`);
    const b = await db.collection("bookings").findOne({ hotelId: h._id });
    assert.equal(b.bill, 6000, "3 nights × 2 rooms × 1000");
  });

  it("a same-day booking is billed as price × rooms", async () => {
    const owner = await newOwner();
    const guest = await newUser();
    const h = await insertHotel(owner.id, { price: "1200", TotalAc: 5 });
    const day = dateOffset(45);
    const res = await api("POST", "/user/bookH", {
      token: guest.token,
      body: { hotelId: h.id, fromDate: day, toDate: day, rooms: 3, RoomType: "AC", bill: 0 },
    });
    assert.equal(res.status, 200, res.text);
    const b = await db.collection("bookings").findOne({ hotelId: h._id });
    assert.equal(b.bill, 3600);
  });

  it("overbooking is refused", async () => {
    const owner = await newOwner();
    const guest = await newUser();
    const h = await insertHotel(owner.id, { TotalAc: 1 });
    const body = { hotelId: h.id, fromDate: dateOffset(50), toDate: dateOffset(52), rooms: 1, RoomType: "AC" };
    assert.equal((await api("POST", "/user/bookH", { token: guest.token, body })).status, 200);
    const second = await api("POST", "/user/bookH", { token: guest.token, body });
    assert.equal(second.status, 409);
    assert.equal(await db.collection("bookings").countDocuments({ hotelId: h._id }), 1);
  });

  it("booking a removed hotel is refused", async () => {
    const owner = await newOwner();
    const guest = await newUser();
    const h = await insertHotel(owner.id, { isDeleted: true, deletedAt: new Date() });
    const res = await api("POST", "/user/bookH", {
      token: guest.token,
      body: { hotelId: h.id, fromDate: dateOffset(60), toDate: dateOffset(61), rooms: 1, RoomType: "AC" },
    });
    assert.equal(res.status, 404);
  });

  it("an incomplete booking request returns 400", async () => {
    const guest = await newUser();
    const res = await api("POST", "/user/bookH", { token: guest.token, body: { rooms: 1 } });
    assert.equal(res.status, 400);
  });

  it("my bookings still list bookings of removed hotels, flagged as removed", async () => {
    const owner = await newOwner();
    const guest = await newUser();
    const admin = await newAdmin();
    const h = await insertHotel(owner.id, { TotalAc: 3 });
    const book = await api("POST", "/user/bookH", {
      token: guest.token,
      body: { hotelId: h.id, fromDate: dateOffset(70), toDate: dateOffset(71), rooms: 1, RoomType: "AC" },
    });
    assert.equal(book.status, 200);
    await api("DELETE", "/admin/deleteHotel", { token: admin.token, body: { id: h.id } });
    const mine = await api("GET", "/user/mybookings", { token: guest.token });
    assert.equal(mine.status, 200);
    assert.equal(mine.json.bookings.length, 1);
    assert.equal(mine.json.bookings[0].hotelId[0].isDeleted, true);
  });
});

// ── hotel image upload ──────────────────────────────────────────────────────
describe("hotel image upload", () => {
  // 1×1 transparent PNG
  const PNG = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
    "base64",
  );
  const hotelForm = (file, type = "image/png", name = "photo.png") => {
    const f = new FormData();
    for (const [k, v] of Object.entries({
      name: unique("Upload Inn "), area: "Mall Road", city: unique("Shimla"), state: "HP", price: "2200",
      unmarriedFriendly: "true", AcRoomA: "true", NonAcRoomA: "false", TotalAc: "4", TotalNonAc: "0",
    })) f.append(k, v);
    if (file) f.append("file", new Blob([file], { type }), name);
    return f;
  };
  const hotelCount = () => db.collection("hotels").countDocuments();

  it("an owner can add a hotel with an image", async () => {
    const owner = await newOwner();
    const putsBefore = stack.fakeS3.puts.length;
    const res = await api("POST", "/owner/addhotel", { token: owner.token, form: hotelForm(PNG) });
    assert.equal(res.status, 200, `add hotel failed: ${res.text}`);
    assert.equal(stack.fakeS3.puts.length, putsBefore + 1, "image uploaded to S3");
    const h = await db.collection("hotels").find({ createdBy: owner.id }).next();
    assert.ok(h, "hotel saved");
    assert.ok(h.Image.startsWith("http://cdn.test/"), `image URL uses CLOUD_DOMAIN: ${h.Image}`);
    assert.equal(h.TotalAc, 4);
  });

  it("a non-image file is refused and no hotel is created", async () => {
    const owner = await newOwner();
    const before = await hotelCount();
    const res = await api("POST", "/owner/addhotel", {
      token: owner.token,
      form: hotelForm(Buffer.from("not an image"), "text/plain", "notes.txt"),
    });
    assert.equal(res.status, 400);
    assert.equal(await hotelCount(), before);
  });

  it("a missing image is refused", async () => {
    const owner = await newOwner();
    const res = await api("POST", "/owner/addhotel", { token: owner.token, form: hotelForm(null) });
    assert.equal(res.status, 400);
  });

  it("if S3 fails, the request fails and no hotel is created", async () => {
    const owner = await newOwner();
    const before = await hotelCount();
    stack.fakeS3.fail = true;
    try {
      const res = await api("POST", "/owner/addhotel", { token: owner.token, form: hotelForm(PNG) });
      assert.ok(res.status >= 500, `expected a server error, got ${res.status}`);
    } finally {
      stack.fakeS3.fail = false;
    }
    assert.equal(await hotelCount(), before);
  });

  it("server logs never contain the AWS secret key", () => {
    assert.ok(!stack.logs.join("").includes("test-secret-access-key"));
  });
});
