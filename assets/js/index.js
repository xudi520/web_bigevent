$(function () {
    // 调用函数
    getUserInfo()
    // 
    const layer = layui.layer
    $("#btnLogout").click(() => {
        layer.confirm(
            "确定退出登录？", {
                icon: 3,
                title: ""
            },
            function (index) {
                // 清空本地存储里面的 token
                localStorage.removeItem("token");
                // 重新跳转到登录页面
                location.href = "/login.html";
            }
        );
    })
})

// 获取用户信息
const layer = layui.layer

function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: "/my/userinfo",
        // 获取本地token
        // headers: {
        //     Authorization: localStorage.getItem("token"),
        // },
        success: (res) => {
            // console.log(res);
            if (res.status !== 0) return layer.msg("数据请求失败！");
            layer.msg("数据请求成功！")
            // 调用 renderAvatar 渲染用户头像
            renderAvatar(res.data);
        },
        // !提取到baseAPI中
        // complete: (res) => {
        //     if (res.responseJSON.status ===1 && res.responseJSON.message === "身份认证失败！") {
        //         localStorage.removeItem("token");
        //         location.href = "login.html";
        //     }
        // }
    });
}

// 渲染头像函数
const renderAvatar = (user) => {
    // 获取名字
    let name = user.nickname || user.username
    // 设置欢迎文本
    $("#welcome").html(`欢迎 ${name}`)
    // 按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        // 渲染文本头像
        $(".layui-nav-img").hide();
        let firstName = name[0].toUpperCase();
        $(".text-avatar").html(firstName);
    }
}