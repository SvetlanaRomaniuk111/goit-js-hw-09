import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
let chosedDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (selectedDates[0] > currentDate) {
      startBtn.disabled = false;
      chosedDate = selectedDates[0];
    } else {
      alert('Please chose date in the future');
      startBtn.disabled = true;
    }
  },
};
const datePicker = document.querySelector('#datetime-picker');
flatpickr(datePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}

startBtn.addEventListener('click', () => {
  const dataDays = document.querySelector('[data-days]');
  const dataHours = document.querySelector('[data-hours]');
  const dataMinutes = document.querySelector('[data-minutes]');
  const dataSeconds = document.querySelector('[data-seconds]');
  let timer = Date.parse(chosedDate) - Date.parse(new Date());
  startBtn.disabled = true;
  datePicker.disabled = true;
  const timerInterval = setInterval(() => {
    timer = timer - 1000;
    const converted = convertMs(timer);
    dataDays.innerText = addLeadingZero(converted.days);
    dataHours.innerText = addLeadingZero(converted.hours);
    dataMinutes.innerText = addLeadingZero(converted.minutes);
    dataSeconds.innerText = addLeadingZero(converted.seconds);
    if (timer <= 0) {
      startBtn.disabled = false;
      clearInterval(timerInterval);
      datePicker.disabled = false;
    }
  }, 1000);
});

flatpickr('#datetime-picker', options);
