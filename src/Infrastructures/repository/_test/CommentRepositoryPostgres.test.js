const CommentsTableTestHelper = require("../../../../tests/CommentsTableTestHelper");
const AddComment = require("../../../Domains/comments/entities/AddComment");
const pool = require("../../database/postgres/pool");
const CommentRepositoryPostgres = require("../CommentRepositoryPostgres");

describe("CommentRepositoryPostgres", () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
  });

  describe("AddComment", () => {
    it("should persist add comment and return added comment correctly", async () => {
      // Arrange
      const addComment = new AddComment({
        content: "content comment",
        owner: "user-123",
        thread_id: "thread-123",
      });
      const fakeIdGenerator = () => "123";
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      //  Action
      await commentRepositoryPostgres.addComment(addComment);

      //  Assert
      const comments = await CommentsTableTestHelper.findCommentById(
        "comment-123"
      );
      expect(comments.id).toStrictEqual("comment-123");
      expect(comments.content).toStrictEqual(addComment.content);
      expect(comments.owner).toStrictEqual(addComment.owner);
      expect(comments.thread_id).toStrictEqual(addComment.thread_id);
    });
  });
   
   it('should return object correctly', async () => {
      // Arrange
      const addComment = new AddComment({
         content: "content comment",
         owner: "user-123",
         thread_id: "thread-123"
      })
      const fakeIdGenerator = () => "123"
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const result = await commentRepositoryPostgres.addComment(addComment);

      // Assert
      expect(result.id).toEqual("comment-123");
      expect(result.content).toEqual(addComment.content);
      expect(result.owner).toEqual(addComment.owner);
      expect(result.thread_id).toEqual(addComment.thread_id);
      expect(result.date).toBeDefined();
      expect(result.is_delete).toBeDefined();
   });
   
});
