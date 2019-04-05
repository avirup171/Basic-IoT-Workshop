'use strict';

var mqtt    = require('mqtt');
var MongoClient = require('mongodb').MongoClient;
var url="mongodb://137.117.88.62:27017/";
var mqttClient= mqtt.connect('mqtt://mqtt.blackspektro.com');
console.log("MQTT locally connected");

var topicName="nehu/lab1/uname/";

var authTopicName1="nehu/lab1/auth1";
var authTopicName2="nehu/lab1/auth2";
var errorTopic="nehu/lab1/error";

mqttClient.subscribe(topicName);

mqttClient.on('message',function(topic,payload)
{
	var obj=JSON.parse(payload);
	var collection_name=obj.collection_name;
	mongoDataPush(obj,collection_name);
});

setInterval(function azcall()
{
	var send_message= JSON.stringify({
		"sent_value":getRandomInt(1,100),
		"collection_name":"nehu_5_4_2019"
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

function mongoDataPush(message,collection_name)
{
	console.log("Entered");
	MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("NEHU");
		var myobj = message
		console.log(myobj);
		dbo.collection(collection_name).insertOne(myobj, function(err, res) 
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