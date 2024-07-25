<template>
    <div 
    class="vk-select"
    :class="{'is-disabled':disabled}"
    @click="toggleDropdown">

    <Tooltip 
    placement="bottom-start"
    ref="tooltipRef"
    manual
    >
        <Input
        v-model="innerValue"
        :disabled="disabled"
        :placeholder="placeholder"
        />
        <template #content>
            <ul class="vk-select__menu">
                <template v-for="(item,index) in options" :key="index">
                    <li 
                    class="vk-select__menu-item "
                    :class="{'is-disabled': item.disabled }"
                    :id="`select-item-${item.value}`">
                    {{ item.label }}
                </li>
                </template>
            </ul>
        </template>
    </Tooltip>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import type {Ref} from 'vue'
import type {SelectProps,SelectEmits,SelectOption} from './types'
import Tooltip from '../Tooltip/Tooltip.vue'
import type {TooltipInstance} from '../Tooltip/types'
import Input from '../Input/Input.vue'

const findOption = (value:string)=>{
    const option = props.options.find(option => option.value === value)
    return option ? option : null
}

defineOptions({
    name:'VKSelect' 
})
const props = defineProps<SelectProps>()
const emits = defineEmits<SelectEmits>()
const initialOption = findOption(props.modelValue)
const tooltipRef = ref() as Ref<TooltipInstance>
const innerValue = ref('')
const isDropdownShow = ref(false)
const controlDropdown = (show:boolean)=>{
    if(show){
        tooltipRef.value.show()
    }else{
        tooltipRef.value.hide()
    }
    isDropdownShow.value=show
    emits('visible-change',show)
}
const toggleDropdown = ()=>{
    if(props.disabled) return
    if(isDropdownShow.value) {
        controlDropdown(false)
    } else {
        controlDropdown(true)
    }
}
</script>