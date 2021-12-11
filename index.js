const fs = require('fs')
const path = require('path')
const {log} = console

const showContent = document.getElementById('show_file_content')

function readFile(){
    console.log('读取文件')
    fs.readFile(path.join(__dirname,'a.txt'),(err,data)=>{
        if(err){
            throw new Error(err,'读取失败')
        }
        log(data)
        showContent.innerText = data
    })
}

const content = '今天学习electron'
function writeFile(){
    console.log('写入文件')
    fs.writeFile(path.join(__dirname,'b.txt'),content,'utf-8',(err,data)=>{
        if(err){
           throw new Error(err,'写入失败')
        }
       log('写入成功')  
    })
}