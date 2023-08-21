import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'

export default{
    input: './src/index.js',//打包入口文件
    output:{
        file:'dist/vue.js',
        format:'umd',
        name:'Vue', //指定生成的名称
        sourcemap:true //开启文件映射
    },
    plugins:[
        babel({
            exclude:'node_modules/**' //设置需要排除的文件夹
        }),
        serve({ //开启服务
            port:3000,
            contentBase:'',// 空字符串表示当前目录
            openPage:'/index.html'
        })
    ]
}