const express = require("express");
const router = express.Router();
const ProfileController = require("./controllers/ProfileController");
const JobController = require("./controllers/JobController");

// rota index
router.get("/", JobController.index);

router.get("/job", JobController.create);
router.post("/job", JobController.save);

router.get("/job/:id", JobController.show);
router.post("/job/:id", JobController.update);
router.post("/job/delete/:id", JobController.delete);

router.get("/profile", ProfileController.index);
router.post("/profile", ProfileController.update);

module.exports = router;
