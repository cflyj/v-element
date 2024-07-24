export type SwitchValueType = boolean | number| string ;

export interface SwitchProps {
    modelValue:boolean;
    disabled?:boolean;
    activeText?:string;
    inactiveText?:string;
    activeValue?:SwitchValueType;
    inactiveValue?:SwitchValueType;
    name?:string;
    id?:string;
    size?:'small' | 'large';
}

export interface SwitchEmits {
    (e:'update:modelValue',value:SwitchValueType):void;
    (e:'change',value:SwitchValueType):void;
    
}