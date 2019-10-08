
var firebaseConfig = {
    apiKey: "AIzaSyDepXzJBW9XM7iGDriUVr_ZFJosmnRkdr8",
    authDomain: "train-scheduler-3a57f.firebaseapp.com",
    databaseURL: "https://train-scheduler-3a57f.firebaseio.com",
    projectId: "train-scheduler-3a57f",
    storageBucket: "",
    messagingSenderId: "1073000460530",
    appId: "1:1073000460530:web:15e2c844e15a8f6b70e06b",
    measurementId: "G-HFM05S37TM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var name = "";
var destination = "";
var time = "";
var frequency = "";

//grabs input data and stores in variable - pushes data to database
$("#add-train").on("click", function(event) {
    event.preventDefault();

    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    time = $("#time-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    var newTrain = {
        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
    };

    database.ref().push(newTrain);

    clearInputs()

    console.log(newTrain);
});

//function to clear input fields
function clearInputs() {
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
}

//gets snapshot of data added - appends newly input info to the schedule
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().frequency;

    //calculate next arrival time
    //calculate how many minutes until arrival

    var newRow = $("<tr>").append(`
    <td>${trainName}</td>
    <td>${trainDest}</td>
    <td>${trainFreq}</td>
    <td>Next Arrial</td>
    <td>Minutes Away</td>
    `);

    $("#current-schedule > tbody").append(newRow);
})