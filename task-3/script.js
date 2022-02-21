function EmailValidate() {
    var email = document.forms["apparel"]["Email"];

    if (email.value == "") {
        document.getElementById("merror").innerHTML = "Please Enter your Email";
        document.getElementById("m").style.borderColor = "red";
        document.getElementById("m").style.borderWidth = "1px";
        document.getElementsByTagName("span")[1].className="sp";
        email.focus();
        return false;
    }
    if (!(String)(email.value).includes('@',1) || !(String)(email.value).includes('.',3)) {
        document.getElementById("merror").innerHTML = "Valid Emails must be in the form -@-.-";
        document.getElementById("m").style.borderColor = "red";
        document.getElementById("m").style.borderWidth = "1px";
        document.getElementsByTagName("span")[1].className="sp";
        email.focus();
        return false;
    }
    else {
        document.getElementById("merror").innerHTML = "";
        document.getElementById("m").style.borderWidth = "0px";
        document.getElementsByTagName("span")[1].className="";
        email.focus();
        return true;
    }
}