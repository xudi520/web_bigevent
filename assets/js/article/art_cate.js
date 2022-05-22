$(function () {
    const layer = layui.layer;
    const form = layui.form;
    const initArtCateList = () => {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            // data:{}
            success: (res) => {
                if (res.status !== 0) return layer.msg("获取文章类别失败！")
                layer.msg("获取文章类别成功！")
                const htmlStr = template("tpl-table", res);
                $("tbody").empty().html(htmlStr);
            },
        })
    }
    initArtCateList()
    //  类的弹框
    let indexAdd = null;
    $("#btnAddCate").click(() => {
        indexAdd = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "添加文章分类",
            content: $('#dialog-add').html(),
        });
    })
    // 添加类
    // 通过代理监听 submit 事件
    $("body").on("submit", "#form-add", function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg("新增分类失败！");
                initArtCateList();
                layer.msg("新增分类成功！");
                layer.close(indexAdd);
            },
        });
    });

    // 通过代理方式，为 btn-edit 按钮绑定点击事件
    let indexEdit = null;
    $("tbody").on("click", ".btn-edit", function () {
        // 弹出修改文章分类的弹窗
        indexEdit = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "修改文章分类",
            content: $("#dialog-edit").html(),
        });
        // 发起请求获取对应分类的数据
        const id = $(this).attr("data-id");
        $.ajax({
            method: "GET",
            url: "/my/article/cates/" + id,
            success: function (res) {
                form.val("form-edit", res.data);
            },
        });
    });
    // 
    // 更新文章分类
    // 委托到body 在进行操作 否则新增的不会执行
    $("body").on("submit", "#form-edit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg("更新分类数据失败！");
                }
                layer.msg("更新分类数据成功！");
                // 关闭弹窗
                layer.close(indexEdit);
                initArtCateList();
            },
        });
    });
    // 删除文章分类
    $("tbody").on("click", ".btn-delete", function () {
        const id = $(this).attr("data-id");
        // 提示用户是否删除
        layer.confirm("确定删除吗？", {
            icon: 3,
            title: "提示"
        }, function (index) {
            $.ajax({
                method: "GET",
                url: "/my/article/deletecate/" + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg("删除分类失败！");
                    }
                    layer.msg("删除分类成功！");
                    layer.close(index);
                    initArtCateList();
                },
            });
        });
    });

})