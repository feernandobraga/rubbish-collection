import express, { response, request, json } from "express";
import routes from "./routes";
import path from "path";

// express is what manages the routes
const app = express();

// this is to tell express that this is a JSON based API
app.use(express.json());

app.use(routes);

// this creates a static route so the images are accessible
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

// const users = ["Fernando", "Cris", "John", "Sam"];

// // /*  RETRIEVE ALL USERS
// //     the .get method accepts the path and a function that will be executed the function gets 2 params:
// //     REQUEST - the data that the url will receive and
// //     RESPONSE - the response that the api will send
// // */
// // app.get("/users", (request, response) => {
// //   console.log("user listing");

// //   // the method send is used to send plain text
// //   // response.send("Hello World");

// //   // the method .json is used to send a json response
// //   response.json(users);
// // });

// /*  FILTER USERS USERS WITH QUERY PARAM
//     by using the method .query from the request, we can filter params that are passed in the URL
// */
// app.get("/users", (request, response) => {
//   // request.query is used when we use params that look like users?search=something
//   // .search needs to match the api call. if I change the api call to users?banana=something, then I would have to change the code
//   // to request.query.banana
//   const search = String(request.query.search); // this can return an array so I'm forcing it to be a string

//   const filteredUsers = search ? users.filter(user => user.includes(search)) : users;

//   return response.json(filteredUsers);
// });

// /*  RETRIEVE A SPECIFIC USER
//     The method below retrieves a specific user
//     I captured the id passed through request.params.id. Then I get the user and return it through the response.
// */
// app.get("/users/:id", (request, response) => {
//   const id = Number(request.params.id); // the params come to the method as a string, so we need to convert it

//   const user = users[id];
//   return response.json(user);
// });

// /*  CREATE A USER
//     Below is how you create a put request. Again, you will need to enter the path and pass the request and response params.
//     You can get the information dynamically through request.body, which contains the data from the font-end
// */
// app.post("/users", (request, response) => {
//   const data = request.body;

//   const user = {
//     name: data.name,
//     email: data.email,
//   };

//   return response.json(user);
// });

// the .listen defines the port where the server will be listening for connections
app.listen(3333);
