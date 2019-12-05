// vue.config.js
module.exports = {
    //配置 alias
    // configureWebpack: {
    //     resolve: {
    //       alias: {
    //         css: path.join(__dirname, 'src/assets/css'),
    //       },
    //     },
    //   },
    devServer: {
        proxy: 'http://192.168.2.48:8080'
    }
}