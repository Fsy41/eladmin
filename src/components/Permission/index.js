import Vue from "vue";
import store from "@/store";


const vPermission = Vue.directive('permission',{
    inserted(el,binding){
        const {value} = binding

        const roles = store.state.roles
        if (value && value instanceof Array){

            value.push('admin')
            if (value.length>0){
                const permissionRoles = value
                const hasPermission = roles.some(role=>{
                    return permissionRoles.includes(role)
                })
                if (!hasPermission){
                    el.parentNode && el.parentNode.removeChild(el)
                }
            }
        }else {
            throw new Error(`使用方式:v-permission="['admin','editor']"`)
        }
    }
})

export default vPermission
