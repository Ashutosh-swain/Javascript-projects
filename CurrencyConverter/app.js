const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// seeing the country code and currency code
// for(code in countryList){
//     console.log(code,countryList[code]);
// }

//creating new options in dropdown and adding it to dropdown
for(let select of dropdowns){
    for(currCode in countryList){
        // creating a new element and then adding it to a dropdownlist
        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        // adding it into dropdown list
        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target); // here target tells which element of html is being used by user so we need to make changes in that element only
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`; // for flag we are using any api call just changing the countrycode and getting the value
    let img = element.parentElement.querySelector("img"); // accessing the img tag of the select-container
    img.src = newSrc;
  };

  const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input"); // accessing the amount that is written in input tag
    let amtVal = amount.value;
   // console.log(amtVal); // seeing that correct input value is coming or not
    if (amtVal === "" || amtVal < 1) { // by this condition we are preventing the users to add negative number or null
      amtVal = 1;
      amount.value = "1";
    }
   // console.log(fromCurr.value,toCurr.value)// seeing the value of both the dropdown list
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`; // here we are using toLowerCase() because api calls are in lowercase and our country code vlaue strings are coming in uppercase
    let response = await fetch(URL); // using fetch api to call the api and get value of our required countries
    let data = await response.json(); // converting the response into json object so that our data extraction can be more easier
    let rate = data[toCurr.value.toLowerCase()];
  
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  };

  btn.addEventListener("click", (evt) => {
    evt.preventDefault(); // by using preventDefault() are saying don't perform refersh or loading of page and we are preventing all bydefault event of page and we will give the task to what to do to the page
    updateExchangeRate();
  });
  
  window.addEventListener("load", () => {
    updateExchangeRate();
  });