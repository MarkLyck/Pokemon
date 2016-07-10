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

      $nextBtn.text('Battle!');

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
        battle();
    }
}
