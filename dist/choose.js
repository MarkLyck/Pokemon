//don't forget to display the entered username on the screen(s?)

var $male = $('#male');
var $female = $('#female');
var $nextBtn = $('#next-btn');
var $pokemonList = $('#pokemonList');

$male.on('click', function() {
    player.gender = 'male';
});
$female.on('click', function() {
    player.gender = 'female';
});

$nextBtn.on('click', function() {
    if (player.gender) {
        $('.gender-wrapper').css('display', 'none');
        $('#pokemonList').css('display', 'flex');

        $nextBtn.text('Battle!');

        $pokemonList.empty();
        player.pkmn.forEach(function(pokemon) {
            var $li = $('<li></li>');
            $li.css('background-image', 'url("' + pokemon.imgSrc + '")')
            $li.on('click', function() {
                player.chosen = pokemon;
            });
            $pokemonList.append($li);
            // $li.css('height', $li.css('width'))
        });

        //modify so that each time you click a pokemon, the other pokemon don't show up over and over
        $nextBtn.on('click', function() {
            if (player.chosen) {
                $('.screen').css('display', 'none');
                $('.battleScreen').css('display', 'flex');
                opponent.chosen = opponent.pkmn[Math.floor(Math.random()*opponent.pkmn.length)];
                console.log(opponent.chosen);
                battle();
            }
        });
    }
});
