FROM node:latest
WORKDIR /app
COPY . .
RUN cd ./client \
 && npm install \
 && npm run build \
 && cd ..
 && cd ./server
 && npm install
 && npm run deploy
