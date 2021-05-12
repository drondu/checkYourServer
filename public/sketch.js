
var dateType = {month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
var myChart1;

function convertTime(unixTimestamp){
    const dateObject = new Date(unixTimestamp);
    const humanDateFormat = dateObject.toLocaleString();
    return humanDateFormat;
}

function labelsY(yAxes){
    if(yAxes == "temperature") 
        return 'Temperature[°C]';
    if(yAxes == "time") 
        return 'Date[dd/mm/yy hh/mm/ss]';
    if(yAxes == "used") 
        return 'Memory used[GB]';
    if(yAxes == "available") 
        return 'Memory available[GB]';
    if(yAxes == "downspeed") 
        return 'Down Speed';
    if(yAxes == "upspeed") 
        return 'Up Speed';  
}

function processTooltipModel(model) {
    if (!model.body) {
      return;
    }
    const tooltip = document.getElementById("tooltip");
    tooltip.style.left = model.caretX + "px";
    tooltip.style.top = model.caretY - 66 - 5 + "px";
    tooltip.style.display = "block";

    const john = model.dataPoints[0].label.toLocaleString();
    const ion = parseInt(john);
    const dateObject = new Date(ion);
    console.log(convertTime(dateObject));

    tooltip.querySelector(".tooltip-label").textContent = convertTime(dateObject);
    tooltip.querySelector(".tooltip-value .value").textContent = model.dataPoints[0].value; 
}

var middlewareToMakeTicksUnique = function(next) {
    return function(value, index, values) {
        var nextValue = next(value);

        if (index && values.length > index+1 && // always show first and last tick
            // don't show if next or previous tick is same
            (next(values[index + 1]) === nextValue || next(values[index - 1]) === nextValue)
        ){
            return null;
        }
        return nextValue;
    }
};

async function axes(obj,yAxes){
    var res = await fetch(baseURL + '/api');
    var data = await res.json();
    
    let temp = obj;
    for(item of data){
        
        temp.xs.push(item.timestamp);
        if(yAxes == "used") 
            temp.ys.push(item.useful);
    
        if(yAxes == "temperature")
            temp.ys.push(item.temperature);
        
        if(yAxes == "available")
            temp.ys.push(item.available);
        
        if(yAxes == "downspeed")
            temp.ys.push(item.dwnSpeed);

        if(yAxes == "upspeed")
            temp.ys.push(item.upSpeed);
        
        console.log("Host: " + item.host + " Name: "+ item.name + " Temperature: " + item.temperature + " Time: " + item.timestamp  + " Memory used: " + item.used + " Memory Available: " + item.available); 
        console.log("Host: " + item.host + " Name: " + item.name + " DownSpeed: " + item.dwnSpeed + " UpSpeed: " + item.upSpeed + " Time: " + item.timestamp );
        
    }

    obj = temp;
}

async function chartIt1(yAxes){
    const colors1 = ['#ff0000','#003366','#cccc00','#00cc00','#6600cc','#3399ff','#ff6600','#ff00ff','#990000', '#990099','#00ff00','#0000ff','#660066','#632064','#8e8a06'];
   
    let obj = {xs: [], ys:[]};

    await axes(obj, yAxes);
   
    const ctx = document.getElementById('chart1').getContext('2d');
    
    let data1 = {
        labels: obj.xs,
        datasets: [{
            data: obj.ys,
            label: false,
            fill: false,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1  ,
            hoverBackgroundColor: '#0673aa',
            hoverBorderColor: '#044769'               
        }]
    };
    let scales1 = {
        yAxes:[{
            ticks:{
                callback: function(value, index, values){
                    if(Math.floor(value) === value && yAxes == "temperature") 
                        return value;
                    else if(Math.floor(value) === value && yAxes == "used") 
                        return value;
                    else if(Math.floor(value) === value && yAxes == "available") 
                        return value;
                    else if(Math.floor(value) === value && yAxes == "downspeed") 
                        return value;
                    else if(Math.floor(value) === value && yAxes == "upspeed") 
                        return value;
                },
            },
            scaleLabel: {
                display: true,
                fontSize: 18,
                labelString: labelsY(yAxes)
            }
        }],
        xAxes:[{
            display: true,
            ticks:{
                callback: convertTime,
                maxRotation: 90,
                minRotation: 20,
                maxTicksLimit:100,
            },
            stacked: true,
            scaleLabel: {
                display: true,
                fontSize: 18,
                labelString: 'Date[dd/mm/yy hh/mm/ss]'
            },
            showXLabels:true,
        }]
    };

    if (myChart1) {
        myChart1.destroy();
    }
    

    myChart1 = new Chart(ctx, {
        type: 'bar',
        data: data1,
            options:{
                maintainAspectRatio: true,
                responsive: true,
                scales: scales1,
                legend:{
                    display:false
                },
                tooltips:{
                    enabled: false,
                    custom: processTooltipModel,
                    intersect: false,
                    mode: "index"
                }
            }
    }); 
}

consoleText(['Servers monitoring', 'Scripts', 'Charts.','Made with Love'], 'text',['white','white','white']);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 400)
}

function TestsFunction() {
    var T = document.getElementById("container_graphs_1");
    T.style.display = "block";
}