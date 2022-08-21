const CommentRepository = require("../CommentRepository");

describe("CommentRepository", () => {
  it("should throw error when invoke abstract behavior", async () => {
    // Arrange
    const commentRepository = new CommentRepository();

    // Assert
    await expect(commentRepository.addComment()).rejects.toThrowError(
      "COMMENT_REPOSITORY.MUST_BE_IMPLEMENTED"
    );
    await expect(commentRepository.deleteComment()).rejects.toThrowError(
      "COMMENT_REPOSITORY.MUST_BE_IMPLEMENTED"
    );
  });
});
