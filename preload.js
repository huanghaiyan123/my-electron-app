/**输出Electron的版本号和它的依赖项到你的web页面上。 */
window.addEventListener('DOMContentLoaded',() => {
    const replaceText = (selector,text) =>{
        const element = document.getElementById(selector)
        if(element) element.innerText = text
    }
    for(const dependency of ['chrome','node','electron']){
        replaceText(`${dependency}-version`,process.versions[dependency])
    }
})