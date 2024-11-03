FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG ENV
ENV ENV=$ENV

EXPOSE 3000

CMD ["npm", "start"]