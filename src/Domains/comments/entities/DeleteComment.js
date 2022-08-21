class DeleteComment {
  /**
   * @param {string} id
   */
  constructor(id) {
    this._verifyId(id);

    this.id = id;
  }

  /**
   * Verify Id
   *
   * @param {string} id
   */
  _verifyId(id) {
    if (!id) {
      throw new Error("DELETE_COMMENT.ID_DOES_NOT_EXIST");
    }

    if (typeof id !== "string") {
      throw new Error("DELETE_COMMENT.ID_DATA_TYPE_IS_NOT_CORRECT");
    }
  }
}

module.exports = DeleteComment;
