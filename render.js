const electron = require('electron')
const { ipcRenderer } = require('electron')
console.log(electron, ipcRenderer)

/**ipcRenderer.on(channel, listener)
  *  channel String
  *  listener Function 
*/
ipcRenderer.on('mainMsg', (e, data) => {
    console.log(e, data)
    document.getElementById('receive').innerText = data

})
ipcRenderer.on('msg2', (e, data) => {
    debugger
    console.log(e, data);
})
function sendMain() {
    /**渲染线程 到 主线程 需要通过 ipcRenderer.send发送 ---> ipcMain.on来监听 -异步*/
    ipcRenderer.send('renderMsg', '我是渲染进程')
    /** 采用同步方式发送消息 */
    ipcRenderer.sendSync('msg3', '同步消息')
}
