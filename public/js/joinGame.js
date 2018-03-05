const getHostedGames = function () {
  document.querySelector('#loader-wrapper').style.display = 'none';
  utils.poll(utils.get(),'/getHostedGames',showHostedGames);
};

const joinGame = function(){
  let gameId = event.target.id;
  let name = document.querySelector('#username2').value;
  if(name){
    let userDetails = utils.toS({username:name,gameId:gameId});
    utils.sendAjax(utils.post(),'/join',startgameMessage,userDetails);
  }
  return;
};

const startgameMessage = function(){
  location.href = "game.html";
};

const openJoinBlock = function () {
  let gameId = event.target.parentNode.id;
  let joinForm = document.querySelector('.joinForm');
  joinForm.id = gameId;
  document.getElementById('joinBlock').style.display='block';
};

const showHostedGames = function () {
  let hostedGames = utils.getResponse(this);
  let getHostedGamesTable = utils.getHostedGamesTable();
  getHostedGamesTable.innerHTML = '';
  hostedGames.reduce(utils.appendGame,getHostedGamesTable);
};

window.onload = getHostedGames;
