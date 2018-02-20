const Fleet = require('./fleet.js');

class Player {
  constructor(id,name) {
    this._id=id;
    this._name = name;
    this._fleet=undefined;
    this._status = 'notReady';
  }
  get playerId(){
    return this._id;
  }
  get playerName(){
    return this._name;
  }
  changeStatus(){
    this._status = 'ready';
  }
  addFleet (fleet){
    this._fleet=fleet;
  }
  getFleet(){
    return this._fleet;
  }
  isReady(){
    return this._status == 'ready';
  }
}

module.exports=Player;
