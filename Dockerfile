FROM node:14

WORKDIR /usr/src/app
ENV PORT=8080

COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 8080
CMD ["node", "index.js"]

