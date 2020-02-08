<template>
  <!-- 整体容器 -->
  <div class="login-container">
    <!-- 左侧盒子 -->
    <div class="left-box">
      <!-- 顶部的标题 -->
      <div class="title-box">
        <img src="../../assets/login_logo.png" alt class="logo" />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- 表单 -->
      <el-form ref="form" :model="loginForm" label-width="43px">
        <!-- 手机号 -->
        <el-form-item>
          <el-input prefix-icon="el-icon-user" placeholder="请输入手机号" v-model="loginForm.phone"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item>
          <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="loginForm.password"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item>
          <!-- 栅格 -->
          <el-row>
            <el-col :span="17">
              <el-input
                prefix-icon="el-icon-key"
                placeholder="请输入验证码"
                v-model="loginForm.loginCode"
              ></el-input>
            </el-col>
            <el-col :span="7">
              <img src="../../assets/login_captcha.png" alt="" class="login-code">
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 用户协议 -->
        <el-form-item>
          <el-checkbox v-model="loginForm.isChecked">是否同意用户协议</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右边的图片 -->
    <img src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  // 组件的名字
  name: "login",
  // 在Chrome的vue插件中可以方便的
  data() {
    return {
      // 绑定数据
      loginForm: {
        // 手机号
        phone: "",
        // 密码
        password: "",
        // 验证码
        loginCode: "",
        // 是否勾选
        isChecked: false
      }
    };
  }
};
</script>

<style lang="less">
.login-container {
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  height: 100%;
  /* 弹性布局 */
  display: flex;
  /* 上下居中 */
  align-items: center;
  /* 左右均分 */
  justify-content: space-around;

  // 左侧盒子
  .left-box {
    width: 478px;
    background-color: #f5f5f5;
    height: 550px;
    // 设置样式,把表单的间隙空出来
    padding-right: 41px;
    box-sizing: border-box;

    // 顶部标题
    .title-box {
      display: flex;
      align-items: center;
      margin-top: 44px;
      margin-left: 40px;
      // 将form表单往下移27px
      margin-bottom: 27px;
      .logo {
      }
      .title {
        font-size: 24px;
        margin-left: 16px;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        height: 28px;
        background-color: #c7c7c7;
      }
      .sub-title {
        font-size: 21px;
        margin-left: 12px;
      }
    }
    .login-code {
      width: 100%;
      height: 41px;
    }
  }
}
// .login-container
</style>