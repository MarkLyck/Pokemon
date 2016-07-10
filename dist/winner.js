var $newGameBtn = $('.new-game-btn');
var $winnerCharImg = $('#winnerPlayer');
var $winnerPokeImg = $('#winnerPokemon');
var $winnerName = $('#winner-name');

function renderWinScreen(winner) {
    $('.screen').css('display', 'none');
    $('.winScreen').css('display', 'flex');
    if (winner.gender === 'male') {
        $winnerCharImg.attr('src', 'assets/images/characters/Ash.png');
    } else {
        $winnerCharImg.attr('src', 'assets/images/characters/Misty.png');
    }
    $winnerPokeImg.attr('src', winner.chosen.imgSrc + '.png')
    $winnerName.text(winner.userName + ' won with ' + winner.chosen.name + '!')
}


$newGameBtn.on('click', function() {
    $('.screen').css('display', 'none');
    $('.choose').css('display', 'block');
    victorySound.pause();
    victorySound.currentTime = 0;
});
