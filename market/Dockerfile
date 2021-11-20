FROM node:12.22.4-alpine
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY . .
RUN npm install -g pm2
RUN npm install --save
CMD [ "npm", "run", "pm2" ]
