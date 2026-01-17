const express = require("express");
const controller = require("../controllers/url.controller");
const rateLimiter = require("../utils/ratelimiter");


const router = express.Router();

router.post("/api/shorten", controller.createShortUrl);
router.get("/api/stats/:shortCode", controller.getStats);
router.get("/:shortCode",rateLimiter ,controller.redirect);

module.exports = router;
