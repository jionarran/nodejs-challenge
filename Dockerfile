FROM node:16-alpine

WORKDIR /the/workdir/path

COPY package.json .

COPY yarn.lock .
RUN yarn

# RUN chmod -r a+rwx /app

COPY . .

EXPOSE 3333

RUN yarn test

RUN yarn build

CMD yarn start