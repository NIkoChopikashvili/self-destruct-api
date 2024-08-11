const express = require("express");
const {
  createRouteWithDestruction,
} = require("../controllers/route.controller");

const router = express.Router();

router.post("/create-route", (req, res) => {
  const { path, method, response, maxRequests, ttl } = req.body;
  createRouteWithDestruction(
    router,
    path,
    method,
    (req, res) => res.send(response),
    maxRequests,
    ttl
  );
  res.send(`Route ${method.toUpperCase()} ${path} created.`);
});

module.exports = router;
