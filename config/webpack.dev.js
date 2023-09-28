const path = require('path')
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')
const { DefinePlugin } = require("webpack");
// 返回处理样式loader函数
const getStyleLoaders = (pre) => {
    return [
        "vue-style-loader",
        "css-loader",
        {
            // 处理css兼容性问题
            // 配合package.json中browserslist来指定兼容性做到什么程度
            loader: "postcss-loader",
            // 为postcss-loader做配置
            options: {
                postcssOptions: {
                    plugins: ["postcss-preset-env"],
                },
            },
        },
        pre,
    ].filter(Boolean);
};

module.exports = {
    entry: "./src/main.js",
    output: {
        path: undefined,
        filename: "static/js/[name].js",
        chunkFilename: "static/js/[name].chunk.js",
        assetModuleFilename: "static/media/[hash:10][ext][query]",
    },
    module: {
        rules: [
            // 处理css
            {
                test: /\.css$/,
                use: getStyleLoaders(),
            },
            // 处理less
            {
                test: /\.less$/,
                use: getStyleLoaders("less-loader"),
            },
            // 处理scss
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoaders("sass-loader"),
            },
            // 处理图片
            {
                test: /\.(jpe?g|png|gif|webp|svg)$/,
                // asset可以转base64
                type: "asset",
                // 将小于10kb的图片转换成base64
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
            },
            // 处理其他资源
            {
                test: /\.(woff2?|ttf)$/,
                // asset/resource是原封不动的输出
                type: "asset/resource",
            },
            // 处理js
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "../src"),
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                    // plugins: [
                    //     "react-refresh/babel", // 激活js的HMR
                    // ],
                },
            },
            // vue处理
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
        ]
    },
    plugins: [
        new EslintWebpackPlugin({
            context: path.resolve(__dirname, "../src"),
            exclude: "node_modules",
            cache: true,
            cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache"),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html"),
        }),
        new VueLoaderPlugin(),
        new DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        }),
    ],
    mode: "development",
    devtool: "cheap-module-source-map",
    optimization: {
        splitChunks: {
            chunks: "all",
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}.js`,
        },
    },
    resolve: {
        // 自动补全文件扩展名
        extensions: [".vue", ".js", ".json"],
      },
    devServer: {
        host: "localhost",
        port: 3000,
        open: true, //自动开启服务器
        hot: true, // 开启HMR热模块替换
        historyApiFallback: true, // 解决前端路由刷新404问题
        // 指定启用根代理 默认不启用
        // devMiddleware: {
        //     index: false, 
        //   },
        proxy:{
            context:['/v1','/v2','/v3','/v4','/shopping','/ugc','/bos','/member','/img','/payapi','/eus','/promotion'],
            target:'https://elm.cangdu.org',
            changeOrigin: true,
        }
    },
}