
const url = "https://open.er-api.com/v6/latest/"



let dropdown_selects = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
// console.log(dropdown_selects);

for (select of dropdown_selects) {
    for (code in countryList) {
        // console.log(codes, countryList[codes]);
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if (select.name === "from" && code === "USD") {
            newOption.selected = "selected";
        }
        if (select.name === "to" && code === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let flagurl = "https://flagsapi.com/" + countryCode + "/flat/64.png";

    let image = element.parentElement.querySelector("img");
    image.src = flagurl;
    image.alt = countryCode + " flag";
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    let currencyCode = document.querySelector(".from select");
    let toCurrCode = document.querySelector(".to select");
    // console.log(selectFrom.value);
    getExchangeRate(currencyCode.value, toCurrCode.value);
});

const getExchangeRate = async (currCode, toCurrCode) => {
    let fetchurl = url + currCode;
    let response = await fetch(fetchurl, ["GET"]);
    let obj = await response.json();
    let rate = obj["rates"];
    let val = rate[toCurrCode];
    let amount = document.querySelector("#input").value;
    let fromVal;
    if (amount === "") {
        fromVal = 0;
    }
    else {
        fromVal = amount;
    }
    
    let toVal = amount * val;
    let result = document.querySelector(".msg");
    result.innerText = fromVal + " " + currCode + " = " + toVal + " " + toCurrCode; 
};


// getExchangeRate("USD");