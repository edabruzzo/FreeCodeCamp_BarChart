
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

  const w = 800;
  const h = 400;
  const scalefactor = 20;

  var divmain = d3.select("body")
    .append("div")
    .attr("class", "main");

  var container = divmain.append("div")
    .attr("class", "container");

  container.append("div").attr("id", "title");
  document.getElementById("title").textContent = "Produto Interno Bruto dos EUA";

  margin = {
    "top": 50,
    "right": 20,
    "bottom": 50,
    "left": 100
  };

  const svg = container
    .append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  var legenda = svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -200)
    .attr("y", 80)
    .attr("id", "legendaY");


  document.getElementById("legendaY").textContent = "Gross Domestic Product";


  //  minimoAno = new Date(dataset[0][0].substring(0, 4));
  //maximoAno = new Date(dataset[dataset.length - 1][0].substring(0, 4));

  minimoAno = dataset[0][0].substring(0, 4);
  maximoAno = dataset[dataset.length - 1][0].substring(0, 4);



  const xScale = d3.scaleLinear()
    .domain([minimoAno, maximoAno])
    .range([0, w]);


  const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, (d) => d[1])])
    .range([h, 0]);


  const xAxis = d3.axisBottom(xScale);


  tooltip = d3.select('body')
    .append('div')
    .style({
      'position': 'absolute',
      'padding': '4px',
      'background': '#fff',
      'border': '1px solid #000',
      'color': '#000'
    });


  svg.append("g")
    .attr("id", "x-axis")
    .attr("transform", "translate(0, " + (h) + ")")
    //.attr("transform", "translate(60, 400)")
    //  .attr("text-anchor", "middle")
    .attr("font-size", 10)
    .attr("font-family", "sans-serif")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-0.5em")
    .attr("dy", "-.55em")
    .attr("y", 30)
    .attr("transform", "rotate(-45)")


  const yAxis = d3.axisLeft(yScale);


  d3.select("svg")
    .append("g")
    .attr("id", "y-axis")
    //.attr("transform", "translate(0, " + h + ")")
    .attr("transform", "translate(60, 0)")
    .attr("font-size", 10)
    .attr("font-family", "sans-serif")
    .call(yAxis)
    .append("text")
    .style("text-anchor", "end")
    .attr("dx", "0.8em")
    .attr("dy", "-.55em")
    .attr("y", 30)
    .text("Values(billions)");




  //MouseHandlers

  function mouseOverHandler(d){

      tooltip.transition().style('opacity', .8)
      tooltip.html('<p> Date: '+d[0]+"</p>"+
                  "<p>Value(billions): "+d[1]+"</p>")
      d3.select(this).style('opacity', .1);
  };

  function mouseOutHandler(d){

    tooltip.transition().style('opacity', 0)
    d3.select(this).style('opacity', 1);
};


function mouseMoveHandler(d){

  tooltip.style("top",(d3.event.pageY -10)+'py')
  tooltip.style("left",(d3.event.pageX +10)+'px')
  d3.select(this).style('opacity', 0.8);
};
  
  svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * (w / dataset.length))
    .attr("y", (d) => yScale(d[1]))
    .attr("data-gdp", (d) => d[1])
    .attr("data-date", (d) => d[0])
    .attr("width", w / dataset.length)
    .attr("height", (d, i) => h - yScale(d[1]))  
    .style("fill", "rgb(51 173 255)")  
    .on("mouseover", mouseOverHandler)
    .on("mousemove", mouseMoveHandler)
    .on("mouseout" , mouseOutHandler);
    
 };