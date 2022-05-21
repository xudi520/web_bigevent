$(function() {
    const form = layui.form;
    // 自定义校验规则
    form.verify({
        nickname: (val) => {
            if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
        },
    });

    // 获取用户基本资料
    const layer = layui.layer
    const initUserinfo = () => {
        $.ajax({
            type: "GET",
            url:"/my/userinfo",
            success:(res) => {
                if (res.status !== 0) return layer.msg("获取信息失败！")
                // layer.msg("获取信息成功！")
                // 为表单赋值
                form.val("formUserInfo", res.data);
            }
        })
    }
    initUserinfo()
    // 实现点击重置按钮
    $("#btnReset").click((e) => {
        e.preventDefault()
        initUserinfo()
    })
    // 更新用户信息  对表单进行操作
    $(".layui-form").on("submit",function(e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url:"/my/userinfo",
            data:$(this).serialize(),
            success:(res =>{
                if(res.status !== 0) return layer.msg("更改用户信息失败")
                layer.msg("更改用户信息成功")
                // 调用index里面的getUserInfo()函数 重新渲染头像
                window.parent.getUserInfo()
            })
        })
    })
})