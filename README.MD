# Order Management
<img src="https://i.imgur.com/LiFVgat.png" alt="Logo" />
  <p>
  <i>Build micro-services written with any modern NodeJS Framework Typescript-based framework <b>NestJS.</b> Each of the services should have own purpose of existing and single responsibility</i>
  </p>
  
---

## Features ✨
* Backend API Developed in Node.js using TypeScript NestJS.
* Frontend Developed using TypeScript Angular.
* MongoDB is used as database.

## Backend Microservices
### app-api
app-api is responsible to consume all the microservice apps created. This service is built using NestJS with enabling cors so that controller can accessible from the outer world.

### customer-ms
customer-ms is a customer microservice responsible for providing the list of customers via MongoDB.

### order-ms
order-ms is an order microservice responsible for order management. Orders can be created, confirmed and delivered. The created orders can be cancelled at any point of time.

### payment-ms
payment-ms is a payment microservice responsible to send the random boolean status of the payment confirmation. On the basis of boolean status a state of the payment can triggered to confirmed or declined. 

```javascript
getPaymentConfirmation(): boolean {
	return Math.random() >= 0.5;
}
```

### product-ms
product-ms is a product microservice responsible to get the list of products that can be ordered. This details can be fetched from MongoDB with Name and price.

## State Machine
[X-State](https://xstate.js.org/ "X-State") is used to create the state machine. Below image will depict the states in the application. 

[![State-Machine](https://imgur.com/tnqNv04.png "State-Machine")](https://imgur.com/tnqNv04.png "State-Machine")

## Project Setup
### Prerequisites
You will need to have [[NodeJs](https://nodejs.org/en)] or [[Yarn](https://yarnpkg.com/)] installed in your machine.

### Database
[![MongoDB](https://imgur.com/9RGZ8zS.png "MongoDB")](https://imgur.com/9RGZ8zS.png "MongoDB")

### Building Backend
To run the application on local. Open the command prompt. Letz first reach to the *setel* folder then
```bash
> $ cd order-app-nest\app-api
> $ npm install
```
Compiles and hot-reloads:
```bash
> $ npm run start:dev
```
We have to do it for all the Microservices too.

for building customer-ms: 
```bash
> $ cd order-app-nest\customer-ms
> $ npm install
> $ npm run start:dev
```
for building order-ms:
```bash
> $ cd order-app-nest\order-ms
> $ npm install
> $ npm run start:dev
```
for building payment-ms:
```bash
> $ cd order-app-nest\payment-ms
> $ npm install
> $ npm run start:dev
```
for building product-ms:
```bash
> $ cd order-app-nest\product-ms
> $ npm install
> $ npm run start:dev
```

However for running it in the docker. The build file is already present in the respective directory. We shall run the following commands to get it deployed and run on the docker.

```bash
docker build -t <yourusername>/app-api .
docker run -d -p 5000:5000 <yourusername>/app-api

docker build -t <yourusername>/customer-ms .
docker run -d -p 5005:5005 <yourusername>/customer-ms

docker build -t <yourusername>/order-ms .
docker run -d -p 5001:5001 <yourusername>/order-ms

docker build -t <yourusername>/payment-ms .
docker run -d -p 5002:5002 <yourusername>/payment-ms

docker build -t <yourusername>/product-ms .
docker run -d -p 5003:5003 <yourusername>/product-ms
```
### Frontend
Open command prompt now reach to the directory named *order-app-fe*
```
> $ cd order-app-fe
> $ npm install
```
Compiles and hot-reloads for development:
```
> $ ng serve
```
After running this command it will automatically pop out the running application in your favorite browser. If everything goes well, you would see the screen.

![Front-end screenshot](https://imgur.com/CQ59KmP.png "Front-end screenshot")

## Usage 💡
On click of Add Item button. there will be a Mat-Dialog showing a form to add items

![AddItemScreenShot](https://imgur.com/8R252Hs.png "AddItemScreenShot")

### Some strategic decisions

- Used orderID as the main request identifier in all request ( payment and order). It would help to separate one the most important entities from database
- Order table / collection is used to keep the multiple order info.
```json
{
    "_id": {
        "$oid": "6017bec93ca321f571cbd849"
    },

  "OrderID": "1",
  "OrderNo": "274216",
  "CustomerID": "1",
  "PMethod": "Cash",
  "GTotal": "328",
  "DeletedOrderItemIDs": "",
  "OrderItems": [
    {
      "OrderItemID": "1",
      "OrderID": "1",
      "ItemName": "Wrist Watch",
      "ItemID": "2",
      "Price": "102.52",
      "Quantity": "3",
      "Total": "307.56"
    },
    {
      "OrderItemID": "1",
      "OrderID": "1",
      "ItemName": "Wall Clock",
      "ItemID": "1",
      "Price": "10.22",
      "Quantity": "2",
      "Total": "20.44"
    }
  ]
}
```
Hope you will like the efforts.
