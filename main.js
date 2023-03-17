const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const path = require('path')
const axios = require('axios')
const {Configuration, OpenAIApi } = require('openai');
require('dotenv').config()

 
const configuration = new Configuration({
  apiKey: process.env.openai_api_key,
});

const openAI = new OpenAIApi(configuration);

async function chatRes(input) {
  try {
    const completion = await openAI.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: input }],
    });
    console.log("xxxxxxx" + completion.data.choices[0].message.content)
    return completion.data.choices[0].message.content;
  } catch (error) {
    console.log(error)
  }
}


ipcMain.handle('dialog:openWeb', async (event, ids) => {
  const reposne = await chatRes(ids)
  console.log(ids)
  console.log(reposne)
  return  reposne
})
 
function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
   
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})