const { Pool } = require("pg");
const pool = require("../config/db.config");

const createThread = async (id, title, userId) => {
  const result = await pool.query(
    "INSERT INTO threads (id, title, userId, upvotes, downvotes, upvotedBy, downvotedBy) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [id, title, userId, 0, 0, "{}", "{}"],
  );
  return result;
};

const getAllThreads = async () => {
  const result = await pool.query(
    "SELECT * FROM threads ORDER BY created_at DESC",
  );
  return result.rows;
};

const findThreadById = async (id) => {
  const result = await pool.query("SELECT * FROM threads WHERE id = $1", [id]);
  if (result.rows.length > 0) {
    let thread = result.rows[0];
    // Ensure upvotedBy and downvotedBy are arrays
    thread.upvotedBy = thread.upvotedby || [];
    thread.downvotedBy = thread.downvotedby || [];
    return thread;
  }
  return null;
};

const updateThreadVotes = async (
  id,
  upvotes,
  downvotes,
  upvotedBy,
  downvotedBy,
) => {
  try {
    const result = await pool.query(
      "UPDATE threads SET upvotes = $1, downvotes = $2, upvotedBy = $3::text[], downvotedBy = $4::text[] WHERE id = $5",
      [upvotes, downvotes, upvotedBy, downvotedBy, id],
    );
    return result;
  } catch (error) {
    console.error("Error executing update query:", error);
    throw error;
  }
};

module.exports = {
  createThread,
  getAllThreads,
  findThreadById,
  updateThreadVotes,
};
