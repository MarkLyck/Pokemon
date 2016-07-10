var $loginInput = $('#login-input');
var $loginBtn = $('#login-btn');
var $modalContainer = $('.modal-container');

var themeMusic = new Audio('assets/sounds/PokemonTheme.mp3');

if (!sessionStorage.username) {
  $modalContainer.css('display', 'block');
  themeMusic.play();
}

$loginBtn.on('click',function(){
  let re = /[a-zA-Z0-9]/g;
  if (re.test($loginInput.val())) {
    themeMusic.pause();
    sessionStorage.username = $loginInput.val();
    console.log('USER BEFORE: ', player.userName);
    player.userName = $loginInput.val();
    console.log('USER AFTER: ', player.userName);
    $modalContainer.css('display','none');
  } else {
    $('.login-modal').effect( "shake" );
  }
});


//// USERNAME looks really funny.... we should change it to welcome to pokemon or Login to play...
