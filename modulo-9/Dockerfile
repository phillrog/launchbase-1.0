FROM node
EXPOSE 4000 4000

WORKDIR /home/app

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

COPY ./package.json /home/app/

RUN npm install --no-optional && npm cache clean --force

RUN npm install decamelize
RUN npm install -g pg
RUN npm install -g sequelize
RUN npm install -g sequelize-cli
RUN npm install -g faker

COPY . .

RUN chmod 777 /home/app/entrypoint.sh