const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('myApi', {

    close: () => ipcRenderer.send('close-window'),
    maximize: () => ipcRenderer.send('maximize-window'),
    unMaximize: () => ipcRenderer.send('unMaximize-window'),
    minimize: () => ipcRenderer.send('minimize-window'),

    add: (n1, n2) => {
        return ipcRenderer.invoke('perform-addition', n1, n2);
    },
    subtract: async (n1, n2) => {
        return ipcRenderer.invoke('perform-subtraction', n1, n2);
    },
    divide: (n1, n2) => {
        return ipcRenderer.invoke('perform-division', n1, n2);
    },
    multiply: (n1, n2) => {
        return ipcRenderer.invoke('perform-multiplication', n1, n2);
    },
    getDataFromMemory: () => {
        return ipcRenderer.invoke('retrieve-memory-data');
    },
    saveDataInMemory: (data) => {
        return ipcRenderer.invoke('store-memory-data', data);
    }
});