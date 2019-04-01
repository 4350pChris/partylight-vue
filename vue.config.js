const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
    configureWebpack: {
        plugins: [
            new CompressionWebpackPlugin({
                algorithm: 'gzip',
                filename: '[path].gz[query]',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            }),
            new MonacoWebpackPlugin({
                languages: ['csharp']
            })
        ]
    }
}