const webContent = document.getElementById('webContent')
const numb = document.getElementById('num')
  

numb.addEventListener('keyup', async (e) => {
    if (e.keyCode === 13) {
        const content = await window.electronAPI.openWeb(numb.value)
        webContent.innerText = content
    }
})  
 
 