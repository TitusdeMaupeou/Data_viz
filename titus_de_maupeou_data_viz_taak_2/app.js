var datarequest = new XMLHttpRequest();
datarequest.open('GET', '/data', true);

datarequest.onload = function () {
    var data = JSON.parse(this.response);
    console.log(data)
    var height = 1080;
    var width = 1920;

    var svg = d3.select("body").append("svg").attr("height", height).attr("width", width)

    var margin = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };

    var england = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    england.call(d3.zoom().scaleExtent([0.2, 40]).on("zoom", function () {
        england.attr("transform", d3.event.transform)
    }));
    
    england.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("cx", function (d) {
            return d.easting / 900;
        })
        .attr("cy", function (d) {
            var y = 800000 - d.northing;
            //var max = d3.max([data]);
            //console.log(max);
            //console.log(d.northing/900)
            return y/900;
        })
        .attr("r", 0.3)
        .on("mouseover", function (d) {
            var xPos = parseFloat(d3.select(this).attr("cx"));
            var yPos = parseFloat(d3.select(this).attr("cy"));
            d3.select("#tooltip")
                .style("left", xPos + "px")
                .style("top", yPos + "px")
                .text(d.name + ", " + d.address)

            d3.select("#tooltip").classed("hidden", false);
        })
        .on("click", function (d) {
            var id = d.fas_id;
            var newURL = window.location.href + 'nearest/' + id;
            window.location.href = newURL;
        })
}

datarequest.send();