
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

var dataRef = firebase.database();

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

    dataRef.ref().push({
        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
    });

});

//gets snapshot of data added - appends newly input info to the schedule
dataRef.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    
})