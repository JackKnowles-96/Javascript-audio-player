/**
Varaibles that the application needs to function
correctly
*/

//The audiocontext
var audioContext;
//The analyser
var analyser;
//The sound buffer
var Soundbuffer = null;
//Sound source
var Soundsource = null;
//Is the player playing
var Playing = false;
//synthesizer1 is playing
var Playing2 = false;
//synthesizer2 is playing
var Playing3 = false;
//GainNode 
var Volnode = null;
//Single or realtime for spectrogram
var singlespec = false;
//spectrogram area
var specheight = 460;
var specwidth = 1240;
//left pos of the spectrogram
var specpos = 0;
//visual area
var Height = 460;
var Width = 1240;
//Bluewave required colour
var color = 250;
//handles if the song will repeat
var repeating = false;
//lowpass filter
var filt = null;
//filertype
var filtype = null;
//syth1 
var sythesizer1 = null;
//syth2
var sythesizer2 = null;
//is vis playing
var visplay = false;

window.addEventListener('load', initialize, false);
// Function to initalise the Java application.
function initialize() {
    audioContext = new AudioContext();
    Volnode = audioContext.createGain();
    filt = audioContext.createBiquadFilter();
    intihide();
    initAnalyser();
    connections();
    alert("Developed by Jack Knowles for use on Firefox and may not work as inteaded on other browsers");
}
//hides and shows elements at the applications start up
function intihide() {
    document.getElementById("freqtimevis").style.visibility = "hidden"; 
    document.getElementById("spectrovis").style.visibility = "hidden"; 
    document.getElementById("primana").style.visibility = "hidden";
    document.getElementById("repeaticon").style.visibility = "hidden"; 
    document.getElementById("filtermenu").style.visibility = "hidden"; 
    document.getElementById("1stvis").style.visibility = "visible";
}

// Function to initalise the analyser.
function initAnalyser() {
    analyser = audioContext.createAnalyser();
    analyser.smoothingTimeConstant = 0.8;
    analyser.fftSize = 2048;
}

// Function to add the events
function events() {
    document.getElementById("file").addEventListener('change', loadsound, false);
    document.getElementById("filtertypes").addEventListener('change', resetfilter);
}
/** 

Start of Gui elements management, hides and shows on button presses

*/
function showprim() {
    if(document.getElementById("primana").style.visibility == "visible") {
        document.getElementById("primana").style.visibility = "hidden";
    }
    else {
        document.getElementById("primana").style.visibility = "visible";
    }
}

function showfilters() {
    if(document.getElementById("filtermenu").style.visibility == "visible") {
        document.getElementById("filtermenu").style.visibility = "hidden";
        document.getElementById("syth1id").style.visibility = "hidden";
        document.getElementById("syth2id").style.visibility = "hidden";
        document.getElementById("sythpbid").style.visibility = "hidden";
    }
    else {
        document.getElementById("filtermenu").style.visibility = "visible";
        document.getElementById("syth1id").style.visibility = "visible";
        document.getElementById("syth2id").style.visibility = "visible";
        document.getElementById("sythpbid").style.visibility = "visible";
    }
}

function showupload() {
    if(document.getElementById("uploadloc").style.visibility == "visible") {
        document.getElementById("uploadloc").style.visibility = "hidden";
    }
    else {
        document.getElementById("uploadloc").style.visibility = "visible";
    }
}

function showtimeandfreqvis() {
    if(document.getElementById("freqtimevis").style.visibility == "visible") {
        document.getElementById("freqtimevis").style.visibility = "hidden";
    }
    else {
        document.getElementById("freqtimevis").style.visibility = "visible";
        document.getElementById("spectrovis").style.visibility = "hidden";
        document.getElementById("menu").style.visibility = "hidden";
    }
}

function showspect() {
    if(document.getElementById("spectrovis").style.visibility == "visible") {
        document.getElementById("spectrovis").style.visibility = "hidden";
    }
    else {
        document.getElementById("spectrovis").style.visibility = "visible";
        document.getElementById("freqtimevis").style.visibility = "hidden";
        document.getElementById("menu").style.visibility = "hidden";
    }
}

function showmenu() {
    if(document.getElementById("menu").style.visibility != "visible") {
        document.getElementById("menu").style.visibility = "visible";
        document.getElementById("freqtimevis").style.visibility = "hidden";
        document.getElementById("spectrovis").style.visibility = "hidden";
    }
}

//sets repeat to be true or false depend on if the icon is visible or not
function repeat() { 
    if(Soundsource) {
        if(document.getElementById("repeaticon").style.visibility == "visible") {
            repeating = false;          
            document.getElementById("repeaticon").style.visibility = "hidden"; 
        }
        else {
            repeating = true;          
            document.getElementById("repeaticon").style.visibility = "visible";   
        }
        Soundsource.loop = repeating;
    }
}
/** 

End of Gui elements 

*/
function connections() {
    //connects the gain node to the analyser  
    Volnode.connect(analyser);
    //connects the analyser to the destionation
    analyser.connect(audioContext.destination);
}

//allows the user to type in the box
function typebox() {
    document.getElementById("synth1").value = document.getElementById("synth1amount").value;
    document.getElementById("synth2").value = document.getElementById("synth2amount").value;
}