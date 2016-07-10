var $opponentHealthBar = $('.healthBar.opponent');
var $playerHealthBar = $('.healthBar.player');
var $playerExBar = $('#expBar');
var $pokemonType = $('#pokemonType');
var $pokemonMoves = $('.moves-list');
var $mainBox = $('.main-box');
var $actionText = $('.action');
var playerHealth = 0;
var playerHealthMax = 0;
var opponentHealth = 0;
var opponentHealthMax = 0;

var opponnentIsDead = false;

var faintSound = new Audio('assets/sounds/faint.wav');
var victorySound = new Audio('assets/sounds/victory.mp3');
var MissSound = new Audio('assets/sounds/MissSound.mp3');
var criticalHitSound = new Audio('assets/sounds/criticalHit.wav');

function battle() {
    $pokemonMoves.children('li').children('button').attr('disabled', false);

    opponnentIsDead = false;
    var opponentPokemon = opponent.chosen.name;
    opponentHealth = opponent.chosen.hitPoints;
    opponentHealthMax = opponentHealth;
    var opponentLevel = opponent.chosen.level;

    var playerPokemon = player.chosen.name;
    playerHealth = player.chosen.hitPoints;
    playerHealthMax = playerHealth;
    var playerLevel = player.chosen.level;

    $('#opponent-name').text(opponent.userName);
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
    $playerHealthBar.removeClass('low-health medium-health');
    $opponentHealthBar.removeClass('low-health medium-health');

    $pokemonMoves.empty();
    player.chosen.moves.forEach(function(move) {
        var $move = $('<li><button>' + move.moveName + '</button></li>')
        $pokemonMoves.append($move);
        $move.on('click', actionMove.bind(null, move, player));
    });
    while ($pokemonMoves.children().length < 4) {
        var $missingMove = $('<li>—</li>')
        $pokemonMoves.append($missingMove);
    }
}

function actionMove(move, attacker) {
    if (move.moveName === 'tackle') {
        if (didHit(move)) {
            var takleSound = new Audio('assets/sounds/Tackle.wav');
            console.log('HIT');
            console.log(attacker);
            let damage = 0;
            tackleAnimation(attacker);
            if (didCritHit(move)) {
                damage = move.damage * move.critDmgMod;
                $actionText.text('Critical hit!');
                criticalHitSound.currentTime=0;
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
                playerHealth -= damage;

                if (playerHealth <= 0) {
                    console.log('YOU LOSE!');
                    $playerHealthBar.val(0);
                    faintSound.play();
                    $pokemonMoves.children('li').children('button').attr('disabled', true);
                    window.setTimeout(function() {
                      renderWinScreen(opponent);
                    }, 2500);
                } else {
                    $playerHealthBar.val(playerHealth);
                }
                if (playerHealth <= playerHealthMax / 4) {
                    $playerHealthBar.addClass('low-health');
                } else if (playerHealth <= playerHealthMax / 2) {
                    $playerHealthBar.addClass('medium-health');
                }

            } else {
                opponentHealth -= damage;

                if (opponentHealth <= 0) {
                    console.log('YOU WIN!');
                    $opponentHealthBar.val(0);

                    window.setTimeout(function() {
                    renderWinScreen(player);
                  }, 2500);
                    opponnentIsDead = true;
                    victorySound.play();
                } else {
                    $opponentHealthBar.val(opponentHealth);
                    // tackleAnimation(attacker);
                }

                if (opponentHealth <= opponentHealthMax / 5) {
                    $opponentHealthBar.addClass('low-health');
                } else if (playerHealth <= playerHealthMax / 2) {
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
    if (attacker === opponent) {
    } else if (!opponnentIsDead) {
        window.setTimeout(function() {
            computerMove();
        }, 500);
    }
}

function resetMoves() {
    $pokemonMoves.css('display', 'none');
    $actionText.css('display', 'inline');
    $mainBox.css('display', 'flex');

    window.setTimeout(function() {
        $mainBox.css('display', 'block');
        $pokemonMoves.css('display', 'flex');
        $actionText.css('display', 'none');
    }, 500);
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

function tackleAnimation(attacker) {
  if (attacker === player) {
    $('.player.pokemon').css('transform', 'translateX(50%)');
    window.setTimeout(function() {
        $('.player.pokemon').css('transform', 'translateX(0)');
    }, 200);
  } else {
    $('.opponent.pokemon').css('transform', 'translateX(-50%)');
    window.setTimeout(function() {
        $('.opponent.pokemon').css('transform', 'translateX(0)');
    }, 200);
  }
}
function missAnimation(attacker) {
  if (attacker === player) {
    $('.player.pokemon').css('transform', 'translateX(-30%)');
    window.setTimeout(function() {
        $('.player.pokemon').css('transform', 'translateX(0)');
    }, 200);
  } else {
    $('.opponent.pokemon').css('transform', 'translateX(30%)');
    window.setTimeout(function() {
        $('.opponent.pokemon').css('transform', 'translateX(0)');
    }, 200);
  }
}


function computerMove() {
    var opponentMove = opponent.chosen.moves[Math.floor(Math.random() * opponent.chosen.moves.length)];
    actionMove(opponentMove, opponent);
    console.log(opponentMove);
}
