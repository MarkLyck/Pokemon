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
        opponent.chosen = opponent.pkmn[Math.floor(Math.random()*opponent.pkmn.length)];
        console.log(opponent.chosen);
        if (gameMode === 'multiPlayer') {
          player.isWaiting = true;
          $('.modal-container').css('display', 'flex');
          $('.modal').css('display', 'none');
          $('.waiting-modal').css('display', 'flex');
          battle();

          var searchingForOpponent = setInterval(function() {
            $.ajax({
              url: apiURL,
              type: 'GET',
              success: function(response) {

                console.log('TIME LOOP');
                response = response.filter(foundPlayers => {
                  if (player.isWaiting === true) {
                    return true;
                  }
                })

                if (response.length > 1) {
                  console.log('FOUND OPPONENT');
                  clearInterval(searchingForOpponent);

                  opponent = response[1];
                  console.log(opponent);
                  player.isWaiting = false;
                  $modalContainer.css('display', 'none');
                  putPlayer(player);
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
    success: function(response) {
      console.log('UPDATED PLAYER');
    }
  });
}
