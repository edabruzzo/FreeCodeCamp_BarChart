
var url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

    req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.send();
    req.onload = function () {
      json = JSON.parse(req.responseText);
    

  console.log(JSON.stringify(json));    

  const dataset = json.data;
     
  console.log(dataset);

  d3.select("body").selectAll("div")
    .data(dataset)
    .enter()
    .append("div")
    .attr("class", "bar")
    .style("height", (d) => (d + "px"));

  document.getElementsByClassName(`message`)[0].textContent = JSON.stringify(json);
  
  };      