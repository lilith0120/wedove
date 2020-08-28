module.exports = {

    devServer: {
        proxy: {
            '': {
                target: 'https://39.101.199.3:443/',
                changeOrigin: true,
            },
        },
    },

    // publicPath: '/coLeader/',

    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    }
};