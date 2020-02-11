<template>
  <el-dialog
    class="register-dialog"
    width="603px"
    center
    title="用户注册"
    :visible.sync="dialogFormVisible"
    ref="registerForm"
  >
    <el-form :model="form" :rules="rules" ref="registerForm">
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          name="image"
        >
          <!-- imageUrl有值，显示图片 -->
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <!-- imageUrl没有值 显示的是i标签 -->
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="username" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
        <el-input show-password v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图形码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-col>
          <el-col :offset="1" :span="7" class="register-box">
            <!-- 图片验证码 -->
            <img @click="changeCode" class="register-code" :src="codeUrl" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.recode" autocomplete="off"></el-input>
          </el-col>
          <el-col :offset="1" :span="7">
            <!-- 获取短信验证码 -->
            <el-button
              :disabled="delay != 0"
              @click="getSMS"
            >{{ delay == 0 ? '点击获取验证码' : `还有${delay}秒继续获取` }}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('registerForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入axios
// import axios from "axios";

// 导入封装的axios的请求方法
import { sendsms } from "@/api/register.js";

// 定义校验函数-邮箱手机
const checkEmail = (rule, value, callback) => {
  const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

  if (reg.test(value) == true) {
    callback();
  } else {
    callback(new Error("邮箱格式不正确"));
  }
};
// 验证手机号的 函数
const checkPhone = (rule, value, callback) => {
  // 接收参数 value
  // 定义正则表达式
  const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
  // 使用正则校验格式是否满足
  if (reg.test(value) == true) {
    // 对
    callback();
  } else {
    // 错
    callback(new Error("手机号格式不对哦，请检查"));
  }
};

export default {
  data() {
    return {
      // 是否显示对话框
      dialogFormVisible: false,
      // 表单数据
      form: {
        // 昵称
        username: "",
        // 密码
        password: "",
        // 手机号
        phone: "",
        // 邮箱
        email: "",
        // 图片验证码
        code: "",
        // 用户的头像地址
        avatar:"",
        // 短信验证码
        rcode:"",
      },
      // 校验规则
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "用户名长度为6到12位", trigger: "change" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "密码长度为6到12位", trigger: "change" }
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          // trigger 触发是执行 validator设置的函数
          { validator: checkPhone, trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          // trigger 触发是执行 validator设置的函数
          { validator: checkEmail, trigger: "blur" }
        ],
        avatar: [
          {required:true ,message:"用户头像不能为空",trigger:"blur"},
        ],
      },
      // 左侧的文本宽度
      formLabelWidth: "62px",

      // 验证码图片地址
      // codeUrl: process.env.VUE_APP_URL + "/captcha?type=sedsms",
      codeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",

      // 倒计时事件
      delay: 0,

      // 本地图片浏览地址
      imageUrl: "",
      // 头像上传的接口地址
      uploadUrl: process.env.VUE_APP_URL + "/uploads"
    };
  },
  methods: {
    // 表单的提交方法
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid=>{
        if(valid){
          this.$message.success('验证成功');
        } else {
          this.$message.error('验证失败');
          return false;
        }
      })
    },

    // 上传成功
    handleAvatarSuccess(res, file) {
      window.console.log(res);
      // URL.createObjectURL 生成的是本地的临时路径，刷新就没用了
      this.imageUrl = URL.createObjectURL(file.raw);
      // 保存 服务器返回的图片的地址
      this.form.avatar = res.data.file_path;
      // 表单中,头像的验证,当头像上传成功后,重新校验,清除提示信息
      this.$refs.registerForm.validateField('avatar')
    },
    // 上传之前
    beforeAvatarUpload(file) {
      // 图片的类型
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      // 1024*1024 1mb  图片的大小
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    // 获取短信验证码
    getSMS() {
      if (this.delay == 0) {
        this.delay = 60;
        // 开启倒计时
        const interId = setInterval(() => {
          // 事件的递增
          this.delay--;
          if (this.delay == 0) {
            clearInterval(interId);
          }
        }, 100);

        // axios({
        //   url: process.env.VUE_APP_URL + "/sendsms",
        //   method: "post",
        //   data: {
        //     code: this.form.code,
        //     phone: this.form.phone
        //   },
        //   // withCredentials:true
        //   withCredentials: true
        // })
        sendsms({
          code: this.form.code,
          phone: this.form.phone
        }).then(res => {
          window.console.log(res);
          if (res.data.code === 200) {
            this.$message.success("验证码获取成功" + res.data.data.captcha);
          } else if (res.data.code === 0) {
            this.$message.success("验证码获取失败");
          }
        });
      }
    },

    // 点击更换图片验证码
    changeCode() {
      // 随机数
      // this.codeUrl = process.env.VUE_APP_URL+"/captcha?type=sedsms" +Math.random()
      // 时间戳
      // this.codeUrl = process.env.VUE_APP_URL + "/captcha?type=sedsms" + Date.now();
      // 更加规范的方法 t= 或者其他的, 键值都可以 ,t是time的缩写
      this.codeUrl =
        process.env.VUE_APP_URL + "/captcha?type=sedsms&t=" + Date.now();
    }
  }
};
</script>

<style lang="less">
.register-dialog {
  .el-dialog__header {
    background: linear-gradient(to right, #0dbfef, #1792f8);
  }
  .el-dialog__title {
    color: white;
  }
  .register-box {
    height: 40.8px;
  }
  .register-code {
    height: 40.8px;
    width: 100%;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
