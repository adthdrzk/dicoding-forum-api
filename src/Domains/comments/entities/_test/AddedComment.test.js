const AddedComment = require("../AddedComment");

describe("AddedComment", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      id: "comment-123",
      content: "content comment",
      owner: "user-123",
      thread_id: "thread-123",
      date: new Date().toISOString(),
    };

    // Action & Assert
    expect(() => new AddedComment(payload)).toThrowError(
      "ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      id: "comment-123",
      content: "content comment",
      owner: "user-123",
      thread_id: "thread-123",
      date: new Date().toISOString(),
      is_delete: [],
    };

    // Action & Assert
    expect(() => new AddedComment(payload)).toThrowError(
      "ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should return object correctly", () => {
    // Arrange
    const payload = {
      id: "comment-123",
      content: "content comment",
      owner: "user-123",
      thread_id: "thread-123",
      date: new Date().toISOString(),
      is_delete: 0,
    };

    // Action
    const addedComment = new AddedComment(payload);

    // Assert
    expect(addedComment.id).toEqual(payload.id);
    expect(addedComment.content).toEqual(payload.content);
    expect(addedComment.owner).toEqual(payload.owner);
    expect(addedComment.thread_id).toEqual(payload.thread_id);
    expect(addedComment.date).toEqual(payload.date);
    expect(addedComment.is_delete).toEqual(payload.is_delete);
  });
});
