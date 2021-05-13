
var dateType = {month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
var myChart1;
var myChart0;

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

    const labels = model.dataPoints[0].label.toLocaleString();
    const intLabels = parseInt(labels);
    const dateObject = new Date(intLabels);
    //console.log(convertTime(dateObject));

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
        if(yAxes == "used" || yAxes == "temperature" || yAxes == "available")
            console.log("Host: " + item.host + " Name: "+ item.name + " Temperature: " + item.temperature + " Time: " + item.timestamp  + " Memory used: " + item.used + " Memory Available: " + item.available); 
        
        if(yAxes == "downspeed" || yAxes == "upspeed")
            console.log("Host: " + item.host + " Name: " + item.name + " DownSpeed: " + item.dwnSpeed + " UpSpeed: " + item.upSpeed + " Time: " + item.timestamp );
        
    }

    obj = temp;
}
async function chartIt0(yAxes){
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
                maxTicksLimit: 100,     
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

    if (myChart1 && myChart0) {
        myChart1.destroy();
        myChart0.destroy();
    }
    

    myChart0 = new Chart(ctx, {
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

async function chartIt1(yAxes,minTime,maxTime){
    const colors1 = ['#ff0000','#003366','#cccc00','#00cc00','#6600cc','#3399ff','#ff6600','#ff00ff','#990000', '#990099','#00ff00','#0000ff','#660066','#632064','#8e8a06'];
   
    let obj = {xs: [], ys:[]};

    await axes(obj, yAxes);
    console.log("minTime: "+convertTime(parseInt(minTime)));
    console.log("maxTime: "+convertTime(parseInt(maxTime)));

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
                maxTicksLimit: 100,     
                min:parseInt(minTime),
                max:parseFloat(maxTime)

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

    var selectMin = document.getElementById("selectMin");
    var selectMax = document.getElementById("selectMax");
    var options = obj.xs;

    for(var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        var el2 = document.createElement("option");

        el.textContent = opt;
        el.value = opt;
        el2.textContent = opt;
        el2.value = opt;
        selectMin.appendChild(el);
        selectMax.appendChild(el2);
    }
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
//----------------------------------------------------------------------
var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect); 