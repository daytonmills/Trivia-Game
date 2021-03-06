var correctAnswers = 0;
var wrongAnswers = 0;
var noAnswers = 0;
var timeInterval;

var questions = [{
        question: "Erlich's green t-shirt in the first episode says 'I know HTML', meaning:",
        options: ["HyperText Markup Language", "How to Make Lasagna", "How to Meet Ladies"],
        answer: "How to Meet Ladies"
    },
    {
        question: "Erlich originally owned what percent of Pied Piper?",
        options: ["50%", "40%", "30%", "20%", "10%", "0%"],
        answer: "10%"
    },
    {
        question: "How did Peter Gregory die?",
        options: ["Trampeled by Rhino", "Shooting Accident", "Exhaustion from running"],
        answer: "Exhaustion from running"
    },
    {
        question: "What is the address of the Pied Piper incubator?",
        options: ["2530 Newell Road", "112 Gaben Street", "5230 Newell Road", "1121 Gaben Street"],
        answer: "5230 Newell Road"
    },
    {
        question: "What does ROI stand for?",
        options: ["Reading of Information", "Return on Investment", "Radio on Internet", "Reading on Internet"],
        answer: "Radio on Internet"
    },
    {
        question: "What is in the middle of the Conjoined Triangles of Success?",
        options: ["Engineering", "Manufacturing", "Sales", "Growth", "Compromise"],
        answer: "Compromise"
    }
];

var timer =
{
    time: 60,

    start: function ()
    {
        timeInterval = setInterval(timer.count, 1000);
    },

    stop: function ()
    {
        clearInterval(timeInterval);
        gameOver();
    },

    count: function ()
    {
        if (timer.time > 0)
        {
            timer.time--;
            $('#time').html(timer.time);
        }
        else
        {
            timer.stop();
        }
    },
}

function gameOver()
{
    for (var i = 0; i < questions.length; i++)
    {
        var userAnswer = $("input:radio[name ='"+ i +"']:checked").val();
        if (questions[i].answer === userAnswer)
        {
            correctAnswers++;
        }
        else if (userAnswer == null)
        {
            noAnswers++;
        }
        else if (questions[i].answer !== userAnswer)
        {
            wrongAnswers++;
        }
    }

    $(".questions").hide();
    $(".result").show();
    $(".result #correct").html(correctAnswers);
    $(".result #wrong").html(wrongAnswers);
    $(".result #none").html(noAnswers);
}

function loadAnswers() {
    $(".questions, .timer").show();
    for (var i = 0; i < questions.length; i++)
    {
        $(".questions").append("<div id=q"+ i +"></div>");

        $("#q" + i).append("<div><p>" + questions[i].question + "</p></div>");

        for (var a = 0; a < questions[i].options.length; a++)
        {
            $("#q" + i).append("<input type='radio' name='"+ i +"' value='" + questions[i].options[a] +"'>" +questions[i].options[a] + "<br/>");
        }
    }
    $(".questions").append("<button class='btn btn-lg btn-outline-danger' id='submit'>Submit</button>")

    $("#submit").on("click", function ()
    {
        timer.stop();
    });
}

$(document).ready(function ()
{
    $(".result, .timer, .questions").hide();
    $("#start").on("click", function ()
    {
        $(".start").hide();
        loadAnswers();
        timer.start();
    })
});
