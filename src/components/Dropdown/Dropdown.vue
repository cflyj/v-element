<template>
    <div
    class="vk-dropdown"
    >

    <Tooltip
    :trigger="trigger"
    :placement="placement"
    :popper-options="popperOptions"
    :open-delay="closeDelay"
    @visible-change="visibleChange"
    ref="tooltipRef"
    >

    <slot/>

    <template #content>
        <ul class="vk-dropdown__menu">
            <template v-for="item in menuOptions" :key="item.key">            
                <li
                v-if="item.divided"
                role="separator"
                class="divoded-placeholder"
                />
                <li
                class="vk-dropdown_item"
                @click="itemClick(item)"
                :calss="{'is-disabled':item.disabled,'is-divided':item.divided}" 
                :id="`dropdown-item-${item.key}`"
                >
                    {{ item.label }}
                </li>
            </template>
        </ul>
    </template>

    </Tooltip>
        
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import type {Ref} from 'vue';
import type { DropdownEmits,DropfownInstance,DropdownProps, MenuOption} from './types';
import Tooltip from '../Tooltip/Tooltip.vue';
import { TooltipInstance } from '../Tooltip/types';

const props = defineProps<DropdownProps>();
const emits = defineEmits<DropdownEmits>();
const tooltipRef=ref() as Ref<TooltipInstance>
const visibleChange=(e:boolean)=>{
    emits('visible-change',e)
}
const itemClick=(e:MenuOption)=>{
    if(e.disabled){
        return
    }
    emits('select',e)
}

</script>