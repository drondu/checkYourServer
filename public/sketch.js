
var dateType = {month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
var randomColor = (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');

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

var middlewareToMakeTicksUnique = function(next) {
    return function(value, index, values) {
        var nextValue = next(value);

        if (index && values.length > index+1 && // always show first and last tick
            // don't show if next or previous tick is same
            (next(values[index + 1]) === nextValue || next(values[index - 1]) === nextValue)
        ) {
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


    const ctx = document.getElementById('chart1').getContext('2d');
            
    myChart1 = new Chart(ctx, {
        type: 'line',
            data: {
                labels: obj.xs,
                datasets: [{
                    data: obj.ys,
                    label: false,
                    fill: false,
                    pointBackgroundColor: colors1,
                    pointBorderColor: colors1,
                    backgroundColor:'#cccc00',
                    pointRadius: 3,
                    lineTension: 0,           
                }]
            },
            options:{
                maintainAspectRatio: true,
                responsive: true,
                scales:{
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
                        stacked:true,
                        scaleLabel: {
                            display: true,
                            fontSize: 18,
                            labelString: labelsY(yAxes)
                        }
                    }],
                    xAxes:[{
                       // min:
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
                                stepSize:0.1
                            },
                            stacked:true,
                            scaleLabel: {
                                display: true,
                                fontSize: 18,
                                labelString: labelsX(xAxes)
                            },
                            showXLabels:true,    
                    }]
                },
                legend:{
                    display:false
                },
                tooltips:{
                    enabled: false,
                    custom: processTooltipModel,
                    intersect: false,
                    mode: "index",
                }
                
            }
    });
}

async function chartIt2(xAxes,yAxes){
    const colors1 = ['#ff0000','#003366','#cccc00','#00cc00','#6600cc','#3399ff','#ff6600','#ff00ff','#990000', '#990099','#00ff00','#0000ff','#660066','#632064','#8e8a06'];
   
    let obj = {xs: [], ys:[]};

    await axes(obj, xAxes,yAxes);


    const ctx = document.getElementById('chart2').getContext('2d');
            
    myChart1 = new Chart(ctx, {
        type: 'bar',
            data: {
                labels: obj.xs,
                datasets: [{
                    data: obj.ys,
                    label: false,
                    fill: true,
                    backgroundColor: colors1, 
                }]
            },
            options:{
                scales:{
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

                        },
                        scaleLabel: {
                            display: true,
                            fontSize: 18,
                            labelString: labelsY(yAxes)
                        }  
                    }],
                    xAxes:[{
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
                                maxTicksLimit: 100
                            },
                            scaleLabel: {
                                display: true,
                                fontSize: 18,
                                labelString: labelsX(xAxes)
                            }  
                    }]
                },
                legend:{
                    display:false
                }
                
            }
    });
}



    
// chartIt2();
// async function chartIt2() {
   
//     const colors1 = ['#ff0000','#003366','#cccc00','#00cc00','#6600cc','#3399ff','#ff6600','#ff00ff'];
//     const dat = await getData();

//     const ctx = document.getElementById('chart2').getContext('2d');
            
//     const myChart1 = new Chart(ctx, {
//         type: 'pie',
//             data: {
//                 labels: dat.xs,
//                 datasets: [{
//                     label: 'Global Temperature in C°',
//                     data: dat.ys,
//                     fill: true,
//                     backgroundColor: '#ccffcc',
//                     borderColor: colors1,
//                     borderWidth: 1
//                 }]
//             },
//             options:{
//                 scales:{
//                     yAxes:[{
//                         ticks:{
//                             callback: function(value,index,values){
//                                 return  value + '°';
//                             }
//                         }
//                     }],
//                     xAxes:[{
//                         ticks:{
//                             callback: function(value) { 
//                                 return new Date(value).toLocaleDateString([], {month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit'}); 
//                             }
//                         }
//                     }]
//                 }
//             }
//     });
// }

// chartIt3();
// async function chartIt3() {
   
    
//     const colors1 = ['#ff0000','#003366','#cccc00','#00cc00','#6600cc','#3399ff','#ff6600','#ff00ff'];
//     const dat = await getData();

//     const ctx = document.getElementById('chart3').getContext('2d');
            
//     const myChart1 = new Chart(ctx, {
//         type: 'bar',
//             data: {
//                 labels: dat.xs,
//                 datasets: [{
//                     label: 'Global Temperature in C°',
//                     data: dat.ys,
//                     fill: true,
//                     backgroundColor: '#ccffcc',
//                     borderColor: colors1,
//                     borderWidth: 1
//                 }]
//             },
//             options:{
//                 scales:{
//                     yAxes:[{
//                         ticks:{
//                             callback: function(value,index,values){
//                                 return  value + '°';
//                             }
//                         }
//                     }],
//                     xAxes:[{
//                         ticks:{
//                             callback: function(value) { 
//                                 return new Date(value).toLocaleDateString([], dateType);//{month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }); 
//                             }
//                         }
//                     }]
//                 }
//             }
//     });
// }


    
             

