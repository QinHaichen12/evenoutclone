const express = require("express");
const {
  createThreadController,
  getAllThreadsController,
  voteThreadController,
  getThreadVotesController,
} = require("../controllers/threadController");
const router = express.Router();

router.post("/create/thread", createThreadController);
router.get("/all/threads", getAllThreadsController);
router.post("/thread/vote", voteThreadController);
router.post("/thread/votes", getThreadVotesController);

module.exports = router;
