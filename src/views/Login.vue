<script setup>
import { User, Lock } from '@element-plus/icons-vue' // eslint-disable-line no-unused-vars
import { ElMessage } from 'element-plus' // eslint-disable-line no-unused-vars
import axios from 'axios' // eslint-disable-line no-unused-vars
import { ref } from 'vue' // eslint-disable-line no-unused-vars
// 调用后台接口完成注册
// import { userRegisterService, userLoginService } from '@/api/user.js'
// const register = async () => { // eslint-disable-line no-unused-vars
  // registerData是一个响应式对象，调用时现需要加上.value
  // const result = await userRegisterService(registerData.value)
  // if (result.code === 0) {
    // 成功
    // ElMessage.success('注册成功！')
  // } else {
    // 失败
    // ElMessage.error('注册失败！')
  // }
// }

// 登录函数
// const login = async () => { // eslint-disable-line no-unused-vars
  // 调用接口完成登录
  // const result = await userLoginService(registerData.value)
  // if (result.code === 0) {
    // ElMessage.success('登录成功！')
  // } else {
    // ElMessage.error('登录失败！')
  // }
// }

const isRegister = ref(false) // eslint-disable-line no-unused-vars
const registerData = ref({ // eslint-disable-line no-unused-vars
  username: '',
  password: '',
  rePassword: ''
})
const checkRePassword = (rule, value, callback) => { // eslint-disable-line no-unused-vars
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== registerData.value.password) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}
const rules = ref({ // eslint-disable-line no-unused-vars
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 16, message: '请输入5-16位非空字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 16, message: '请输入5-16位非空字符', trigger: 'blur' }
  ],
  rePassword: [
    { validator: checkRePassword, trigger: 'blur' }
  ]
})
// 定义函数，清空数据模型
const clearRegisterData = () => { // eslint-disable-line no-unused-vars
  registerData.value = {
    username: '',
    password: '',
    rePassword: ''
  }
}


</script>
<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- 注册表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password" show-password></el-input>
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码" v-model="registerData.rePassword" show-password></el-input>
                </el-form-item>
                <!-- 注册按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="register">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = false; clearRegisterData()">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>
            <!-- 登录表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="rules" >
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login">
                        登录
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = true; clearRegisterData()">
                        注册 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
export default {
  name: 'Login',
  data() {
      return {
          registerData
      }
  },
  methods:{
    login(){
      let that = this
      console.log("用户名", this.registerData.username)
      console.log("密码", this.registerData.password)
      axios.post('/api/login', {
        username: that.registerData.username,
        password: that.registerData.password
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(res => {
        let data = res.data
        if(data == 1){
          ElMessage.success('登录成功！')
          that.registerData = {}
        }
        else if(data == 2){
          ElMessage.error('密码错误！')
        }
        else if(data == 3){
          ElMessage.error('用户不存在！')
          that.registerData = {}
        }
        else{
          ElMessage.error('登录失败！')
        }
      })
      .catch(res => {
        console.log(res)
      })
    },
    register(){
      let that = this
      console.log("用户名", this.registerData.username)
      console.log("密码", this.registerData.password)
      axios.post('/api/register', {
        username: that.registerData.username,
        password: that.registerData.password
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(res => {
          console.log(res)
          let data = res.data
          if(data == 1){
            ElMessage.success('注册成功！')
          }
          else if(data == 2){
            ElMessage.error('用户名已存在！')
          }
          else{
            ElMessage.error('注册失败！')
          }
      })
      .catch(res => {
        console.log(res)
      })
    }
  }    
} 
</script>

<style lang="scss" scoped>
/* 样式 */
.login-page {
    height: 100vh;
    background-color: #fff;
    .bg {
        background: url('@/assets/background.jpg') no-repeat center / cover;
        border-radius: 0 20px 20px 0;
    }
    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;
        .title {
            margin: 0 auto;
        }
        .button {
            width: 100%;
        }
        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>
