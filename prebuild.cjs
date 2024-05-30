// 自动生成说明和代码md文档
const glob = require('glob')
const fs = require('fs-extra')
const path = require('path')

async function main(){
    function getFiles(params){
        return new Promise((resolve,reject)=>{
            glob.glob(params,{windowsPathsNoEscape:true}).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    }
    const vues = await getFiles('src/components/**/*.vue')
    const mds = await getFiles("docs/**/*.md")
    const target = 'public/markdown/'
    console.log(vues,mds,target)
    let list = vues.map(vue=>{
        let componentName = vue.replace("src\\components\\","").replace(".vue","")
        console.log(componentName,mds)
        let md = mds.find(md=>md.replace("docs\\","").replace(".md","") == componentName)
        if(md)return {vue,md,componentName}
        else{
            console.log("[info] "+componentName + '组件 没有对应文档')
            return ""
        }
    })
    list.forEach(item=>{
        if(item){
            const {vue,md,componentName} = item
            let vueContent = fs.readFileSync(vue).toString()
            let mdContent = fs.readFileSync(md).toString()
            let mergeContent = mdContent + "\r\n```html\r\n" + vueContent + "\r```\r\n"
            let filePath = path.join(target, componentName) + '.md'
            let floaderpath = path.dirname(filePath)
            if(!fs.existsSync(floaderpath)) fs.mkdirSync(floaderpath,{recursive:true})
            fs.writeFileSync(filePath, mergeContent)
        }
    })
    return
}
main().then(res=>{
    console.log('说明文件生成完毕')
})
