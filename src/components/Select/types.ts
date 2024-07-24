export interface SelectOption {
    label:string;
    value:string;
    disabled?:boolean;
}

export interface SelectProps {
    // v-model
    modelValue:string;
    // 选项
    options:SelectOption[];
    // 一些基本的表单属性
    placeholder:string;
    disabled:boolean;
}

export interface SelectEmits {
    (e:'change',value:string):void;
    (e:'update:modelValue',Value:string):void;
}