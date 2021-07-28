FROM node:12

RUN apt-get update && \
    apt-get install python -y --no-install-recommends

RUN npm install -g @nestjs/cli

WORKDIR /usr/src/app

COPY package*.json ./

EXPOSE 3001

RUN npm i

COPY . .

CMD [ "npm", "run", "start" ]