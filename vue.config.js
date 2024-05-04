module.exports = {
    // options...
    devServer: {
          proxy: {
            '^/api': {
                target: 'http://103.56.162.106:8081/',
                ws: true,
                changeOrigin: true
            },
            '^/api-token-auth': {
                target: 'http://103.56.162.106:8081/',
                ws: true,
                changeOrigin: true
            },
          }
      }
}