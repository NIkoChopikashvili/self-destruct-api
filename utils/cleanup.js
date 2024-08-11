const cleanupRoute = (app, path) => {
  app._router.stack = app._router.stack.filter(
    (layer) => !(layer.route && layer.route.path === path)
  );
  console.log(`Route ${path} has been cleaned up.`);
};

module.exports = cleanupRoute;
