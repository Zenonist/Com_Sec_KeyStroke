kpass.onkeydown = kpass.onkeyup = captureKeyEvent;
kpass.onkeypress = checkCPM;

var iLastTime = 0;
var iTime = 0;
var iTotal = 0;
var iKeys = 0;
var CurrentCPM = 0;
var UD = [];
var DU = [];
var DD = [];
var DUTime = 0;
var DULastTime = 0;

// Down-Up
function captureKeyEvent(e){
    console.log("QE:" + e.keyCode);
    if (e.type == "keydown"){
        if (DUTime == 0){
            DUTime = new Date().getTime();
        }
        console.log("A:" + DUTime);
        console.log(e.type);
    }
    if (e.type == "keyup"){
        DULastTime = new Date().getTime();
        console.log("B:" + DULastTime);
        if (DUTime == 0){
            DU.push(0);
        }else{
            DU.push(DULastTime - DUTime);
            
        }
        console.log(e.type);
        console.log("A:" + DU + "Length: " + DU.length);
        DUTime = 0;
    }

    if (e.keyCode == "8"){ // Can use only backspace button
        //Check that there is removed in the input text (for delete button)
        var currentLength = document.getElementById('kpass').value.length;
        console.log("currentLength: " + currentLength);
            if (DU.length != 0){
                DU.pop();
                console.log(DU);
            }
    }
}

// Don't need e 
function checkCPM(){
    iTime = new Date().getTime();
    if (iLastTime != 0) {
        iKeys++;
        iTotal += iTime - iLastTime;
        CurrentCPM = Math.round(iKeys / iTotal * 6000, 2);
        // console.log(CurrentCPM);
        $('#Keys').html(iKeys);
        $('#CPM').html(Math.round(iKeys / iTotal * 6000, 2));
    }
    iLastTime = iTime;
}


function Test(){
    alert(keyboard_events);
    console.log(UD)
}