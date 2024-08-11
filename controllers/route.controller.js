const routes = {};

/**
 * Creates a route that will be destroyed after a specified number of requests or time to live (TTL).
 *
 * @param {object} app - The Express application instance.
 * @param {string} path - The path of the route.
 * @param {string} method - The HTTP method of the route (e.g., 'get', 'post', 'put', etc.).
 * @param {function} callback - The callback function to handle the route.
 * @param {number} [maxRequests=5] - The maximum number of requests before the route is destroyed.
 * @param {number} [ttl=60000] - The time to live (in milliseconds) before the route is destroyed.
 * @return {void}
 */
const createRouteWithDestruction = (
  app,
  path,
  method,
  callback,
  maxRequests = 5,
  ttl = 60000
) => {
  let requestCount = 0;

  /**
   * Handles the incoming request and response.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {void}
   */
  const handler = (req, res) => {
    requestCount++;
    callback(req, res);
    if (requestCount >= maxRequests) {
      delete routes[path];
      removeRoute(app, path, method);
      console.log(
        `Route ${method.toUpperCase()} ${path} has been destroyed after ${maxRequests} requests.`
      );
    }
  };

  app[method](path, handler);
  routes[path] = { method, callback };

  // Destroy route after TTL
  setTimeout(() => {
    if (routes[path]) {
      delete routes[path];
      removeRoute(app, path, method);
      console.log(
        `Route ${method.toUpperCase()} ${path} has been destroyed after ${
          ttl / 1000
        } seconds.`
      );
    }
  }, ttl);
};

/**
 * Removes a route from the Express application instance.
 *
 * @param {object} app - The Express application instance.
 * @param {string} path - The path of the route to be removed.
 * @param {string} method - The HTTP method of the route to be removed.
 * @return {void}
 */
const removeRoute = (app, path, method) => {
  app._router.stack = app._router.stack.filter((layer) => {
    return !(
      layer.route &&
      layer.route.path === path &&
      layer.route.methods[method]
    );
  });
};

module.exports = {
  createRouteWithDestruction,
};
