var $loginInput = $('#login-input');
var $singlePlayerBtn = $('#singleplayer-btn');
var $multiPlayerBtn = $('#multiplayer-btn');
var $modalContainer = $('.modal-container');

var themeMusic = new Audio('assets/sounds/PokemonTheme.mp3');

var apiURL = 'https://tiny-za-server.herokuapp.com/collections/pokebattle2/';
var gameMode = 'singlePlayer'

if (!sessionStorage.userName) {
  $modalContainer.css('display', 'block');
  themeMusic.play();
} else {
  $modalContainer.css('display', 'block');
  player.userName = sessionStorage.userName;
}

$singlePlayerBtn.on('click',function(){
  login();
});
$multiPlayerBtn.on('click',function(){
  gameMode = 'multiPlayer'
  player.userName = $loginInput.val().trim();
  $.ajax({
    url: apiURL,
    type: 'GET',
    contentType: 'application/json',
    success: function(response) {
      var playerFound = playerExists(response)
      if (playerFound !== false) {
        player = playerFound;
        // console.log('SUCCESS FOUND PLAYER');
      } else {
        postPlayer();
      }

    }
  });
  login();
});

function login(){
  let re = /[a-zA-Z0-9]/g;
  if (re.test($loginInput.val())) {
    themeMusic.pause();
    sessionStorage.userName = $loginInput.val().trim();
    // console.log('USER BEFORE: ', player.userName);
    player.userName = $loginInput.val();
    // console.log('USER AFTER: ', player.userName);
    $modalContainer.css('display','none');
  } else {
    $('.login-modal').effect( "shake" );
  }
}

function playerExists(response) {
  var foundPlayer = false;
  response.forEach(function(user) {
    if (user.userName.toLowerCase() === $loginInput.val().toLowerCase()) {
      foundPlayer = true;
    }
  });
  if (foundPlayer) {
    console.log('Player already exists');
    return response[0];
  } else {
    console.log('Creating new Player');
    return false;
  }
}

function postPlayer(playerObj){
  // console.log('POSTING PLAYER');
  $.ajax({
      url: apiURL,
      type:'POST',
      contentType: 'application/json',
      data: JSON.stringify(player),
      success: function(response){
        player._id = response._id;
        // console.log(response);
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
