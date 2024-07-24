<template>
    <div 
    class="vk-select"
    :class="{'is-disabled':disabled}">

    <Tooltip 
    placement="bottom-start"
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
import type {SelectProps,SelectEmits,SelectOption} from './types'
import Tooltip from '../Tooltip/Tooltip.vue'
import Input from '../Input/Input.vue'

defineOptions({
    name:'VKSelect' 
})
const props = defineProps<SelectProps>()
const emits = defineEmits<SelectEmits>()
const innerValue = ref(' ')
</script>