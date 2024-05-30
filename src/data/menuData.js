// 菜单的配置数据
const imgBasePath = '@/assets/images/'
export let menuData = [
    {
      title:'所有图表',
      level:0,
      path:'/show-list',
      type:'custom',
    },
    {
        title:'custom',
        level:0,
        children:[
            {
                title:'custom Bar / 不规则柱状图',
                level:1,
                path:'/custom/custom-bar',
                image:'/images/custom/custom-bar.png',
                type:'chart',
            },
        ]
    }
]
export const menuMap = {} // 菜单映射表

export function getMenuData(){
    let noChildrenMenu = []
    let hasChildrenMenu = []
    menuData.forEach((item,index)=>{
        item.index = index+1+''
        if(!item.children) {
            noChildrenMenu.push(item)
            return
        }
        hasChildrenMenu.push(item)
        item.children.forEach((subItem,subIndex)=>{
            subItem.index = `${item.index}-${subIndex+1}`
        })
    })
    return {
        noChildrenMenu,
        hasChildrenMenu
    }
}

export function getMenuMap(data = [...menuData.noChildrenMenu, ...menuData.hasChildrenMenu]){
    data.forEach(node=>{
        if(node.path) menuMap[node.path] = {
            index:node.index,
            type:node.type,
            path:node.path
        }
        if(node.children?.length){
            getMenuMap(node.children)
        }
    })
}

menuData = getMenuData()
getMenuMap()
