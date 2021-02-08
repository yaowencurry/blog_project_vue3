module.exports = {
  outputDir: 'dist',  //build输出目录
  assetsDir: './', //静态资源目录（js, css, img）
  lintOnSave: true, //是否开启eslint
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host: "", //表示启动的时候使用的域名，默认可以不写，则是使用localhost和本机IP
    port: '8080', // 设置端口号
    https: false,  //是否使用https协议
    hotOnly: true, //是否开启热更新
    proxy: {
      '/api': {
        target: 'http://localhost:6300', //API服务器的地址
        ws: true, //代理websockets
        changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
        pathRewrite: {
          // '^/api5'是一个正则表达式，表示要匹配请求的url中，全部'http://localhost:8081/api5' 转接为 http://localhost:8081/api/
          //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          '^/api': ''
        }
      },
      '/pmom': {
        target: 'http://10.0.1.241:6301', //API服务器的地址
        ws: true, //代理websockets
        changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
        pathRewrite: {
          // '^/api5'是一个正则表达式，表示要匹配请求的url中，全部'http://localhost:8081/api5' 转接为 http://localhost:8081/api/
          //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          '^/pmom': '/',
        }
      }
    },
  },
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/public/',//打包时静态资源放置在public文件夹下面
  productionSourceMap: false,
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 启动时动态创建一个html：http://localhost:8888/report.html
      // config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
      // 生成一个静态html，report.html
      config.plugin('webpack-report').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ]);
    }
  },
  configureWebpack: config => {
    config.externals = {
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      'axios': 'axios',
      'showdown': 'showdown',
    }
    config.optimization = {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          'element-plus': {
            name: 'element-plus',
            test: /[\\/]node_modules[\\/]element-plus[\\/]/,
            priority: -10
          },
          'core-js': {
            name: 'core-js',
            test: /[\\/]node_modules[\\/]core-js[\\/]/,
            priority: -10
          },
          'vendors': {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -20
          }
        }
      }
    }
  }
}