FROM node:latest

RUN apt-get update
RUN apt-get upgrade -y

WORKDIR /opt/tromazo
COPY package.json .

RUN npm install

EXPOSE 3000

COPY . .

CMD npm start > logs/service/log
