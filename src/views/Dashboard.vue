<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <el-aside width="205px">
          <el-menu text-color="#bfcbd9" class="sidebar-container" style="text-align: left">
          <el-submenu :index="item.name" v-for="item in menuList">
            <template slot="title">
              <svg-icon slot="prefix" :icon-class="item.meta.icon"/>
              {{item.meta.title}}
            </template>
            <el-menu-item :index="child.name" v-for="child in item.children" @click.prevent.native="selectMenu(item.path,child.path)">
              <template slot="title">
                <svg-icon slot="prefix" :icon-class="child.meta.icon"/>
                {{ child.meta.title }}
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="text-align: right">
          <el-dropdown>
            <i class="el-icon-setting"style="margin-right: 15px"></i>
            <span>fusiyi</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item @click.native.prevent="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
         <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
import {removeToken} from "@/utils/auth";
import * as Config from "@/settings"

export default {
  name: "Dashboard",
  data(){
    return{
      menuList:[]
    }
  },
  created() {
    this.getMenuList()
  },
  methods:{
    logout(){
      //请求后端接口删除该用户的token，同时前端Cookies也要删除该用户的token
      this.$store.dispatch('LogOut').then(() => {
        this.$router.replace('/login')
      })
    },
    getMenuList(){
      this.$request.get("http://localhost:8000/api/menus/build").then(res=>{
        this.menuList = res.data
      })
    },
    selectMenu(path1,path2){
      this.$router.replace(path1 + '/' + path2).catch(err=>err)
    }
  }
}
</script>

<style scoped>

</style>
