FROM node:20-alpine

RUN mkdir -p /usr/expencetraker
WORKDIR /usr/expencetraker

COPY ./ ./

RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm","start"]