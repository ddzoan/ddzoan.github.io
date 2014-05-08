var width = 5;
var current;

window.addEventListener('load',function(){
  initialize();
  // var row = document.createElement('tr');
  // var cell = document.createElement('td');
  // cell.innerHTML = 'tacos';
  // row.appendChild(cell);
  // grid.appendChild(row);

});

function initialize(){
  var nums = arrayGen();
  current = 1;
  shuffler(nums);
  makeGrid(nums);
}

function makeGrid(nums){
  var grid = document.getElementById('grid');

  grid.innerHTML = "";

  var index = 0;
  for(var i=0; i < width; i++){
    var row = document.createElement('tr');
    for(var j=0; j < width; j++){
      var cell = document.createElement('td');
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
    this.innerHTML = "";
    ++current;
  }
}