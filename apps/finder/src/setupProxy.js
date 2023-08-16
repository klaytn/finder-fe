const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        '/v1/*',
        createProxyMiddleware({
            target: process.env.REACT_APP_PUBLIC_EN,
            changeOrigin: true,
            ignorePath: true,
        }),
    )

    const apiTarget = `https://${process.env.REACT_APP_BE_HOST}`
    app.use(
        '/api/*',
        createProxyMiddleware({
            target: apiTarget,
            changeOrigin: true,
            headers: {
                // Even if changeOrigin is set to true, requests other than GET do not change the origin, so additional modifications are made.
                origin: apiTarget,
            },
        }),
    )
}
