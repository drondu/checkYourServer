
var dateType = {month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };

async function getData(){
    const xs = [];
    const ys = [];

    const res = await fetch(baseURL + '/api');
    const data = await res.json();

    for(item of data){
        //y = item.year;
        temperature = item.temperature;
        time = item.timestamp;
        xs.push(time);
        ys.push(temperature);
        console.log("Temp: " + t + " " + "time: " + time);
    }   
    console.log(data);
    return {xs, ys};
    
}

chartIt1();
async function chartIt1() {
   
    const colors1 = ['#ff0000','#003366','#cccc00','#00cc00','#6600cc','#3399ff','#ff6600','#ff00ff'];
    const dat = await getData();

    const ctx = document.getElementById('chart1').getContext('2d');
            
    const myChart1 = new Chart(ctx, {
        type: 'line',
            data: {
                labels: dat.xs,
                datasets: [{
                    label: 'Global Temperature in C°',
                    data: dat.ys,
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
                            callback: function(value,index,values){
                                return  value + '°';
                            }
                        }
                    }],
                    xAxes:[{
                            ticks:{
                                callback: function(value) { 
                                    return new Date(value).toLocaleDateString([], dateType);
                                }
                            }
                    }]
                }
            }
    });

}
chartIt2();
async function chartIt2() {
   
    const colors1 = ['#ff0000','#003366','#cccc00','#00cc00','#6600cc','#3399ff','#ff6600','#ff00ff'];
    const dat = await getData();

    const ctx = document.getElementById('chart2').getContext('2d');
            
    const myChart1 = new Chart(ctx, {
        type: 'pie',
            data: {
                labels: dat.xs,
                datasets: [{
                    label: 'Global Temperature in C°',
                    data: dat.ys,
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
                            callback: function(value,index,values){
                                return  value + '°';
                            }
                        }
                    }],
                    xAxes:[{
                        ticks:{
                            callback: function(value) { 
                                return new Date(value).toLocaleDateString([], {month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit'}); 
                            }
                        }
                    }]
                }
            }
    });
}

chartIt3();
async function chartIt3() {
   
    
    const colors1 = ['#ff0000','#003366','#cccc00','#00cc00','#6600cc','#3399ff','#ff6600','#ff00ff'];
    const dat = await getData();

    const ctx = document.getElementById('chart3').getContext('2d');
            
    const myChart1 = new Chart(ctx, {
        type: 'bar',
            data: {
                labels: dat.xs,
                datasets: [{
                    label: 'Global Temperature in C°',
                    data: dat.ys,
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
                            callback: function(value,index,values){
                                return  value + '°';
                            }
                        }
                    }],
                    xAxes:[{
                        ticks:{
                            callback: function(value) { 
                                return new Date(value).toLocaleDateString([], dateType);//{month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }); 
                            }
                        }
                    }]
                }
            }
    });
}


    
             

