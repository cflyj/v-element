<script setup lang="ts">
import type {Options} from '@popperjs/core'
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapes.vue'
import Item from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'
import Message from './components/Message/message.vue'
import {createMessage} from './components/Message/method'
import Tooltip from './components/Tooltip/Tooltip.vue'
import Dropdown from './components/Dropdown/Dropdown'
import type { MenuOption } from './components/Dropdown/types'
import type {ButtonInstance } from './components/Button/types'
import { ref,onMounted,h} from 'vue'
import type {Instance} from '@popperjs/core'
import{createPopper} from '@popperjs/core'
import { TooltipInstance } from './components/Tooltip/types'
const buttonRef = ref<ButtonInstance|null>(null)
const tooltipRef = ref<TooltipInstance|null>(null)
// const options:Partial<Options>={placement:'right-end',strategy:'fixed'}
  const options:MenuOption[]=[
    {key:1,label:h('b','this is a tooltip')},
    {key:2,label:'item2',disabled:true},
    {key:3,label:'item3',divided:true},
    {key:4,label:'item4'}
  ]
const open=()=>{
  tooltipRef.value?.show()
}
const close=()=>{
  tooltipRef.value?.hide()
}
const inlineConsole=(...args: any)=>{
  console.log(...args);
  
  }
const overlayNode =ref<HTMLElement>()
const triggerRef =ref<HTMLElement>()
let popperInstance:Instance|null =null
const openedValue =ref(['a'])
const size=ref<any>('3x')
const trigger=ref<any>('hover') 
onMounted(()=>{
  const instance = createMessage({
    message:'hello 123',
    duration:0,
    type:'info',
    showClose:true
  })
  createMessage({
    message:'898989',
    type:'success',
    duration:0,
    showClose:true
  })
  createMessage({
    message:'abcd',
    type:'danger',
    duration:0,
    showClose:true
  })
  if(buttonRef.value){
    console.log('buttonRef',buttonRef.value.ref);
  }
  if(overlayNode.value&&triggerRef.value){
    popperInstance=createPopper(triggerRef.value,overlayNode.value,{placement:'bottom'})
  }
  setTimeout(() => {
    // instance.destory()
  }, 2000);
})  
</script>
<template>

  <header>
    <!-- <Tooltip placement="right" :trigger="trigger" ref="tooltipRef" :open-delay="1000" :close-delay="1000">
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125"/>

      <template #content>
        <h1>
          hello vue
        </h1>
      </template>
       
    </Tooltip> -->

    <Dropdown 
    placement="right" 
    :trigger="trigger" 
    :menu-options="options"
    @visible-change="e=>inlineConsole('visible change',e)"
    @select="e=>inlineConsole('select',e)"
    manual
    ref="tooltipRef"
    >
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125"/>
       
    </Dropdown>
    
  </header>
<Icon icon="fa-solid fa-user-secret" :size="size" color="red"/>
  <main>      
    <Button ref="buttonRef" @click="open" >test Button</Button>
    <Button plain @click="close">plain</Button>
    <Button round>rouund</Button> 
    <Button circle>VK</Button>
    <Button disabled>disable Button</Button> <br/><br/>
    <Button type="primary">Primary</Button>
    <Button type="success">Success</Button>
    <Button type="info">Info</Button>
    <Button type="warning">Warning</Button>
    <Button type="danger">Danger</Button> <br/><br/>
    <Button type="primary" plain>Primary</Button>
    <Button type="success" plain>Success</Button>
    <Button type="info" plain>Info</Button>
    <Button type="warning" plain>Warning</Button>
    <Button type="danger" plain>Danger</Button><br/><br/>

    <Button size="large" >Large</Button>
    <Button size="small" >Small</Button><br/><br/>

    <Button size="large" loading>Loading</Button>
    <Button size="large" icon="fa-solid fa-arrow-up">Icon</Button>

    <Collapse v-model="openedValue" accordion>
      <Item name="a" title="Title A">
        <h1>headline title</h1>
        <div> this is content a aaa </div>
      </Item>
      <Item name="b" title="Title B">
        <div> this is bbbbb test </div>
      </Item>
      <Item name="c" title="Disabled Title" disabled>
        <div> this is cccc test </div>
      </Item>
    </Collapse>

    {{ openedValue }}
  </main>

</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
