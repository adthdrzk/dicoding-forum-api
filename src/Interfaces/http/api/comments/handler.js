const AuthenticationTokenManager = require("../../../../Applications/security/AuthenticationTokenManager");
const CommentUseCase = require("../../../../Applications/use_case/CommentUseCase");
const Hapi = require("@hapi/hapi");

class CommentHandler {
  constructor(container) {
    this._container = container;

    this.postCommentHandler = this.postCommentHandler.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
  }

  /**
   * Post Comment Handler
   *
   * @param {Hapi.Request} request
   * @param {Hapi.ResponseToolkit} h
   * @returns
   */
  async postCommentHandler(request, h) {
    const { content } = request.payload;
    const { threadId } = request.params;
    const { authorization } = request.headers;
    const token = authorization?.replace("Bearer ", "");

    const authenticationTokenManager = this._container.getInstance(
      AuthenticationTokenManager.name
    );
    await authenticationTokenManager.verifyAccessToken(token);
     const { id } = await authenticationTokenManager.decodePayload(token);

    const commentUseCase = this._container.getInstance(CommentUseCase.name);
    const addedComment = await commentUseCase.addComment({
      content: content,
      owner: id,
      thread_id: threadId,
    });

    return h
      .response({
        status: "success",
        data: { addedComment },
      })
      .code(201);
  }

  /**
   * Post Comment Handler
   *
   * @param {Hapi.Request} request
   * @param {Hapi.ResponseToolkit} h
   * @returns
   */
  async deleteCommentHandler(request, h) {
    const { threadId, commentId } = request.params;
    const { authorization } = request.headers;
    const token = authorization?.replace("Bearer ", "");

    const authenticationTokenManager = this._container.getInstance(
      AuthenticationTokenManager.name
    );
    await authenticationTokenManager.verifyAccessToken(token);
     const { id } = await authenticationTokenManager.decodePayload(token);

    const commentUseCase = this._container.getInstance(CommentUseCase.name);
    const addedComment = await commentUseCase.deleteComment({
      content: content,
      owner: id,
      thread_id: threadId,
    });

    return h
      .response({
        status: "success",
        data: { addedComment },
      })
      .code(201);
  }
}

module.exports = CommentHandler;
