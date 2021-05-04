
var dateType = {month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };


async function chartIt1(xAxes, yAxes) {
   
    const colors1 = ['#ff0000','#003366','#cccc00','#00cc00','#6600cc','#3399ff','#ff6600','#ff00ff'];
    // const dat = await getData();
    
    const xs = [];
    const ys = [];
    var res = await fetch(baseURL + '/api');
    var data = await res.json();

    for(item of data){
        temperature = item.temperature;
        time = item.timestamp;
        if(xAxes == "time")
        {
            xs.push(time);
            ys.push(temperature);
        }    
        else if(xAxes == "temperature")
        {
            xs.push(temperature);
            ys.push(time);
        }
            // console.log("Temperature: " + temperature + " " + "time: " + time);
    }   

    const ctx = document.getElementById('chart1').getContext('2d');
            
    const myChart1 = new Chart(ctx, {
        type: 'line',
            data: {
                labels: xs,
                datasets: [{
                    label: 'Global Temperature in C°',
                    data: ys,
                    fill: true,
                    backgroundColor: '#ccffcc',
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
                                    return  value + '°';
                                else
                                    if(yAxes == "time") 
                                        return new Date(value).toLocaleDateString([], dateType);
                                
                            }
                        }
                    }],
                    xAxes:[{
                            ticks:{
                                callback: function(value) { 
                                    if(xAxes == "time") 
                                        return new Date(value).toLocaleDateString([], dateType);
                                    else
                                        if(xAxes == "temperature") 
                                           return  value + '°';
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


    
             

