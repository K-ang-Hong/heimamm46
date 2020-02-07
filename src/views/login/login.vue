<template>
  <!-- 整体容器 -->
  <div class="login-container">
    <!-- 左侧盒子 -->
    <div class="left-box"></div>
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

<style>
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
}
.login-container .left-box {
  width: 478px;
  background-color: #f5f5f5;
  height: 550px;
}
</style>