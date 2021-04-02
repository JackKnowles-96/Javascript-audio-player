// Draw the visualisation.
function drawVisualisation() {
//getting the canvas
var canvas = document.getElementById("1stvis");
var viscontext = canvas.getContext("2d");

//sets canvas area     
canvas.width = Width;
canvas.height = Height;
//sets the canvas fill colour
viscontext.fillStyle = "rgb(0,0,0)";
viscontext.fillRect (0,0, Width, Height);

//draws the frames then requests the next frame
drawFrequencyDomainVisualisation(viscontext);
drawTimeDomainVisualisation(viscontext);    
requestAnimationFrame(drawVisualisation);
}

// Draw the frequency domain visualisation.
function drawFrequencyDomainVisualisation(context) {
//creates an array using the analyser
var freq = new Uint8Array(analyser.frequencyBinCount);

analyser.getByteFrequencyData(freq);
//loops throught the bucket in the array
for(var x = 0; x < analyser.frequencyBinCount; x++) {
    //amplitude of the audio
    var val = freq[x];
    //covert into a  percentage
    var perc = val / 256;
    
    //used to draw the bar
    var hei = Height * perc;
    var offs = Height - hei - 1;
    var barW = Width/analyser.frequencyBinCount + 0.4;
    
    //sets the colour based on the users selection
    var colorpick = document.getElementById("viscol");
    colorpick = colorpick.options[colorpick.selectedIndex].value;
    if(colorpick == 1) {
        var hue = x/analyser.frequencyBinCount * Height;   
        context.fillStyle = "hsl(" + hue + ", 100%, 50%)";
    }
    if(colorpick == 2) {
        context.fillStyle = 'hsl('+ 360*Math.random() +',100%,50%)';
    }
    if(colorpick == 3) {
        color = color - 2;
        context.fillStyle = "hsl(" + color + ", 100%, 50%)"; 
        if (color < 190) {
            color = 250;
        }   
    }
    if(colorpick == 4) {
        context.fillStyle = "hsl(" + 360 + ", 100%, 50%)";
    }
    //draws a bar
    context.fillRect(x * barW, offs, barW, hei);        
}
}

// Draw the time domain visualisation.
function drawTimeDomainVisualisation(viscontext2) {
//creates an array using the analyser
var Timearray = new Uint8Array(analyser.frequencyBinCount);
analyser.getByteTimeDomainData(Timearray);

//loops throught the bucket in the array   
for(var x = 0; x < analyser.frequencyBinCount; x++) {
    //amplitude of the audio 
    var val = Timearray[x];
    //covert into a  percentage
    var perc = val / 256;
    
    //used to draw the wave
    var hei = Height * perc;
    var offs = Height - hei - 1;
    var barW = Width / analyser.frequencyBinCount;
    
    //sets the colour based on the users selection
    var colorpick2 = document.getElementById("viscol2");
    colorpick2 = colorpick2.options[colorpick2.selectedIndex].value;
    if(colorpick2 == 1) {
        var hue = x/analyser.frequencyBinCount * Height;   
        viscontext2.fillStyle = "hsl(" + hue + ", 100%, 50%)";
    }
    if(colorpick2 == 2) {
        viscontext2.fillStyle = 'hsl('+ 360*Math.random() +',100%, 50%)';
    }
    if(colorpick2 == 3) {
        viscontext2.fillStyle = "red";
    } 
    if(colorpick2 == 4) {
        viscontext2.fillStyle = "white";
    } 
    //draws the wave
    viscontext2.fillRect(x * barW, offs, 1,1);
}
}



