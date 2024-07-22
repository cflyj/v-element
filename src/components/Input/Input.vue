<template>
    <div class="vk-input" :class="{
        [`vk-input--${type}`]: type,
        [`vk-input--${size}`]: size,
        'is-disabled': disabled,
        'is-prepend': $slots.prepend,
        'is-append': $slots.append,
        'is-prefix': $slots.prefix,
        'is-suffix': $slots.suffix,
        'is-focuse':isFocus
    }">
        <!-- input -->
        <template v-if="type !== 'textarea'">
            <!-- prepend slot -->
            <div v-if="$slots.prepend" class="vk-input__prepend">
                <slot name="prepend"></slot>
            </div>
            <div class="vk-input__wrapper">
                <!-- prefix slot -->
                <span v-if="$slots.prefix" class="vk-input__prefix">
                    <slot name="prefix"></slot>
                </span>
                <input  
                class="vk-input__inner" 
                :type="type" 
                :disabled="disabled"
                v-model="innerValue"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur"
                
                 />
                <!-- sufffix slot -->
                <span v-if="$slots.suffix || showClear" class="vk-input__suffix">
                    <slot name="suffix"></slot>
                    <Icon 
                    icon="circle-xmark"
                    v-if="showClear"
                    class="vk-input__clear"
                    @click="clear"
                    >
                </Icon>
                </span>
            </div>
            <!-- append slot -->
            <div v-if="$slots.append" class="vk-input__append">
                <slot name="append"></slot>
            </div>
        </template>
        <!-- textarea -->
        <template v-else>
            <textarea 
            class="vk-textarea__wrapper"
            :disabled="disabled"
            v-model="innerValue"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            />
        </template>
    </div>
</template>

<script setup lang="ts">
import {ref , watch , computed}from 'vue'
import Icon from '../Icon/Icon.vue'
import type { InputProps ,InputEmits} from './types' 

defineOptions({
    name: 'VkInputs'
})

const props = withDefaults(defineProps<InputProps>(), { type: 'text' })
const emits = defineEmits<InputEmits>()
const innerValue = ref(props.modelValue)
const isFocus = ref(false)

const showClear = computed(()=>
    props.clearable &&
    !props.disabled &&
    !!innerValue.value &&
    isFocus.value
)
const handleInput=()=>{
emits('update:modelValue',innerValue.value)
}
const handleFocus=()=>{
    isFocus.value=true
}
const handleBlur=()=>{
    isFocus.value=false
}
const clear = ()=>{
    innerValue.value=''
    emits('update:modelValue','')
}
watch(()=>props.modelValue,(newValue)=>{
    innerValue.value=newValue
})
</script>