FROM node:current-alpine3.17
ADD . /school-system
WORKDIR /school-system
RUN npm install --registry=https://registry.npm.taobao.org
CMD npm run start --watch
EXPOSE  3000