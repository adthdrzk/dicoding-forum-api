const ThreadRepository = require("../ThreadRepository");

describe("ThreadRepository", () => {
  it("should throw error when invoke abstract behavior", async () => {
    // Arrange
    const threadRepository = new ThreadRepository();

    // Action & Assert
    await expect(threadRepository.addThread()).rejects.toThrowError(
      "THREAD_REPOSITORY.MUST_BE_IMPLEMENTED"
    );
    await expect(threadRepository.verifyAvailableThreadId()).rejects.toThrowError(
      "THREAD_REPOSITORY.MUST_BE_IMPLEMENTED"
    );
    await expect(threadRepository.findThreadById()).rejects.toThrowError(
      "THREAD_REPOSITORY.MUST_BE_IMPLEMENTED"
    );
    await expect(threadRepository.deleteThreadById()).rejects.toThrowError(
      "THREAD_REPOSITORY.MUST_BE_IMPLEMENTED"
    );
  });
});
