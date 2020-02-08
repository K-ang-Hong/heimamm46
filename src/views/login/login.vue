<template>
  <!-- 整体容器 -->
  <div class="login-container">
    <!-- 左侧盒子 -->
    <div class="left-box">
        <!-- 顶部的标题 -->
        <div class="title-box">
            <img src="../../assets/login_logo.png" alt="" class="logo">
            <span class="title">黑马面面</span>
            <span class="line"></span>
            <span class="sub-title">用户登录</span>
        </div>
    </div>
    <!-- 右边的图片 -->
    <img src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  // 组件的名字
  name: "login"
  // 在Chrome的vue插件中可以方便的
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

    // 顶部标题
    .title-box {
        display: flex;
        align-items: center;
        margin-top: 44px;
        margin-left: 40px;
        .logo{

        }
        .title{
            font-size: 24px;
            margin-left: 16px;
            margin-right: 14px;
        }
        .line{
            width: 1px;
            height: 28px;
            background-color: #c7c7c7;
        }
        .sub-title{
            font-size: 21px;
            margin-left: 12px;
        }
    }
  }
}
// .login-container
</style>