const AddComment = require("../AddComment");

describe("AddComment", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      content: "content comment",
      owner: "user-123",
    };

    // Action & Assert
    expect(() => new AddComment(payload)).toThrowError(
      "ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      content: "content comment",
      owner: "user-123",
      thread_id: ["thread-123"],
    };

    // Action & Assert
    expect(() => new AddComment(payload)).toThrowError(
      "ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should return object correctly", () => {
    // Arrange
    const payload = {
      content: "content comment",
      owner: "user-123",
      thread_id: "thread-123",
    };

    // Action
    const addComment = new AddComment(payload);

    // Assert
    expect(addComment.content).toEqual(payload.content);
    expect(addComment.owner).toEqual(payload.owner);
    expect(addComment.thread_id).toEqual(payload.thread_id);
  });
});
