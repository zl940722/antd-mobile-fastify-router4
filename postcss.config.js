module.exports = {
    sourceMap: 'inline',
    plugins: function () {
        return [
            require('postcss-import'),
            require('postcss-custom-properties'),
            require('postcss-apply'),
            require('precss'),
            require("postcss-cssnext")({
                browsers: ['last 2 versions', '> 5%'],
            }),
            require('postcss-plugin-px2rem')({
                rootValue: 100,
                unitPrecision: 5,
                propWhiteList: [],
                propBlackList: [],
                selectorBlackList: [],
                ignoreIdentifier: false,
                replace: true,
                mediaQuery: false,
                minPixelValue: 0,
            }),
        ];
    }
}