# ---- build: compile the Vite app ----
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- serve: static files with nginx ----
FROM nginx:1.27-alpine
# Easypanel passes PORT as a build arg; nginx reads it at runtime through the template below.
ARG PORT=80
ENV PORT=${PORT}
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE ${PORT}
