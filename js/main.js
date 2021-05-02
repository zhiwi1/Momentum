// DOM Elements
const time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focusText = document.getElementById('focus');
let x = 0;
let statIndex = -1;
// Options
// const showAmPm = true;
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btnText = document.querySelector('.btn-text');

// если в ссылке заменить lang=en на lang=ru, цитаты будут на русском языке
// префикс https://cors-anywhere.herokuapp.com используем для доступа к данным с других сайтов если браузер возвращает ошибку Cross-Origin Request Blocked 
async function getQuote() {
    const url = ' https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
    const res = await fetch(url);
    const data = await res.json();
    blockquote.textContent = data.quoteText;
    figcaption.textContent = data.quoteAuthor;
}
// Show Time
function showTime() {
    let today = new Date(),
        dayMonth = today.getDate(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();
    // Output Time
    time.innerHTML = `${getWeekName(today)}<span>, </span>${addZero(dayMonth)}<span> </span>${getMonthName(today)}<span>, </span>${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(
        sec)}`;
    setTimeout(showTime, 1000);
}
const bases = ["/assets/images/night/", '/assets/images/morning/', '/assets/images/day/', '/assets/images/evening/'];
const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;
const body = document.querySelector('body');
const btn = document.querySelector('.btn');

function viewBgImage(src) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        body.style.backgroundImage = `url(${src})`;
    };
}
function getImage() {
    if (x == 0 || x == 3 || x == 2) {
        document.body.style.color = 'white';
        document.getElementById('quote').style.color = 'black';
    } else {

        document.body.style.color = 'black';
    }

    let index = -1;
    do {
        index = getRandomInt(images.length - 1);
    }
    while (statIndex == index);
    if (x == 1 && (index == 0 || index == 3 || index == 4 || index == 7 || index == 8 || index == 13 || index == 18)) {
        document.body.style.color = 'white';
    }
    else if (x == 2 && index == 7 || index == 18) {
        document.body.style.color = 'black';
    }

    const imageSrc = bases[x] + images[index];

    viewBgImage(imageSrc);
    statIndex = index;
    i++;
    if (i == 20) { i = 0; x++; }
    if (x == 4) { x = 0; }
    btn.disabled = true;
    setTimeout(function () { btn.disabled = false }, 1000);
    setTimeout(getImage, 3600000);
}
//Name of day pf the week
function getWeekName(date) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return days[date.getDay()];
}
function getMonthName(date) {
    let monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return monthes[date.getMonth()];
}
//Add Zeros
function addZero(n) {

    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

//Set Background and Greeting
function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();

    if (hour < 6) {
        // Night
        x = 0;
        getImage();
        greeting.textContent = 'Good Night, '

    } else if (hour < 12) {
        // Morning
        x = 1;
        getImage();
        greeting.textContent = 'Good Morning, ';
    } else if (hour < 18) {
        // Afternoon
        x = 2;
        getImage();
        greeting.textContent = 'Good Afternoon, ';
    } else {
        //evening
        x = 3;
        getImage();
        greeting.textContent = 'Good Evening, ';

    }
    setTimeout(setBgGreet, 3600000);
}
function getName() {
    const localName = localStorage.getItem('name');

    if (!localName) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

function checkName(e) {
    const input = e.target.innerText.trim();
    if (input !== '') {
        localStorage.setItem('name', input);
    } else {
        name.innerText = localStorage.getItem('name');
    }
}

// Set Name
function setName(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which === 13 || e.keyCode === 13) {
            checkName(e);
            name.blur();
        }
    } else {
        checkName(e);
    }
}
function getFocus() {
    const localFocus = localStorage.getItem('focus');
    if (!localFocus) {
        focusText.textContent = '[Enter Focus]';
    } else {
        focusText.textContent = localFocus;
    }
}
function checkFocus(e) {
    const input = e.target.innerText.trim();
    if (input !== '') {
        localStorage.setItem('focus', input);
    } else {
        focusText.innerText = localStorage.getItem('focus');
    }
}

// Set Name
function setFocus(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which === 13 || e.keyCode === 13) {
            checkFocus(e);
            focusText.blur();
        }
    } else {
        checkFocus(e);
    }
}
function getCity() {
    if (localStorage.getItem('city') === null || localStorage.getItem('city') == '') {
        city.textContent = '[Enter Name]';

        //localStorage.getItem('name');
    } else {
        city.textContent = localStorage.getItem('city');
    }
}
// Set Name
function setCity(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            if (city.innerText.length == 0 || !city.innerText.trim()) {
                city.innerText = localStorage.getItem('city');
            } else {
                localStorage.setItem('city', e.target.innerText);
                getWeather();
                city.blur();
            }
        }
    } else {
        if (city.innerText.length == 0 || !city.innerText.trim()) {
            city.innerText = localStorage.getItem('city');
        }
        getWeather();
        localStorage.setItem('city', e.target.innerText);
    }
}
// Get Focus
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const weatherWind = document.querySelector('.weatherWind');
const airHumidity = document.querySelector('.airHumidity');

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod != '404') {
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        airHumidity.textContent = data.main.humidity + ' %';
        weatherWind.textContent = data.wind.speed + ' m/s';
    } else {
        weatherDescription.textContent = 'City doesn\'t exists';
        temperature.textContent = '';
        airHumidity.textContent = '';
        weatherWind.textContent = '';
        weatherIcon.className = null;
    }
}
document.addEventListener('DOMContentLoaded', getWeather);

city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('focus', () => {
    name.innerText = '';
})

focusText.addEventListener('keypress', setFocus);
focusText.addEventListener('blur', setFocus);
focusText.addEventListener('click', () => {
    focusText.textContent = '';
})
// Run
showTime();
setBgGreet();
getName();
getFocus();
getCity();
getWeather();
btn.addEventListener('click', getImage);
document.addEventListener('DOMContentLoaded', getQuote);
btnText.addEventListener('click', getQuote);
