FROM node:18 AS BUILDER

COPY package*.json ./

RUN mkdir src
COPY src src
RUN npm i
RUN npm run build:production

FROM node:18

COPY package*.json ./
RUN mkdir -p src/views dist assets
COPY src/views src/views
COPY assets assets
COPY --from=BUILDER dist dist

CMD ["npm", "run", "start:production"]


