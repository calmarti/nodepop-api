FROM node:14.18.3-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:14.18.3-alpine

RUN mkdir /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=builder /app/dist ./dist

CMD ["npm", "run", "start:prod"]
