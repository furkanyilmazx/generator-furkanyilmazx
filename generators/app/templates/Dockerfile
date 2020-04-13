FROM node:12-alpine

WORKDIR /app
RUN apk add yarn && yarn global add pm2
COPY . .
EXPOSE 8080
ENTRYPOINT [ "sh" , "./devops.sh"]