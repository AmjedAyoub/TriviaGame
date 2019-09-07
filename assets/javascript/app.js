
$(document).ready(function() {

  $(".startContainer").css("display", "flow-root");
  $(".questionContainer").css("display", "none");


var time=5;
var count=1;
var objArray=[] 
var intervalId;

$("#start").click(function () {
  $(".startContainer").css("display", "none");
  $(".questionContainer").css("display", "flow-root");
  start();
  newQues();
});






var query= "https://opentdb.com/api.php?amount=50&type=multiple";
$.ajax({
    url: query,
    method: "GET"
  }).then(function(response) {
    objArray=response.results;
    console.log(objArray)
  });

 





function reset() {

    time = 5;
    lap = 1;
      
    // DONE: Change the "display" div to "00:00."
    $(".timer").text("00:00");
      
   }


function start() {
      
    // DONE: Use setInterval to start the count here and set the clock to running.
    clearInterval(intervalId);
    intervalId = setInterval(function () {
      if(time > 0){
        time--;
        var converted = timeConverter(time);
        $(".timer").text(converted);
      }
      else{
          reset();
          newQues();
      }
    }, 1000);
   
   }


function newQues() {
 
  var random=Math.floor(Math.random()*objArray.length+1);
  console.log(objArray[random].question);

  var q=(objArray[random].question).replace(/&quot;/g,'"');
  q=(q).replace(/&#039;/g,"'");
  q=(q).replace(/&laquo;/g,"<<");
  q=(q).replace(/&raquo;/g,">>");
  q=(q).replace(/&hellip;/g,"...");

  $(".question").text(q);
  $("#category").text(objArray[random].category);
  $("#difficulty").text(objArray[random].difficulty);
  $("#qNum").text(count);
  count++;
  $(".answerPanel").empty();

  var newArr=objArray[random].incorrect_answers;
  newArr.push(objArray[random].correct_answer);
  newArr.sort();
  for (let i = 0; i < 4; i++) {
    var newh = $("<h4>");
    newh.addClass("answer");
    newh.text(newArr[i])
    $(".answerPanel").append(newh);
  }
}


$(document).on('mouseover', '.answer', function (e) {
      var ans=$(this);
      ans.css("opacity", "0.3");
      ans.css("transition","opacity 1s");
      });

$(document).on('mouseout', '.answer', function (e) {
          var ans=$(this);
          ans.css("opacity", "1");
          
      });

// $(".answer").hover(function () {
//     var ans=$(this);
//     ans.css("opacity", "0.3");
//     ans.css("transition","opacity 1s");
//     },
//     function () {
//         var ans=$(this);
//         ans.css("opacity", "1");
        
//     });



    

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




});