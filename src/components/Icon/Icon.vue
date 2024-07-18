<template>
  <i class="vk-icon" :class="{[`vk-icon--${type}`] : type }" :style="customStyles" v-bind="$attrs">
    <!-- #TODO attrs 可以给外层组件赋值-->
    <font-awesome-icon v-bind="filteredProps"/>
  </i>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { omit } from 'lodash-es'
import type { IconProps } from './types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
defineOptions({
  name: 'VkIcon',
  inheritAttrs: false  // 不继承父组件的属性#TODO
})
const props = defineProps<IconProps>()
const filteredProps = computed(() => omit(props, ['type', 'color']))
const customStyles = computed(() => {
  return props.color ? { color: props.color } : {} 
})
</script>

