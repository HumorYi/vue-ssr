// 传统 web 网页内容在服务端渲染完成（html、ajax。。。），一次性传输到浏览器直接展示即可
// 服务端渲染，服务端语言：node，框架：express
const express = require('express')
const app = express()

const title = 'ssr render'

app.get('/', (req, res) => {
  const html = `
    <div id="app">
      <h1>${title}</h1>
    </div>
  `

  res.send(html)
})

app.listen(3000)
