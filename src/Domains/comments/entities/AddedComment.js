class AddedComment {
  /**
   * Add Thread
   *
   * @param {object} payload
   * @param {string} payload.id
   * @param {string} payload.content
   * @param {string} payload.owner
   * @param {string} payload.thread_id
   * @param {string} payload.date
   * @param {string} payload.is_delete
   */
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, content, thread_id, owner, date, is_delete } = payload;

    this.id = id;
    this.content = content;
    this.thread_id = thread_id;
    this.owner = owner;
    this.date = date;
    this.is_delete = is_delete;
  }

  /**
   * Verify Payload
   *
   * @param {object} payload
   * @param {string} payload.id
   * @param {string} payload.content
   * @param {string} payload.owner
   * @param {string} payload.thread_id
   * @param {string} payload.date
   * @param {string} payload.is_delete
   */
  _verifyPayload({ id, content, thread_id, owner, date, is_delete }) {
    if (
      !id ||
      !content ||
      !thread_id ||
      !owner ||
      !date ||
      is_delete === undefined
    ) {
      throw new Error("ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof content !== "string" ||
      typeof owner !== "string" ||
      typeof thread_id !== "string" ||
      typeof date !== "string" ||
      typeof is_delete !== "number"
    ) {
      throw new Error("ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}
module.exports = AddedComment;
