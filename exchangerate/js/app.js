const currencyoneel = document.getElementById('currency-one'),
        amountoneel = document.getElementById('amount-one');

const currencytwoel = document.getElementById('currency-two'),
        amounttwoel = document.getElementById('amount-two');

const swapel = document.getElementById('swap'),
    rateel = document.getElementById('rate');



//Calculate
function calculate(){
    // console.log('hey');

    const crcyone = currencyoneel.value;
    const crcytwo = currencytwoel.value;
    // console.log(typeof crcytwo);

    // const amtone = amountoneel.value;
    // const amttwo = amounttwoel.value;

    // console.log(crcyone,amtone);
    // console.log(crcytwo,amttwo);
    const apikey = "d794e209ad7a28d5f21d5035";

    const uri = `https://v6.exchangerate-api.com/v6/${apikey}/latest/${crcyone}`;
    // console.log(uri);


    // AJAX Request
    //promise out
    fetch(uri)
    .then(res => res.json())
    .then(data=>{
        // console.log(data);

        // console.log(data.conversion_rates);
        // console.log(typeof data.conversion_rates);
        // console.log(data.conversion_rates[crcytwo]);

        const rate = data.conversion_rates[crcytwo];
        // console.log(rate);

        rateel.innerHTML = `1 ${crcyone} = ${rate} ${crcytwo}`;
   

        amounttwoel.value = (amountoneel.value * rate).toFixed(2);
    });



}



//Event Listener
currencyoneel.addEventListener('change',calculate);
amountoneel.addEventListener('input',calculate);

currencytwoel.addEventListener('change',calculate);
amounttwoel.addEventListener('input',calculate);

swapel.addEventListener('click',()=>{
    // console.log("already swape");

    const temp = currencyoneel.value;

    currencyoneel.value = currencytwoel.value;
    currencytwoel.value = temp;


    calculate();
});


