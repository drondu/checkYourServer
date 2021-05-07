
var dateType = {month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
var myChart1;
var  backgroundColors = [
    'rgba(255, 99, 132, 0.2)', 'rgba(255, 205, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(54, 162, 235, 0.2)','rgba(153, 102, 255, 0.2)','rgba(201, 203, 207, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(238, 130, 238,0.2)',
    'rgba(208, 99, 71,0.2)',
    'rgba(208, 253, 71, 0.2)',
    'rgba(208, 212, 255,0.2)',
    'rgba(136, 0, 0,0.2)',
    'rgba(106, 90, 205,0.2)',
    'rgba(255, 0, 0, 0.2)',
    'rgba(255, 111, 0, 0.2)',
    'rgba(255, 255, 0, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(238, 130, 238,0.2)',
    'rgba(208, 99, 71,0.2)',
    'rgba(208, 253, 71, 0.2)',
    'rgba(208, 212, 255,0.2)',
    'rgba(136, 0, 0,0.2)',
    'rgba(106, 90, 205,0.2)',
    'rgba(255, 0, 0, 0.2)',
    'rgba(255, 111, 0, 0.2)',
    'rgba(255, 255, 0, 0.2)'
  ];
var borderColors = [
    'rgb(255, 99, 132)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)',
    'rgb(255, 159, 64)',
    'rgb(238, 130, 238)',
    'rgb(208, 99, 71)',
    'rgb(208, 253, 71)',
    'rgb(208, 212, 255)',
    'rgb(136, 0, 0)',
    'rgb(106, 90, 205)',
    'rgb(255, 0, 0)',
    'rgb(255, 111, 0)',
    'rgb(255, 255, 0)',
    'rgb(255, 99, 132)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)',
    'rgb(255, 159, 64)',
    'rgb(238, 130, 238)',
    'rgb(208, 99, 71)',
    'rgb(208, 253, 71)',
    'rgb(208, 212, 255)',
    'rgb(136, 0, 0)',
    'rgb(106, 90, 205)',
    'rgb(255, 0, 0)',
    'rgb(255, 111, 0)',
    'rgb(255, 255, 0)'
  ]

function labelsX(xAxes){
    if(xAxes == "temperature") 
        return 'Temperature[°C]';
    if(xAxes == "time") 
        return 'Date[dd/mm/yy hh/mm/ss]';
    if(xAxes == "used") 
        return 'Memory used[GB]';
    if(xAxes == "available") 
        return 'Memory available[GB]';
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
}

function processTooltipModel(model) {
    if (!model.body) {
      return;
    }
    const tooltip = document.getElementById("tooltip");
    tooltip.style.left = model.caretX + "px";
    tooltip.style.top = model.caretY - 66 - 5 + "px";
    tooltip.style.display = "block";
    tooltip.querySelector(".tooltip-label").textContent = model.dataPoints[0].label;
    tooltip.querySelector(".tooltip-value .value").textContent = model.dataPoints[0].value;
} 
function findTwentyEight(a) {
    for(i =0 ; i<=a.length;i++){
        return element = 32;
    }
}
function findTwentyNine(a) {
    for(i =0 ; i<=a.length;i++){
        return element = 32;
    }
}
function findThirty(a) {
    for(i =0 ; i<=a.length;i++){
        return element = 32;
    }
}
function findThirtyOne(a) {
    for(i =0 ; i<=a.length;i++){
        return element = 32;
    }
}
function findThirtyTwo(a) {
    for(i =0 ; i<=a.length;i++){
        return element = 32;
    }
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

async function axes(obj, xAxes,yAxes){
    var res = await fetch(baseURL + '/api');
    var data = await res.json();
    
    let temp = obj;

    for(item of data){
        time = item.timestamp;
        used =  item.used;
        available = item.available;
        temperature = item.temperature;

        if(xAxes == "time") temp.xs.push(time);
        if(xAxes == "used") temp.xs.push(used);
        if(xAxes == "temperature") temp.xs.push(temperature);
        if(xAxes == "available") temp.xs.push(available);
        
        if(yAxes == "time") temp.ys.push(time);
        if(yAxes == "used") temp.ys.push(used);
        if(yAxes == "temperature") temp.ys.push(temperature);
        if(yAxes == "available") temp.ys.push(available);
        
         console.log("Temperature: " + temperature + " " + "Time: " + time + " " + "Memory used: " + used + " " + "Memory Available: " + available); 
    }
    obj = temp;
}

async function chartIt1(xAxes,yAxes){
    const colors1 = ['#ff0000','#003366','#cccc00','#00cc00','#6600cc','#3399ff','#ff6600','#ff00ff','#990000', '#990099','#00ff00','#0000ff','#660066','#632064','#8e8a06'];
   
    let obj = {xs: [], ys:[]};

    await axes(obj, xAxes,yAxes);
    console.log("28: "+obj.ys.find(findTwentyEight));
    console.log("29: "+obj.ys.find(findTwentyNine));
    console.log("30: "+obj.ys.find(findThirty));
    console.log("31: "+obj.ys.find(findThirtyOne));
    console.log("32: "+obj.ys.find(findThirtyTwo));
    const ctx = document.getElementById('chart1').getContext('2d');
    
    let data1 = {
        labels: obj.xs,
        datasets: [{
            data: obj.ys,
            label: false,
            fill: false,
            backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1                  
        }
    ]
    };

    let scales1 = {
        yAxes:[{
            ticks:{
                callback: function(value){
                    if(yAxes == "temperature") 
                        return  value;
                    else if(yAxes == "time") 
                        return new Date(value).toLocaleDateString([], dateType);
                    else if(yAxes == "used") 
                        return value;
                    else if(yAxes == "available") 
                        return value;
                },
                maxTicksLimit:100
            },
            stacked: true,
            scaleLabel: {
                display: true,
                fontSize: 18,
                labelString: labelsY(yAxes)
            }
        }],
        xAxes:[{
                display: true,
                ticks:{
                    callback: function(value) { 
                        if(xAxes == "temperature") 
                            return  value;
                        else if(xAxes == "time") 
                            return new Date(value).toLocaleDateString([], dateType);
                        else if(xAxes == "used") 
                            return value;
                        else if(xAxes == "available") 
                            return value;
                    },
                    maxRotation: 90,
                    minRotation: 20,
                    maxTicksLimit:100,
                },
                stacked: true,
                scaleLabel: {
                    display: true,
                    fontSize: 18,
                    labelString: labelsX(xAxes)
                },
                showXLabels:true,
        }]
    };

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
    if (myChart1) {
        myChart1.destroy();
    }



    
             

