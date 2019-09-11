const {override, fixBabelImports, addLessLoader,addDecoratorsLegacy,addWebpackAlias} = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    //自定义主题颜色
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#1DA57A'},
    }),
    //支持装饰器
    addDecoratorsLegacy(),
    //路径别名
    addWebpackAlias()
);