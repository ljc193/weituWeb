/*
 * @Description: 
 * @Version: 1.0
 * @Autor: jinchuan.lee
 * @Date: 2021-09-04 15:27:29
 * @LastEditors: jinchuan.lee
 * @LastEditTime: 2021-09-04 16:42:04
 */
const merge = require('webpack-merge');
const config = require('./webpack.config.js');
const webpack = require('webpack');
const path = require('path');
module.exports = merge(config,{
	mode: 'development',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),  // 热加载
		new webpack.NamedModulesPlugin(),  // 热加载以便更容易查看要修补(patch)的依赖
	],
	devtool: 'inline-source-map',  //映射打包代码为源码
	devServer: {                        // 本地服务
	    open: false, // 自动打开浏览器
	    contentBase: path.join(__dirname, 'dist'),
	    host: '0.0.0.0', // 0.0.0.0 localhost
	    port: 8888,
	    overlay: {
	        warnings: false,
	        errors: true
	    },
		proxy: {
			'/api': {
				target: "http://manager.wisto.com.cn/vertu/", // 要代理的域名 
				changeOrigin: true,//允许跨域
				pathRewrite: {
				  '^/api': '' // 这个是定义要访问的路径，名字随便写
				}
			}
		}
	}
	
})