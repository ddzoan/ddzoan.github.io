"use strict";

var yum = document.getElementById('bigCookie');
var ITEMS = 11;
var ratewords = [];
var rates = [];
var pricewords = [];
var prices = [];
var pricePerCpS = [];
var stop = false;
function clicked(){yum.click();document.getElementById('goldenCookie').click();setTimeout(clicked,0);}
function goOnSpree(){shoppingSpree();if(!stop){setTimeout(goOnSpree,1);}}

clicked();
console.log('Set stop to true and run goOnSpree(); to buy the best value item as soon as it is affordable. Set stop to true to stop shopping spree. Accessible vars: ratewords, rates, pricewords, prices, pricePerCpS')

function shoppingSpree(){
  for(var i=0;i<ITEMS;++i){
    pricewords[i] = document.getElementById('productPrice'+i).innerHTML;
    prices[i] = numberfy(pricewords[i]);

    document.getElementById('product'+i).onmouseover(); // Hover over item updates div to get production rates for each item
    ratewords[i] = document.getElementsByClassName('data')[0].childNodes[1].innerHTML;
    rates[i] = numberfy(ratewords[i]);

    pricePerCpS[i] = prices[i]/rates[i];
  }

  var myCookies = numberfy(document.getElementById('cookies').childNodes[0].wholeText);
  var best_value_index = index_of_lowest(pricePerCpS);
  if(prices[best_value_index] <= myCookies){
    document.getElementById('productPrice'+best_value_index).click();
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
  num_mag[0] = parseInt(num_mag[0]);
  if(num_mag.length == 1){
    return num_mag[0];
  }
  else{
    return num_mag[0]*magnitude[num_mag[1]];
  }
}