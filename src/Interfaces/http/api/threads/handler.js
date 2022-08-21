const AuthenticationTokenManager = require("../../../../Applications/security/AuthenticationTokenManager");
const ThreadUseCase = require("../../../../Applications/use_case/ThreadUseCase");

class ThreadHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    const { payload } = request;
    const { authorization } = request.headers;
    const token = authorization?.replace("Bearer ", "");

    // verify & decode Jwt Token
    const authenticationTokenManager = this._container.getInstance(
      AuthenticationTokenManager.name
    );
    await authenticationTokenManager.verifyAccessToken(token);
    const { id } = await authenticationTokenManager.decodePayload(token);

    const threadUseCase = this._container.getInstance(ThreadUseCase.name);
    const addedThread = await threadUseCase.addThread({
      ...payload,
      owner: id,
    });

    const response = h.response({
      status: "success",
      data: {
        addedThread,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = ThreadHandler;
