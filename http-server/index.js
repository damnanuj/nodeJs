const http = require("http");
// const app = express()

const server = http.createServer();
const PORT = 8000;

server.on("request", (req, res) => {
  console.log(req.method + " " + req.url);
  if(req.method==="GET" && req.url==="/"){
      return res.end("Server is running on home");
  }
  if(req.method==="GET" && req.url==="/user"){
      return res.end("Server is running on user");
  }

//   if match api is not found
  return res.end(`${req.method + " " + req.url} not found`)
});

server.listen(PORT, () => {
  console.log(`Http server is running on PORT : ${PORT}`);
});
