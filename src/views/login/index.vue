<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

// api
import { userLoginApi, userSignApi } from '@/api/login'

// 引入语言包
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 路由
const router = useRouter()


// tab切换,默认是登录
const activeName = ref('login')

// 随着tab切换，改变activeName的值
const submitText = ref('登录')
function handleClickTab(tab: any, event: any) {
  console.log('tab', tab)
  // 获取tab的实际值
  console.log('event', event.target.innerText)
  if (event.target.innerText === '登录') {
    activeName.value = 'login'
    submitText.value = t('login.loginBtn')
  } else {
    activeName.value = 'sign'
    submitText.value = t('login.signBtn')
  }
}

// 登录框规则
// 表单数据
const loginForm = ref({
  username: '',
  password: '',
});

// 表单验证规则
const loginRules = ref({
  username: [
    { required: true, message: t('login.placeMobile'), trigger: 'blur' },
    { min: 6, max: 30, message: t('login.errorMobile'), trigger: 'blur' },
  ],
  password: [
    { required: true, message: t('login.placePass'), trigger: 'blur' },
    { min: 6, max: 30, message: t('login.errorPass'), trigger: 'blur' },
  ],
});

// 表单引用
const loginFormRef = ref(null);

// 表单提交
const loginSubmit = () => {
  loginFormRef.value.validate((valid: any) => {
    if (valid) {
      console.log('loginForm', loginForm.value);

      // 判断当前是注册还是登录
      if (activeName.value === 'login') {
        userLogin();
      } else {
        userSign();
      }

    } else {
      console.log('error submit!!');
      return false;
    }
  });
};


// 注册逻辑
function userSign() {
  userSignApi(loginForm.value).then((res: any) => {
    console.log('res', res);
    if (res.code === '000001') {
      // 用户已存在
    }
  });
  console.log('signSubmit');
}

// 登录逻辑
function userLogin() {
  userLoginApi(loginForm.value).then((res: any) => {
    console.log('res', res);
    const { result } = res
    if (res.code === '000000') {
      // 登录成功
      ElMessage({
        message: '登录成功',
        type: 'success',
      })

      // 跳转到首页
      router.push({ path: '/home' })

      // 保存token
      localStorage.setItem('userStatus', result.status)
    } else {
      // 登录失败
      ElMessage({
        message: '登录失败',
        type: 'error',
      })
    }
  });
  console.log('loginSubmit');
}


</script>

<template>
  <div class="login">
    <div class="left-part"></div>
    <div class="right-part">
      <div class="login-container">
        <el-tabs v-model="activeName" @tab-click="handleClickTab">
          <el-tab-pane :label="t('login.loginTab')" name="login"></el-tab-pane>
          <el-tab-pane :label="t('login.signTab')" name="sign"></el-tab-pane>
        </el-tabs>
        <el-form label-width="80px" :label-position="'right'" ref="loginFormRef" :model="loginForm" :rules="loginRules"
          @submit.native.prevent="loginSubmit">
          <el-form-item prop="username" :label="t('login.username')">
            <el-input v-model="loginForm.username" autocomplete="off" :placeholder="t('login.placeMobile')"
              clearable></el-input>
          </el-form-item>
          <el-form-item prop="password" :label="t('login.password')">
            <el-input type="password" v-model="loginForm.password" autocomplete="off" :placeholder="t('login.placePass')"
              clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loginSubmit">{{ submitText }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  @include flex-layout(row);
  height: 100vh;

  .left-part {
    flex: 70;
    height: 100%;
    background-image: url('../../assets/images/login/bg.png');
    background-size: cover;
    // background-color: #fff;
  }

  .right-part {
    flex: 30;
    height: 100%;
    background-color: #f5f5f5;
    @include flex-layout(row);

    .login-container {
      width: 300px;

      :deep(.el-tabs__nav) {
        float: initial;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      :deep(.el-tabs__item.is-top.is-active) {
        font-size: 24px;
      }
    }
  }
}
</style>
