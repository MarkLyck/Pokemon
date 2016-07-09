var $loginInput = $('#login-input');
var $loginBtn = $('#login-btn');
var $modalContainer = $('.modal-container');

if (!sessionStorage.username) {
  $modalContainer.css('display', 'block');
}

$loginBtn.on('click',function(){
  let re = /[a-zA-Z0-9]/g;
  if (re.test($loginInput.val())) {
    sessionStorage.username = $loginInput.val();
    player.userName = $loginInput.val();
    $modalContainer.css('display','none');
  } else {
    $('.login-modal').effect( "shake" );
  }
});


//// USERNAME looks really funny.... we should change it to welcome to pokemon or Login to play...
