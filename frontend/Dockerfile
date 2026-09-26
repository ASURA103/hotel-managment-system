# DreamStay frontend: build with Vite, serve the static files with nginx.
FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
# The API address is baked into the bundle at build time.
ARG VITE_B_URL=http://localhost:8080/v1
ENV VITE_B_URL=$VITE_B_URL
RUN npm run build

FROM nginx:1.27-alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
