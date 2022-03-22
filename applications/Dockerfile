FROM node:lts-alpine

WORKDIR /app

COPY package.json package.json
RUN npm i

COPY tsconfig.json tsconfig.json
COPY src src
RUN npm run build

CMD cd dist && node index.js