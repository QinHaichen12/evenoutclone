const {
  createThread,
  getAllThreads,
  findThreadById,
  updateThreadVotes,
} = require("../models/threadModel");
const generateID = require("../utils/generateID");

const createThreadController = async (req, res) => {
  const { thread, userId } = req.body;
  const threadId = generateID();

  try {
    await createThread(threadId, thread, userId);
    const threads = await getAllThreads();
    res.json({ message: "Thread created successfully!", threads });
  } catch (error) {
    console.error("Error creating thread:", error);
    res.status(500).json({ error_message: "Internal Server Error" });
  }
};

const getAllThreadsController = async (req, res) => {
  try {
    const threads = await getAllThreads();
    res.json({ threads });
  } catch (error) {
    console.error("Error fetching threads:", error);
    res.status(500).json({ error_message: "Internal Server Error" });
  }
};

const voteThreadController = async (req, res) => {
  const { threadId, userId, action } = req.body;

  try {
    let thread = await findThreadById(threadId);

    if (!thread) {
      return res.status(404).json({ message: "Thread not found." });
    }

    // Ensure upvotedBy and downvotedBy are arrays
    thread.upvotedBy = thread.upvotedBy || [];
    thread.downvotedBy = thread.downvotedBy || [];

    // Check if the user has already voted
    const hasUpvoted = thread.upvotedBy.includes(userId);
    const hasDownvoted = thread.downvotedBy.includes(userId);

    console.log("Has Upvoted:", hasUpvoted);
    console.log("Has Downvoted:", hasDownvoted);

    if (action === "upvote") {
      if (hasUpvoted) {
        return res
          .status(400)
          .json({ error_message: "User has already upvoted this thread." });
      }
      thread.upvotes += 1;
      thread.upvotedBy.push(userId);
      if (hasDownvoted) {
        thread.downvotes -= 1;
        thread.downvotedBy = thread.downvotedBy.filter((id) => id !== userId);
      }
    } else if (action === "downvote") {
      if (hasDownvoted) {
        return res
          .status(400)
          .json({ error_message: "User has already downvoted this thread." });
      }
      thread.downvotes += 1;
      thread.downvotedBy.push(userId);
      if (hasUpvoted) {
        thread.upvotes -= 1;
        thread.upvotedBy = thread.upvotedBy.filter((id) => id !== userId);
      }
    } else {
      return res.status(400).json({ error_message: "Invalid action." });
    }

    await updateThreadVotes(
      thread.id,
      thread.upvotes,
      thread.downvotes,
      thread.upvotedBy,
      thread.downvotedBy,
    );

    // Retrieve the thread again to verify persistence
    thread = await findThreadById(threadId);

    res.json({
      message: "Vote registered successfully!",
      upvotes: thread.upvotes,
      downvotes: thread.downvotes,
    });
  } catch (error) {
    console.error("Error updating vote:", error);
    res.status(500).json({ error_message: "Internal Server Error" });
  }
};

const getThreadVotesController = async (req, res) => {
  const { id } = req.body;

  try {
    const thread = await findThreadById(id);

    if (!thread) {
      return res.status(404).json({ message: "Thread not found." });
    }

    res.json({ upvotes: thread.upvotes, downvotes: thread.downvotes });
  } catch (error) {
    console.error("Error fetching thread votes:", error);
    res.status(500).json({ error_message: "Internal Server Error" });
  }
};

module.exports = {
  createThreadController,
  getAllThreadsController,
  voteThreadController,
  getThreadVotesController,
};
