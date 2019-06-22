const express = require("express");
const router = express.Router();
const Files = require("../models/Files");
const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY
const User = require("../models/User");


router.get("/files/", async (req, res) => {
  try {
    const files = await Files.find().sort({ name: 1 })
    res.status(201).send(files);
  } catch (err) {
    res.status(200).send(err);
  }
});


router.put("/files/:id", async (req, res) => {
  try {
    const newInfo = req.body;
    let token = req.headers["authorization"].split(" ")[1];
    const decoded = jwt.verify(token, JWT_KEY);
    const user = await User.findOne({ userID: decoded.userID });
    if (user) {
      const obj = await Files.findById(req.params.id);
      obj.info.push(newInfo);
      await obj.save();
      res.sendStatus(201);
    } else {
      res.sendStatus(200)
    }
  } catch (err) {
    res.send(err);
  }
});
module.exports = router;
