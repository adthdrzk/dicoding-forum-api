class CommentRepository {
  async addComment(payload) {
    throw new Error("COMMENT_REPOSITORY.MUST_BE_IMPLEMENTED");
  }

  async deleteComment(id) {
    throw new Error("COMMENT_REPOSITORY.MUST_BE_IMPLEMENTED");
  }
}

module.exports = CommentRepository;
