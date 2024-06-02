const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./app/config/db.config");
const userRoutes = require("./app/routes/userRoutes");
const threadRoutes = require("./app/routes/threadRoutes");
const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello to here" });
});

app.use("/api", userRoutes);
app.use("/api", threadRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const pool = require("./app/config/db.config");
// const app = express();

// var corsOptions = {
//   origin: "http://localhost:3000"
// };
// //const db = require("./app/models");
// //db.sequelize.sync();
// app.use(cors(corsOptions));

// // parse requests of content-type - application/json
// app.use(bodyParser.json());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// // simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Hello to here" });
// });

// // set port, listen for requests
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

// //👇🏻 holds all the existing users
// const users = [];
// //👇🏻 generates a random string as ID
// const generateID = () => Math.random().toString(36).substring(2, 10);

// app.post("/api/register", async (req, res) => {
//     const { email, password, username } = req.body;
//     //👇🏻 holds the ID
//     const id = generateID();
//     //👇🏻 logs all the user's credentials to the console.
//     const result = users.filter(
//       (user) => user.email === email && user.password === password
//     );
//     //👇🏻 if true
//     if (result.length === 0) {
//         const newUser = { id, email, password, username };
//         //👇🏻 adds the user to the database (array)
//         users.push(newUser);
//         //👇🏻 returns a success message
//         return res.json({
//             message: "Account created successfully!",
//         });
//     }
//     //👇🏻 if there is an existing user
//     res.json({
//         error_message: "User already exists",
//     });
// });

// app.post("/api/login", (req, res) => {
//   const { email, password } = req.body;
//   //👇🏻 checks if the user exists
//   let result = users.filter(
//       (user) => user.email === email && user.password === password
//   );
//   //👇🏻 if the user doesn't exist
//   if (result.length !== 1) {
//       return res.json({
//           error_message: "Incorrect credentials",
//       });
//   }
//   //👇🏻 Returns the id if successfuly logged in
//   res.json({
//       message: "Login successfully",
//       id: result[0].id,
//   });
// });

// //👇🏻 holds all the posts created
// const threadList = [];

// app.post("/api/create/thread", async (req, res) => {
// const { thread, userId } = req.body;
// const threadId = generateID();

//     //👇🏻 add post details to the array
//     threadList.unshift({
//         id: threadId,
//         title: thread,
//         userId,
//         upvotes: 0,
//         downvotes: 0,
//         upvotedBy: [],
//         downvotedBy: [],
//     });

//     //👇🏻 Returns a response containing the posts
//     res.json({
//         message: "Thread created successfully!",
//         threads: threadList,
//     });
// });

// app.get("/api/all/threads", (req, res) => {
//   res.json({
//       threads: threadList,
//   });
// });

// app.post("/api/thread/vote", (req, res) => {
//   const { threadId, userId, action } = req.body; // action can be 'upvote' or 'downvote'
//   const thread = threadList.find((thread) => thread.id === threadId);
//   if (thread) {
//     if (action === 'upvote') {
//       if (thread.upvotedBy.includes(userId)) {
//         return res.status(400).json({ error_message: "User has already upvoted this thread." });
//       }
//       thread.upvotes += 1;
//       thread.upvotedBy.push(userId);
//       thread.downvotes -= thread.downvotedBy.includes(userId) ? 1 : 0;
//       thread.downvotedBy = thread.downvotedBy.filter((id) => id !== userId);
//        // Remove from downvotedBy if exists
//     } else if (action === 'downvote') {
//       if (thread.downvotedBy.includes(userId)) {
//         return res.status(400).json({ error_message: "User has already downvoted this thread." });
//       }
//       thread.downvotes += 1;
//       thread.downvotedBy.push(userId);
//       thread.upvotes -= thread.upvotedBy.includes(userId) ? 1 : 0;
//       thread.upvotedBy = thread.upvotedBy.filter((id) => id !== userId);
//       // Remove from upvotedBy if exists
//     } else {
//       return res.status(400).json({ error_message: "Invalid action." });
//     }
//     res.json({ message: "Vote registered successfully!", upvotes: thread.upvotes, downvotes: thread.downvotes });
//   } else {
//     res.status(404).json({ message: "Thread not found." });
//   }
// });

// app.post("/api/thread/votes", (req, res) => {
//   const { id } = req.body;
//   const thread = threadList.find((thread) => thread.id === id);
//   if (thread) {
//     res.json({
//       upvotes: thread.upvotes,
//       downvotes: thread.downvotes,
//     });
//   } else {
//     res.status(404).json({ message: "Thread not found." });
//   }
// });
