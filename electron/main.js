// Modules to control application life and create native browser window
const electron = require('electron')
const { app, Menu, BrowserWindow, BrowserView } = require('electron')
const path = require('path')

let template = [
  {
    label: '查看',
    submenu: [
      {
        label: '刷新',
        accelerator: 'CmdOrCtrl+R',
        click: function(item, focusedWindow) {
          if (focusedWindow) {
            // 重载之后, 刷新并关闭所有的次要窗体
            if (focusedWindow.id === 1) {
              BrowserWindow.getAllWindows().forEach(function(win) {
                if (win.id > 1) {
                  win.close()
                }
              })
            }
            focusedWindow.reload()
          }
        }
      },
      {
        label: '切换全屏',
        accelerator: (function() {
          if (process.platform === 'darwin') {
            return 'Ctrl+Command+F'
          } else {
            return 'F11'
          }
        })(),
        click: function(item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
          }
        }
      },
      {
        label: '切换开发者工具',
        accelerator: (function() {
          if (process.platform === 'darwin') {
            return 'Alt+Command+I'
          } else {
            return 'Ctrl+Shift+I'
          }
        })(),
        click: function(item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.toggleDevTools()
          }
        }
      },
      {
        type: 'separator'
      }
    ]
  },
  {
    label: '窗口',
    role: 'window',
    submenu: [
      {
        label: '最小化',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: '关闭',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      },
      {
        type: 'separator'
      }
    ]
  },
  {
    label: '关于我',
    submenu: [
      {
        label: 'github',
        click: function() {
          electron.shell.openExternal(
            'https://github.com/FourLeafClover/elctron-swagger'
          )
        }
      }
    ]
  }
]

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    minWidth: 1920,
    minHeight: 1080,
    fullscreen: false,
    hasShadow: true,
    frame: true,
    backgroundColor: '#000',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  let view = new BrowserView({
    webPreferences: {
      devTools: true,
      nodeIntegration: false,
      // preload: path.join(__dirname, './utils/preload.js'),
    },
  });
  
  mainWindow.setBrowserView(view);
  view.setBounds({ x: 0, y: 0, width: 1920, height: 800 });
  view.setAutoResize({ width: true, height: true }); //这段代码可以设置browserView视图宽度随窗口变化
  view.webContents.loadURL('http://10.130.0.221:9530/index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
  createWindow()
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
})

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
