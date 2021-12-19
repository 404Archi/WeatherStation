console.log("Script loaded successfully.");
let ws;
let latest;
let tempj, humj, presj, tempd, presd, readings, tempg;
let id, i = 0;
let tempgr = [];
let presgr = [];
let humigr = [];

let tempgrj = [];
let presgrj = [];
let humigrj = [];

let tempgrd = [];
let presgrd = [];
//------------------------------------------------------------------------------------------------------------------//
var ctx  = document.getElementById('temper');
var config = { 
    type: 'line',
    data: {
        labels: ["3:00","2:55","2:50","2:45","2:40","2:35","2:30","2:25","2:20","2:15","2:10","2:05",
                 "2:00","1:55","1:50","1:45","1:40","1:35","1:30","1:25","1:20","1:15","1:10","1:05",
                 "1:00","0:55","0:50","0:45","0:40","0:35","0:30","0:25","0:20","0:15","0:10","0:05","0:00"],
        datasets: 
        [{
            label: 'sensor 1',
            data:  [],
            backgroundColor: 'transparent',
            borderColor:'rgba(25,99,132)',
            borderWidth: 3
        },{
            label: 'sensor 2',
            data:  [],
            backgroundColor: 'transparent',
            borderColor:'rgba(255,9,13)',
            borderWidth: 3
        }]
    },
    
    options: {
        // scales: {scales:{yAxes: [{beginAtZero: false}], xAxes: [{autoskip: true, maxTicketsLimit: 20}]}},
        maintainAspectRatio:false,
        tooltips:{mode: 'index'},
        legend:{display: true, position: 'top', labels: {fontColor: 'rgb(255,255,255)', fontSize: 16}}
        
    }
}
var myChart = new Chart(ctx,config);
//------------------------------------------------------------------------------------------------------------------//
var ctxm  = document.getElementById('humier');
var configm = { 
    type: 'line',
    data: {
        labels: ["3:00","2:55","2:50","2:45","2:40","2:35","2:30","2:25","2:20","2:15","2:10","2:05",
                 "2:00","1:55","1:50","1:45","1:40","1:35","1:30","1:25","1:20","1:15","1:10","1:05",
                 "1:00","0:55","0:50","0:45","0:40","0:35","0:30","0:25","0:20","0:15","0:10","0:05","0:00"],
        datasets: 
        [{
            label: 'sensor 1',
            data:  [],
            backgroundColor: 'transparent',
            borderColor:'rgba(25,99,132)',
            borderWidth: 3
        }]
    },
    
    options: {
        // scales: {scales:{yAxes: [{beginAtZero: false}], xAxes: [{autoskip: true, maxTicketsLimit: 20}]}},
        maintainAspectRatio:false,
        tooltips:{mode: 'index'},
        legend:{display: true, position: 'top', labels: {fontColor: 'rgb(255,255,255)', fontSize: 16}}
        
    }
}
var myChartm = new Chart(ctxm,configm);
//------------------------------------------------------------------------------------------------------------------//
var ctxp  = document.getElementById('preser');
var configp = { 
    type: 'line',
    data: {
        labels: ["3:00","2:55","2:50","2:45","2:40","2:35","2:30","2:25","2:20","2:15","2:10","2:05",
                 "2:00","1:55","1:50","1:45","1:40","1:35","1:30","1:25","1:20","1:15","1:10","1:05",
                 "1:00","0:55","0:50","0:45","0:40","0:35","0:30","0:25","0:20","0:15","0:10","0:05","0:00"],
        datasets: 
        [{
            label: 'sensor 1',
            data:  [],
            backgroundColor: 'transparent',
            borderColor:'rgba(25,99,132)',
            borderWidth: 3
        },{
            label: 'sensor 2',
            data:  [],
            backgroundColor: 'transparent',
            borderColor:'rgba(255,9,13)',
            borderWidth: 3
        }]
    },
    
    options: {
        // scales: {scales:{yAxes: [{beginAtZero: false}], xAxes: [{autoskip: true, maxTicketsLimit: 20}]}},
        maintainAspectRatio:false,
        tooltips:{mode: 'index'},
        legend:{display: true, position: 'top', labels: {fontColor: 'rgb(255,255,255)', fontSize: 16}}
        
    }
}
var myChartp = new Chart(ctxp,configp);
//------------------------------------------------------------------------------------------------------------------//
function init() {
    tempj = document.getElementById("tempj");
    humj = document.getElementById("humj");
    presj = document.getElementById("presj");
    tempd = document.getElementById("tempd");
    presd = document.getElementById("presd");
    // readings = document.getElementById("readings");
    tempg = document.getElementById("tempg");

    
    ws = new WebSocket('ws://'+window.location.host, "website");
    ws.onmessage = (message) => {
        console.log(message);
        message = JSON.parse(message.data);
        latest = message;

        if (message.type == "current") {
            let tmp = message.data[0];
            let ida = tmp.ID_SENS;
            if(ida == 1){
                tempj.innerHTML = tmp.temperature+"&deg;C";
                humj.innerHTML = tmp.humidity+"%";
                presj.innerHTML = tmp.pressure+"hPa";
            } else if (ida == 2){
                tempd.innerHTML = tmp.temperature+"&deg;C";
                presd.innerHTML = tmp.pressure+"hPa";
            }
        } else if (message.type == "tempg"){
        
        let tmt = message.data;
        id = tmt.map(x=>x.ID_SENS);
        let j = 0;
        let d = 0;
        tempgr = tmt.map(x=>x.temperature);
        presgr = tmt.map(x=>x.pressure);
        humigr = tmt.map(x=>x.humidity);
        for(element in id){
            if(id[element] == 1){
                if(j<37){
                    tempgrj[j] = tempgr[element];
                    presgrj[j] = presgr[element];
                    humigrj[j] = humigr[element];
                j++;
                }else {
                    tempgrj.shift();
                    presgrj.shift();
                    humigrj.shift();
                    tempgrj[36] = tempgr[element];
                    presgrj[36] = presgr[element];
                    humigrj[36] = humigr[element];
                }
            }else if(id[element] == 2){
                if(d<37){
                    tempgrd[d] = tempgr[element];
                    presgrd[d] = presgr[element];
                    d++;
                }else {
                    tempgrd.shift();
                    presgrd.shift();
                    tempgrd[36] = tempgr[element];
                    presgrd[36] = presgr[element];
                }
            }
        }

        
            
            config.data.datasets[0].data = tempgrj.reverse();
            
            configp.data.datasets[0].data = presgrj.reverse();
            

            configm.data.datasets[0].data = humigrj.reverse();
            myChartm.update();
        
            console.log("sabihfbioyasd")
            config.data.datasets[1].data = tempgrd.reverse();
            myChart.update();
    
            configp.data.datasets[1].data = presgrd.reverse();
            myChartp.update();
        
    
    }
        // } else if (message.type == "readings") {
        //     let tmp = message.data;
        //     readings.innerHTML = "";
        //     console.dir(message.data);
        //     for (let element of tmp) {
        //         let time = new Date(Date.parse(element.date)).toString();
        //         let str = "<li> Date: " + time + ", Temperature: " + element.temperature + "&deg;, Humidity: " + element.humidity + "%, Pressure: " + element.pressure + "hPa</li>";
        //         console.log(str);
        //         readings.innerHTML += str;
        //     }
        // }   else if (message.type == "tempg") {
        //     let tmp = message.data;
        //     tempg.innerHTML = "";
        //     console.dir(message.data);
        //     for (let element of tmp) {
        //         let time = new Date(Date.parse(element.date)).toString();
        //         let str =  element.temperature;
        //         console.log(str);
        //         tempg.innerHTML += str;
        //     }
        // }
        
    };
    ws.onopen = () => {
        ws.send(JSON.stringify({type: "current"}));
        // ws.send(JSON.stringify({type: "readings", range: 30}));
        ws.send(JSON.stringify({type: "tempg", range: 30}));

        setInterval(refreshReadings,300000);
    }
}


function refreshReadings() {
    ws.send(JSON.stringify({type: "current"}));
    // ws.send(JSON.stringify({type: "readings", range: 30}));
    ws.send(JSON.stringify({type: "tempg", range: 30}));

}
