kuser.onkeydown = kuser.onkeyup = KeyEventlistener_User;
kuser.onkeypress = checkCPM_Username;



kpass.onkeydown = kpass.onkeyup = KeyEventlistener_Pass;
kpass.onkeypress = checkCPM_Password;

var iLastTime = 0;
var iTime = 0;
var iTotal = 0;
var iKeys = 0;
var CurrentCPM = 0;
var UD_user = [];
var UD_pass = [];
var DU_user = [];
var DU_pass = [];
var DD_user = [];
var DD_pass = [];
var DUTime = 0;
var DULastTime = 0;
var UDTime = 0;
var UDLastTime = 0;

function KeyEventlistener_User(e){
    checkDownUpKeyEvent(e,"user");
    checkUpDownKeyEvent(e,"user");
}

function KeyEventlistener_Pass(e){
    checkDownUpKeyEvent(e,"pass");
    checkUpDownKeyEvent(e,"pass");
}
// Down-Up
function checkDownUpKeyEvent(e, input_method){
    console.log("hallo....")
    if (e.type == "keydown"){
        if (DUTime == 0){
            DUTime = new Date().getTime();
        }
    }
    if (e.type == "keyup"){
        DULastTime = new Date().getTime();
        console.log(input_method);
        if (input_method == "user"){
            console.log("AAAa")
            if (DUTime == 0){
                DU_user.push(0);
            }else{
                DU_user.push(DULastTime - DUTime);
            }
        }else{
            if (DUTime == 0){
                DU_pass.push(0);
            }else{
                DU_pass.push(DULastTime - DUTime);
            }
        }
    }
    if (e.keyCode == "8"){ // Can use only backspace button
        //Check that there is removed in the input text (for delete button)
        var currentLength = 0;
        if (input_method == "user"){
            currentLength = document.getElementById('kuser').value.length;
            if (DU_user.length != 0){
                DU_user.pop();
                console.log(DU_user);
            }
        }else{
            currentLength = document.getElementById('kpass').value.length;
            if (DU_pass.length != 0){
                DU_pass.pop();
                console.log(DU_pass);
            }
        }
        console.log("DU_currentLength: " + currentLength);
    }
    if (input_method == "user"){
        if(document.getElementById('kuser').value.length == 0){
            DU_user = [];
        }
    }else{
        if(document.getElementById('kpass').value.length == 0){
            DU_pass = [];
        }
    }
}

//Up-Down
function checkUpDownKeyEvent(e, input_method){
    console.log("hello");
    if (e.type == "keyup"){
        if (UDTime == 0){
            UDTime = new Date().getTime();
        }
    }
    if (e.type == "keydown"){
        UDLastTime = new Date().getTime();
        // console.log("B:" + DULastTime);
        if (input_method == "user"){
            if (UDTime == 0){
                UD_user.push(0);
            }else{
                UD_user.push(UDLastTime - UDTime);
            }
        }else{
            if (UDTime == 0){
                UD_pass.push(0);
            }else{
                UD_pass.push(UDLastTime - UDTime);
            }
        }
    }
    if (e.keyCode == "8"){ // Can use only backspace button
        //Check that there is removed in the input text (for delete button)
        var currentLength = 0;
        if (input_method == "user"){
            currentLength = document.getElementById('kuser').value.length;
            if (UD_user.length != 0){
                UD_user.pop();
                console.log(UD_user);
            }
        }else{
            currentLength = document.getElementById('kpass').value.length;
            if (UD_pass.length != 0){
                UD_pass.pop();
                console.log(UD_pass);
            }
        }
        console.log("UD_currentLength: " + currentLength);
    }    
    if (input_method == "user"){
        if(document.getElementById('kuser').value.length == 0){
            UD_user = [];
        }
    }else{
        if(document.getElementById('kpass').value.length == 0){
            UD_pass = [];
        }
    }
}



//Check CPM
function checkCPM_Username(e){
    checkCPM("user");
}

function checkCPM_Password(e){
    checkCPM("pass");
}

function checkCPM(input_method){
    console.log("test");
    iTime = new Date().getTime();
    if (iLastTime != 0) {
        iKeys++;
        iTotal += iTime - iLastTime;
        CurrentCPM = Math.round(iKeys / iTotal * 6000, 2);
        // console.log(CurrentCPM);
        if (input_method == "user"){
            $('#Keys_User').html(iKeys);
            $('#CPM_User').html(Math.round(iKeys / iTotal * 6000, 2));
        }else{
            $('#Keys_Pass').html(iKeys);
            $('#CPM_Pass').html(Math.round(iKeys / iTotal * 6000, 2));
        }

    }
    iLastTime = iTime;

}

function Test(){
    //alert("UD_User" + UD_user +"\nDU_User" + DU_user+ "\nUD_Pass" + UD_pass + "\nDU_Pass" + DU_pass + "\nUD_User_avg" + calAvg(UD_user) + "\nDU_User_avg" + calAvg(DU_user) + "\nUD_Pass_avg" + calAvg(UD_pass) + "\nDU_Pass_avg" + calAvg(DU_pass))
    console.log("UD_User" + UD_user);
    console.log("DU_User" + DU_user);
    console.log("UD_Pass" + UD_pass);
    console.log("DU_Pass" + DU_pass);
    console.log("UD_User_avg" + calAvg(UD_user));
    console.log("DU_User_avg" + calAvg(DU_user));
    console.log("UD_Pass_avg" + calAvg(UD_pass));
    console.log("DU_Pass_avg" + calAvg(DU_pass));
    
}


function calAvg(listdata){
    var result = 0;
    var length = listdata.length;
    for (var i = 0;i < length; i++){
        result = result + listdata[i];
    }
    result = result/length;
    return result;
}
