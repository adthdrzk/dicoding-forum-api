const CommentRepository = require("../../../Domains/comments/CommentRepository");
const AddedComment = require("../../../Domains/comments/entities/AddedComment");
const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const CommentUseCase = require("../CommentUseCase");

describe("CommentUseCase", () => {
  describe("AddComment", () => {
    it("should set the add comment action correctly", async () => {
      // Arrange
      const useCasePayload = {
        content: "content comment",
        owner: "user-123",
        thread_id: "thread-123",
      };
      const expectedAddedComment = new AddedComment({
        id: "comment-123",
        content: useCasePayload.content,
        owner: useCasePayload.owner,
        thread_id: useCasePayload.thread_id,
        date: new Date().toISOString(),
        is_delete: 0,
      });

      const mockThreadRepository = new ThreadRepository();
      const mockCommentRepository = new CommentRepository();

      mockThreadRepository.verifyAvailableThreadId = jest
        .fn()
        .mockImplementation(() => Promise.resolve());
      mockCommentRepository.addComment = jest
        .fn()
        .mockImplementation(() => Promise.resolve(expectedAddedComment));
      const commentUseCase = new CommentUseCase({
        commentRepository: mockCommentRepository,
        threadRepository: mockThreadRepository,
      });

      //  Action
      const addedComment = await commentUseCase.addComment(useCasePayload);

      //  Assert
      expect(addedComment).toStrictEqual(expectedAddedComment);
      expect(mockThreadRepository.verifyAvailableThreadId).toBeCalledWith(useCasePayload.thread_id);
      expect(mockCommentRepository.addComment).toBeCalledWith(useCasePayload);
    });
  });
});
