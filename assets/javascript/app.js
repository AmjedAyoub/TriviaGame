
$(document).ready(function() {



var time=0;
var count=1;
var objArray={}; 
var intervalId;


var query= "https://opentdb.com/api.php?amount=50&type=multiple";
$.ajax({
    url: query,
    method: "GET"
  }).then(function(response) {
      objArray=response;
      console.log(objArray.results[0]);
  });


 


$(".answer").hover(function () {
    var ans=$(this);
    ans.css("opacity", "0.3");
    ans.css("transition","opacity 1s");
    },
    function () {
        var ans=$(this);
        ans.css("opacity", "1");    
    });

    // $("#question").text(objArray.results[0].question);


function reset() {

    time = 0;
    lap = 1;
      
    // DONE: Change the "display" div to "00:00."
    $(".timer").text("00:00");
      
   }


function start() {
      
    // DONE: Use setInterval to start the count here and set the clock to running.
    clearInterval(intervalId);
    intervalId = setInterval(function () {
        time++;
        var converted = timeConverter(time);
        $(".timer").text(converted);
    }, 1000);
   
   }


function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);
  
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
  
    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }
  
    return minutes + ":" + seconds;
  };



start();

});