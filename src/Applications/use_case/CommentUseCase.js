const AddComment = require("../../Domains/comments/entities/AddComment");
const CommentRepositoryPostgres = require("../../Infrastructures/repository/CommentRepositoryPostgres");
const ThreadRepositoryPostgres = require("../../Infrastructures/repository/ThreadRepositoryPostgres");

class CommentUseCase {
  /**
   * @param {object} props
   * @param {CommentRepositoryPostgres} props.commentRepository
   * @param {ThreadRepositoryPostgres} props.threadRepository
   */
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  /**
   * Add Comment Use Case
   *
   * @param {object} useCasePayload
   * @param {string} useCasePayload.content
   * @param {string} useCasePayload.owner
   * @param {string} useCasePayload.thread_id
   */
  async addComment(useCasePayload) {
    await this._threadRepository.verifyAvailableThreadId(useCasePayload.thread_id);

    const addComment = new AddComment(useCasePayload);
    return this._commentRepository.addComment(addComment);
  }
}

module.exports = CommentUseCase;
