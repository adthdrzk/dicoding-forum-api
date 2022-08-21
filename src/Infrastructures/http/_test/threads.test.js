const Jwt = require("@hapi/jwt");
const ThreadsTableTestHelper = require("../../../../tests/ThreadsTableTestHelper");
const container = require("../../container");
const pool = require("../../database/postgres/pool");
const JwtTokenManager = require("../../security/JwtTokenManager");
const createServer = require("../createServer");

describe("/threads endpoint", () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    // await ThreadsTableTestHelper.cleanTable();
  });

  describe("POST /threads", () => {
    it("should return response status code 201", async () => {
      //  Arrange
      const payload = {
        title: "title thread",
        body: "body thread",
      };
      const server = await createServer(container);
      const jwtTokenManager = new JwtTokenManager(Jwt.token);
      const accessToken = await jwtTokenManager.createAccessToken({
        id: "user-123",
      });

      //   Action
      const response = await server.inject({
        method: "POST",
        url: "/threads",
        payload,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      //  Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.addedThread).toBeDefined();
    });

    it("should return response status code 401 when access token is invalid", async () => {
      //   Arrange
      const payload = {
        title: "title thread",
        body: "body thread",
      };
      const server = await createServer(container);

      //   Action
      const response = await server.inject({
        method: "POST",
        url: "/threads",
        payload,
      });

      //  Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.status).toEqual("fail");
    });

    it("should return response status code 400 when payload did not contain needed property", async () => {
      //  Arrange
      const payload = {
        title: "title thread",
      };
      const server = await createServer(container);
      const jwtTokenManager = new JwtTokenManager(Jwt.token);
      const accessToken = await jwtTokenManager.createAccessToken({
        id: "user-123",
      });

      //   Action
      const response = await server.inject({
        method: "POST",
        url: "/threads",
        payload,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      //  Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("harus mengirimkan title dan body");
    });

    it("should return response status code 400 when payload did not meet data type specification", async () => {
      //  Arrange
      const payload = {
        title: "title thread",
        body: [0],
      };
      const server = await createServer(container);
      const jwtTokenManager = new JwtTokenManager(Jwt.token);
      const accessToken = await jwtTokenManager.createAccessToken({
        id: "user-123",
      });

      //   Action
      const response = await server.inject({
        method: "POST",
        url: "/threads",
        payload,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      //  Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("title dan body harus string");
    });
  });
});
