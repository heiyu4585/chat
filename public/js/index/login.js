/**
 * Created by 王 on 2016/10/16.
 */
$("#EV-submit").click(function(){
    // 向server "/buttonClicked" 发送一个get request
    // 根据实际情况, 此处也可以是$.post();

    var data={
        name:$("input[name='nick_name']").val(),
        pass:$("input[name='user_password']").val()
    }
    $.ajax({
        url: '/index/login',
        data:data,
        type: 'GET',
        dataType: 'json',
        error: function(){

        },
        success: function(data){
console.log(data);
        }
    });
    return false;
});