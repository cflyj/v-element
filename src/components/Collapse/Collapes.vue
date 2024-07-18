<template>
    <div class="vk-collapse">
        <slot/>
    </div>
</template>

<script setup lang="ts">
import {ref ,provide,watch} from 'vue'
import type {NameType,CollapseProps,CollapseEmits} from './types'
import { collapseContextKey } from './types';
defineOptions({
    name: 'VkCollapse'
})

const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()

const activeNames =ref<NameType[]>(props.modelValue)
watch(()=>props.modelValue,()=>{
    activeNames.value=props.modelValue
})
if(props.accordion &&activeNames.value.length>1){
    console.log('more than one');
    
}

const handleItemClick=(item:NameType)=>{

    let _activeNames=[...activeNames.value]
    if(props.accordion){
        _activeNames=[activeNames.value[0]===item?'':item]
        activeNames.value=_activeNames
        
        
    }else{
    
    const index = _activeNames.indexOf(item)
    if(index>-1){
        _activeNames.splice(index,1)
        activeNames.value=_activeNames
    }else{
        _activeNames.push(item)
        activeNames.value=_activeNames
    }
}
    emits('update:modelValue',activeNames.value)
    emits('change',activeNames.value)
}

provide(collapseContextKey,{

    // #TODO activeNames
    activeNames,
    handleItemClick
})
</script>

<style scoped>

</style>