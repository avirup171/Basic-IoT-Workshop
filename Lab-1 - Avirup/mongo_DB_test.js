'use strict';

var mqtt    = require('mqtt');
var MongoClient = require('mongodb').MongoClient;

var mqttClient= mqtt.connect('mqtt://mqtt.blackspektro.com');
console.log("MQTT locally connected");

var topicName="nehu/lab1/uname/";

var authTopicName1="nehu/lab1/auth1";
var authTopicName2="nehu/lab1/auth2";
var errorTopic="nehu/lab1/error";

mqttClient.subscribe(topicName);

mqttClient.on('message',function(topic,payload)
{

	mongoDataPush(payload,collection_name);
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

function mongoDataPush(message)
{
	MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("NEHU");
		var myobj = message;
		dbo.collection("test_collection").insertOne(myobj, function(err, res) 
		{
			if (err)
			{
				mqttClient.publish(errorTopic, 'ERROR STATUS 0')
				throw err;
			}
			console.log("Updated to DB successfully");
			db.close();
		});
	});	
}