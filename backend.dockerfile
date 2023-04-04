FROM node:alpine
ADD . /school-system-nest
WORKDIR /school-system-nest
RUN sed -i 's/DATABASE_HOST=localhost/DATABASE_HOST=Postgres/' .env &&\
  npm install pnpm -g --registry=https://registry.npmmirror.com && \
  pnpm install --registry=https://registry.npmmirror.com
CMD pnpm run start
EXPOSE  3000