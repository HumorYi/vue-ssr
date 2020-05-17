// 客户端渲染，服务端返回给客户端的只是页面骨架，没有实际内容，真正内容是在客户端使用 js 动态生成的
const express = require('express')
const app = express()

// 将访问路径转换成绝对路径，保证 terminal 在 任何路径下执行启动服务脚本 都能找到静态资源
// ex: ../public => e:/vue-ssr/public
const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)

// 静态文件服务，在浏览器访问网站时需要从服务端下载静态资源（html、css、js、img。。。）
// 获取开放静态文件目录绝对路径
const publicPath = resolve('../public')
// 挂载静态文件服务，注意：如果你想走客户端的 index.html，不想走服务端的 index.html，把服务端的 index 设为 false
app.use(express.static(publicPath, { index: false }))

app.get('/', (req, res) => {
  const html = `
    <div id="app">
      <h1>{{title}}</h1>
      <p>{{content}}</p>
    </div>
    <script src="vue.js"></script>
    <script>
      new Vue({
        el:'#app',
        data:{
          title:'csr',
          content:'client side render'
        }
      })
    </script>
  `

  res.send(html)
})

app.listen(3000)
