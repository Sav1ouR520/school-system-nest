FROM nginx:latest
COPY ./Docker/nginx/nginx.conf ./etc/nginx
RUN mkdir log
