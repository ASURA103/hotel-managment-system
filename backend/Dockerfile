# DreamStay backend. Node 22 = the version production runs (Node 26 can't load jsonwebtoken's deps).
FROM node:22-bookworm-slim

WORKDIR /app
ENV NODE_ENV=production

# Dependencies first, so this layer is cached until package files change.
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund

COPY index.js ./
COPY src ./src

USER node
EXPOSE 8080
CMD ["node", "index.js"]
