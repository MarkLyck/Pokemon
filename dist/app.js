function Move(moveName, type, damage, powerPoints, accuracy, critDmgMod, critChance) {
  this.moveName = moveName || 'tackle';
  this.type = type || 'normal';
  this.damage = damage || 50;
  this.powerPoints = powerPoints || 15;
  this.accuracy = accuracy || 0.8;
  this.critDmgMod = critDmgMod || 1.5;
  this.critChance = critChance || 0.2;
}
var tackle = new Move();

function Pokemon (name, type, hitPoints, moves) {
  this.name = name;
  this.level = 1;
  this.exP = 0;
  this.exPMax = 100;
  this.type = type;
  this.hitPoints = hitPoints || 30;
  this.moves = moves || [tackle];
}
var pokemon = new Pokemon('Pikachu', 'electric');

function Player (userName, playerNo){
  this.userName = userName;
  this.playerNo = playerNo || 1;
  this.isWaiting = true;
  this.wins = 0;
  this.losses = 0;
}
var userName = 'Ash';
var player = new Player(userName);
var computer = new Player('computer', 2);
