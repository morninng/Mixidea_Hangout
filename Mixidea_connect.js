
function check_user(){
	console.log("check user");
	Parse.initialize("wxaNxdtmCOUJm8QHPYr8khYkFJiBTMvEnv1jCDZg", "OuSaCarL4ltnPsuwptJMBvoZ7v3071MCUE7Y5MfD");

	var appData = gadgets.views.getParams()['appData'];	
	console.log(appData);
	var appData_split = appData.split("_");
	var user_id = appData_split[0];
	var event_id = appData_split[1];
	console.log(user_id);
	console.log(event_id);

	var hangout_element = document.getElementById('hangout_main_feed');

	var query_user = new Parse.Query(MixideaUser);
	query_user.get(user_id).then(function(user_data){
		var first_name = user_data.get("FirstName");
		var last_name = user_data.get("LastName");
		hangout_element.innerHTML="<h1>user id =" + first_name + last_name + "</h1>";
		var query_event = new Parse.Query(MixideaEvent);
		return query_event.get(event_id);
	}).then(function(event_obj){
		var hangout_url = gapi.hangout.getHangoutUrl();
		console.log(hangout_url);
		event_obj.set("hangout_url",hangout_url);
		return event_obj.save()
	}).then(function(){
		console.log("event has been registered to parse");
	});
 }
