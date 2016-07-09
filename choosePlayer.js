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

        player.pkmn.forEach(function(pokemon) {
            var $li = $('<li><img src="' + pokemon.imgSrc + '"/><p>' + pokemon.name + '</p></li>');
            $li.on('click', function() {
                player.chosen = pokemon;
            });
            $pokemonList.append($li);
        });

        //modify so that each time you click a pokemon, the other pokemon don't show up over and over
        $nextBtn.on('click', function() {
            if (player.chosen) {
                $('.screen').css('display', 'none');
                $('.battleScreen').css('display', 'flex');
                battle();
            }
        });
    }
});
