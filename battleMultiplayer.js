function battleMultiplayerOpponentMove(move, attacker) {
  console.log('battleMultiplayerOpponentMove FUNCTION');
    if (move.moveName === 'tackle') {
        if (!attacker.didMiss) {
          if (attacker.didCrit){
            $actionText.text('Enemy ' + attacker.chosen.name + ' dealt a critical hit!');
            resetMoves();

            var critHitSound = new Audio('assets/sounds/criticalHit.wav');
            critHitSound.currentTime = 0;
            critHitSound.play();
            tackleAnimation(attacker);
            $playerHealthBar.val(player.chosen.hitPoints);
          } else {
            $actionText.text('Enemy ' + attacker.chosen.name + ' used ' + move.moveName);
            resetMoves();

            var tackleSound = new Audio('assets/sounds/Tackle.wav');
            tackleSound.currentTime = 0;
            tackleSound.play();
            tackleAnimation(attacker);
            $playerHealthBar.val(player.chosen.hitPoints);
          }
        } else {
          $actionText.text(attacker.chosen.name + ' missed!');
          resetMoves();

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
