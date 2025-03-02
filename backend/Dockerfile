FROM node:20

WORKDIR /app

COPY package.json /app

RUN npm install

EXPOSE  3000

COPY . .

CMD ["npm", "start"]