const { server } = require("@hapi/hapi");
const Jwt = require("@hapi/jwt");
const CommentsTableTestHelper = require("../../../../tests/CommentsTableTestHelper");
const ThreadsTableTestHelper = require("../../../../tests/ThreadsTableTestHelper");
const container = require("../../container");
const pool = require("../../database/postgres/pool");
const JwtTokenManager = require("../../security/JwtTokenManager");
const createServer = require("../createServer");

describe("/threads/{threadid}/comments endpoint", () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
  });

  describe("POST /comments", () => {
    it("should return response 201", async () => {
      // Arrange
      const payload = {
        content: "content comment",
      };

      const server = await createServer(container);
      const jwtTokenManager = new JwtTokenManager(Jwt.token);
      const accessToken = await jwtTokenManager.createAccessToken({
        id: "user-123",
      });

      //  create thread
      const { id } = await ThreadsTableTestHelper.addThread({
        title: "title thread",
      });

      const response = await server.inject({
        method: "POST",
        url: `/threads/${id}/comments`,
        payload: payload,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual("success");
    });

    it("should return response 401 when access token is invalid", async () => {
      //   Arrange
      const server = await createServer(container);
      //  create thread
      const { id: threadId } = await ThreadsTableTestHelper.addThread({
        title: "title thread",
      });

      const { id } = await CommentsTableTestHelper.addComment({
        thread_id: threadId,
      });

      //   Action
      const response = await server.inject({
        method: "DELETE",
        url: `/threads/${threadId}/comments/${id}`,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.status).toEqual("fail");
    });
  });
});
