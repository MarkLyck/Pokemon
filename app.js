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
  this.level = 1;
  this.exP = 0;
  this.exPMax = 100;
  this.type = type;
  this.imgSrc = imgSrc;
  this.hitPoints = hitPoints || 30;
  this.maxHitPoints = hitPoints || 30;
  this.moves = moves || [tackle];
}
var Pikachu = new Pokemon('Pikachu', 'electric', 'assets/images/pokemon_characters/pokemon_pikachu.png');
var Charmander = new Pokemon('Charmander', 'fire', 'assets/images/pokemon_characters/pokemon_charmander.png');
var Bulbasaur = new Pokemon('Bulbasaur', 'grass', 'assets/images/pokemon_characters/pokemon_bulbasar.png');
var Squirtle = new Pokemon('Squirtle', 'water', 'assets/images/pokemon_characters/pokemon_squirtle.png');
var Pidgey = new Pokemon('Pidgey', 'flying', 'assets/images/pokemon_characters/pokemon_pidgey.png');
var Magikarp = new Pokemon('Magikarp', 'water', 'assets/images/pokemon_characters/pokemon_magikarp.png');

function Player (userName, playerNo){
  this.userName = userName;
  this.playerNo = playerNo || 1;
  this.isWaiting = true;
  this.wins = 0;
  this.losses = 0;
  this.pkmn = [Pikachu,Charmander,Bulbasaur,Squirtle,Pidgey,Magikarp];
}
var userName = 'Ash';
var player = new Player(userName);
var opponent = new Player('opponent', 2);
