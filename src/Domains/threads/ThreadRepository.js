class ThreadRepository {
  /**
   * Add Thread Interface
   *
   * @param {object} payload
   * @param {string} payload.title
   * @param {string} payload.body
   * @param {string} payload.owner
   * @param {string} payload.date
   */
  async addThread(payload) {
    throw new Error("THREAD_REPOSITORY.MUST_BE_IMPLEMENTED");
  }
  /**
   * Verify Available Thread Id Interface
   *
   * @param {string} id
   */
  async verifyAvailableThreadId(id) {
    throw new Error("THREAD_REPOSITORY.MUST_BE_IMPLEMENTED");
  }
  /**
   * Find Threads By Id Interface
   *
   * @param {string} id
   */
  async findThreadById(id) {
    throw new Error("THREAD_REPOSITORY.MUST_BE_IMPLEMENTED");
  }
  /**
   * Delete Threads By Id Interface
   *
   * @param {string} id
   */
  async deleteThreadById(id) {
    throw new Error("THREAD_REPOSITORY.MUST_BE_IMPLEMENTED");
  }
}

module.exports = ThreadRepository;
