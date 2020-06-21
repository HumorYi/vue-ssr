const express = require('express')

const app = express()

// 定义一个resolve, 返回传入文件路径的绝对路径
const resolve = dir => require('path').resolve(__dirname, dir)

// 开放dist/client目录，静态文件需要下载
app.use(express.static(resolve('../dist/client'), { index: false }))

// 判断当前执行环境
const isDev = process.env.NODE_ENV === 'development'

// 创建一个bundle渲染器
const { createBundleRenderer } = require('vue-server-renderer')
const { render } = require('sass')

let renderer

function createRenderer() {
  // 此处bundle就是刚才生成的server/vue-ssr-server-bundle.json绝对路径
  const bundle = resolve('../dist/server/vue-ssr-server-bundle.json')
  return createBundleRenderer(bundle, {
    runInNewContext: false, // https://ssr.vuejs.org/zh/api/#runinnewcontext
    template: require('fs').readFileSync(resolve('../public/index.html'), 'utf-8'), // 宿主文件
    clientManifest: require(resolve('../dist/client/vue-ssr-client-manifest.json')) // 客户端清单
  })
}

// 如果当前执行环境是开发环境，监测 src 目录变更
if (isDev) {
  // 创建子进程
  const childProcess = require('child_process')
  // 创建一个浏览器同步实例，用于将来浏览器同步操作
  const browserSync = require('browser-sync').create()
  // 导入 chokidar 监测 src 目录变更
  require('chokidar')
    .watch('src/**/*.*')
    .on('change', (path, stat) => {
      console.log(path + ' change, please waiting rebuild...')

      // 开启子进程执行构建命令
      childProcess.exec('npm run build', (error, stdout) => {
        if (error) {
          console.error(error.stack)
          return
        }

        // 将构建信息输出到当前控制台
        console.log(stdout)
        console.log('Compile completed, Reloading...')

        // 浏览器同步刷新
        browserSync.reload()
      })
    })

  // 创建一个浏览器同步代理
  browserSync.init({ proxy: 'http://localhost:3000' })
}

// 处理路由
app.get('*', async (req, res) => {
  const context = {
    url: req.url,
    title: 'ssr test'
  }
  try {
    // 如果是开发模式或者还不存在 renderer，创建 renderer
    if (isDev || !renderer) {
      renderer = createRenderer()
    }

    const html = await renderer.renderToString(context)
    res.send(html)
  } catch (error) {
    console.log(error)

    res.status(500).send('服务器内部错误')
  }
})

app.listen(3000)
