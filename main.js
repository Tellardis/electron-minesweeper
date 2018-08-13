// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, Accelerator } = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    title: 'Minesweeper'
  });
  let menuTemplate = [
    {
      label: 'game',
      submenu: [
        {
          label: 'New',
          role: 'new-game',
          accelerator: 'F5',
          click: () => {
            mainWindow.reload();
          }
        }
      ]
    },
    {
      label: 'diff',
      submenu: [
        {
          label: 'Easy',
          role: 'Easy-game',
          accelerator: 'cmd+1',
          click: () => {
            mainWindow.loadFile('index.1.html');
          }
        },
        {
          label: 'Normal',
          role: 'Normal-game',
          accelerator: 'cmd+2',
          click: () => {
            mainWindow.loadFile('index.2.html');
          }
        },
        {
          label: 'Hard',
          role: 'Hard-game',
          accelerator: 'cmd+3',
          click: () => {
            mainWindow.loadFile('index.html');
          }
        }
      ]
    }
  ];

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  // mainWindow.setMenu(menu);
  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  mainWindow.label = 'Minesweeper';
  mainWindow.title = 'Minesweeper';
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

app.label = 'Minesweeper';
app.title = 'Minesweeper';
app.setName('Minesweeper');

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
