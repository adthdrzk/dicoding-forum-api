const DeleteComment = require("../DeleteComment");

describe("DeleteComment", () => {
  it("should throw error when ID doesn't exist", () => {
    // Action & Assert
    expect(() => new DeleteComment()).toThrowError(
      "DELETE_COMMENT.ID_DOES_NOT_EXIST"
    );
  });

  it("should throw error when ID data type is not correct", () => {
    // Arrange
    const id = [];

    // Action & Assert
    expect(() => new DeleteComment(id)).toThrowError(
      "DELETE_COMMENT.ID_DATA_TYPE_IS_NOT_CORRECT"
    );
  });
   
   it('should return ID correctly', () => {
   // Arrange
      const id = "comment-123";

      // Action
      const deleteComment = new DeleteComment(id);

      // Action & Assert
      expect(deleteComment.id).toEqual(id);
   });
   
});
