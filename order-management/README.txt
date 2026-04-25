Order Management Rest API

A digital service handles online shopping orders through web requests, 
written with JavaScript tools called Node.js and Express.js. Built 
like a real storefront backend, it supports adding new purchases, 
viewing existing ones, changing details, or removing them entirely. 
Instead of temporary memory, information stays saved in a small database 
named SQLite. Each task runs without blocking others, showing how modern 
code manages timing efficiently. REST methods shape the API’s structure, 
using correct HTTP status responses where needed. Design choices follow 
standard patterns for internet services, focusing on clarity, scalability, 
and reliability behind the scenes.

The API includes basic error handling. If required fields are missing during 
order creation, the server responds with a 400 Bad Request. If a requested 
resource cannot be found, a 404 Not Found response is returned. All endpoints 
were tested using Postman, and automated validation is included using a shell-based 
test script that verifies the API response using HTTP status codes.

This project also includes infrastructure automation using Ansible. Instead of 
manually configuring the server, a deployment playbook installs required 
dependencies such as Node.js, npm, SQLite, and supporting Python libraries. 
It also configures the database, deploys the application code, installs dependencies, 
and uses PM2 to run the application in the background as a managed process. 
This ensures the application can recover from crashes and remain continuously 
available. Deployment is idempotent, meaning running it multiple times will not 
break or duplicate resources.

For reliability, a rollback playbook is included. If deployment fails or introduces 
issues, the rollback process stops the running application, removes the deployed 
code, and cleans up installed services. This allows the system to safely return to 
a known working state without manual intervention.


Setup Instructions

A working version of Node.js must be present before starting. 
Once confirmed, move into the project folder. Install required 
dependencies using:

npm install

To start the server locally:

npm start

The application will run at:

http://localhost:3000

For production deployment, Ansible is used to automatically provision 
and configure a remote Ubuntu server. The deployment is executed using:

ansible-playbook -i "<server-ip>," -u ubuntu --private-key <key.pem> deploy.yml

This installs all required services and launches the application automatically.
Ensure ports 22 (SSH) and 3000 (Node.js application) are open in the AWS security
group to allow external access.

To rollback the deployment, run:

ansible-playbook -i "<server-ip>," -u ubuntu --private-key <key.pem> rollback.yml

The application runs as a background service using PM2:

pm2 start server.js --name my-node-app --cwd /home/ubuntu/my-node-app
pm2 save
pm2 startup


Project Structure

A setup split into parts keeps tasks apart, making updates 
easier down the line. The main entry point is app.js, which 
initializes the Express server and connects all routes. The orders 
directory contains route definitions and controller logic. The common 
directory manages shared resources such as the database connection 
and data models. SQLite is used as the database, with the file stored 
in the storage folder. Deployment and automation files are included 
to support infrastructure management, including deploy.yml and 
rollback.yml for provisioning and recovery.


API Endpoints

The API provides five core endpoints for managing orders. 

To create a new order, a POST request is sent to /orders. 
This endpoint accepts a JSON body containing the order details 
and returns a 201 Created response upon success. 

To retrieve all orders, a GET request is sent to /orders. 
This returns a list of all stored orders. 

To retrieve a specific order, a GET request is sent 
to /orders/#, where # represents the unique identifier 
of the order. If the order exists, it is returned; 
otherwise, a 404 Not Found response is issued. 

To update an order’s status, a PATCH request is sent 
to /orders/#. This allows modification of fields such 
as the order status. 

To delete an order, a DELETE request is sent to /orders/#. 
If successful, a confirmation message is returned.


Example Request and Response

A sample request for placing an order:

{
"id": "1",
"customerName": "Gio Raia",
"product": "Burger",
"quantity": 2
}

A successful response returns:

{
"id": "1",
"customerName": "Gio Raia",
"product": "Burger",
"quantity": 2,
"status": "Pending",
"createdAt": "2026-03-26T00:00:00.000Z",
"updatedAt": "2026-03-26T00:00:00.000Z"
}


Testing

POST    /orders       Create Orders
GET     /orders       Get Orders
GET     /orders/#     Get Specific Order
PATCH   /orders/#     Update Order
DELETE  /orders/#     Delete Order

To run verification tests:

chmod +x test.sh
./test.sh <server-ip>