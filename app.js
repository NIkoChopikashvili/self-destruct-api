const app = require("./config/server");
const {
  createRouteWithDestruction,
} = require("./controllers/route.controller");
const logger = require("./middlewares/logger");

app.use(logger);

app.post("/api/create-route", (req, res) => {
  const { path, method, response, maxRequests, ttl } = req.body;
  createRouteWithDestruction(
    app,
    path,
    method,
    (req, res) => res.send(response),
    maxRequests,
    ttl
  );
  res.send(`Route ${method.toUpperCase()} ${path} created.`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
