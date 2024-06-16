const express = require("express");

const app = express();

const PORT = 8000;

app.get("/home", (req, res)=>{
    console.log("Home api is working");
    res.send(`Home Api is working`)
})

app.get("/", (req, res)=>{
    console.log("api is working");
    res.send(`Server is running on PORT : ${PORT}`)
})

app.listen(PORT, () =>{
    console.log(`Server is running on PORT : ${PORT}`);
})
