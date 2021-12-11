 const { app, BrowserWindow } = require('electron')
 const path = require('path')
 /**app 控制着整个应用程序的事件生命周期， BrowserWindow创建和管理应用程序的窗口 */
 function createWindow() {
     const win = new BrowserWindow({
         /**全屏 */
         //fullscreen: false,
         /**让桌面应用没有边框，这样菜单栏也会消失 */
         //frame: false,
         /**不允许用户改变窗口大小*/
         // resizable: false,
         /**设置窗口宽高 */
         width: 800,
         height: 600,
         /**应用运行时的标题栏图标 */
         //icon: iconPath,
         /**最小宽度 */
         //minWidth: 300,
         /**最小高度 */
         // minHeight: 500,
         /**最大宽度*/
         // maxWidth: 300,
         /**最大高度 */
         //maxHeight: 600,
         /**进行对首选项的设置 */
         webPreferences: {
             preLoad: path.join(__dirname, 'preload.js'),
             /**允许node环境运行 */
             NodeIterator: true,
             /**设置应用在后台正常运行*/
             backgroundThrottling: false,
             /**关闭警告信息*/
             contextIsolation: false,
             /**在主进程的窗口中加入enableRemoteModule: true参数才能够调用remote模块*/
             enableRemoteModule: true
         }
     })
     /**并且为你的应用加载index.html */
     win.loadFile('index.html')
     /**打开开发者工具 */
     //win.webContents.openDevTools()
 }
 /**在electron中，只有app 模块的ready事件被触发才会创建浏览器窗口，我们可以通过app.whenReady()进行监听 */
 app.whenReady().then(() => {
     createWindow()
     /**没有窗口打开就打开一个窗口 activate */
     app.on('activate', function () {
         if (BrowserWindow.getAllWindows().length === 0) createWindow()
     })
 })
 /**关闭所有窗口时退出应用（window-all-closed/app.quit） */
 app.on('window-all-closed', function () {
     if (ProcessingInstruction.platform !== 'darwin') app.quit()
 })
// 1.引入 electron
const { app, BrowserWindow } = require('electron')
const { ipcMain } = require('electron')
// 定义一个窗口
let win = null
// 2.引入自定义的菜单
// require('./menu')

// 3.监听ready
app.on('ready', function () {
    // require('@electron/remote/main').initialize()
    win = new BrowserWindow({
        width: 800,
        height: 600,
        /**进行对首选项的设置 */
        webPreferences: {
            /**是否集成 Nodejs,把之前预加载的js去了，发现也可以运行*/
            nodeIntegration: true,
            contextIsolation: false,
            /**在主进程的窗口中加入enableRemoteModule: true参数才能够调用remote模块*/
            enableRemoteModule: true
        }
    })
    /**主线程 到 渲染线程 通过 webContents.send 来发送 --->ipcRenderer.on 来监听 */
    /**
     * webContents.send(channel, ...args)
       channel String
       ...args any[]
    */
    setTimeout(() => {
        win.webContents.send('mainMsg', '我是主线程')

    }, 1000);

    ipcMain.on('renderMsg', (e, data) => {
        console.log(data)
        // if (data === '我是渲染进程') {
        //     app.quit()
        // }
        /** e.sender就是ipcMain*/
        e.sender.send('msg2', '参数字符串')
        /**主线程返回同步消息 */ 
        // e.returnValue = '发送同步消息'
    })
    ipcMain.on('msg3', (e,data) => {
        console.log(data) 
    })


    // 打开控制台
    win.webContents.openDevTools()
    win.loadFile('./main.html')
    // 4.监听窗口关闭事件
    // win.on('close', () => {
    //     win = null
    // })
    win.on('window-all-closed', () => {
        win = null,
            app.quit()
        console.log('全部关闭了')
    })
})




