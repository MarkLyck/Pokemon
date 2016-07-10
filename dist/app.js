function Move(moveName, type, damage, powerPoints, accuracy, critDmgMod, critChance) {
  this.moveName = moveName || 'tackle';
  this.type = type || 'normal';
  this.damage = damage || 5;
  this.powerPoints = powerPoints || 15;
  this.accuracy = accuracy || 0.9;
  this.critDmgMod = critDmgMod || 1.5;
  this.critChance = critChance || 0.05;
}
var tackle = new Move();

function Pokemon (name, type, imgSrc, hitPoints, moves) {
  this.name = name;
  this.level = 5;
  this.exP = 20;
  this.exPMax = 100;
  this.type = type;
  this.imgSrc = imgSrc;
  this.hitPoints = hitPoints || 30;
  this.maxHitPoints = hitPoints || 30;
  this.moves = moves || [tackle];
}
var Pikachu = new Pokemon('Pikachu', 'electric', 'assets/images/pokemon_characters/Pikachu');
var Charmander = new Pokemon('Charmander', 'fire', 'assets/images/pokemon_characters/Charmander');
var Bulbasaur = new Pokemon('Bulbasaur', 'grass', 'assets/images/pokemon_characters/Bulbasaur');
var Squirtle = new Pokemon('Squirtle', 'water', 'assets/images/pokemon_characters/Squirtle');
var Pidgey = new Pokemon('Pidgey', 'flying', 'assets/images/pokemon_characters/Pidgey');
var Magikarp = new Pokemon('Magikarp', 'water', 'assets/images/pokemon_characters/Magikarp');

function Player (userName, playerNo){
  this.userName = userName;
  this.playerNo = playerNo || 1;
  this.isWaiting = false;
  this.wins = 0;
  this.losses = 0;
  this.pkmn = [Pikachu,Charmander,Bulbasaur,Squirtle,Pidgey,Magikarp];
}

// var userName = 'Ash';
var player = new Player('Ash');
var opponent = new Player('Computer', 2);
