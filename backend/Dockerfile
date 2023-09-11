FROM node:16-alpine
WORKDIR /app
# copy from current dir to /app
COPY package.json .
RUN apk update && apk add --no-cache gcc g++ python3 python3-dev openjdk11
RUN npm install
COPY . .
EXPOSE 4000
CMD ["node", "server.js"]
