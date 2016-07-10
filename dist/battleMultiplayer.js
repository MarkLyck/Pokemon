function battleMultiplayerOpponentMove(move, attacker) {
    if (move.moveName === 'tackle') {
        if (!attacker.didMiss) {
            $actionText.text('Enemy ' + attacker.chosen.name + ' used ' + move.moveName);
            var tackleSound = new Audio('assets/sounds/Tackle.wav');
            tackleSound.currentTime = 0;
            tackleSound.play();
            tackleAnimation(attacker);
        } else {
          $actionText.text(attacker.chosen.name + ' missed!');
          missAnimation(attacker);
          MissSound.currentTime = 0;
          MissSound.play();

        }
        resetMoves();
    }
}
