<template>
    <div class="vk-input" :class="{
        [`vk-input--${type}`]: type,
        [`vk-input--${size}`]: size,
        'isdisabled': disabled,
        'is-prepend': $slots.prepend,
        'is-append': $slots.append,
        'is-prefix': $slots.prefix,
        'is-suffix': $slots.suffix,
        'is-focus': isFocus
    }">
        <!-- input -->
        <template v-if="type != 'textarea'">
            <!-- prepend -->
            <div v-if="$slots.prepend" class="vk-input__prepend">
                <slot name="prepend"></slot>
            </div>
            <div class="vk-input__wrapper">
                <!-- prefix slot  -->
                <span v-if="$slots.prefix" class="vk-input__prefix">
                    <slot name="prefix"></slot>
                </span>

                <input class="vk-input__inner" v-bind="attrs" :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
                    ref="inputRef" :disabled="disabled" :readonly="readonly" :autocomplete="autocomplete" :placeholder="placeholder"
                    :autofocus="autofocus" :form="form" v-model="innerValue" @input="handleInput" @change="handleChange"
                    @focus="handleFocus" @blur="handleBlur" />
                <!-- suffix slot  -->
                <span v-if="$slots.suffix || showClear || showPasswordArea" class="vk-input__suffix">
                    <slot name="suffix"></slot>
                    <Icon icon="circle-xmark" v-if="showClear" class="vk-input__clear" @click="clear" />
                    <Icon icon="eye" v-if="showPasswordArea && passwordVisible" class="vk-input__password"
                        @click="tooglePasswordVisible" />
                    <Icon icon="eye-slash" v-if="showPasswordArea && !passwordVisible" class="vk-input__password"
                        @click="tooglePasswordVisible" />
                </span>
            </div>
            <!-- append slot  -->
            <div v-if="$slots.append" class="vk-input__append">
                <slot name="append"></slot>
            </div>
        </template>
        <!-- textarea -->
        <template v-else>
            <textarea class="vk-textarea__wrapper" v-bind="attrs" ref="inputRef" :disabled="disabled" :readonly="readonly"
                :autocomplete="autocomplete" :placeholder="placeholder" :autofocus="autofocus" :form="form"
                v-model="innerValue" @input="handleInput" @change="handleChange" @focus="handleFocus"
                @blur="handleBlur" />
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, useAttrs } from 'vue'
import {Ref} from 'vue'
import type { InputProps, InputEmits } from './types1';
import Icon from '../Icon/Icon.vue'

defineOptions({
    name: 'VkInput',
    inheritAttrs:false
})

const props = withDefaults(defineProps<InputProps>(), {
    type: 'text',
    autocomplete: 'off'
})
const passwordVisible = ref(false)
const attrs=useAttrs()
const innerValue = ref(props.modelValue)
const isFocus = ref(false)
const input Ref = ref() as Ref<HTMLInputElement>
const showClear = computed(() =>
    props.clearable &&
    !props.disabled &&
    !!innerValue.value &&
    isFocus.value

)
const showPasswordArea = computed(() =>
    props.showPassword &&
    !props.disabled &&
    !!innerValue.value
)
const emits = defineEmits<InputEmits>()

const tooglePasswordVisible = () => {
    passwordVisible.value = !passwordVisible.value
}
const handleInput = () => {
    emits('update:modelValue', innerValue.value)
    emits('input', innerValue.value)
}
const handleChange = () => {
    emits('change', innerValue.value)
}
const handleFocus = (event: FocusEvent) => {
    isFocus.value = true
    emits('focus', event)
}
const handleBlur = (event: FocusEvent) => {
    isFocus.value = false
    emits('blur', event)
}
const clear = () => {
    innerValue.value = ''
    emits('update:modelValue', '')
    emits('clear')
    emits('input', '')
    emits('change', '')
}
watch(() => props.modelValue, (newvalue) => {
    innerValue.value = newvalue
})

defineExpose({
    ref:inputRef
})
</script>