const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
const table = document.querySelector('.table');
const button = document.querySelector('.btn');
const firstInput = document.querySelector('.latitude');
const secondInput = document.querySelector('.longitude');

let latitude = 55.752;
let longitude = 37.6156;

const getData = async () => {
    const responce = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum&timezone=GMT&forecast_days=10`);
    const data = await responce.json();

    let temp = data.daily;

    const html = temp.temperature_2m_max.map((item, index) =>
        ` <tr class="day">
            <td class="date">${temp.time[index].slice(-2)}.${temp.time[index].slice(-5, -3)}</td>
            <td class="week-day">${toDays(temp.time[index])}</td>
            <td class="weather">${item >= 1 ? '+' + String(item).split('.')[0] : item <= -1 ? String(item).split('.')[0] : 0} 
            ${temp.rain_sum[index] > 1 ? '🌧' : temp.snowfall_sum[index] > 1 ? '🌨' : '☀️'}</td>
        </tr>`
    ).join("")

    table.insertAdjacentHTML('beforeend', html);

    const daysColor = document.querySelectorAll('.week-day');

    for (let day of daysColor) {
        if (day.innerHTML == 'сб' || day.innerHTML == 'вс') {
            day.style.color = 'red';
            day.style.opacity = 0.5;
        } else {
            day.style.opacity = 0.5;
        }
    }
}

getData();

const toDays = (day) => {
    let date = new Date(day);
    let dayOfWeek = date.getDay();
    return days[dayOfWeek];
}

button.addEventListener('click', () => {
    table.innerHTML = '';
    getData();
});
firstInput.addEventListener('keyup', (e) => {
    latitude = e.target.value;
});
secondInput.addEventListener('keyup', (e) => {
    longitude = e.target.value;
});