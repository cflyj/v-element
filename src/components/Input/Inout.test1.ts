import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from './Input.vue'
import { size } from 'lodash-es'

describe('Input', () => {
    it('基本展示', () => {
        const wrapper = mount(Input, {
            props: {
                size: 'small',
                type: 'text',
                modelValue: ''
            },
            slots: {
                prepend: 'prepend',
                prefix: 'prefix'
            }
        })
        console.log(wrapper.html());


        expect(wrapper.classes()).toContain('vk-input--small')
        expect(wrapper.classes()).toContain('is-prepend')

        expect(wrapper.find('input').exists()).toBeTruthy()
        expect(wrapper.get('input').attributes('type')).toBe('text')
        // slots
        expect(wrapper.find('.vk-input__prepend').exists()).toBeTruthy()
        expect(wrapper.get('.vk-input__prepend').text()).toBe('prepend')

        //textarea
        const wrapper2 = mount(Input, {
            props: {
                type: 'textarea',
                modelValue: ''
            }
        })
        expect(wrapper2.find('textarea').exists()).toBeTruthy()
    })
    it('支持v-model', async () => {
        const wrapper = mount(Input, {
            props: {
                modelValue: 'test',
                // onUpdate是一个回调函数，当modelValue改变时，会触发这个回调函数
                'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e })
            }
        })
        //初始值
        const input = wrapper.get('input')
        expect(input.element.value).toBe('test')

        // 更新值
        // setValue是组合事件会触发input以及change
        await input.setValue('update')
        expect(wrapper.props('modelValue')).toBe('update')
        expect(input.element.value).toBe('update')

        console.log('the events', wrapper.emitted());



        // v-model 的异步更新
        await wrapper.setProps({ modelValue: 'prop update' })
        expect(input.element.value).toBe('prop update')
    })
    it('支持点击清空字符串', async () => {
        const wrapper = mount(Input, {
            props: {
                modelValue: 'test',
                clearable: true,
                type: 'text'
            },
            global: {
                stubs: ['Icon']
            }
        })
        //不应该出现Icon区域
        expect(wrapper.find('.vk-input__clear').exists()).toBeFalsy()
        const input = wrapper.get('input')
        await input.trigger('focus')
        expect(wrapper.emitted()).toHaveProperty('focus')
        //出现icon
        expect(wrapper.find('.vk-input__clear').exists()).toBeTruthy()
        // 点击值变为空并且消失
        await wrapper.get('.vk-input__clear').trigger('click')
        expect(input.element.value).toBe('')
        // 点击值变为空并且消失，特别注意这里不仅仅会触发clear事件，对应的input事件以及change事件应该都会被触发
        expect(wrapper.emitted()).toHaveProperty('clear')
        expect(wrapper.emitted()).toHaveProperty('input')
        expect(wrapper.emitted()).toHaveProperty('change')
        const inputEvent = wrapper.emitted('input')
        const changeEvent = wrapper.emitted('cahnge')
        expect(inputEvent![0]).toEqual([''])
        expect(changeEvent![0]).toEqual([''])

        await input.trigger('blur')
        expect(wrapper.emitted()).toHaveProperty('blur')
    })
    it.only('支持密码切换', async () => {
        const wrapper = mount(Input, {
            props: {
                modelValue: '',
                showPassword: true,
                type: 'text'
            },
            global: {
                stubs: ['Icon']
            }
        })
        // 不出现对应的Icon区域，应为当前值为空
        expect(wrapper.find('.vk-input__password').exists()).toBeFalsy()
        const input = wrapper.get('input')
        expect(input.element.type).toBe('password')
        // 出现Icon区域，并且Icon为特定的图标
        await input.setValue('123')
        const eyeIcon = wrapper.find('.vk-input__password')
        expect(eyeIcon.exists()).toBeTruthy()
        expect(eyeIcon.attributes('icon')).toBe('eye-slash')
        // 点击值变会切换input类型，并且图标的Icon会切换
        await eyeIcon.trigger('click')
        expect(input.element.type).toBe('text')
        expect(wrapper.find('.vk-input__password').attributes('icon')).toBe('eye')
    })
})

