module.exports = {
  extends: [
    // ...其他扩展
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:vue/essential',
    // 确保 'prettier' 是数组中的最后一个元素
  ],
  plugins: [
    // ...其他插件
    'prettier',
  ],
  rules: {
    // ...其他规则
    'prettier/prettier': 'error',
    // 添加您的其他规则
  },
  // ...其他配置选项
};
