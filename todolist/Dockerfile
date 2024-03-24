FROM node:21.7.1
WORKDIR /appfe
COPY package*.json .
RUN npm install --force
COPY . .
EXPOSE 3000
CMD ["npm","run","start-app"]