# API
It is a microservices project with node js, mongoDB and express.

This project currently has two micro-services
- Login : Includes registration, login and user listing
- Business: It currently includes a list of users, but can only be accessed through the first micro-service.

## Deployment instructions
- Run ``` npm run build``` into API to install all the dependencies in each project
- Run ```npm run dev ``` or ```npm run start``` to initialize the projects

## Don't forget to include a .env to the project
### Environment variables
``` 
ACCESS_TOKEN=xxxx
MONGODB_URI= mongoDB uri from mongoDB atlas cluster
LOGIN_PORT=3000
BUSINESS_PORT=3001
BUSINESS_URL=http://127.0.0.1:3001
```
[Postman Collection](https://www.postman.com/marlagualdron/workspace/microservice/collection/13084314-43cea240-84c6-40c0-9e56-3abb1e02cb01?action=share&creator=13084314)

Enjoy :)
