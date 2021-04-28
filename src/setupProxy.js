const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://www.colr.org/json/color/random",
            changeOrigin: true,
            secure: false
          })
    )

}