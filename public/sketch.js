
var dateType = {month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
var randomColor = Math.floor(Math.random()*16777215).toString(16);




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
        

        // if(xAxes == "time" && yAxes == "temperature"){
        //     xs.push(time);
        //     ys.push(temperature);
        // }
        // else if(xAxes == "time" && yAxes == "available"){
        //     xs.push(time);
        //     ys.push(available);   
        // }
        // else if(xAxes == "time" && yAxes == "used"){
        //     xs.push(time);
        //     ys.push(used);   
        // }
        // else if(xAxes == "temperature" && yAxes == "time"){
        //     xs.push(temperature);
        //     ys.push(time);
        // }
        // else if(xAxes == "temperature" && yAxes == "available"){
        //     xs.push(temperature);
        //     ys.push(available);  
        // }
        // else if(xAxes == "temperature" && yAxes == "used"){
        //     xs.push(temperature);
        //     ys.push(used); 
        // }
        // else if(xAxes == "used" && yAxes == "time"){
        //     xs.push(used);
        //     ys.push(time);
        // }
        // else if(xAxes == "used" && yAxes == "available"){
        //     xs.push(used);
        //     ys.push(available);  
        // }
        // else if(xAxes == "used" && yAxes == "temperature"){
        //     xs.push(used);
        //     ys.push(temperature); 
        // }
        // else if(xAxes == "available" && yAxes == "time"){
        //     xs.push(available);
        //     ys.push(time);
        // }
        // else if(xAxes == "available" && yAxes == "used"){
        //     xs.push(available);
        //     ys.push(used);  
        // }
        // else if(xAxes == "available" && yAxes == "temperature"){
        //     xs.push(available);
        //     ys.push(temperature); 
        // }
         console.log("Temperature: " + temperature + " " + "Time: " + time + " " + "Memory used: " + used + " " + "Memory Available: " + available); 
    }
    obj = temp;
}

async function chartIt1(xAxes,yAxes){
    const colors1 = ['#ff0000','#003366','#cccc00','#00cc00','#6600cc','#3399ff','#ff6600','#ff00ff','#990000', '#990099','#00ff00','#0000ff','#660066'];
    //const colors1 = ['#'+randomColor,'+'+randomColor,'+'+randomColor,'+'+randomColor,'+'+randomColor,'+'+randomColor,'+'+randomColor,'+'+randomColor,'+'+randomColor,'+'+randomColor,'+'+randomColor,'+'+randomColor,'+'+randomColor,'+'+randomColor]

    let obj = {xs: [], ys:[]};

    await axes(obj, xAxes,yAxes);
    
    console.log("in chartIT: " + obj.xs);

    console.log("in chartIT: " + obj.ys);

    const ctx = document.getElementById('chart1').getContext('2d');
            
    myChart1 = new Chart(ctx, {
        type: 'line',
            data: {
                labels: obj.xs,
                datasets: [{
                    label: 'a',
                    data: obj.ys,
                    fill: true,
                    backgroundColor: colors1,
                    borderColor: colors1,
                    borderWidth: 1
                }]
            },
            options:{
                scales:{
                    yAxes:[{
                        ticks:{
                            callback: function(value){
                                if(yAxes == "temperature") 
                                    return  value + '°C';
                                else if(yAxes == "time") 
                                    return new Date(value).toLocaleDateString([], dateType);
                                else if(yAxes == "used") 
                                    return 'Memory used: ' + value + 'B';
                                else if(yAxes == "available") 
                                    return 'Memory available: ' + value + 'B';
                            }
                        }
                    }],
                    xAxes:[{
                            ticks:{
                                callback: function(value) { 
                                    if(xAxes == "temperature") 
                                        return  value + '°C';
                                    else if(xAxes == "time") 
                                        return new Date(value).toLocaleDateString([], dateType);
                                    else if(xAxes == "used") 
                                        return 'Memory used: ' + value + 'B';
                                    else if(xAxes == "available") 
                                        return 'Memory available: ' + value + 'B';
                                }
                            }
                    }]
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


    
             

