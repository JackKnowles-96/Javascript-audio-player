// Draw the visualisation.
function drawVisualisation3() {
drawSpecVis();
if(Playing || Playing2 || Playing3) {
requestAnimationFrame(drawVisualisation3);
    }
}

function drawSpecVis() {
    //getting the canvas
    var canvas3 = document.getElementById("3rdvis");
    var viscontext3 = canvas3.getContext("2d");
    //creates a temp canvas to be used to copy from
    var tempcan = document.createElement("canvas");
    tempcan.width = specwidth;
    tempcan.height = specheight;
    var tempC = tempcan.getContext("2d");
    
    // copys the currect canvas to the temp canvas 
    tempC.drawImage(canvas3,0,0, specwidth, specheight);

    //creates an array using the analyser 
    var freqDom = new Uint8Array(analyser.frequencyBinCount);
    //copys the current time domain date into btye array
    analyser.getByteFrequencyData(freqDom);
    //vars used for the primitive freq analyser 
    var hightestval = -1;
    var hightestvalind = -1;
    var highestvallen = - 1;

    //if the specpos reaches the end of the canvas and move the canvas
    if(specpos == specwidth) {
        for (var x = 0; x < analyser.frequencyBinCount; x++) {
            var val = freqDom[x];
            //if val is greater than highestval then hightval = val
            if (val > hightestval) {
                hightestval = val;
                hightestvalind = x;
                highestvallen = 1;
            } 
            else {
                if(val == hightestval) {
                    if( (hightestvalind + highestvallen) == x) {
                        highestvallen++;
                    }
                }
            }
            //gets the select color
            var colorselected = document.getElementById("viscol3");
            colorselected = colorselected.options[colorselected.selectedIndex].value;
            
            if(colorselected == 1) {
                var hue = (val / 256) * 60;
                tempC.fillStyle = "hsl(" + hue + ", 100%, 50%)";
            }
            else {
                var hue = (val / 256) * 360;
                tempC.fillStyle = "hsl(" + hue + ", 100%, 50%)";  
            }
            tempC.fillRect(specwidth - 1, (specheight - x), 1, 1);
        }
        //copys tempcanvas to the canvas
        viscontext3.translate(-1, 0);
        viscontext3.drawImage(tempcan,0,0, specwidth, specheight);
        viscontext3.setTransform(1,0,0,1,0,0);
    }
    //It hasnt reached the end so fill right to left
    else {
        for (var x = 0; x < analyser.frequencyBinCount; x++) {
            var val = freqDom[x];
            //if val is greater than highestval then hightval = val
            if (val > hightestval) {
                hightestval = val;
                hightestvalind = x;
                highestvallen = 1;
            } 
            else {
                if(val == hightestval) {
                    if( (hightestvalind + highestvallen) == x) {
                        highestvallen++;
                    }
                }
            }
            
            //gets the select color
            var colorselected = document.getElementById("viscol3");
            colorselected = colorselected.options[colorselected.selectedIndex].value;
            if(colorselected == 1) {
                var hue = (val / 256) * 60;
                tempC.fillStyle = "hsl(" + hue + ", 100%, 50%)";
            }
            else {
                var hue = (val / 256) * 360;
                tempC.fillStyle = "hsl(" + hue + ", 100%, 50%)";  
            }
            tempC.fillRect(specpos, (specheight - x), 1, 1);
        }
    //copies to canvas
    viscontext3.drawImage(tempcan,0,0, specwidth, specheight);
    specpos++;
    }
    //displays the primitive frequency data
    var highestvalindstart = hightestvalind;
    var highestvalindend = hightestvalind + (highestvallen - 1);
    var tempind = Math.round( (highestvalindstart + highestvalindend) / 2);
    var tmpfreq = ValueToFrequency(tempind);
    var tmpind = FrequencyToIndex(tmpfreq);
    document.getElementById("primfreq").innerHTML="<h4> Frequency analyser: </h4>" + "FreqDomain.length: " + freqDom.length 
        + " <br> Highest Value: " + hightestval + " <br> Highest Value Index: " + hightestvalind + " <br> Highest Value Length: " 
        + highestvallen + " <br> Highest Value Length AS INDEX: " + (hightestvalind + (highestvallen - 1)) 
        + " <br> Temp Index: " + tempind + " <br> Value To Frequency: " + tmpfreq + " <br> Get Frequency To Index: " + tmpind; 
}
//calcs the value to frequency
function ValueToFrequency(TempValue) {
    var nyfreq = audioContext.sampleRate / 2;
    var freq = TempValue * nyfreq / analyser.frequencyBinCount;
    //reuturns the frequency
    return freq;
} 
//calcs the frequency to index
function FrequencyToIndex(Tempfreq) {
    var nyfreq = audioContext.sampleRate / 2;
    var ind = Math.round(Tempfreq / nyfreq * analyser.frequencyBinCount);
    //returns the index
    return ind;
} 
//if only one frame or realtime
function singleorreal() {
    if(document.getElementById("singlespec").checked) {
        singlespec = true;
    }
    else {
        singlespec = false;
    }
}