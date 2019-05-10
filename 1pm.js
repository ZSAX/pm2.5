var   city = require("./citydata");
const request = require('request')
const cheerio = require('cheerio')
const fs = require("fs");
var url ='https://taqm.epa.gov.tw/pm25/tw/PM25A.aspx?area=0';

process.stdin.setEncoding('utf8');
console.log("your city：");
process.stdin.on('readable',function () {   
    var chunk = process.stdin.read();
	chunk = chunk.trim();
	var citycode  = city[chunk];
	console.log(citycode);
	
	if(typeof (citycode) === "string") {
            url = "https://taqm.epa.gov.tw/pm25/tw/PM25A.aspx?area=" + citycode;
			
            getCityData(url);
        }	
})


function getCityData(url) {

request(url, (err, res, body) => {
  const $ = cheerio.load(body)
  let weathers = []
  $('#content-module .TABLE_G tbody tr').each(function(i, elem) {
    weathers.push(
      $(this)
        .text().replace(/[\n\t]/g,'')
        .split('\n')
    )})

  console.log(weathers)
})
}