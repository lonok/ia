FROM ubuntu:20.04

ENV TZ=America/Sao_Paulo

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# OPENCV BUILD
RUN apt-get update && apt-get install -y git wget unzip curl

# NODE JS
RUN apt-get -y install curl dirmngr apt-transport-https lsb-release ca-certificates
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash
RUN apt-get -y install nodejs

WORKDIR /app

COPY ./src/package.json /app/src/package.json
#RUN npm install -g opencv4nodejs --unsafe-perm
RUN npm install -g nodemon && npm install

#COPY ./app /app/src

#CMD ["nodemon", "-L", "./src/main.js"]