var $opponentHealthBar = $('.healthBar.opponent');
var $playerHealthBar = $('.healthBar.player');
var $playerExBar = $('#expBar');
var $pokemonType = $('#pokemonType');
var $pokemonMoves = $('.moves-list');
var $mainBox = $('.main-box');
var $actionText = $('.action');

var opponentIsDead = false;

var faintSound = new Audio('assets/sounds/faint.wav');
var victorySound = new Audio('assets/sounds/victory.mp3');
var MissSound = new Audio('assets/sounds/MissSound.mp3');
var criticalHitSound = new Audio('assets/sounds/criticalHit.wav');

function battle() {
    player.chosen.hitPoints = player.chosen.maxHitPoints;
    $pokemonMoves.children('li').children('button').attr('disabled', false);
    opponentIsDead = false;
    var opponentPokemon = opponent.chosen.name;
    var opponentLevel = opponent.chosen.level;

    var playerPokemon = player.chosen.name;
    var playerLevel = player.chosen.level;

    $('#opponent-name').text(opponent.userName);
    $('.pokemonName.opponent').text(opponentPokemon);
    $opponentHealthBar.attr('max', opponent.chosen.maxHitPoints);
    $opponentHealthBar.val(opponent.chosen.hitPoints);
    $('.pokemonLevel.opponent').text('Lv' + opponentLevel);

    $('.pokemonName.player').text(playerPokemon);
    $playerHealthBar.attr('max', player.chosen.maxHitPoints);
    $playerHealthBar.val(player.chosen.hitPoints);
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
        var $move = $('<li><button>' + move.moveName + '</button></li>');
        $pokemonMoves.append($move);
        $move.on('click', function() {
          actionMove(move, player);
        });
    });
    while ($pokemonMoves.children().length < 4) {
        var $missingMove = $('<li>—</li>');
        $pokemonMoves.append($missingMove);
    }
    if (player.playerNo === 1) {
        $pokemonMoves.children('li').children('button').attr('disabled', false);
    } else if (player.playerNo === 2 && gameMode === 'multiPlayer')  {
        $pokemonMoves.children('li').children('button').attr('disabled', true);
        var waitingFirstOppMove = setInterval(function() {
            $.ajax({
                url: apiURL + player._id,
                type: 'GET',
                success: function(response) {
                    if (response.myTurn) {
                      clearInterval(waitingFirstOppMove);
                      player = response;
                      battleMultiplayerOpponentMove(player.opponentMove, opponent);
                      console.log('player2 first turn', player);
                    }
                }
            });
        }, 500);
    }
}

function actionMove(move, attacker) {
  opponent.didMiss = false;
  opponent.didCrit = false;

    if (move.moveName === 'tackle') {
        if (didHit(move)) {
            var tackleSound = new Audio('assets/sounds/Tackle.wav');
            console.log('HIT');
            console.log(attacker, ' : attacker');
            var damage = 0;
            tackleAnimation(attacker);
            if (didCritHit(move)) {
                // player.didCrit = true;
                opponent.didCrit = true;
                damage = move.damage * move.critDmgMod;
                $actionText.text('Critical hit!');
                criticalHitSound.currentTime = 0;
                criticalHitSound.play();
                resetMoves();
            } else {
                tackleSound.play();
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

                    player.myTurn = false;
                    opponent.myTurn = true;
                    opponent.opponentMove = move;
                    putPlayer(opponent);
                    faintSound.currentTime =0;
                    faintSound.play();
                    window.setTimeout(function() {
                        renderWinScreen(opponent);
                    }, 2500);
                } else {
                    $playerHealthBar.val(player.chosen.hitPoints);
                }
                if (player.chosen.hitPoints <= player.chosen.maxHitPoints / 4) {
                    $playerHealthBar.addClass('low-health');
                } else if (player.chosen.hitPoints <= player.chosen.maxHitPoints / 2) {
                    $playerHealthBar.addClass('medium-health');
                }

            } else {
                opponent.chosen.hitPoints -= damage;
                if (opponent.chosen.hitPoints <= 0) {
                    console.log('YOU WIN!');
                    $opponentHealthBar.val(0);

                    player.myTurn = false;
                    opponent.myTurn = true;
                    opponent.opponentMove = move;
                    putPlayer(opponent);

                    window.setTimeout(function() {
                        renderWinScreen(player);
                    }, 2500);
                    opponentIsDead = true;
                    victorySound.play();
                } else {
                    $opponentHealthBar.val(opponent.chosen.hitPoints);
                    // tackleAnimation(attacker);
                }

                if (opponent.chosen.hitPoints <= opponent.chosen.maxHitPoints / 5) {
                    $opponentHealthBar.addClass('low-health');
                } else if (opponent.chosen.hitPoints <= opponent.chosen.maxHitPoints / 2) {
                    $opponentHealthBar.addClass('medium-health');
                }
            }
        } else {
            opponent.didMiss = true;
            console.log('MISSED');
            $actionText.text(attacker.chosen.name + ' missed!');
            missAnimation(attacker);
            MissSound.currentTime = 0;
            MissSound.play();
            resetMoves();
        }
    }
    if (attacker === player && !opponentIsDead && gameMode === 'singlePlayer') {
        window.setTimeout(function() {
            computerMove();
        }, 500);
    } else if (attacker === player && !opponentIsDead && gameMode === 'multiPlayer') {
        player.myTurn = false;
        opponent.myTurn = true;
        opponent.opponentMove = move;
        putPlayer(opponent);
        $.ajax({
          url: apiURL + player._id,
          type: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify(player),
          success: function(response){

            var waitingForOppMove = setInterval(function() {
                $.ajax({
                    url: apiURL + player._id,
                    type: 'GET',
                    success: function(response) {
                        if (response.myTurn) {
                          console.log(response);
                          clearInterval(waitingForOppMove);
                          player = response;
                          battleMultiplayerOpponentMove(player.opponentMove, opponent);
                          if (player.chosen.hitPoints <= 0) {
                            window.setTimeout(function() {
                                renderWinScreen(opponent);
                            }, 2500);
                          }
                          if (player.chosen.hitPoints <= player.chosen.maxHitPoints / 4) {
                              $playerHealthBar.addClass('low-health');
                          } else if (player.chosen.hitPoints <= player.chosen.maxHitPoints / 2) {
                              $playerHealthBar.addClass('medium-health');
                          }
                        }
                    }
                });
            }, 500);

          }
        });

        console.log('P AFTER: ', player);
    }
}

function getOpponent() {
    $.ajax({
        url: apiURL + player.opponent,
        type: 'GET',
        success: function(response) {
            opponent = response;
        }
    });
}

function resetMoves() {
    $pokemonMoves.css('display', 'none');
    $actionText.css('display', 'inline');
    $mainBox.css('display', 'flex');

    if (gameMode === 'singlePlayer') {
        window.setTimeout(function() {
            $mainBox.css('display', 'block');
            $pokemonMoves.css('display', 'flex');
            $actionText.css('display', 'none');
        }, 500);
    }
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
