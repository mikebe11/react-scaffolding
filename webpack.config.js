const path                 = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin   = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => {
    const minimize = !(typeof argv.mode !== 'undefined' && argv.mode === 'development');

    return {
        mode: 'production',
        entry: path.resolve(__dirname, './src/index.jsx'),
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.jsx?/,
                    exclude: path.resolve('node_modules'),
                    use: {
                        loader: 'babel-loader',
                        options: {
                            comments: false,
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                },
                {
                    test: /\.scss$/,
                    use: [
                        {loader: MiniCssExtractPlugin.loader},
                        {loader: 'css-loader'},
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        [
                                            'autoprefixer',
                                            {'grid': 'autoplace'}
                                        ]
                                    ]
                                }
                            }
                        },
                        {loader: 'sass-loader'}
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'styles.css'
            })
        ],
        optimization: {
            minimize: minimize,
            minimizer: [
                `...`,
                new CssMinimizerPlugin({
                    minimizerOptions: {
                        preset: ['default', { discardComments: { removeAll: true } }]
                    }
                })
            ]
        }
    };
};
