const AddThread = require("../../Domains/threads/entities/AddThread");
const ThreadRepositoryPostgres = require("../../Infrastructures/repository/ThreadRepositoryPostgres");

class ThreadUseCase {
  /**
   * @param {object} props
   * @param {ThreadRepositoryPostgres} props.threadRepository
   */
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  /**
   * Add Thread Use Case
   *
   * @param {object} useCasePayload
   * @param {string} useCasePayload.title
   * @param {string} useCasePayload.body
   * @param {string} useCasePayload.owner
   */
  async addThread(useCasePayload) {
    const addThread = new AddThread(useCasePayload);
    return this._threadRepository.addThread(addThread);
  }
}
module.exports = ThreadUseCase;
