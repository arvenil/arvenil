const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');


module.exports = {
    output: {
        path: path.resolve(__dirname, 'docs'),
        assetModuleFilename: (pathData) => {
            const filepath = path
                .dirname(pathData.filename)
                .split("/")
                .slice(1)
                .join("/");
            return `${filepath}/[name][ext][query]`;
        }
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new CssMinimizerPlugin({})],
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    plugins: [
        new FaviconsWebpackPlugin({
            logo: './src/img/selfie/2022.png',
            favicons: {
                icons: {
                    appleStartup: false,
                    yandex: false
                }
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new HtmlWebpackPlugin({template: './src/index.html'}),
    ],
    module: {
        rules: [
            {
                test: /\.(scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',      // translates CSS into CommonJS modules
                    },
                    {
                        loader: 'postcss-loader',  // Run post css actions
                        options: {
                            postcssOptions: {
                                plugins: function () { // post css plugins, can be exported to postcss.config.js
                                    return [
                                        require('precss'),
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        }
                    },
                    {
                        loader: "resolve-url-loader",
                    },
                    {
                        loader: 'sass-loader', // compiles Sass to CSS
                        options: {
                            sourceMap: true,
                        }
                    },
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|pdf)$/i,
                type: 'asset/resource'
            }
        ],
    },
};
