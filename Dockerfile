# run stage
FROM node:12.14-alpine as run-stage

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./

CMD ["npm", "start"]


# build stage
FROM run-stage as build-stage

RUN npm run build


# deploy stage
FROM nginx:stable-alpine as deploy-stage

COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
