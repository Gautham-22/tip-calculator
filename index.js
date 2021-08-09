let percentButtons = document.querySelectorAll(".tip-percent");
let active;          // for storing the current tip percent (indirectly by storing index)
let tipPercents = {  // tip percents according to the index of buttons
    0 : 5,
    1 : 10,
    2 : 15,
    3 : 25, 
    4 : 50
}

// function checking whether inputs are ready
function checkInputs() {
    let bill = document.getElementById("bill").value, people = document.getElementById("people").value;
    let values = [bill,tipPercents[active],people];
    if(values[0] && values[1] && values[2]) {
        return {
            ready : true,
            values : values
        };
    }
    return {
        ready : false
    };
}

// function calculating individual tip and individual total
function calculateAnswer(bill,percent,people) {
    let tip = 0, total = 0, individualBill = bill/people;  // individual bill = total bill / total no. of persons
    tip = individualBill * percent / 100; 
    total = individualBill + tip;
    tip = tip.toFixed(3);
    total = total.toFixed(2);
    return {
        tip : tip.slice(0,tip.length-1),
        total : total
    };
}

// function removing class - active from all tip buttons
function removeActiveClasses() {
    for(let i=0;i<percentButtons.length;i++) {
        percentButtons[i].classList.remove("active");
    }
}

// function displaying output
function displayOutput() {
    let inputs;
    inputs = checkInputs();
    if(inputs.ready) {
        let answer = calculateAnswer(...inputs.values);
        document.getElementById("tip-amount").innerHTML = "$" + answer.tip;
        document.getElementById("total-amount").innerHTML = "$" + answer.total;
    }
}

// function resetting everything to initial values
function initialValues() {
    removeActiveClasses();
    // removing errors
    removeError("bill","bill-error-msg");
    removeError("custom-tip-percent","tip-error-msg");
    removeError("people","people-error-msg");
    document.getElementById("reset-btn").classList.add("disabled");  // restoring disability of reset-btn
    document.getElementById("bill").value = "";
    document.getElementById("people").value = "";
    document.getElementById("custom-tip-percent").value = "";
    document.getElementById("tip-amount").innerHTML = "$0.00";
    document.getElementById("total-amount").innerHTML = "$0.00";
    active = null;
}

// function for adding errors
function addError(place,label,msg) {
    document.getElementById(place).classList.add("error");
    document.getElementById(label).innerHTML = msg;
}

// function for removing errors
function removeError(place,label) {
    document.getElementById(place).classList.remove("error");
    document.getElementById(label).innerHTML = "";
}

// event listeners for tip percent buttons
for(let i=0; i < percentButtons.length; i++) {
    percentButtons[i].addEventListener("click",() => {
        // remove disability of reset-btn and error in customTip when tip-percent buttons are clicked
        if(i != percentButtons.length-1) { 
            document.getElementById("reset-btn").classList.remove("disabled"); 
            removeError("custom-tip-percent","tip-error-msg"); 
        } else {  // if the custom tip button is active and custom value is invalid
            if(percentButtons[i].value && !percentButtons[i].value.match(/^[0-9]+$/) && !percentButtons[i].value.match(/^[0-9]+\.[0-9]+$/)) {
                addError("custom-tip-percent","tip-error-msg","Invalid tip %");
            }
        }
        removeActiveClasses();
        active = i;   // stores index of active button
        percentButtons[i].classList.add("active");
        displayOutput();
    });
}

// event listeners for custom inputs
document.getElementById("custom-tip-percent").addEventListener("input",(event) => {
    let tipPercent = event.target.value;
    if(tipPercent) {
        document.getElementById("reset-btn").classList.remove("disabled"); // rmoving disability of reset-btn if there is a value
        if(tipPercent.match(/^[0-9]+$/) || tipPercent.match(/^[0-9]+\.[0-9]+$/)) {
            tipPercents["5"] = Number(tipPercent);
            displayOutput();
            removeError("custom-tip-percent","tip-error-msg");  // removing errors since input is valid
        } else {
            addError("custom-tip-percent","tip-error-msg","Invalid tip %");
        }
    } else {
        removeError("custom-tip-percent","tip-error-msg");  // removing errors since input has no value
    }
})
document.getElementById("bill").addEventListener("input",(event) => {
    let bill = event.target.value;
    if(bill) {
        document.getElementById("reset-btn").classList.remove("disabled"); 
        if( bill.match(/^[0-9]+$/) || bill.match(/^[0-9]+\.[0-9]+$/) ) {
            displayOutput();
            removeError("bill","bill-error-msg");
        } else {
            addError("bill","bill-error-msg","Invalid bill");
        }
    } else {
        removeError("bill","bill-error-msg");
    }
})
document.getElementById("people").addEventListener("input",(event) => {
    if(event.target.value == "0") {
        document.getElementById("reset-btn").classList.remove("disabled"); // removing disability of reset-btn if value is 0
        addError("people","people-error-msg","Can't be zero");
        return;
    }
    let people = event.target.value;
    if(people) {
        document.getElementById("reset-btn").classList.remove("disabled"); 
        if(people.match(/^[0-9]+$/)) {
            displayOutput();
            removeError("people","people-error-msg");
        } else {
            addError("people","people-error-msg","Invalid people");
        }
    } else {
        removeError("people","people-error-msg");
    }
})

document.getElementById("reset-btn").addEventListener("click",() => {
    initialValues();
});

window.addEventListener("load",() => {
    initialValues();
})
