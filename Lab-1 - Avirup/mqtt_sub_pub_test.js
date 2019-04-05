'use strict';

var mqtt    = require('mqtt');
var MongoClient = require('mongodb').MongoClient;


var mqttClient= mqtt.connect('mqtt://mqtt.blackspektro.com');
console.log("MQTT locally connected");
var topicName="nehu/lab1/uname/";
mqttClient.subscribe(topicName);



mqttClient.on('message',function(topic,payload)
{
		var jobj=JSON.parse(payload.toString());
		var value=jobj.sent_value
		console.log(value);
});

setInterval(function azcall()
{
	var send_message= JSON.stringify({
		"sent_value":getRandomInt(1,100)
	});
	mqttClient.publish(topicName, send_message.toString());
	console.log("Published: " + send_message);
},1000);

function getRandomInt(min,max)
{
	min=Math.ceil(min);
	max=Math.ceil(max);
	return Math.floor(Math.random()*(max-min+1))+min;
}