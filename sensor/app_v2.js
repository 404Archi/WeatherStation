'use strict';

const bme280 = require('bme280');

const format = number => (Math.round(number * 100) / 100).toFixed(2);
const delay = millis => new Promise(resolve => setTimeout(resolve,
millis));


const reportContinuous = async _ => {
  const sensor = await bme280.open({
    humidityOversampling: bme280.OVERSAMPLE.X1,
    pressureOversampling: bme280.OVERSAMPLE.X16,
    temperatureOversampling: bme280.OVERSAMPLE.X2,
    filterCoefficient: bme280.FILTER.F16,
    forcedMode: true
  });



var mysql = require('mysql');
var connection = mysql.createConnection({
	host : '192.168.1.135',
	user : 'WeatherStation',
	password : '123dupa321',
	database : 'weatherstation'
});

connection.connect();
if(bme280.CHIP_ID == 0x60){
 for (let i = 1; ; ++i) {
    await sensor.triggerForcedMeasurement();
	const reading = await sensor.read();
    console.log(reading.temperature, reading.pressure, reading.humidity);
		connection.query("INSERT INTO readings (ID_SENS , temperature , pressure , humidity) VALUES ( 1 , " +
		reading.temperature + " , " +
		reading.pressure + " , "  +
		reading.humidity +  ")", 
		function (error, fields) {
			if (error) throw error;
		});
	await delay(300000);

	}

    }
if(bme280.CHIP_ID == 0x58){
 for (let i = 1; ; ++i) {
    await sensor.triggerForcedMeasurement();
    const reading = await sensor.read();
    console.log(reading.temperature, reading.pressure);
                connection.query("INSERT INTO readings (temperature , pressure) VALUES ( 1 , " +
                reading.temperature + " , " +
                reading.pressure + ")",
                function (error, fields) {
                        if (error) throw error;
                });
	await delay(300000);
        }

    }

connection.end();
};

reportContinuous();
