function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const buttons = document.querySelector('#buttons');
let intervalId = null;

buttons.addEventListener('click', event => {
  const startBtn = event.currentTarget.children[0];
  const stopBtn = event.currentTarget.children[1];

  if (event.target.innerText === 'Start') {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    intervalId = setInterval(() => {
      document.body.style.background = getRandomHexColor();
    }, 1000);
  } else if (event.target.innerText === 'Stop') {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(intervalId);
  }
});
