const electron = require('electron');

const { app, BrowserWindow, ipcMain } = electron;

const ffmpeg = require('fluent-ffmpeg');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false}
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('video:submit', (event, path) => {
    // console.log(`File path received [${path}]`);
    ffmpeg.ffprobe(path, (err, metadata) => {
        // console.log(`Video duration is ${metadata.format.duration}`);
        mainWindow.webContents.send('video:info', `Video duration is ${metadata.format.duration}`);
    })
})
