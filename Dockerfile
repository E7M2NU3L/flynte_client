FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install 

RUN npm i serve -g

COPY . .

RUN npm run build

EXPOSE 5173

CMD [ "serve", "-s", "dist" ]