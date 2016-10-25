//招商银行

var request = require("request");
var fs = require("fs");
var cheerio = require("cheerio");
var requestUrl = 'http://www.cmbchina.com/cfweb/svrajax/product.ashx?op=search&type=m&pageindex=1&salestatus=&baoben=&currency=&term=&keyword=&series=01&risk=&city=&date=&pagesize=2000&orderby=ord1&t=0.5675271345005815';
var organizeType = 1;
var organizeName = "cmb";
var organizeNo = 6;
var productBaseUrl = 'http://www.cmbchina.com/cfweb/personal/productdetail.aspx?code=';
request({
  url: requestUrl,
  method: "GET"
}, function(e,r,b) {
  if(e || !b) { return; }
  var response = eval(b);
  var recordLength = response.totalRecord;
  var recordList = [];
  var result = [];
  recordList = eval(response.list);

  for(var i=0;i<recordList.length;i++){
    var currentItem = recordList[i];
    // console.log(currentItem);
    result.push({
        organizeType:organizeType,
        organizeNo:organizeNo,
        organizeName:organizeName,
        productNo:currentItem.PrdCode,
        productName:currentItem.PrdName,
        prductType:'',
        productStyle:currentItem.Style,
        customerLevel:'',
        startAmount:currentItem.InitMoney,
        currency:currentItem.Currency,
        riskLevel:currentItem.Risk,
        earningRate:currentItem.NetValue,
        productRegion:currentItem.AreaCode,
        startDate:currentItem.BeginDate,
        endDate:currentItem.EndDate,
        expireDate:currentItem.ExpireDate,
        productTerm:currentItem.FinDate,
        productUrl:productBaseUrl+currentItem.PrdCode
      });
  }


  fs.writeFileSync("../result/cmb.json", JSON.stringify(result));
});
