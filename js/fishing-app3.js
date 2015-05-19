// What do I need

// analysis Location

// Moon phase

// sunrise time

// moonrise time

// weather forecast

// result print

// That's a great time to Fish! But you might want bring a rain coat with you.

// The best time to fish its at "display time"

// Not the greatest time to go fishing.
// you might want to try at "display time"

//long way
var fishingApp = {};

//short cut
fishingApp.bestTimeEver = {};

//3. This getInfo is gathering information from the wunderground Api.

//5. Add if successful get data, we need to send it to displayInfo.


//This function is calling the condtions
//the userProvince and userCity is getting passed in the URL
//We have to concercating the url because of the /

fishingApp.getConditions = function(userProvince, userCity){

	//4. Jquery calling for Ajax (Ajax a method or object)

	$.ajax({
		url:"http://api.wunderground.com/api/58db3ed50eea2efd/conditions/q/" + userProvince + "/" + userCity + ".json",
		dataType:"jsonp",
		type:"GET",
		// url: "http://api.wunderground.com/api/58db3ed50eea2efd/conditions/q/Ontario/Toronto.json",
		// declare if getting info is successful (This is an method) - create a key called "success"
		//if successful show to "displayInfo"
		success:function(response){
			console.log("conditions, It worked!");
			console.log(response);

			//the info is calling in the DISPLAYINFO function
			//to display on SCREENNNNNN
			fishingApp.displayConditionsInfo(response);
		}

	});

};

//this function is calling Astronomy from API

fishingApp.getAstronomy = function(userProvince, userCity){

	//4. Jquery calling for Ajax (Ajax a method or object)

	$.ajax({
		url:"http://api.wunderground.com/api/58db3ed50eea2efd/astronomy/q/" + userProvince + "/" + userCity + ".json",
		dataType:"jsonp",
		type:"GET",
		// url: "http://api.wunderground.com/api/58db3ed50eea2efd/conditions/q/Ontario/Toronto.json",
		// declare if getting info is successful (This is an method) - create a key called "success"
		//if successful show to "displayInfo"
		success:function(response){
			console.log("Yes, It worked!");
			console.log(response);

			//the info is calling in the DISPLAYINFO function
			//to display on SCREENNNNNN
			fishingApp.displayAstronomyInfo(response);
		}

	});

};


// gathering info from FORM INFO
fishingApp.collectInfo = function() {
	$('form').on('submit', function(e) {
		e.preventDefault();
		var province = $('input#province').val();
		var city = $('input#city').val();
		fishingApp.getConditions(province, city);
		fishingApp.getAstronomy(province, city);
	
	//clear search value -- ('') -empty string is clearing the bar
		$(this).find('input[type=search]').val('');
	});
}


//Dislaying AstronmyInfo
fishingApp.displayAstronomyInfo = function(apiData){

	//Astronomy API Details
	var moonPhase = apiData.moon_phase.phaseofMoon;
	var ageOfMoon = apiData.moon_phase.ageOfMoon;
	var hemisphere = apiData.moon_phase.hemisphere;
	var percentIlluminated = apiData.moon_phase.percentIlluminated;

	var sunriseTime = apiData.sun_phase.sunrise.hour;
	var sunriseMinute = apiData.sun_phase.sunrise.minute;
	// console.log(sunriseTime, sunriseMinute)

	var sunsetTime = apiData.sun_phase.sunset.hour;
	var sunsetMinute = apiData.sun_phase.sunset.minute;

	var currentHour = apiData.moon_phase.current_time.hour + ":" ;
	var currentMinute = apiData.moon_phase.current_time.minute;

	// console.log(sunsetTime);

	// using GET BEST TIME FuNCTION
	var sunriseFinal = getBestTime(sunriseTime,sunriseMinute);
	var sunsetFinal = getBestTime(sunsetTime,sunsetMinute);



// Working- make military time to normal clock
	var correctedHour = parseFloat(currentHour);

	if (correctedHour > 12){
		correctedHour = correctedHour - 12;
	}
	console.log(correctedHour);

	var correctedSunsetTime = parseFloat(sunsetTime);

	if (correctedSunsetTime > 12){
		correctedSunsetTime = correctedSunsetTime - 12;
	}
	console.log(correctedSunsetTime);

	$('.moonPhase').text('Moon Phase: ' + moonPhase);
	$('.ageOfMoon').text('Age of Moon: ' + ageOfMoon);
	$('.hemisphere').text('Hemisphere: ' + hemisphere);
	$('.percentIlluminated').text("Moon Illumination: " + percentIlluminated + "%");

	$('.sunriseTime').text("Sunrise Time: " + sunriseTime + ':' + sunriseMinute);
	$('.sunsetTime').text("Sunset Time: " + correctedSunsetTime + ':' + sunsetMinute);
	$('.currentHour').text(correctedHour);
	$('.currentMinute').text(":" + currentMinute);
	$('.currentTime').text("Current Time: " + correctedHour + ":" + currentMinute);


	$('.bestMorningTime.before').text(sunriseFinal.before + " - ");
	$('.bestMorningTime.after').text(sunriseFinal.after);

	$('.bestNightTime.before').text(sunsetFinal.before + " - ");
	$('.bestNightTime.after').text(sunsetFinal.after);


	//to use image use .attr
	// $('.weather_image').attr('src', data.icon_url);

	//To test console.log here - becuase it fails then it ill never go in to the if statements

	//use Jquery to make changes to the html page
	if (moonPhase === "Waning Crescent") {
	   // do all of the following things
	   	$('.greatResult').text("Grab you gears, let's go fishing! - Score 3/5");
	} 
	else if (moonPhase === "Waxing Crescent") {
	   // do all of the following things
	   	$('.greatResult').text("Grab you gears, let's go fishing! - Score 3/5");
	}

	else if (moonPhase === "Waxing Crescent") {
	   // do all of the following things
	   	$('.greatResult').text("Grab you gears, let's go fishing! - Score 3/5");
	}

	else if (moonPhase === "Full Moon") {
	   // do all of the following things
	   	$('.greatResult').text("Pack your gears and get going its a going to be a Full moon - score 5/5");
	}

	else if (moonPhase === "New Moon") {
	   // do all of the following things
	   	$('.greatResult').text("It is a New Moon tonight, perfect for fishing! - Score 5/5");
	}

	else if (moonPhase === "Last Quarter") {
	   // do all of the following things
	   	$('.greatResult').text("Maybe another day - Score 1/5");
	}

	else if (moonPhase === "First Quarter") {
	   // do all of the following things
	   	$('.greatResult').text("A bad day of fishing is better than a good day of work. - score 1/5");
	}

	//Add the rest here - 

	else {
		// do all the following things if the first condition is false
		console.log("Not Working / Try Again Later");
	}	


}



// Displaying Conditions
fishingApp.displayConditionsInfo = function(apiData){

	// Condition API DETAILS
	var windGustMph = apiData.current_observation.wind_mph;
	var locationCountry = apiData.current_observation.observation_location.country;
	var locationCity = apiData.current_observation.observation_location.city;
	var weather = apiData.current_observation.weather;
	var windDirection = apiData.current_observation.wind_dir;
	var windString = apiData.current_observation.wind_dir;
	var temperature = apiData.current_observation.temperature_string;
	var feelsLike = apiData.current_observation.feelslike_string;
	var uv = apiData.current_observation.UV;

	// var weatherIcon = apiData.current_observation.icon_url;


// icon_url: "http://icons.wxug.com/i/c/k/cloudy.gif"





	// //Wind details
	$('.windSpeed').text('Wind KGP: ' + windGustMph);
	$('.country').text('Country: ' + locationCountry);
	$('.city').text(' City: ' + locationCity);
	$('.temperature').text('Temperature:' + temperature);
	$('.windDirection').text('Wind Direction: ' + windDirection);
	$('.weather').text('Weather: '+ weather + " Temperature: " + temperature + " Feels like: " + feelsLike);
	$('.uv').text('UV Index:' + uv);

}







function getBestTime(hours,mins){

	// convert hour strings to hour numbers
	// getBestTime("5","53")

	var hourString = parseFloat(hours);

	//convert mins strings to mins number
	var minString = parseFloat(mins);
	console.log(hourString, minString);

	//subtrack 45mins from mins.
	//covert hour and mins all into mins

	var totalMins = hourString * 60 + minString;

	//subtrack 45 mins - getbest fishing time before

	var bestStartTime = totalMins - 45;

	//add 45 mins - get best time after sunrise or sunset

	var bestAfterTime = totalMins + 45;
		console.log(bestStartTime, bestAfterTime);

	//you will convert beststarttime back to hours and mins
	//using the toText function 

	// var FinalStartTime = toText(bestStartTime);
	// console.log(FinalStartTime);

	var bestTimeEver = {};

	// creating a new saved time for the before time
	bestTimeEver.before = createDisplayTime(bestStartTime);

	//Creating a new saved time for the after time
	bestTimeEver.after = createDisplayTime(bestAfterTime);

	console.log(fishingApp.bestTimeEver.before, fishingApp.bestTimeEver.after)
	return bestTimeEver;

}

function createDisplayTime(minsSlot){

	// % divided 60 and give me the decimals back
	var finalMins = minsSlot % 60;
	console.log(finalMins);

	// to fix problem like 5:8 - adding zero infront of 8

	if (finalMins < 10){
		finalMins = "0" + finalMins;
	}

	// / divided by 60 to get hours
	var finalHours = Math.floor(minsSlot / 60);
	console.log(finalHours);

	//turn hours and mins to display final time
	var finalBestTime = finalHours + ":" + finalMins;
	console.log(finalBestTime);
	return finalBestTime;
}





//2. Initalize the function
fishingApp.init = function(){
	//this function is calling the collectinfo to start
	fishingApp.collectInfo();

};


//1. Call fishingApp function
//Set up document rdy

$(document).ready(function(){
	fishingApp.init();

});
