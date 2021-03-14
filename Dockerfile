FROM node:14.16.0-alpine as builder

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:14.16.0-alpine

RUN mkdir /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=builder /app/dist ./dist

USER node

ARG SECRET_KEY
ENV SECRET_KEY=${SECRET_KEY}

CMD ["npm", "run", "start:prod"]
