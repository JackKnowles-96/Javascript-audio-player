/**

This function applys a filter to the sound and allow for changes in 
realtime without the need to stop the audio.

*/

function filterapplyer() { 
    var filterpick = document.getElementById("filtertypes");
    filterpick = filterpick.options[filterpick.selectedIndex].value;
    if (filterpick == 1) {
        filtype = "highpass";
    }
    if (filterpick == 2) {
        filtype = "lowpass";
    }
    if (filterpick == 3) {
        filtype = "bandpass";
    }
    if (filterpick == 4) {
        filtype = "lowshelf";
    }
    if (filterpick == 5) {
        filtype = "highshelf";
    }
    //gets the value of the slider
    var filfreq = document.getElementById("filtslider").value;
    //sets the value of the text box
    document.getElementById("freqamount").value = filfreq;
    
    //gets the value of the slider
    var filgain = document.getElementById("filtgainslider").value;
    //sets the value of the text box
    document.getElementById("gainamount").value = filgain;
    
    if(Soundsource || sythesizer1 || sythesizer2) {
    //disconnects the volume node so that it can be connected else where
    Volnode.disconnect();  
    if(filterpick != 0) {
        //sets the properties of the filter
        filt.type = filtype;
        filt.frequency.value = filfreq;   
        filt.gain.value = filgain;
        
        //connects the filter
        Volnode.connect(filt);
        filt.connect(analyser);
    }
        else {
            //if filter not selected reconnect to analyser
            Volnode.connect(analyser); 
        }
        if(Soundsource) {
            //checks for repeat
            Soundsource.loop = repeating;
        }
    }
}
/** 

This function sets the silders to 0 when the filter type is changed

*/
function resetfilter() {
    document.getElementById("filtslider").value = 0;
    document.getElementById("filtgainslider").value = 0;
    filterapplyer();
}