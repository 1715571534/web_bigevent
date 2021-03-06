$(function () {
    //点击“注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();

    })
    //点击“登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
})

//从layui中获取form对象
var form = layui.form;
var layer = layui.layer;


//通过form.verify()函数自定义验证规则
form.verify({
    //自定义一个叫pwd的验证规则
    pwd: [/^[\S]{6,12}$/
        , '密码必须6到12位，且不能出现空格'],
    //验证两次密码一致
    repwd: function (value) {
        //通过形参拿到的是确认密码框的内容
        //拿到密码框中的内容
        //判断两次密码是否一致
        //不一致提示消息
        var pwd = $('.reg-box [name=password]').val();
        if (pwd !== value) {
            return '两次密码不一致';
        }
    }
})


//监听注册表单的提交事件
$('#form_reg').on('submit', function (e) {
    //组织submit的默认行为
    e.preventDefault();
    //发起ajax的post请求
    var data = {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser', data
        , function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }

            layer.msg('注册成功，请登录！');
            //自动转到登录界面
            $('#link_login').click();
        })
})




//监听登录表单的提交事件
$('#form_login').submit(function (e) {
    e.preventDefault();
    $.ajax({
        url: '/api/login',
        method: 'POST',
        //快速获取表单中的数据
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('登录失败！');
            }
            layer.msg('登录成功!');
            //将登录成功得到的token字符串，保存到localstorage中
            localStorage.setItem('token',res.token);
            //跳转到主页
            location.href = '/index.html';
        }

    })
})

