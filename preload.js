const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI',{
  openWeb: async (ids) => {
    return await ipcRenderer.invoke('dialog:openWeb', ids)
  }
})