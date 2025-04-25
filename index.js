const { app, BrowserWindow, screen, ipcMain } = require('electron');
const { join } = require('path');
const { Calculator } = require('class_calculator');

// try {
//     require('electron-reloader')(module);
// } catch (_) { }

const calculator = new Calculator();

const createWindow = () => {

    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    const win = new BrowserWindow({
        width: width / 1.25,
        height: height / 1.25,
        frame: false,
        webPreferences: {
            preload: join(app.getAppPath(), 'src/preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
        }
    });

    win.setBackgroundColor('rgb(226, 226, 226)');
    win.loadFile('src/index.html');
    // win.webContents.openDevTools();

    ipcMain.on('close-window', () => win.close());
    ipcMain.on('maximize-window', () => win.maximize());
    ipcMain.on('unMaximize-window', () => win.unmaximize());
    ipcMain.on('minimize-window', () => win.minimize());

    ipcMain.handle('perform-addition', (event, n1, n2) => {
        try {
            const results = calculator.add(n1, n2);
            return results;
        } catch (error) {
            return error;
        }
    });

    ipcMain.handle('perform-subtraction', (event, n1, n2) => {
        try {
            const results = calculator.substract(n1, n2);
            return results;
        } catch (error) {
            return error;
        }
    });

    ipcMain.handle('perform-division', (event, n1, n2) => {
        try {
            const results = calculator.divide(n1, n2);
            return results;
        } catch (error) {
            throw error;
        }
    });

    ipcMain.handle('perform-multiplication', (event, n1, n2) => {
        try {
            const results = calculator.multiply(n1, n2);
            return results;
        } catch (error) {
            return error;
        }
    });

    ipcMain.handle('retrieve-memory-data', () => {
        try {
            const results = calculator.getData();
            return results;
        } catch (error) {
            return error;
        }
    });

    ipcMain.handle('store-memory-data', (event, data) => {
        try {
            const results = calculator.saveData(data);
            return results;
        } catch (error) {
            return error;
        }
    });
}

app.whenReady().then(() => { createWindow() });

app.on('window-all-closed', () => app.quit());
