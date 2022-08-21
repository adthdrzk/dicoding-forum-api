const ThreadsTableTestHelper = require("../../../../tests/ThreadsTableTestHelper");
const NotFoundError = require("../../../Commons/exceptions/NotFoundError");
const AddThread = require("../../../Domains/threads/entities/AddThread");
const pool = require("../../database/postgres/pool");
const ThreadRepositoryPostgres = require("../ThreadRepositoryPostgres");

describe("ThreadRepositoryPostgres", () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("AddThread", () => {
    it("should persist add thread and return added thread correctly", async () => {
      // Arrange
      const addThread = new AddThread({
        title: "title thread",
        body: "body thread",
        owner: "user-123",
      });
      const fakeIdGenerator = () => "123";
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      //   Action
      await threadRepositoryPostgres.addThread(addThread);

      //   Assert
      const threads = await ThreadsTableTestHelper.findThreadsById(
        "thread-123"
      );
      expect(threads.id).toEqual("thread-123");
      expect(threads.title).toEqual(addThread.title);
      expect(threads.body).toEqual(addThread.body);
      expect(threads.owner).toEqual(addThread.owner);
    });

    it("should return object correctly", async () => {
      // Arrange
      const addThread = new AddThread({
        title: "title thread",
        body: "body thread",
        owner: "user-123",
      });
      const fakeIdGenerator = () => "123";
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      //   Action
      const result = await threadRepositoryPostgres.addThread(addThread);

      //   Assert
      expect(result.id).toEqual("thread-123");
      expect(result.title).toEqual(addThread.title);
      expect(result.body).toEqual(addThread.body);
      expect(result.owner).toEqual(addThread.owner);
      expect(result.date).toBeDefined();
      expect(result.is_delete).toBeDefined();
    });
  });

  describe("VerifyAvailableThreadId", () => {
    it("should throw error when not available", async () => {
      // Arrange
      const id = "xxxx";
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool);

      // Action & Assert
      await expect(
        threadRepositoryPostgres.verifyAvailableThreadId(id)
      ).rejects.toThrow(NotFoundError);
    });
  });
});
