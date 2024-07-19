FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --only=prod
RUN npm install -g ts-node-dev
COPY . .

CMD ["npm", "start"]