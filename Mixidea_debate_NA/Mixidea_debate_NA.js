

function check_hangoutid_for_each_role(){

	var PM_id = gapi.hangout.data.getValue("RoleID_PM");
	console.log("PM_id is " + PM_id);
	var LO_id = gapi.hangout.data.getValue("RoleID_LO");
	console.log("LO_id is " + LO_id);
	var MG_id = gapi.hangout.data.getValue("RoleID_MG");
	console.log("MG_id is " + MG_id);
	var MO_id = gapi.hangout.data.getValue("RoleID_MO");
	console.log("MO_id is " + MO_id);
	var RPM_id = gapi.hangout.data.getValue("RoleID_RPM");
	console.log("RPM_id is " + RPM_id);
	var RLO_id = gapi.hangout.data.getValue("RoleID_RLO");
	console.log("RLO_id is " + RLO_id);
} 



function NA_EventData_retrieve(){

	console.log("check user");
	Parse.initialize("wxaNxdtmCOUJm8QHPYr8khYkFJiBTMvEnv1jCDZg", "OuSaCarL4ltnPsuwptJMBvoZ7v3071MCUE7Y5MfD");
	

	var appData = gadgets.views.getParams()['appData'];
	console.log(appData);
	var appData_split = appData.split("_");
	var user_id = appData_split[0];
	var event_id = appData_split[1];
	console.log(user_id);
	console.log(event_id);

	var title_element = document.getElementById('feed_title');
	var event_element = document.getElementById('event_table');

	var Local_Participant_Id = gapi.hangout.getLocalParticipantId();
	console.log(" local participant id is" + Local_Participant_Id);
	check_hangoutid_for_each_role();


	var query_event = new Parse.Query(MixideaEvent);
	query_event.get(event_id,{
		success: function(event_obj){

			var hangout_url = gapi.hangout.getHangoutUrl();
			console.log(hangout_url);
			event_obj.set("hangout_url",hangout_url);

			var participants = [];
			var participant_role = [];

			var participant_PM = event_obj.get("PrimeMinister");
			if(participant_PM){
				participants.push(participant_PM);
				if(participant_PM.id == user_id){
					console.log("setvalue of local participant");
					gapi.hangout.data.setValue( "RoleID_PM", Local_Participant_Id);
				}
			}
			check_hangoutid_for_each_role();
		},
		error: function(){
		}
	});

}

function update_feed(){
    console.log("participants added callback");

}

function init() {
  gapi.hangout.onApiReady.add(function(e){
    console.log("hangout api ready");
    if(e.isApiReady){
   //  NA_EventData_retrieve();
   console.log("tamesi5");
    }
  });

  gapi.hangout.onParticipantsAdded.add(function(e){
    console.log("participants added")
  
  });

  gapi.hangout.onParticipantsChanged.add(function(e){
    console.log("participants changed")
    update_feed();
  });

  gapi.hangout.onParticipantsEnabled.add(function(e){
    console.log("participants enabled")
    update_feed();
  });

  gapi.hangout.onParticipantsDisabled.add(function(e){
    console.log("participants disabled")
    update_feed();
  });
};

