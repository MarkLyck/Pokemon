var $opponentHealthBar = $('.healthBar.opponent');
var $playerHealthBar = $('.healthBar.player');
var $playerExBar = $('#expBar');
var $pokemonType = $('#pokemonType');
var $pokemonMoves = $('.moves-list');
var $actionText = $('.action');
var playerHealth = 0;
var opponentHealth = 0;

function battle() {
    var opponentPokemon = opponent.chosen.name;
    opponentHealth = opponent.chosen.hitPoints;
    var opponentLevel = opponent.chosen.level;

    var playerPokemon = player.chosen.name;
    playerHealth = player.chosen.hitPoints;
    var playerLevel = player.chosen.level;

    $('.pokemonName.opponent').text(opponentPokemon);
    $opponentHealthBar.attr('max', opponentHealth);
    $opponentHealthBar.val(opponentHealth);
    $('.pokemonLevel.opponent').text('Lv' + opponentLevel);


    $('.pokemonName.player').text(playerPokemon);
    $playerHealthBar.attr('max', playerHealth);
    $playerHealthBar.val(playerHealth);
    $('.pokemonLevel.player').text('Lv' + playerLevel);
    $playerExBar.attr('max', player.chosen.exPMax);
    $playerExBar.val(player.chosen.exP);
    $pokemonType.text(player.chosen.type.toUpperCase());

    $('.player.pokemon').attr('src', player.chosen.imgSrc + 'Behind.png');
    $('.opponent.pokemon').attr('src', opponent.chosen.imgSrc + 'Front.png');


    $pokemonMoves.empty();
    player.chosen.moves.forEach(function(move) {
        var $move = $('<li><button>' + move.moveName + '</button></li>')
        $pokemonMoves.append($move);
        $move.on('click', actionMove.bind(null, move));
    });
    while ($pokemonMoves.children().length < 4) {
      var $missingMove = $('<li>—</li>')
      $pokemonMoves.append($missingMove);
    }
}

function actionMove(move, attacker) {
    $pokemonMoves.children('li').children('button').attr('disabled', true);
    if (move.moveName === 'tackle') {
        if (didHit(move)) {
            console.log('HIT');

            let damage = 0;
            if (didCritHit(move)) {
                damage = move.damage * move.critDmgMod;
                $actionText.text('Critical hit!');
                resetMoves();
            } else {
                damage = move.damage;
            }
            if (attacker === 'opponent') {
                playerHealth -= damage;

                if (playerHealth <= 0) {
                    console.log('YOU LOSE!');
                    $playerHealthBar.val(0);
                    renderWinScreen(opponent);
                } else {
                    $playerHealthBar.val(playerHealth);
                }
            } else {
                opponentHealth -= damage;

                if (opponentHealth <= 0) {
                    console.log('YOU WIN!');
                    $opponentHealthBar.val(0);
                    renderWinScreen(player);
                } else {
                    $opponentHealthBar.val(opponentHealth);
                }
            }
        } else {
            console.log('MISSED');
            $actionText.text(player.chosen.name + ' missed!');
            resetMoves();
        }
    }
    if (attacker === 'opponent') {
        $pokemonMoves.children('li').children('button').attr('disabled', false);

    } else {
        computerMove();
    }
}

function resetMoves() {
    $pokemonMoves.css('display', 'none');
    $actionText.css('display', 'inline');
    window.setTimeout(function() {
        $pokemonMoves.css('display', 'flex');
        $actionText.css('display', 'none');
    }, 1500);
}

function didHit(move) {
    if (Math.random() <= move.accuracy) {
        return true;
    } else {
        return false;
    }
}

function didCritHit(move) {
    if (Math.random() <= move.critChance) {
        return true;
    } else {
        return false;
    }
}

function computerMove() {
    var opponentMove = opponent.chosen.moves[Math.floor(Math.random() * opponent.chosen.moves.length)];
    actionMove(opponentMove, 'opponent');
    console.log(opponentMove);

}
