const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Student = require("../models/student");
const auth = require("../auth/authenticate");

router.post("/send-to-/:id/", auth.verifyUser);
