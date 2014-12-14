


function check_user(){

	console.log("check user")
	Parse.initialize("wxaNxdtmCOUJm8QHPYr8khYkFJiBTMvEnv1jCDZg", "OuSaCarL4ltnPsuwptJMBvoZ7v3071MCUE7Y5MfD");

	var appData = gadgets.views.getParams()['appData'];	

	var hangout_element = document.getElementById('hangout_main_feed');

	var query = new Parse.Query(MixideaUser);
	query.get(appData, {
		success: function(user_data){
			var first_name = user_data.get("FirstName");
			var last_name = user_data.get("LastName");
			hangout_element.innerHTML="<h1>user id =" + first_name + last_name + "</h1>";
		},
		error: function(){

		}
	});



 }
