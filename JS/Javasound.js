//event that will be trigger once a sound has been selected
function loadsound(evt) {
    var file = evt.target.files;
    var fileSelect = file[0];
    var read = new FileReader();
    read.onload = function (e) {
        initializesound(this.result);
    };
    read.readAsArrayBuffer(fileSelect);
}
//sets the volume to match the slider and sets the text box to match the slider * 100
function volsound() {
    Volnode.gain.value = document.getElementById("vol").value;
    document.getElementById("volamount").value = document.getElementById("vol").value * 100;
}
//creates the buffer
function initializesound(ArrayBuffer) {
    audioContext.decodeAudioData(ArrayBuffer, function (buffer) {
    Soundbuffer = buffer;
    },
        function (e) {
            console.log('error', e);
        }
        );
}

function playsound(buffer) {
    //creates the buffer
    Soundsource = audioContext.createBufferSource();
    Soundsource.buffer = buffer;
    
    //connects the gain node
    Soundsource.connect(Volnode);

    //runs the connections 
    connections();
    
    //gets value of the volume slider
    var vol = document.getElementById("vol").value;
    Volnode.gain.value = vol;
    
    //clear spectrogram
    var canvas3 = document.getElementById("3rdvis");
    var viscontext3 = canvas3.getContext("2d");
    canvas3.width = specwidth;
    canvas3.height = specheight;
    viscontext3.fillStyle = "rgb(0,0,0)";
    viscontext3.fillRect(0,0, specwidth, specheight);

    //checks repeat
    Soundsource.loop = repeating;
    
    //checks filter
    filterapplyer();
    
    //starts the sound
    Soundsource.start(0);

    //requests the visualiser to draw a frame
    if(Playing == false && Playing2 == false) {
        requestAnimationFrame(drawVisualisation);
        requestAnimationFrame(drawVisualisation3);
    }
    //hides the play button
    document.getElementById("play").style.visibility = "hidden";
    //hides the upload panel
    document.getElementById("uploadloc").style.visibility = "hidden";
    //hides the upload button
    document.getElementById("uploadbutton").style.visibility = "hidden";
    
    Playing = true;
    specpos = 0;
}
//stops the sound source
function stopsound() {
    if(Soundsource) {
        //sound source stop
        Soundsource.stop(0);
        //resets the spectrogram location
        specpos = 0;
        Playing = false;
        //shows upload and play button
        document.getElementById("play").style.visibility = "visible";
        document.getElementById("uploadbutton").style.visibility = "visible";
        document.getElementById("filtslider").value = 0;
        document.getElementById("filtgainslider").value = 0;
    }
}

function pausesound() {
    //Pauses the sound
    if(Playing && Soundsource) {
        Playing = false;
        //disconnects the sound source thus puasing the sound
        Soundsource.disconnect();
        document.getElementById("play").style.visibility = "hidden";  
    }
    //Resumes the sound
        else {
            if(Soundsource) {
                Playing = true;
                //reconnects the audio thus resuming the sound
                Soundsource.connect(Volnode);
                requestAnimationFrame(drawVisualisation3);
            }
        }
}