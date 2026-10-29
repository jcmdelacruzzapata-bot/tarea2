const requestTimer = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(`[timer] ${req.method} ${req.originalUrl} → ${Date.now() - start}ms`);
  });
  next();
};

module.exports = requestTimer;
