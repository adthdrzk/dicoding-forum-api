const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const CommentRepository = require("../../Domains/comments/CommentRepository");
const AddedComment = require("../../Domains/comments/entities/AddedComment");

class CommentRepositoryPostgres extends CommentRepository {
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
   * Add Comment
   *
   * @param {object} payload
   * @param {string} payload.content
   * @param {string} payload.owner
   * @param {string} payload.thread_id
   */
  async addComment({ content, owner, thread_id }) {
    const id = `comment-${this._idGenerator()}`;
    const date = new Date().toISOString();

    const query = {
      text: "INSERT INTO comments VALUES ($1, $2, $3, $4, $5) RETURNING *",
      values: [id, content, owner, thread_id, date],
    };

    const result = await this._pool.query(query);

    return new AddedComment(result.rows[0]);
  }
}

module.exports = CommentRepositoryPostgres;
