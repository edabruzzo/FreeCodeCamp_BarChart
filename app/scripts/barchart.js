 
var url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

document.addEventListener('DOMContentLoaded',function(){
  document.getElementById('getMessage').onclick=function(){

req=new XMLHttpRequest();
req.open("GET",url,true);
req.send();
req.onload=function(){
json=JSON.parse(req.responseText);
document.getElementsByClassName('message')[0].innerHTML=JSON.stringify(json);
};
  };

    
    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

    d3.select("body").selectAll("div")
       .data(dataset)
       .enter()
       .append("div")
       .attr("class", "bar")
       // Add your code below this line
       .style("height", (d) => (d + "px"));
    // Add your code above this line
    
 });

