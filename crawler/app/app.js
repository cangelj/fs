
var request = require("request");
var fs = require("fs");
var cheerio = require("cheerio");
var organizeName = "bocom";
var organizeNo = 5;
request({
  url: "http://www.bankcomm.com/BankCommSite/jyjr/cn/lcpd/queryFundInfoListNew.do",
  method: "GET"
}, function(e,r,b) {
  if(e || !b) { return; }
  var $ = cheerio.load(b);
  var result = [];
  // var $items = $(".fundsList .lc-item-list .mark");
  // console.log($items.html());
  // for(var i=0;i<$items.length;i++) {
  //   //var $ = cheeio.load(items[i]);
  //   //title = $("h1");
  //   result.push($(items[i]).text());
  //   console.log($(items[i]).text());
  // }
  $('.lc-item-list').each(function(idx,element){
    var $element = $(this);
     $element.children('li').each(function(ix, item){
       var $item = $(this);
       var productName = $item.find('h1').text();
       var customerLevel = $item.find('.customer_box').text();
       customerLevel = customerLevel.replace(/[\t\n\r]/g, '');
       var startAmount = $item.find('.nb').eq(0).text();
       var riskLevel = $item.find('.nb').eq(1).text();
       var earningRate = $item.find('.nb').eq(2).text();
       var productUrl = $item.find('a').attr('href');
       result.push({
         organizeName:organizeName,
         organizeNo:organizeNo,
         productName:productName,
         customerLevel:customerLevel,
         startAmount:startAmount,
         riskLevel:riskLevel,
         earningRate:earningRate,
         productUrl:productUrl
       })
     });
      // console.log($element.find('mark'));
  });
   //console.log(JSON.stringify(result));
  fs.writeFileSync("../result/bocom.json", JSON.stringify(result));
});
