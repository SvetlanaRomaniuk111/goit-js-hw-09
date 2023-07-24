import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
  return promise
    .then(value => {
      console.log(value);
    })
    .catch(err => {
      console.log(err);
    });
}

const promiseForm = document.querySelector('.form');

promiseForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = {
    delay: Number(event.currentTarget.elements.delay.value),
    step: Number(event.currentTarget.elements.step.value),
    amount: Number(event.currentTarget.elements.amount.value),
  };
  let delay = data.delay;
  for (let i = 0; i < data.amount; i++) {
    createPromise(i + 1, delay);
    delay += data.step;
  }
});
