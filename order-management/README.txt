Order Management Rest API
A digital service handles online shopping orders through web requests, 
written with JavaScript tools called Node.js and Express.js. 
Built like a real storefront backend, it supports adding new purchases, 
viewing existing ones, changing details, or removing them entirely. 
Instead of temporary memory, information stays saved in a small database named SQLite. 
Each task runs without blocking others, showing how modern code manages timing efficiently. 
Rest methods shape the API’s structure, using correct status responses where needed. 
Design choices follow standard patterns for internet services, focusing on clarity and 
reliability behind the scenes.

The API includes basic error handling. If required fields are missing 
during order creation, the server responds with a 400 Bad Request. 
If a requested resource cannot be found, a 404 Not Found response is returned. 
All endpoints were tested using Postman.

Setup Instructions
A working version of Node.js must be present before starting. 
Once confirmed, move into the project folder. Execute the command below to 
set up necessary packages:

npm install

After, launch the server through:

npm start

This starts the server:

http://localhost:3000

Project Structure
A setup split into parts keeps tasks apart, making updates 
easier down the line. The main entry point is app.js, which initializes
the Express server and connects all routes. The orders directory 
contains route definitions and controller logic. The common directory 
manages shared resources such as the database connection and data models. 
SQLite is used as the database, with the file stored in the storage folder.

API Endpoints
The API provides five core endpoints for managing orders.
To create a new order, a POST request is sent to /orders. This endpoint accepts a 
JSON body containing the order details and returns a 201 Created response upon success.
To retrieve all orders, a GET request is sent to /orders. This returns a list of all stored orders.
To retrieve a specific order, a GET request is sent to /orders/#, where # represents 
the unique identifier of the order. If the order exists, it is returned; otherwise, a 404 Not 
Found response is issued. To update an order’s status, a PATCH request is sent to /orders/#. 
This allows modification of fields such as the order status.
To delete an order, a DELETE request is sent to /orders/#. If successful, a confirmation 
message is returned.

Example Request and Response:

A sample request for placing an order:

{
  "id": "1",
  "customerName": "Gio Raia",
  "product": "Burger",
  "quantity": 2
}

A successful response will return:

{
  "id": "1",
  "customerName": "Gio Raia",
  "product": “Burger",
  "quantity": 2,
  "status": "Pending",
  "createdAt": "2026-03-26T00:00:00.000Z",
  "updatedAt": "2026-03-26T00:00:00.000Z"
}

Testing:

POST		/orders		Create Orders

GET		/orders		Get Orders

GET		/orders/#	Get specific Orders

PATCH		/orders/#	Update status

DELETE	/orders/#	Delete

TEST!!!!