FROM node:15-alpine3.10

WORKDIR /product-ms

COPY package*.json tsconfig*.json ./

RUN npm install

COPY src/ src/

EXPOSE 5003

RUN npm run build --prod

RUN rm -r src

CMD [ "node", "dist/main" ]

