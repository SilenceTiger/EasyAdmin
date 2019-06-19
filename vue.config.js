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
        proxy: 'http://localhost:8888'
    }
}