FROM node:latest

ENV NODE_ENV=development

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json ./

COPY redis.conf /usr/local/etc/redis/redis.conf

CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]

COPY --chown=node:node . .

RUN npm install

COPY . .

USER node

EXPOSE 4000
EXPOSE 6379

CMD  ["npm", "run", "dev"]
