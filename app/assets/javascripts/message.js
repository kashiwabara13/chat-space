$(function(){
  function buildHTML(message){

    if (message.image != null){
    var html =
              `<div class="message" data-messageid=${message.id}>
              <div class="message__box">
                  <div class="message__box__user">
                  ${message.user_name}
                  </div>
                  <div class="message__box__date">
                  ${message.created_at}
                  </div>
              </div>
              <div class="messages__text">
                <p class="ower-message__content">
                ${message.content}
                </p>
              </div>
                <img src=${message.image} >
            </div>`
    return html;

    } else {
      var html = 
            `<div class="message" data-messageid=${message.id}>
              <div class="message__box">
                  <div class="message__box__user">
                  ${message.user_name}
                  </div>
                  <div class="message__box__date">
                  ${message.created_at}
                  </div>
              </div>
              <div class="messages__text">
                <p class="ower-message__content">
                ${message.content}
                </p>
              </div>
            </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data) {
      if (data.content=="" && data.image==null){
        alert("メッセージを入力してください")
      }else{
        var html = buildHTML(data);
        $('.messages').append(html)
        $('.js-form')[0].reset();
        $('.messages').animate({scrollTop: $(".messages")[0].scrollHeight}, 200);
      }
    })
    .fail(function(){
      alert("メッセージの送信に失敗しました");
    })
    .always(function(){
      $('.submit__button').prop("disabled",false);
    });
    return false; 
  })
})

