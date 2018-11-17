
var url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

req = new XMLHttpRequest();
req.open("GET", url, true);
req.send();
req.onload = function () {
  json = JSON.parse(req.responseText);

  console.log(JSON.stringify(json));

  const dataset = json.data;

  console.log(dataset);
  //document.write(dataset);

  const w = 900;
  const h = 460;
  const scalefactor = 20;

  var divmain = d3.select("body")
    .append("div")
    .attr("class", "main");

  var container = divmain.append("div")
    .attr("class", "container");

  container.append("div").attr("id", "title");
  document.getElementById("title").textContent = "Produto Interno Bruto dos EUA";

  const svg = container
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  var legenda = svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -200)
    .attr("y", 80)
    .attr("id", "legendaY");

  document.getElementById("legendaY").textContent = "Gross Domestic Product";


  minimoAno = new Date(dataset[0][0].substring(0, 4));

  maximoAno = new Date(dataset[dataset.length - 1][0].substring(0, 4));

  const xScale = d3.scaleLinear()
    .domain([minimoAno, maximoAno])
    .range([0, w]);


  const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, (d) => d[1])])
    .range([h, 0]);
  

  svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * (w/dataset.length))
    .attr("y", (d) => yScale(d[1]))
    .attr("data-gdp", (d) => d[1])
    .attr("data-date", (d) => d[0])
    .attr("width", w/dataset.length)
    .attr("height", (d,i) => h - yScale(d[1]))
    .style("fill", "rgb(51 173 255)")


};
