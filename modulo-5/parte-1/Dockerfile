FROM node:10.15.0-alpine
EXPOSE 3000 9229

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /home/app

COPY package.json /home/app/

RUN npm install
RUN npm install sequelize
RUN npm install sequelize-cli

COPY . /home/app

CMD [ "npm", “run”, "install" ]