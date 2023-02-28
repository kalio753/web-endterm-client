const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: "./src/index.js",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: "src/index.html",
        }),
    ],

    devServer: {
        historyApiFallback: true,
        allowedHosts: "all",
    },

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
                            ["@babel/preset-react", { runtime: "automatic" }],
                        ],
                    },
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },

            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]",
                },
            },
        ],
    },
}
