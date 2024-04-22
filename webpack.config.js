const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

//引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { LoaderOptionsPlugin } = require('webpack');

//webpack中所有的配置信息都应该写在这里
module.exports = {
    entry: "./src/index.ts", //入口文件
    output: {
        path: path.resolve(__dirname, 'dist'), //打包结果位置
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['.ts', '.js'] //以ts,js结尾的都可以引入
    },
    //打包时时需要使用的模块
    module: {
        rules: [
            {
                test: /\.ts$/,//指定对哪些文件生效 (所有.ts结尾的文件)
                use: [
                    //配置babel
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {   //兼容目标浏览器
                                        targets: {
                                            "chrome": "88" //兼容到chrome88
                                        },
                                        //指定core-js版本
                                        "corejs": "3",
                                        //按需加载，让文件尽量小
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    }
                    ,
                    'ts-loader'
                ], //用ts-loader再用babel，后面的先执行
                exclude: /node-modules/ //忽略node安装包
            },

            //设置less文件处理
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ], //lessloader --> css-loader --> style-loader
            }
        ]
    },

    //配置webpack插件
    plugins: [
        new HTMLWebpackPlugin({
            //对HTML文件自定义
            // title: 'Snake',
            template: './src/style/index.html'//以某个文件为模板来生成
        }),
        //new CleanWebpackPlugin()//自动清空打包文件
    ],
    mode: "development",

}