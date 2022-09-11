function getMatches(){
    const button = document.querySelector(".button");
    button.disabled = true;
    const waiting = document.getElementById("waiting");
    waiting.innerHTML = "Fetching data from server... it will take about a minute\n" +
    " Note: this won't work after 24/9/2022 because of account limit";
    var APIkey='cf9f302651809b51fd956607a50492910bda7bed59db068c4b6fa4925c63b6d9';

    var socket  = new WebSocket('wss://wss.allsportsapi.com/live_events?widgetKey='+APIkey+'&timezone=+02:00');
    socket.onmessage = function(e) {

        
    if (e.data) {
        waiting.innerHTML= "";
        button.disabled = false;
        var matchesData = JSON.parse(e.data);
        //console.log(matchesData)
        // Now variable matchesData contains all matches that received an update
        // Here can update matches in dom from variable matchesData
        const scores = document.getElementById("scores");
        scores.innerHTML = "";
        Object.keys(matchesData).forEach(key=>{
            const {event_date,event_time,event_home_team,event_away_team,
                event_final_result} = matchesData[key];
            const element = document.createElement("p");
            element.innerHTML = 
            event_date + " | " +
            event_time + " | " + 
            event_home_team +" vs " +
            event_away_team + " vs " + " | result: " + 
            event_final_result;
            scores.appendChild(element);
        });
        }
    }
}

