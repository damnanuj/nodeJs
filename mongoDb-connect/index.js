const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = 8000;

const MONGO_URI = `mongodb+srv://damnanuj:Anujatlas@cluster0.w7mdapr.mongodb.net/juneTestDb`;

//middleware
app.use(express.urlencoded({ extended: true }));
// app.use(express.json())

// db Connect

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.send(`server is running on PORT : ${PORT}`);
});

// displaying a html form
app.get("/user-form", (req, res) => {
  return res.send(
    `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Form</title>
        </head>
        <body>
            <form action="/submit-form" method="post">
                <label for="name">Name:</label><br>
                <input type="text" id="name" name="name"><br>
                
                <label for="email">Email:</label><br>
                <input type="email" id="email" name="email"><br>
                
                <label for="password">Password:</label><br>
                <input type="password" id="password" name="password"><br><br>
                
                <button type="submit">Submit</button>
            </form>
        </body>
        </html>`
  );
});

app.post("/submit-form", (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  console.log(name, email, password);
  return res.send("form submitted successfully");
});

app.listen(PORT, () => {
  console.log(`server is running on PORT : ${PORT}`);
  console.log(`http://localhost:${PORT}/`);
});
