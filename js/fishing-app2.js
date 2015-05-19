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

fishingApp.getInfo = function(userQuery){

	//4. Jquery calling for Ajax (Ajax a method or object)

	$.ajax({
		url:"http://api.wunderground.com/api/",
		dataType:"JSONP",
		type:"GET",
		data: {
			key:'58db3ed50eea2efd',
			features:'conditions',
			query: userQuery,
			format:'json'
		},

		// url: "http://api.wunderground.com/api/58db3ed50eea2efd/conditions/q/Ontario/Toronto.json",
		// declare if getting info is successful (This is an method) - create a key called "success"
		//if successful show to "displayInfo"
		success:function(response){
			console.log("Yes, It worked!");
			fishingApp.displayInfo(response);
			console.log(response);
		}

	});

};

//SEARCH FUNCTION

//After we get info display art to page
app.displayArt = function(artData){

	//this empty this the tray (showing tray)
	$('#artwork').empty();

	//each always takes array-artdata in this case and then function
	//This is a a cleaner way to write a loop
	$.each(artData, function(index, piece){
		
		console.log(piece);
		// jQuery will Find this'h2' --- jquery will CREATE <'h2'>

		//if webImage i not null, build up our HTML
		if(piece.webImage != null) {
				
			var $title = $('<h2>').text(piece.title);
			var $artist = $('<p>').addClass('artist').text(piece.principalOrFirstMaker);
			var $image = $('<img>').attr('src',piece.webImage.url);
			//create list and append the list to the page
			var $artPiece = $('<div>').addClass('piece').append($image, $title, $artist);

			$('#artwork').append($artPiece);
		}


	});//end of .each loop


};

app.events = function() {
	//for select menu
	$('#animal').on('change',function(){
		var animal = $(this).val();
		app.getArt(animal);
});

	//start app with Monkeys

	// apply a submit event listento theform
	// wth a class of search

	$('form.search').on('submit', function(e){
		e.preventDefault();

		//get the entered user input
		//get the input and pass it into the value
		var searchQuery = $(this).find('input[type=search]').val();

		//pass that value to the app.getArt() method;
		app.getArt(searchQuery);

		//clear search value -- ('') -empty string is clearing the bar
		$(this).find('input[type=search]').val('');

	});
};














fishingApp.displayInfo = function(apiData){

	var moonPhase = apiData.moon_phase.phaseofMoon;
	var ageOfMoon = apiData.moon_phase.ageOfMoon;
	var hemisphere = apiData.moon_phase.hemisphere;
	var percentIlluminated = apiData.moon_phase.percentIlluminated;


	var sunriseTime = apiData.sun_phase.sunrise.hour;
	var sunriseMinute = apiData.sun_phase.sunrise.minute;
	console.log(sunriseTime, sunriseMinute)

	var sunsetTime = apiData.sun_phase.sunset.hour;
	var sunsetMinute = apiData.sun_phase.sunset.minute;

	var currentTime = apiData.moon_phase.current_time.hour + ":" + apiData.moon_phase.current_time.minute;
	var location = apiData.sun_phase.sunset.hour;
	var weather = apiData.sun_phase.sunset.hour;
	console.log(sunsetTime);

	//calling the function for Sunrise Time (SLOT INSERT SUNRISE TIME and mins)

	// using GET BEST TIME FuNCTION
	var sunriseFinal = getBestTime(sunriseTime,sunriseMinute);
	var sunsetFinal = getBestTime(sunsetTime,sunsetMinute);


// Not working - make military time to normal clock

	// if (currentTime > 12){
	// 	currentTime = currentTime - 12;
	// }



	$('.moonPhase').text('Moon Phase: ' + moonPhase);
	$('.ageOfMoon').text(ageOfMoon);
	$('.hemisphere').text(hemisphere);
	$('.percentIlluminated').text(percentIlluminated);

	$('.sunriseTime').text(sunriseTime + ':' + sunriseMinute);
	$('.sunsetTime').text(sunsetTime + ':' +sunsetMinute);
	$('.currentTime').text(currentTime);
	$('.location').text(sunriseTime);
	$('.weather').text(sunriseTime);

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
	   	$('.greatResult').text("Thats a great time to be fishing - Score 3/5");
	} 
	else if (moonPhase === "Waxing Crescent") {
	   // do all of the following things
	   	$('.greatResult').text("Sure, go for it.- Score 3/5");
	}

	else if (moonPhase === "Waxing Crescent") {
	   // do all of the following things
	   	$('.greatResult').text("Sure, go for it.- Score 3/5");
	}

	else if (moonPhase === "Full Moon") {
	   // do all of the following things
	   	$('.greatResult').text("Pack your gears and get going its a going to be a Full moon - score 5/5");
	}

	else if (moonPhase === "New Moon") {
	   // do all of the following things
	   	$('.greatResult').text(" Perfect condition - Score 5/5");
	}

	else if (moonPhase === "Last Quarter") {
	   // do all of the following things
	   	$('.greatResult').text(" Maybe another day - Score 1/5");
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

//* IF statements for Moon Phases Return

// var moonResult = moonPhase


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
	//this function is calling the getinfo to start
	fishingApp.getInfo();

};


//1. Call fishingApp function
//Set up document rdy

$(document).ready(function(){
	fishingApp.init();

});
