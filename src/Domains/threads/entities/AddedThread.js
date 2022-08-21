class AddedThread {
  /**
   * Add Thread
   *
   * @param {object} payload
   * @param {string} payload.id
   * @param {string} payload.title
   * @param {string} payload.body
   * @param {string} payload.owner
   * @param {string} payload.date
   * @param {string} payload.is_delete
   */
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, title, body, owner, date, is_delete } = payload;

    this.id = id;
    this.title = title;
    this.body = body;
    this.owner = owner;
    this.date = date;
    this.is_delete = is_delete;
  }

  /**
   * Verify Payload
   *
   * @param {object} payload
   * @param {string} payload.id
   * @param {string} payload.title
   * @param {string} payload.body
   * @param {string} payload.owner
   * @param {string} payload.date
   * @param {string} payload.is_delete
   */
  _verifyPayload({ id, title, body, owner, date, is_delete }) {
    if (!id || !title || !body || !owner || !date || is_delete === undefined) {
      throw new Error("ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof title !== "string" ||
      typeof body !== "string" ||
      typeof owner !== "string" ||
      typeof date !== "string" ||
      typeof is_delete !== "number"
    ) {
      throw new Error("ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}
module.exports = AddedThread;
