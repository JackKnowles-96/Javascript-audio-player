function syth1(mode) {
    //creates the first sythesizer
    sythesizer1 = audioContext.createOscillator();
    //gets the soundtype from a html box
    var soundtype = document.getElementById("soundtype1");
    soundtype = soundtype.options[soundtype.selectedIndex].value;
    var soundtype1val;
    if(soundtype == 0) {
        return;
    }
    if(soundtype == 1) {
        soundtype1val = "sine";
    }
    if(soundtype == 2) {
        soundtype1val = "square";
    }
    if(soundtype == 3) {
        soundtype1val = "sawtooth";
    }
    if(soundtype == 4) {
        soundtype1val = "triangle";
    }
        
    //checks for a filter
    filterapplyer();
    
    //sets the values of the sythsizer
    sythesizer1.frequency.value = document.getElementById("synth1").value;
    sythesizer1.detune.value = 0;
    sythesizer1.type = soundtype1val;
    //connects the sythesizer
    sythesizer1.connect(Volnode);
    
    //plays the sythesizer if mode is 1
    if (mode == 1) {
    //request the visualiser to draw frames
        if (Playing3 == false && Playing2 == false && Playing == false) {
            requestAnimationFrame(drawVisualisation3);    
            requestAnimationFrame(drawVisualisation);  
        }

    
    //plays the sythersizer     
    Playing2 = true;
    sythesizer1.start(0);
    //hides the play buttons
    document.getElementById("syth1id").style.visibility = "hidden";
    document.getElementById("sythpbid").style.visibility = "hidden"; 
    }
}    

function syth2(mode) {
    //creates the first sythesizer
    sythesizer2 = audioContext.createOscillator();
    //gets the soundtype from a html box
    var soundtype = document.getElementById("soundtype2");
    soundtype = soundtype.options[soundtype.selectedIndex].value;
    var soundtype2val;
    if (soundtype == 0) {
        return;
    }
    if (soundtype == 1) {
        soundtype2val = "sine";
    }
    if (soundtype == 2) {
        soundtype2val = "square";
    }
    if (soundtype == 3) {
        soundtype2val = "sawtooth";
    }
    if (soundtype == 4) {
        soundtype2val = "triangle";
    }
    
    //checks for a filter
    filterapplyer();
    
    //sets the values of the sythsizer
    sythesizer2.frequency.value = document.getElementById("synth2").value;
    sythesizer2.detune.value = 0;
    sythesizer2.type = soundtype2val;
    //connects the sythesizer
    sythesizer2.connect(Volnode);
    
    //plays the sythesizer if mode is 1
    if(mode == 1) {
    //requests the visualiser to draw frames
        if (Playing3 == false && Playing2 == false && Playing == false) {
            requestAnimationFrame(drawVisualisation3);    
            requestAnimationFrame(drawVisualisation);  
        }
        //plays the sythersizer 
        Playing3 = true;
        sythesizer2.start(0);
        //hides the play button
        document.getElementById("syth2id").style.visibility = "hidden"; 
        document.getElementById("sythpbid").style.visibility = "hidden"; 
    }
}    

/**

function to stop the sythersizers

*/
function stopsyth() {
    //checks if the sythersizer is playing
    if (Playing2) {
        sythesizer1.stop(0);
        document.getElementById("syth1id").style.visibility = "visible";
        Playing2 = false;
    }
    //checks if the sythersizer is playing
    if(Playing3) {
        sythesizer2.stop(0);
        document.getElementById("syth2id").style.visibility = "visible";
        Playing3 = false;
    }
    document.getElementById("sythpbid").style.visibility = "visible"; 
}

//sends the play command to both sythesizers
function playbothsyth() {
    syth2(1);
    syth1(1);
}

//changes the text box to match the bars
function sythvaldisplay() {
    document.getElementById("synth2amount").value = document.getElementById("synth2").value;
    document.getElementById("synth1amount").value = document.getElementById("synth1").value;
}