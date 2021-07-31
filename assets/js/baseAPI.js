//注意：每次调用$.get(),$.post()或者$.ajax()的时候，
//会先调用下面这个函数,在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options){
//统一并拼接请求路径
options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

})