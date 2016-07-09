var $newGameBtn = $('.new-game-btn');

function renderWinScreen(){
  $('.screen').css('display', 'none');
  $('.winScreen').css('display', 'flex');
}

$newGameBtn.on('click',function(){
    $('.screen').css('display', 'none');
    $('.choose').css('display', 'block');
});
