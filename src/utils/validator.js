// 抽取校验的逻辑代码
// 校验手机号的逻辑
export const checkPhone = (rule, value, callback) => {
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

// 验证邮箱的逻辑
export const checkEmail = (rule, value, callback) => {
    const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (reg.test(value) == true) {
      callback();
    } else {
      callback(new Error("邮箱格式不正确"));
    }
};