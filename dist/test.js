function battleMultiplayerOpponentMove(move, attacker) {
  console.log('battleMultiplayerOpponentMove FUNCTION');
    if (move.moveName === 'tackle') {
        if (!attacker.didMiss) {
            $actionText.text('Enemy ' + attacker.chosen.name + ' used ' + move.moveName);
            var tackleSound = new Audio('assets/sounds/Tackle.wav');
            tackleSound.currentTime = 0;
            tackleSound.play();
            tackleAnimation(attacker);
            $playerHealthBar.val(player.chosen.hitPoints);
        } else {
          $actionText.text(attacker.chosen.name + ' missed!');
          missAnimation(attacker);
          MissSound.currentTime = 0;
          MissSound.play();
        }
        window.setTimeout(function() {
            $mainBox.css('display', 'block');
            $pokemonMoves.css('display', 'flex');
            $actionText.css('display', 'none');
            $pokemonMoves.children('li').children('button').attr('disabled', false);
        }, 500);
    }
}
