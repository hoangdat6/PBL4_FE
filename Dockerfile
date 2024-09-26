# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 1444

CMD ["nginx", "-g", "daemon off;"]