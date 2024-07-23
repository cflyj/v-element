<template>
    <div class="vk-input" :class="{
        [`vk-input--${type}`]: type,
        [`vk-input--${size}`]: size,
        'is-disabled': disabled,
        'is-prepend': $slots.prepend,
        'is-append': $slots.append,
        'is-prefix': $slots.prefix,
        'is-suffix': $slots.suffix,
        'is-focuse': isFocus
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
                // #TODO为什么括号报错
                <input class="vk-input__inner" :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
                    :disabled="disabled" v-model="innerValue" @input="handleInput" @focus="handleFocus"
                    @blur="handleBlur" @change="handleChange"/>
                <!-- sufffix slot -->
                <span v-if="$slots.suffix || showClear || showPasswordArea" class="vk-input__suffix">
                    <slot name="suffix"></slot>
                    <Icon icon="circle-xmark" v-if="showClear" class="vk-input__clear" @click="clear">
                    </Icon>
                    <Icon icon="eye" v-if="showPasswordArea && passwordVisible" class="vk-input__password" @click="togglePasswordVisible">
                    </Icon>
                    <Icon icon="eye-slash" v-if="showPasswordArea && !passwordVisible" class="vk-input__password" @click="togglePasswordVisible">
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
            <textarea class="vk-textarea__wrapper" :disabled="disabled" v-model="innerValue" @input="handleInput"
                @focus="handleFocus" @blur="handleBlur"  @change="handleChange"/>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import Icon from '../Icon/Icon.vue'
import type { InputProps, InputEmits } from './types'

defineOptions({
    name: 'VkInputs'
})

const props = withDefaults(defineProps<InputProps>(), { type: 'text' })
const emits = defineEmits<InputEmits>()
const innerValue = ref(props.modelValue)
const isFocus = ref(false)
const passwordVisible = ref(false)

const showClear = computed(() =>
    props.clearable &&
    !props.disabled &&
    !!innerValue.value &&
    isFocus.value
)
const togglePasswordVisible=()=>{
    passwordVisible.value = !passwordVisible.value
}

const showPasswordArea = computed(() =>
    props.showPassword &&
    !props.disabled &&
    !!innerValue.value
)
const handleInput = () => {
    emits('update:modelValue', innerValue.value)
    emits('input',innerValue.value)
}
const handleChange = () => {
    emits('change',innerValue.value)
}
const handleFocus = (event:FocusEvent) => {
    isFocus.value = true
    emits('focus',event)
}
const handleBlur = (event:FocusEvent) => {
    isFocus.value = false
    emits('blur',event)
}
const clear = () => {
    innerValue.value = ''
    emits('update:modelValue', '')
    emits('clear')
    emits('input','')
    emits('change','')
}
watch(() => props.modelValue, (newValue) => {
    innerValue.value = newValue
})
</script>