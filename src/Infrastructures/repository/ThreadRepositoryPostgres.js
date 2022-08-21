const ThreadRepository = require("../../Domains/threads/ThreadRepository");
const AddedThread = require("../../Domains/threads/entities/AddedThread");
const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const NotFoundError = require("../../Commons/exceptions/NotFoundError");

class ThreadRepositoryPostgres extends ThreadRepository {
  /**
   * @param {Pool} pool
   * @param {nanoid} idGenerator
   */
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  /**
   * Add Thread
   *
   * @param {object} payload
   * @param {string} payload.title
   * @param {string} payload.body
   * @param {string} payload.owner
   */
  async addThread({ title, body, owner }) {
    const id = `thread-${this._idGenerator()}`;
    const date = new Date().toISOString();

    const query = {
      text: "INSERT INTO threads VALUES ($1, $2, $3, $4, $5) RETURNING id, title, body, owner, date, is_delete",
      values: [id, title, body, owner, date],
    };

    const result = await this._pool.query(query);

    return new AddedThread(result.rows[0]);
  }

  /**
   * Verify Available Thread Id
   * 
   * @param {string} id 
   */
  async verifyAvailableThreadId(id) {
    const query = {
      text: "SELECT id FROM threads WHERE id=$1",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("thread tidak ditemukan");
    }
  }
}

module.exports = ThreadRepositoryPostgres;
