var $loginInput = $('#login-input');
var $singlePlayerBtn = $('#singleplayer-btn');
var $multiPlayerBtn = $('#multiplayer-btn');
var $modalContainer = $('.modal-container');

var themeMusic = new Audio('assets/sounds/PokemonTheme.mp3');

var apiURL = 'https://tiny-za-server.herokuapp.com/collections/pokemon/';

if (!sessionStorage.userName) {
  $modalContainer.css('display', 'block');
  themeMusic.play();
} else {
  player.userName = sessionStorage.userName;
}

$singlePlayerBtn.on('click',function(){
  login();
});
$multiPlayerBtn.on('click',function(){
  player.userName = $loginInput.val();
  $.ajax({
    url: apiURL,
    type: 'GET',
    contentType: 'application/json',
    success: function(response) {
      if (playerExists(response)) {
        player = playerExists(response);
        console.log('SUCCESS FOUND PLAYER');
      } else {
        postPlayer();
      }

    }
  });
  // login();
});

function login(){
  let re = /[a-zA-Z0-9]/g;
  if (re.test($loginInput.val())) {
    themeMusic.pause();
    sessionStorage.userName = $loginInput.val();
    console.log('USER BEFORE: ', player.userName);
    player.userName = $loginInput.val();
    console.log('USER AFTER: ', player.userName);
    $modalContainer.css('display','none');
  } else {
    $('.login-modal').effect( "shake" );
  }
}

function playerExists(response) {
  console.log('Looking for player');
  response.filter(function(user) {
    if (user.userName === $loginInput.val()) {
      console.log('Found matching player');
      return true;
    }
  });
  if (response.length > 0) {
    console.log('returning matched player');
    return response[0];
  } else {
    console.log('Didn\'t find player');
    return false;
  }
}

function postPlayer(playerObj){
  console.log('POSTING PLAYER');
  $.ajax({
      url: apiURL,
      type:'POST',
      contentType: 'application/json',
      data: JSON.stringify(player),
      success: function(response){
        console.log(response);
      }
  });
}











function clearAPI() {
  $.ajax({
    url: apiURL,
    type: 'GET',
    contentType: 'application/json',
    success: function(response){
      response.forEach(function(user){
        $.ajax({
          url: apiURL + user._id,
          type: 'DELETE',
          contentType: 'application/json',
          success: function(response) {
            console.log('DELETED', user._id);
          }
        });
      });
    }
  })
}
