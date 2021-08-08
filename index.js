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
        document.getElementById("tip-amount").innerHTML = answer.tip;
        document.getElementById("total-amount").innerHTML = answer.total;
    }
}

// function resetting everything to initial values
function initialValues() {
    removeActiveClasses();
    document.getElementById("bill").value = "";
    document.getElementById("people").value = "";
    document.getElementById("custom-tip-percent").value = "";
    document.getElementById("tip-amount").innerHTML = "";
    document.getElementById("total-amount").innerHTML = "";
    active = null;
}

// event listeners for tip percent buttons
for(let i=0; i < percentButtons.length; i++) {
    percentButtons[i].addEventListener("click",(event) => {
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
        if(tipPercent.match(/^[0-9]+$/)) {
            tipPercents["5"] = Number(tipPercent);
            displayOutput();
        } else {
            alert("Enter valid tip percent!")
        }
    }
})
document.getElementById("bill").addEventListener("change",(event) => {
    let bill = event.target.value;
    if(bill) {
        if( bill.match(/^[0-9]+$/) || bill.match(/^[0-9]+\.[0-9]+$/) ) {
            displayOutput();
        } else {
            alert("Enter valid bill!")
        }
    }
})
document.getElementById("people").addEventListener("input",(event) => {
    if(event.target.value == "0") {
        alert("Cant be zero")
    }
    let people = event.target.value;
    if(people) {
        if(people.match(/^[0-9]+$/)) {
            displayOutput();
        } else {
            alert("Enter valid no. of people!")
        }
    }
})

document.getElementById("reset-btn").addEventListener("click",() => {
    initialValues();
});

window.addEventListener("load",() => {
    initialValues();
})
