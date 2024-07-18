 import {computed, ref} from 'vue'

 const zIndex=ref(0)
 const useZIndex=(initialValue=2000)=>{
    const initialZIndex=ref(initialValue)
    const currentZIndex=computed(()=>zIndex.value+initialZIndex.value)
    const nextZindex=()=>{
        zIndex.value++
        return currentZIndex.value
    }
    return {
        nextZindex,
        currentZIndex,
        initialZIndex,
    }
 }

 export default useZIndex