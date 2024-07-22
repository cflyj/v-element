import { describe, expect, it } from "vitest";
import { mount } from '@vue/test-utils'
import Input from './Input.vue'

describe('Input', () => {
    it('基本展示', () => {
        const wrapper = mount(Input, {
            props: {
                size: 'small',
                type: 'text',
                modelvalue:'',
            },
            slots: {
                prepend: 'prepend',
                prefix: 'prefix',
            }
        })
        console.log(wrapper.html())

        // classes
        expect(wrapper.classes()).toContain('vk-input--small')
        expect(wrapper.classes()).toContain('is-prepend')

        // should render input
        expect(wrapper.find('input').exists()).toBeTruthy()
        expect(wrapper.get('input').attributes('type')).toBe('text')
        // slots
        expect(wrapper.find('.vk-input__prepend').exists()).toBeTruthy()
        expect(wrapper.get('.vk-input__prepend').text()).toBe('prepend')
        expect(wrapper.find('.vk-input__prefix').exists()).toBeTruthy()
        expect(wrapper.get('.vk-input__prefix').text()).toBe('prefix')

        // textarea
        const wrapper2 = mount(Input, {
            props: {
                type: 'textarea',
                modelValue: ''
            }
        })
        expect(wrapper2.find('textarea').exists()).toBeTruthy()
    })

    it('支持 v-model',async ()=>{
        const wrapper = mount(Input,{
            props:{
                modelValue:'test',
                'onUpdate:modelValue':(e: any)=>wrapper.setProps({modelValue: e}),
            }
        })
        // 初始值
        const input = wrapper.get('input')
        expect(input.element.value).toBe('test')
        // 更新值
        await input.setValue('update')
        expect(wrapper.props('modelValue')).toBe('update')
        expect(input.element.value).toBe('update')
        // v-model的异步更新
        await wrapper.setProps({modelValue:'prop update'})
        expect(input.element.value).toBe('prop update')
    })
    it.only('支持点击清空字符串', async()=>{
        const wrapper = mount(Input,{
            props:{
                modelValue:'test',
                clearable:true,
                type:'text'
            },
            global:{
                stubs:['Icon']
            }
        })
        //  不出现对应的Icon区域
        expect(wrapper.find('.vk-input__clear').exists()).toBeFalsy()
        const input = wrapper.get('input')
        await input.trigger('focus')
        // 出现icon区域
        expect(wrapper.find('.vk-input__clear').exists()).toBeTruthy()
        // 点击值变为空并且消失
        await wrapper.get('.vk-input__clear').trigger('click')
        expect(input.element.value).toBe('')
    })
    it.only('支持切换密码显示',async()=>{
        const wrapper = mount(Input,{
            props:{
                modelValue:'',
                showPassword:true,
                type:'text'
            },
            global:{
                stubs:['Icon']
            }
        })
        // 不出现对应的Icon区域，因为当前值为空
        
    })
})