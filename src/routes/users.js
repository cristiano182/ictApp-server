const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY

router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      if (user.password === password) {
        let tokenData = { email };
        let token = jwt.sign(tokenData, JWT_KEY, { expiresIn: "60m" });
        let data = { token, email }
        res.status(201).send(data)
      }
      else {
        res.status(200).send('Password inválido')
      }
    } else {
      res.status(200).send('Usuario não registrado')
    }
  } catch (err) {
    res.send(err);
  }
});

//////////////////////////////    VERIFICAR VALIDADE TOKEN
router.get("/user/verifytoken", (req, res) => {
  if (req.headers["authorization"]) {
    let token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, JWT_KEY, (err, decode) => {
      if (!err) {
        res.send(true);
      } else {
        res.send(false);
      }
    });
  } else res.send(false);
});

router.post("/user/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const newUser = new User({ email, password });
      await newUser.save();
      let tokenData = { email };
      let token = jwt.sign(tokenData, JWT_KEY, { expiresIn: "60m" });
      let data = { token, email }
      res.status(201).send(data)
    } else {
      res.status(200).send("Usuario já registrado");
    }
  } catch (err) {
    res.send(err);
  }
});
module.exports = router;
