FROM node:18.12-alpine3.17
ADD . /school-system
WORKDIR /school-system
RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE  3000
