"use strict";

var yum = document.getElementById('bigCookie');
var ITEMS = 11;
var titles = [];
var ratewords = [];
var rates = [0.1,0.5,4,10,40,100,400,6666,98765,1022031,10220312];
var pricewords = [];
var prices = [15,100,500,3000,10000,40000,200000,1.667e6,123.456e6,4e9,75e9];
var pricePerCpS = [];
var sortedValueBuys = [];
var timeToAll = [];
var spree = false;
var keepClicker = false;
var keepCircleClicker = false;

var addClickerButton = document.createElement('button');
var addCircleClicker = document.createElement('button');
var addShopperButton = document.createElement('button');

function refreshButtonNames(){
  addClickerButton.innerHTML = keepClicker ? "Stop Auto-Clicker" : "Start Auto-Clicker";
  addCircleClicker.innerHTML = keepCircleClicker ? "Stop Circle Clicker" : "Start Circle Clicker";
  addShopperButton.innerHTML = spree ? "Stop Shop and Roll" : "Start Shopping Spree";
}

var buttonsLoaded;
if(!buttonsLoaded){
  var topbar = document.getElementById('topBar').childNodes[1];
  topbar.innerHTML="";
  topbar.appendChild(addClickerButton);
  topbar.appendChild(addCircleClicker);
  topbar.appendChild(addShopperButton);
  buttonsLoaded = true;
  refreshButtonNames();

  addClickerButton.addEventListener('click',function(){
    if(keepClicker){
      stopCookieClicker();
    }
    else {
      startCookieClicker();
    }
    refreshButtonNames();
  });
  addCircleClicker.addEventListener('click',function(){
    if(keepCircleClicker){
      stopCircleClicker();
    }
    else {
      startCircleClicker();
    }
    refreshButtonNames();
  });
  addShopperButton.addEventListener('click',function(){
    if(spree){
      stopShopping();
    }
    else {
      startShopping();
    }
    refreshButtonNames();
  });
}

function startCookieClicker(){
  keepClicker = true;
  clicked();
}

function stopCookieClicker(){
  keepClicker = false;
}

function clicked(){
  yum.click();
  document.getElementById('goldenCookie').click();
  document.getElementById('seasonPopup').click();
  if(keepClicker){
    setTimeout(clicked,0);  
  }
}

function startCircleClicker(){
  keepCircleClicker = true;
  circleClick();
}

function stopCircleClicker(){
  keepCircleClicker = false;
}

function circleClick(){
  var width = document.getElementById('backgroundLeftCanvas').getAttribute('width');
  var height = document.getElementById('backgroundLeftCanvas').getAttribute('height');
  var centerX = parseInt(width)/2;
  var centerY = parseInt(height)*0.4;

  var angle = 0;
  var radius = 150;
  
  function radianClicker(){
    if(angle > 2*Math.PI){
      angle = 0;
    }
    Game.mouseX = centerX + radius * Math.cos(angle);
    Game.mouseY = centerY + radius * Math.sin(angle);
    yum.click();
    document.getElementById('goldenCookie').click();
    angle += Math.PI / 12;
    if(keepCircleClicker){
      setTimeout(radianClicker,0);
    }
  }
  radianClicker();
}

// clicked();
console.log('startShopping() to buy the best value item as soon as it is affordable. stopShopping() to stop. Accessible vars: ratewords, rates, pricewords, prices, pricePerCpS')

function goShopping(){
  buyBestItem();
  if(spree){
    setTimeout(goShopping,10);
  }
}

function startShopping(){
  if(!spree){
    spree = true;
    goShopping();
  }
}

function stopShopping(){
  spree = false;
}

function buyBestItem(){
  updatePrices();

  var myCookies = numberfy(document.getElementById('cookies').childNodes[0].wholeText);
  var best_value_index = index_of_lowest(pricePerCpS);
  if(prices[best_value_index] <= myCookies){
    document.getElementById('productPrice'+best_value_index).click();
  }
  else{
    for(var i=best_value_index-1; i > 0; --i){
      if(pricePerCpS < timeToNextBiggest() && prices[i] <= myCookies){
        document.getElementById('productPrice'+i).click();
      }
    }
  }
}

function updatePrices(){
  for(var i=0;i<ITEMS;++i){
    pricewords[i] = document.getElementById('productPrice'+i).innerHTML;
    prices[i] = numberfy(pricewords[i]);

    document.getElementById('product'+i).onmouseover(); // Hover over item updates div to get production rates for each item
    ratewords[i] = document.getElementsByClassName('data')[0].childNodes[1].innerHTML;
    rates[i] = numberfy(ratewords[i]);

    pricePerCpS[i] = prices[i]/rates[i];
  }
}

function index_of_lowest(nums){
  var lowest = nums[0];
  var index = 0;
  for(var i=1;i<nums.length;++i){
    if(nums[i]<lowest){
      lowest = nums[i];
      index=i;
    }
  }
  return index;
}

function numberfy(wordnumber){
  var magnitude = {"million": 1e6, "billion": 1e9, "trillion": 1e12, "quadrillion": 1e15, "quintillion": 1e18, "sextillion": 1e21, "septillion": 1e24, "octillion": 1e27, "nonillion": 1e30, "decillion": 1e33, "undecillion": 1e36, "duodecillion": 1e39, "tredecillion": 1e42, "quattuordecillion": 1e45};
  var num_mag = wordnumber.replace(/,/g,"").split(' ');
  num_mag[0] = parseFloat(num_mag[0]);
  if(num_mag.length == 1){
    return num_mag[0];
  }
  else{
    return num_mag[0]*magnitude[num_mag[1]];
  }
}

function timeToNextBiggest(){
  var makeRate = numberfy(document.getElementById('cookies').childNodes[3].innerHTML.split(': ')[1]);
  var myCookies = numberfy(document.getElementById('cookies').childNodes[0].wholeText);

  for(var i=0 ; myCookies > prices[i]; ++i){
    pricewords[i] = document.getElementById('productPrice'+i).innerHTML;
    prices[i] = numberfy(pricewords[i]);
  }
  return (prices[i]-myCookies)/makeRate;
}

function getTimeToAll(){
  var makeRate = numberfy(document.getElementById('cookies').childNodes[3].innerHTML.split(': ')[1]);
  var myCookies = numberfy(document.getElementById('cookies').childNodes[0].wholeText);

  updatePrices();

  for(var i=0 ; i < ITEMS; ++i){
    timeToAll[i] = (prices[i]-myCookies)/makeRate;
  }
  return timeToAll;
}

function getTitles(){
  for(var i=0; i<ITEMS; ++i){
    titles[i] = document.getElementById('productName'+i).innerHTML;
  }
}

function valueSort(){
  getTitles();
  updatePrices();
  var duplicate = JSON.parse(JSON.stringify(pricePerCpS));

  duplicate.sort();
  for(var i=0; i<ITEMS; ++i){
    sortedValueBuys[i] = titles[pricePerCpS.indexOf(duplicate[i])];
  }
  return sortedValueBuys;
}