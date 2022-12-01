import Vue from "vue";
import store from "@/store";


const vPermission = Vue.directive('permission',{
    inserted(el,binding){
        const {value} = binding

        const roles = store.state.roles
        console.log('限定权限',value)
        console.log('当前权限',roles)
        if (value && value instanceof Array){

            value.push('admin')
            if (value.length>0){
                const permissionRoles = value
                const hasPermission = roles.some(role=>{
                    return permissionRoles.includes(role)
                })
                if (!hasPermission){
                    console.log('移除了元素！')
                    el.parentNode && el.parentNode.removeChild(el)
                }
            }
        }else {
            throw new Error(`使用方式:v-permission="['admin','editor']"`)
        }
    }
})

export default vPermission
