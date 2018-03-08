let utils = {};
let intervals = [];

utils.get = function() {
  return 'GET';
};

utils.post = function() {
  return 'POST';
};
utils.parse = function(text){
  return JSON.parse(text);
};

utils.getResponse = function(xhr) {
  return utils.parse(xhr.responseText);
};

utils.toS = function(content) {
  return JSON.stringify(content);
};

utils.updateMessage = function(content) {
  utils.getMessageBox().innerHTML = content;
};

utils.getTargetGrid = function() {
  return document.querySelector('#targetGrid');
};

utils.getOceanGrid = function() {
  return document.querySelector('#oceanGrid');
};

utils.getReadyButton = function() {
  return document.querySelector('#ready');
};

utils.getPopupBox = function() {
  return document.querySelector(".popup");
};

utils.getMessageBox = function() {
  return document.querySelector('.messageBox');
};

utils.setInterval = function(callback, time = 1000) {
  let interval = setInterval(callback, time);
  intervals.push(interval);
};

utils.poll = function(method, reqUrl, callBackFunction, time = 1000) {
  utils.setInterval(() => {
    utils.sendAjax(method, reqUrl, callBackFunction);
  }, time);
};

utils.clearIntervals = function() {
  intervals.forEach(function(interval) {
    clearInterval(interval);
  });
};

utils.clearLastInterval = function() {
  clearInterval(intervals.pop());
};

utils.getHostedGamesTable = function() {
  return document.querySelector('.hostedTable');
};

utils.createButton = function(name) {
  let button = document.createElement('button');
  button.innerText = name;
  return button;
};

utils.createList = function(name) {
  let list = document.createElement('li');
  list.innerText = name;
  return list;
};

utils.createDiv = function(id) {
  let div = document.createElement('div');
  div.id = id;
  return div;
};

utils.sendAjax = function(method, url, callback, data = "{}") {
  let req = new XMLHttpRequest();
  req.open(method, url);
  req.setRequestHeader('Content-Type', 'application/json');
  req.onload = callback;
  req.send(data);
};

utils.createJoinButton = function(id, onclickFun) {
  let button = utils.createButton('JOIN');
  button.id = id;
  button.onclick = onclickFun;
  return button;
};
utils.setBackgroundColor=function(rows,columnForGame,columnForButton,button){
  if (rows%2 == 1) {
    columnForGame.style.backgroundColor = "rgba(43, 63, 80, 0.58)";
    columnForButton.style.backgroundColor = "rgba(43, 63, 80, 0.58)";

  }else {
    columnForGame.style.backgroundColor = "rgba(1,1,1,0.4)";
    columnForButton.style.backgroundColor = "rgba(1,1,1,0.4)";
  }
};

utils.getColumnForButton = function(button, id) {
  let columnForButton = document.createElement('td');
  columnForButton.id = id;
  columnForButton.appendChild(button);
  return columnForButton;
};

utils.getColumnForGameName = function(gameName) {
  let columnForGameName = document.createElement('td');
  columnForGameName.innerHTML = `${gameName}'s game`;
  columnForGameName.className = "hostedGame";
  return columnForGameName;
};

utils.appendGameInTable = function(hostedGamesTable, game) {
  let rowsCount = hostedGamesTable.getElementsByTagName("tr").length;
  let button =utils.createJoinButton('joinHostedGameButton',openJoinBlock);
  let columnForButton=utils.getColumnForButton(button,game.gameId);
  let gameRow=document.createElement('tr');
  let columnForGameName=utils.getColumnForGameName(game.hostName);
  utils.setBackgroundColor(rowsCount,columnForGameName,columnForButton,button);
  gameRow.appendChild(columnForButton);
  gameRow.appendChild(columnForGameName);
  hostedGamesTable.appendChild(gameRow);
  return hostedGamesTable;
};

utils.closePopup = function(id) {
  document.getElementById(id).style.display = 'none';
};

utils.areEqual = function(firstList, secondList) {
  for (let index = 0; index < firstList.length; index++) {
    if (firstList[index] != secondList[index]) {
      return false;
    }
  }
  return firstList.length == secondList.length;
};
