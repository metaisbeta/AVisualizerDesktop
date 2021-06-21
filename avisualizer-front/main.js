const {app, BrowserWindow} = require('electron') 
const path = require('path') 
const url = require('url') 
var cp = require('child_process')
cp.fork(require.resolve('./avisualizer-back/src/web-server/server.js'))
let win 
function createWindow () { 
win = new BrowserWindow({width: 800, height: 600}) // load the dist folder from Angular 
win.loadURL(url.format({ pathname: path.join(__dirname, 'dist/avisualizer/index.html'), protocol: 'file:', slashes: true })) 
// Open the DevTools optionally: 
// win.webContents.openDevTools() 
win.on('closed', () => { win = null }) 
} 

app.on('ready', createWindow) 
app.on('window-all-closed', () => { if (process.platform !== 'darwin') { app.quit() } }) 
app.on('activate', () => { if (win === null) { createWindow() } })
