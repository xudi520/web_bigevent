
// 入口函数
$(function () {
    $("#link_reg").click(() => {
        $(".login-box").hide();
        $(".reg-box").show();
    })
    $("#link_login").click(() => {
        $(".login-box").show();
        $(".reg-box").hide();
    })

    //! 注册
    // 获取form
    const form = layui.form
    // 定义表单验证
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 校验俩次密码是否一直
        repwd: (val) => {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            const pwd = $(".reg-box [name=password]").val();
            if (val !== pwd) return "俩次密码不一致"
        }
    })

    // const baseUrl = "http://www.liulongbin.top:3007"
    const layer = layui.layer

    //!监听注册表单提交
    $("#form_reg").on("submit", function (e) {
        // 阻止默认提交
        e.preventDefault();
        $.ajax({
            type: "POST",
            url:"/api/reguser",
            data: {
                username: $("#form_reg [name=username]").val(),
                password: $("#form_reg [name=password]").val(),
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg("注册失败！")
                layer.msg("注册成功")
                $("#link_login").click();
            }
        })
    })

    //!监听登录表单提交
    $("#form_login").on("submit",function(e) {
        // 阻止默认行为
        e.preventDefault();
        $.ajax({
            type: "POST",
            url:"/api/login",
            data:$(this).serialize(),
            success:(res)=>{
                // console.log(res);
                if (res.status !== 0) return layer.msg("登录失败！")
                layer.msg("登录成功!")
                // 携带token参数才能登录成功
                localStorage.setItem("token",res.token);
                location.href = "/index.html"
            }
        })
    })
})