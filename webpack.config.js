const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WatchIgnorePlugin = require('watch-ignore-webpack-plugin');
const postCssConfig = require("./postcss.config");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');

const root = path.resolve(__dirname);
const src = path.join(root, "src");

const tsconfigPath = path.join(root, "tsconfig.json");
const tslintConfigPath = path.join(root, "tslint.json");

const client = path.join(src, "client");
const page = path.join(client, "page");
const services = path.join(src, "services");
const entry = path.join(page, "index.tsx");
const template = path.join(root, "index.hbs");
const outputPath = path.join(root, 'static');

const extractPCSS = new ExtractTextPlugin({
    filename: (getPath) => {
        return getPath("[name].css");
    },
    allChunks: true,
});

module.exports = {

    entry: entry,

    output: {
        path: outputPath,
        filename: "[name].[chunkhash].js",
        publicPath: "/static/",
    },

    resolve: {
        alias: {
            "page": path.join(client, "page"),
            "api": path.join(client, "api"),
            "util": path.join(src, "util"),
            "model": path.join(client, "model"),
            "resource": path.join(client, "resource"),
            "config": path.join(src, "config"),
            "component": path.join(client, "component")
        },
        extensions: [".ts", ".tsx", ".js", ".pcss", ".less", ".css", ".svg", ".html"],
    },

    externals: {
        "lodash": "_",
        "lodash/fp": "_",
        mobx: "mobx",
        "mobx-react": "mobxReact",
        react: "React",
        "react-dom": "ReactDOM",
        "react-router-dom": "ReactRouterDOM",
        "bluebird": "Promise",
        "axios": "axios",
    },

    module: {
        rules: [{
            test: /\.tsx?$/,
            use: [
                { loader: "cache-loader" },
                {
                    loader: "thread-loader",
                    options: {
                        workers: require("os").cpus().length - 1,
                    },
                },
                {
                    loader: "babel-loader",
                },
                {
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true,
                        happyPackMode: true,
                        configFile: tsconfigPath,
                    },
                },
            ],
            exclude: [/node_modules/],
        }, {
            test: /\.pcss/,
            include: [client],
            use: extractPCSS.extract({
                fallback: "style-loader",
                use: [
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            importLoaders: 2,
                            localIdentName: "[name]__[local]___[hash:base64:5]",
                        },
                    }, {
                        loader: "postcss-loader",
                        options: postCssConfig,
                    },
                ],
            }),
        }, {
            test: /\.css$/,
            use: extractPCSS.extract({
                fallback: "style-loader",
                use: [
                    {
                        loader: "css-loader",
                    }, {
                        loader: "postcss-loader",
                        options: postCssConfig,
                    },
                ],
            }),
        }, {
            test: /\.(gif|jpg|png|svg|woff|eot|ttf)\??.*$/,
            use: [
                {
                    loader: "file-loader",
                    query: {
                        name: "resource/[name].[hash].[ext]",
                        publicPath: "/static/",
                    },
                },
            ],
        }],
    },
    plugins: [
        new CleanWebpackPlugin(['static', '.cache-loader'], {
            root: root,
            verbose: true
        }),
        new WatchIgnorePlugin([
            /\.js$/,
            /\.d\.ts$/,
        ]),
        extractPCSS,
        new ForkTsCheckerWebpackPlugin({
            tsconfig: tsconfigPath,
            tslint: tslintConfigPath,
            checkSyntacticErrors: true,
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: template,
            filename: "index.html",
            isDev: true,
        }),
        // new BundleAnalyzerPlugin.BundleAnalyzerPlugin()
    ],
};
