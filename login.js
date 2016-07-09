var $loginInput = $('#login-input');
var $loginBtn = $('#login-btn');
var $modalContainer = $('.modal-container');

$loginBtn.on('click',function(){
  if ($loginInput.val() !== ''){
    player.userName = $loginInput.val();
    $modalContainer.css('display','none');
  }
});


//// USERNAME looks really funny.... we should change it to welcome to pokemon or Login to play...
