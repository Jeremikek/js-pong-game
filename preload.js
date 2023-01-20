const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("program", {
    quit: () => {
        ipcRenderer.invoke("quit");
    }
});