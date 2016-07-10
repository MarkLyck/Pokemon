//don't forget to display the entered username on the screen(s?)

var $male = $('#male');
var $female = $('#female');
var $nextBtn = $('#next-btn');
var $pokemonList = $('#pokemonList');

$male.on('click', function() {
    player.gender = 'male';
    opponent.gender = 'female';
    $('.gender').removeClass('selected')
    $(this).addClass('selected')
    selectPokemon();
});

$female.on('click', function() {
    player.gender = 'female';
    opponent.gender= 'male';
    $('.gender').removeClass('selected')
    $(this).addClass('selected')
    selectPokemon();
});

function selectPokemon() {
  if (player.gender) {
      $('#chooseTitle').text('Choose Pokemon');
      $('.gender-wrapper').css('display', 'none');
      $('#pokemonList').css('display', 'flex');

      $pokemonList.empty();
      player.pkmn.forEach(function(pokemon) {
          var $li = $('<li></li>');
          $li.css('background-image', 'url("' + pokemon.imgSrc + '.png")')
          $li.on('click', function() {
              player.chosen = pokemon;
          });
          $pokemonList.append($li);
          $li.on('click', choosePokemon);
      });
  }
}

function choosePokemon() {
    if (player.chosen) {
        $('.screen').css('display', 'none');
        $('.battleScreen').css('display', 'flex');
        if (gameMode === 'singlePlayer') {
          opponent.chosen = opponent.pkmn[Math.floor(Math.random()*opponent.pkmn.length)];
        }
        if (gameMode === 'multiPlayer') {
          player.isWaiting = true;
          putPlayer(player);
          $('.modal-container').css('display', 'flex');
          $('.modal').css('display', 'none');
          $('.waiting-modal').css('display', 'flex');



          var searchingForOpponent = setInterval(function() {
            $.ajax({
              url: apiURL,
              type: 'GET',
              success: function(response) {
                console.log('WAITING FOR OPPONENT...');
                var waitingPlayers = response.filter(function(playerFound) {
                  if (playerFound.isWaiting === true && playerFound.userName !== player.userName) {
                    return true;
                  } else if (playerFound.userName === player.userName) {
                    player = playerFound;
                  }
                });

                if (waitingPlayers.length > 0) {
                  clearInterval(searchingForOpponent);

                  opponent = waitingPlayers[0];

                  opponent.opponent = player._id;
                  opponent.myTurn = false;
                  //TODO do we need this?
                  player.playerNo = 1;
                  player.myTurn = true;

                  console.log('FOUND OPPONENT: ', opponent);
                  player.isWaiting = false;
                  $modalContainer.css('display', 'none');

                  putPlayer(player);
                  putPlayer(opponent);
                  battle();
                }
                if (player.opponent) {
                  clearInterval(searchingForOpponent);
                  $.ajax({
                    url: apiURL + player.opponent,
                    type: 'GET',
                    success: function(response) {
                      opponent = response;
                      player.isWaiting = false;
                      player.playerNo = 2;
                      $modalContainer.css('display', 'none');
                      putPlayer(player);
                      battle();
                    }
                  });
                }
              }
            });
          }, 1000); // END TIME LOOP
        } else {
          battle();
        }
    }
}

function putPlayer(playerObj) {
  $.ajax({
    url: apiURL + playerObj._id,
    type: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify(playerObj),
  });
}
