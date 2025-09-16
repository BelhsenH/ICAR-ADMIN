FROM node:16.13.0 AS node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/admin-exped-now /usr/share/nginx/html
