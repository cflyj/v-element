<template>
  <div 
  class="vk-collapse-item"
  :calss="{
    'is-disabled': disabled
    }">
  <div 
  class="vk-collapse-item__header" 
  :class="{
    'is-active': isActive,
    'is-disabled': disabled

  }"
  :id="`item-header-${name}`" 
  @click="handleClick" >
    <slot name="title" >{{ title }}</slot>

    <Icon icon="angle-right" class="header-angle"></Icon>
  </div>

  <transition name="slide" v-on="transitionEvents">
<div class="vk-collapse-item__wrapper" v-show="isActive">
  <div class="vk-collapse-item__content" :id="`item-content-${name}`">
    <slot></slot>
  </div>
</div>
  </transition>


  </div>
</template>

<script setup lang="ts">
import {inject,computed} from 'vue'
import type {CollapseItemProps} from './types'
import { collapseContextKey } from './types';
import Icon from '../Icon/Icon.vue'
defineOptions({
    name:'VKCollapseItem'
})

const props=defineProps<CollapseItemProps>()
// #TODO  inject
const CollapseContext =inject(collapseContextKey)
// #TODO  include
const isActive =computed(()=>CollapseContext?.activeNames.value.includes(props.name))
const handleClick=()=>{
  if(props.disabled){return}
  CollapseContext?.handleItemClick(props.name)
}

const transitionEvents:Record<string,(el:HTMLElement)=>void>={
  beforeEnter(el){
    el.style.height='0px'
    el.style.overflow='hidden'
    
  },
  enter(el){
    el.style.height = `${el.scrollHeight}px`
  },
  afterEnter(el){
    el.style.height=''
    el.style.overflow=''
    
  },
  beforeLeave(el){
    el.style.overflow='hidden'
    el.style.height=`${el.scrollHeight}px`
  },
  leave(el){
    el.style.height='0px'
  },
  afterLeave(el){
    el.style.height=''
    el.style.overflow=''
  }
}
</script>

<style scoped>

</style>