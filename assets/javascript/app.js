
$(document).ready(function () {

  $(".startContainer").css("display", "flow-root");
  $(".questionContainer").css("display", "none");


  var time = 30;
  var time2 = 2;
  var count = 1;
  var objArray = []
  var intervalId;
  var intervalId2;
  var correct=0;
  var incorrect=0;
  var correctAnswer;
  var picUrl;

  $("#start").click(function () {
    $(".startContainer").css("display", "none");
    $(".questionContainer").css("display", "flow-root");
    start();
    newQues();
  });

  




  var objArray = []
  var query = "https://opentdb.com/api.php?amount=50&type=multiple";
  $.ajax({
    url: query,
    method: "GET"
  }).then(function (response) {
    objArray = response.results;
    // console.log(objArray)
  });







  function reset() {

    time = 30;
    // DONE: Change the "display" div to "00:00."
    $(".timer").text("00:00");

  }


  function start() {

    // DONE: Use setInterval to start the count here and set the clock to running.
    clearInterval(intervalId);
    clearInterval(intervalId2);
    intervalId = setInterval(function () {
      if (time > 0) {
        time--;
        var converted = timeConverter(time);
        $(".timer").text(converted);
      }
      else {
        reset();
        newQues();
      }
    }, 1000);

  }

  
  function start2() {

    // DONE: Use setInterval to start the count here and set the clock to running.
    clearInterval(intervalId2);
    intervalId2 = setInterval(function () {
      if (time2 > 0) {
        time2--;
      }
      else {
        time2=2;
        reset();
        newQues();
      }
    }, 1000);

  }


  function newQues() {
    if (count < 16) {

      clearInterval(intervalId2);
      var random = Math.floor(Math.random() * objArray.length + 1);
      // console.log(objArray[random].question);

      var q = (objArray[random].question).replace(/&quot;/g, '"');
      q = (q).replace(/&#039;/g, "'");
      q = (q).replace(/&laquo;/g, "<<");
      q = (q).replace(/&raquo;/g, ">>");
      q = (q).replace(/&hellip;/g, "...");

      $(".question").text(q);
      $("#category").text(objArray[random].category);
      $("#difficulty").text(objArray[random].difficulty);
      $("#qNum").text(count);
      $("#ofq").text(count);
      count++;
      $(".answerPanel").empty();

      var newArr = objArray[random].incorrect_answers;
      newArr.push(objArray[random].correct_answer);
      correctAnswer = objArray[random].correct_answer;
      newArr.sort();
      for (let i = 0; i < 4; i++) {
        var newh = $("<h4>");
        newh.addClass("answer");
        newh.attr("data-answer", newArr[i]);
        newh.text(newArr[i])
        $(".answerPanel").append(newh);
      }
    }
    else{
      $(".question").text("All done");
      var newDiv = $("<div>");
      var p = $("<h3>");
      var p2 = $("<h3>");
      p.text("Correct answers: "+correct);
      p2.text("Incorrect answers: "+incorrect);
      newDiv.append(p,p2);
      var b =$("<button type='button' class='btn btn-outline-success rest'>");
        var d = $("<div class='spinner-grow text-warning spin' role='status'>");
          var s = $("<span class='sr-only'>")
          s.text("Loading...");     
            var h =$("<h3>")
            h.text("Restart");
            d.append(s);
            b.append(d,h);

      $(".answerPanel").empty();
      $(".answerPanel").append(newDiv,b);
      clearInterval(intervalId);
      clearInterval(intervalId2);
    }
  };


  $(document).on('mouseover', '.answer', function (e) {
    var ans = $(this);
    ans.css("opacity", "0.3");
    ans.css("transition", "opacity 1s");
  });

  $(document).on('mouseout', '.answer', function (e) {
    var ans = $(this);
    ans.css("opacity", "1");

  });

  $(document).on("click", ".rest", function () {
    time2=2;
    count=1;
    correct=0;
    incorrect=0;
    reset();
    newQues();
    start();
  });

  $(document).on("click", ".answer", function () {

    var userAnswer = $(this).attr("data-answer");
    var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=Boi88Wtkqy6j61XKYNFfl5SbSbL1Hs2c";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var random=Math.floor(Math.random()*response.data.length);
      picUrl=response.data[random].images.preview_webp.url;
      console.log(response);
      
      console.log(picUrl);
    });

    if (userAnswer === correctAnswer) {

      correct++;

      var newDiv = $("<div>");
      var img = $("<img>");
      img.attr("src",picUrl);
      var p = $("<h3>");
      p.text("Correct answer!!!");
      newDiv.append(p,img);
      $(".answerPanel").empty();
      $(".answerPanel").append(newDiv);
      start2();
    }
    else {

      incorrect++;
      var newDiv = $("<div>");
      var img = $("<img>");
      img.attr("src",picUrl);
      var p = $("<h3>");
      p.text("Oh incorrect answer!!!");
      var p2 = $("<h3>");
      p2.text("the correct answer is: "+correctAnswer);
      newDiv.append(p,img,p2);
      $(".answerPanel").empty();
      $(".answerPanel").append(newDiv);
      start2();
    }

  })

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