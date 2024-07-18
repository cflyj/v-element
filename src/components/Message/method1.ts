import {render,h,shallowReactive} from "vue"
import type { MessageProps,MessageContext} from "./types"
import MessageConstructor from "./message.vue"
import useZIndex from "@/hooks/useZIndex"
let seed=1
const instances:MessageContext[] =shallowReactive([]) 
export const createMessage=(props:MessageProps)=>{
    const {nextZindex} = useZIndex()
    const id=`message_${seed++}`
    const container=document.createElement('div')
    const destory=()=>{
        //在数组中删除
        const idx=instances.findIndex(i=>i.id===id)
        if(idx===-1) return
        instances.splice(idx,1)
        render(null,container)//销毁
    }
    const manualDestroy=()=>{
        const instance=instances.find(i=>i.id===id)
        if(instance){
            instance.vm.exposed!.visible.value=false
        }
    }
    const newProps={
        ...props,
        id,
        onDestory:destory,
        zIndex:nextZindex()
    }
    const vnode=h(MessageConstructor,newProps)
    render(vnode,container) 
    //非空断言操作符
    document.body.appendChild(container.firstElementChild)
    const vm=vnode.component!

    const instance={
        id,
        vnode,
        vm,
        props:newProps,
        destory:manualDestroy,
    }
    instances.push(instance)
    return instance
}  

export const getLastInstance=()=>{
    return instances.at(-1)
}

export const getLastBottomOffset=(id:string)=>{
    const idx=instances.findIndex(i=>i.id===id)
    if(idx<=0){
        return 0
    }else{
        const prev=instances[idx-1]
        
        return prev.vm.exposed!.bottomOffset.value
    }
}