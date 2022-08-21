/* istanbul ignore file */
const pool = require("../src/Infrastructures/database/postgres/pool");

const  ThreadsTableTestHelper = {
  async addThread({
    id = "thread-123",
    title = "title thread",
    body = "body thread",
    owner = "user-123",
    date = new Date().toISOString(),
    is_delete = 0,
  }) {
    const query = {
      text: "INSERT INTO threads VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      values: [id, title, body, owner, date, is_delete],
    };

    const result = await pool.query(query);

    return result.rows[0];
  },
  async findThreadsById(id) {
    const query = {
      text: "SELECT * FROM threads WHERE id=$1",
      values: [id],
    };

    const result = await pool.query(query);

    return result.rows[0];
  },

  async cleanTable() {
    await pool.query("DELETE FROM threads");
  },
};

module.exports = ThreadsTableTestHelper;
