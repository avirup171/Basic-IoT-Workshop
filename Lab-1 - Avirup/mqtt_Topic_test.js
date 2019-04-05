'use strict';

var mqtt    = require('mqtt');
var MongoClient = require('mongodb').MongoClient;

var mqttClient= mqtt.connect('mqtt://mqtt.blackspektro.com');
console.log("MQTT locally connected");

var topicName="nehu/lab1/uname/";

var authTopicName1="nehu/lab1/auth1";
var authTopicName2="nehu/lab1/auth2";

mqttClient.subscribe(topicName);

mqttClient.on('message',function(topic,payload)
{
		if(topic==authTopicName1)
		{
			//Do something
		}
		else if(topic==authTopicName2)
		{
			//Do something else
		}
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