
<template>
	<div class="body">
		<div class="main">
			<div class="head">
				<div @click="choiceChange(index)" v-for="(item,index) in choices">
					<div class="items" :class="{items_active:index==active} ">{{item}}</div>
				</div>
			</div>
			<div class="container" v-show="active==0">
				<div>用户名：<input ref="username_input" class="login" type="text" placeholder="请输入用户名"
						v-model="form.username"></div>
				<div>密码：<input ref="password_input" class="_login" type="password" placeholder="请输入密码"
						v-model="form.password"></div>
			</div>
			<div class="container" v-show="active">
				<div>请输入用户名：<input class="login" ref="username_register" type="text"
						v-model="form.username"></div>
				<div>请设定密码：<input class="_login" ref="password_register" type="password"
						v-model="form.password"></div>
				<div>再次输入密码：<input class="login" ref="_password_register" type="password"
						v-model="form.password_again"></div>
			</div>
			<button type="submit" v-if="active==0" @click="handleLogin">登陆</button>
			<button type="submit" v-if="active" @click="handleRegister">注册</button>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		name: 'app',
		data() {
			return {
				form: {},
				choices: ["登陆", "注册"],
				active: ''
			}
		},
		methods: {
			choiceChange(index) {
				this.active = index
				this.form = {}
			},
			handleLogin() {
				let that = this
				if (!this.form.username) {
					alert("用户名不能为空")
					that.$refs.username_input.focus();
				} else if (!this.form.password) {
					alert("密码不能为空")
					that.$refs.password_input.focus();
				} else {
					console.log("用户名", this.form.username)
					console.log("密码", this.form.password)
					axios.post('http://127.0.0.1:5000/login', {
							userName: that.form.username,
							passWorAd: that.form.password
						}, {
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded'
							}
						})
						.then(res => {
							let data = res.data
							if (data == 1){
								alert(`尊敬的${that.form.username},您已登陆成功`)
								that.form = {}
							}
							else if (data == 2){
								alert("密码错误！")
								that.$refs.password_input.focus();
							}
							else if (data == 3) {
								alert("该用户名暂未注册,请先注册吧")
								that.active = 1;
								that.form = {}
							}
						})
						.catch(res => {
							console.log(res)
						})
 
				}
			},
			handleRegister() {
				let that = this;
				if (!this.form.username) {
					alert("用户名不能为空")
					that.$refs.username_register.focus();
				} else if (!this.form.password && !this.form.password_again) {
					alert("密码不能为空")
					that.$refs.password_register.focus();
				} else if (this.form.password == this.form.password_again) {
					let that = this
					console.log("用户名", this.form.username)
					console.log("密码", this.form.password)
					axios.post('http://127.0.0.1:5000/register', {
							userName: that.form.username,
							passWord: that.form.password,
							email: that.form.email
						}, {
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded'
							}
						})
						.then(res => {
							console.log(res)
							let data = res.data
							if (data == 1){
								alert("该用户名已被注册！")
								that.$refs.username_register.focus();
							}
							else if (data == 2) {
								alert("注册成功，您现在可以登陆了")
								that.active = 0;
							}
						})
						.catch(res => {
							console.log(res)
						})
				} else {
					alert("两次输入的密码不一致！")
					that.$refs.password_register.focus();
				}
			}
		},
	}
</script>

<style>
	.login {
		height: 40px;
		border-radius: 25px;
		padding-left: 10px;
		margin: 10px;
		border: 1px grey solid;
	}
 
	.main {
		background-color: rgba(166, 181, 200, 0.7);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 40px;
		width: 700px;
		height: 500px;
	}
 
	.body {
		width: 100vw;
		/* 100%的视口宽度 */
		height: 100vh;
		/* 100%的视口高度 */
		display: flex;
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */
		/* 设置背景图片 */
		background-image: url('../assets/background.jpg');
		background-size: cover;
		/* 覆盖整个元素 */
		background-position: center;
		/* 图片居中 */
	}
 
	._login {
		height: 40px;
		border-radius: 25px;
		padding-left: 10px;
		margin-top: 10px;
		margin-bottom: 10px;
		margin-left: 26px;
		border: 1px grey solid;
	}
 
	.container {
		margin: 20px;
		padding: 10px;
	}
 
	.head {
		width: 300px;
		display: flex;
		justify-content: space-around;
	}
 
	.items {
		border-bottom: 1px black solid;
		font-size: 30px;
		font-weight: 400;
	}
 
	.items:hover {
		color: darkgreen;
	}
 
	.items_active {
		color: darkgreen;
		border-bottom: 2px darkgreen solid;
	}
 
	button {
		/** 重置按钮的默认样式 **/
		background-color: transparent;
		/* 或者你想要的任何颜色 */
		border: none;
		/* 移除边框 */
		padding: 10px 20px;
		/* 内边距 */
		color: white;
		/* 字体颜色 */
		font-size: 16px;
		/* 字体大小 */
		cursor: pointer;
		/* 鼠标悬停时的光标样式 */
		
		/** 添加一些视觉效果 **/
		background-color: #007bff;
		/* 背景颜色 */
		border-radius: 4px;
		/* 边框圆角 */
		transition: background-color 0.3s ease;
		/* 背景颜色过渡效果 */
	}
 
	button:hover {
		background-color: #19dfcf;
		/* 更深的蓝色背景 */
	}
</style>