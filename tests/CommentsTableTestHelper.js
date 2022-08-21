/* istanbul ignore file */
const pool = require("../src/Infrastructures/database/postgres/pool");

const CommentsTableTestHelper = {
  async addComment({
    id = "comment-123",
    content = "content comment",
    owner = "user-123",
    thread_id = "thread-123",
    date = new Date().toISOString(),
    is_delete = 0,
  }) {
    const query = {
      text: "INSERT INTO comments VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      values: [id, content, owner, thread_id, date, is_delete],
    };

    const result = await pool.query(query);

    return result.rows[0];
  },
  async findCommentById(id) {
    const query = {
      text: "SELECT * FROM comments WHERE id=$1",
      values: [id],
    };

    const result = await pool.query(query);

    return result.rows[0];
  },

  async cleanTable() {
    await pool.query("DELETE FROM comments");
  },
};

module.exports = CommentsTableTestHelper;
