import express from "express";

async function startServer() {
  const app = express();
  app.get("/", function (_req, res) {
    res.send("Welcome to easy-travel-server");
  });

  app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000");
  });
}

startServer();
