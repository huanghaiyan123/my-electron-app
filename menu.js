const { Menu, BrowserWindow } = require('electron')
console.log(Menu, BrowserWindow,1)

const template = [
    {
        label: '菜单一',
        /** submenu 代表下一级菜单 */
        submenu: [
            {
                label: '子菜单一',
                click: () => {
                    const newWin = new BrowserWindow({
                        width: 200,
                        height: 200
                    })

                    win.loadFile('./index2.html')
                    newWin.on('close', () => {
                        newWin = null
                    })
                },
                /** 添加快捷键 */
                accelerator: 'ctrl+n'
            },
            { label: '子菜单二' },
            { label: '子菜单三' },
            { label: '子菜单四' },
        ],
    },
    {
        label: '菜单二',
        /** 代表下一级菜单 */
        submenu: [
            { label: '子菜单一' },
            { label: '子菜单二' },
            { label: '子菜单三' },
            { label: '子菜单四' },
        ],
    }
]
console.log(222)

/** 3.从模板中创建菜单 */
const myMenu = Menu.buildFromTemplate(template)

/** 4.设置为应用程序菜单 */
Menu.setApplicationMenu(myMenu)