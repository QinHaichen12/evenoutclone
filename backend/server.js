const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};
//const db = require("./app/models");
//db.sequelize.sync();
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello to here" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//👇🏻 holds all the existing users
const users = [];
//👇🏻 generates a random string as ID
const generateID = () => Math.random().toString(36).substring(2, 10);

app.post("/api/register", async (req, res) => {
    const { email, password, username } = req.body;
    //👇🏻 holds the ID
    const id = generateID();
    //👇🏻 logs all the user's credentials to the console.
    const result = users.filter(
      (user) => user.email === email && user.password === password
    );
    //👇🏻 if true
    if (result.length === 0) {
        const newUser = { id, email, password, username };
        //👇🏻 adds the user to the database (array)
        users.push(newUser);
        //👇🏻 returns a success message
        return res.json({
            message: "Account created successfully!",
        });
    }
    //👇🏻 if there is an existing user
    res.json({
        error_message: "User already exists",
    });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  //👇🏻 checks if the user exists
  let result = users.filter(
      (user) => user.email === email && user.password === password
  );
  //👇🏻 if the user doesn't exist
  if (result.length !== 1) {
      return res.json({
          error_message: "Incorrect credentials",
      });
  }
  //👇🏻 Returns the id if successfuly logged in
  res.json({
      message: "Login successfully",
      id: result[0].id,
  });
});


//👇🏻 holds all the posts created
const threadList = [];

app.post("/api/create/thread", async (req, res) => {
const { thread, userId } = req.body;
const threadId = generateID();

    //👇🏻 add post details to the array
    threadList.unshift({
        id: threadId,
        title: thread,
        userId,
        replies: [],
        likes: [],
    });

    //👇🏻 Returns a response containing the posts
    res.json({
        message: "Thread created successfully!",
        threads: threadList,
    });
});

app.get("/api/all/threads", (req, res) => {
  res.json({
      threads: threadList,
  });
});