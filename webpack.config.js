const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: "./src/index.js",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: "src/index.html"
        })
    ],

    // devServer: {
    //     historyApiFallback: true
    // },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            ["@babel/preset-react", { runtime: "automatic" }]
                        ]
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },

            {
                test: /\.(png|jp(e*)g|svg|gif)$/i,
                // use: [
                //     {
                //         loader: "file-loader",
                //         options: {
                //             publicPath: "assets/images",
                //             name: "images/[hash]-[name].[ext]"
                //         }
                //     }
                // ]
                // test: /\.png$/,
                type: "asset/resource"
            }
        ]
    }
}
