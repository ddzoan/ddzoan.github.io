Parse.initialize("ZrLQROBsd6m9UVXcydvrW0vsQdz5lBXfWR3I4iMm", "AiViXjR11sw866d5vPSDnNOZ5LRDU3ngvxGg9PCc");
var width = 4;
var current;
var startTime;
var GameScore = Parse.Object.extend("GameScore");

window.addEventListener('load',function(){
  initialize();
  // GameScore = Parse.Object.extend("GameScore");
});

function initialize(){
  var nums = arrayGen();
  current = 1;
  shuffler(nums);
  makeGrid(nums);
  makeScoreList();
}

function makeScoreList(){
  var highScores = document.getElementById('highscores');

  highscores.innerHTML = "";

  var query = new Parse.Query(GameScore);
  query.ascending("score");
  query.limit(10);
  query.find({
    success: function(results){
      // console.log(results);
      var list = document.createElement('ol');
      for(var i=0; i < results.length; ++i){
        var item = document.createElement('li');
        item.appendChild(document.createTextNode(results[i].get('name') + ' - ' + results[i].get('score') + ' milliseconds'));
        list.appendChild(item);
      }
      highScores.appendChild(list);
    },
    error: parseError
  });
}

function makeGrid(nums){
  var grid = document.getElementById('grid');

  grid.innerHTML = "";

  var index = 0;
  for(var i=0; i < width; i++){
    var row = document.createElement('div');
    for(var j=0; j < width; j++){
      var cell = document.createElement('span');
      cell.innerHTML = nums[index++];
      cell.addEventListener('click',clear);
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
}

function arrayGen(){
  var numbers = [];
  for(var i=1; i <= width*width; ++i){
    numbers.push(i);
  }
  return numbers;
}

function shuffler(nums){
  for(var i=0; i < nums.length; ++i){
    var index = Math.floor(Math.random()*(nums.length-i));
    var temp = nums[i];
    nums[i] = nums[i+index];
    nums[i+index] = temp;
  }
}

function clear(){
  if (parseInt(this.innerHTML) == current){
    if(current == 1){
      startTime = Date.now();
    }
    this.innerHTML = "&nbsp;";
    ++current;
    if(current > width*width){
      var stopTime = Date.now();
      var millis = stopTime-startTime;
      submitScore(millis);
      initialize();
    }
  }
}

function submitScore(millis){
  var name = prompt('You got a time of ' + millis/1000.00 + ' seconds. Enter your name to submit your score!');
  if(name != null && name != "") {
    var gameScore = new GameScore();
    gameScore.set('score',millis);
    gameScore.set('name',name);
    gameScore.save(null, {
      success: function(){
        console.log('success');
      },
      error: parseError
    });
  }
}

function parseError(error){
  console.error('WTF: ' + error.code + " " + error.message);
}