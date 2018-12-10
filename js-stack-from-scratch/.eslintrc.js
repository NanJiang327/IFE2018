module.exports = {
    extends: [
        'eslint-config-alloy',
        "plugin:flowtype/recommended"
    ],
    globals: {
        // 这里填入你的项目需要的全局变量
        // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
        //
        // jQuery: false,
        // $: false
    }, 
    plugins: [
      "flowtype",
      "compat"
    ],
    rules: {
      "semi": [2, "never"],
      "no-unexpected-multiline": 2,
      "compat/compat": 2
    },
    parser: "babel-eslint",
    env: {
        "jest": true
    }
}