function battleMultiplayerOpponentMove(move,attacker){
  if (move.moveName === 'tackle') {
      if (didHit(move)) {
          var takleSound = new Audio('assets/sounds/Tackle.wav');
          let damage = 0;
          tackleAnimation(attacker);
          if (didCritHit(move)) {
              damage = move.damage * move.critDmgMod;
              $actionText.text('Critical hit!');
              criticalHitSound.currentTime = 0;
              criticalHitSound.play();
              resetMoves();
          } else {
              takleSound.play();
              damage = move.damage;
              if (attacker === player) {
                  $actionText.text(attacker.chosen.name + ' used ' + move.moveName + '!');
              } else {
                  $actionText.text('Enemy ' + attacker.chosen.name + ' used ' + move.moveName + '!');
              }
              resetMoves();
          }
          if (attacker === opponent) {
              player.chosen.hitPoints -= damage;

              if (player.chosen.hitPoints <= 0) {
                  console.log('YOU LOSE!');
                  $playerHealthBar.val(0);
                  faintSound.play();
                  $pokemonMoves.children('li').children('button').attr('disabled', true);
                  window.setTimeout(function() {
                      renderWinScreen(opponent);
                  }, 2500);
              } else {
                  $playerHealthBar.val(player.chosen.hitPoints);
              }
              if (player.chosen.hitPoints <= playerHealthMax / 4) {
                  $playerHealthBar.addClass('low-health');
              } else if (player.chosen.hitPoints <= playerHealthMax / 2) {
                  $playerHealthBar.addClass('medium-health');
              }

          } else {
              opponent.chosen.hitPoints -= damage;
              if (opponent.chosen.hitPoints <= 0) {
                  console.log('YOU WIN!');
                  $opponentHealthBar.val(0);

                  window.setTimeout(function() {
                      renderWinScreen(player);
                  }, 2500);
                  opponentIsDead = true;
                  victorySound.play();
              } else {
                  $opponentHealthBar.val(opponent.chosen.hitPoints);
                  // tackleAnimation(attacker);
              }

              if (opponent.chosen.hitPoints <= opponentHealthMax / 5) {
                  $opponentHealthBar.addClass('low-health');
              } else if (player.chosen.hitPoints <= playerHealthMax / 2) {
                  $opponentHealthBar.addClass('medium-health');
              }
          }
      } else {
          console.log('MISSED');
          $actionText.text(attacker.chosen.name + ' missed!');
          missAnimation(attacker);
          MissSound.currentTime = 0;
          MissSound.play();
          resetMoves();
      }
  }
}
