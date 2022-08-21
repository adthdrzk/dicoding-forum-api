const ThreadHandler = require("./handler");
const routes = require("./routes");
const { Server } = require("@hapi/hapi");
const { Container } = require("instances-container");

module.exports = {
  name: "threads",
  /**
   * Plugin Register
   *
   * @param {Server} server
   * @param {object} options
   * @param {Container} options.container
   */
  register: async (server, { container }) => {
    const threadHandler = new ThreadHandler(container);
    server.route(routes(threadHandler));
  },
};
