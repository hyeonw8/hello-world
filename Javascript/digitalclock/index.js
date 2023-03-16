const time = document.querySelector('.time');


function clock (){
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    time.innerText = `${hours} : ${minutes} : ${seconds}`;
}

clock(); 
setInterval(clock, 1000);