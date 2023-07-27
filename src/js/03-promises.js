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
      // console.log(value);
      Notiflix.Notify.success(value);
    })
    .catch(err => {
      // console.log(err);
      Notiflix.Notify.failure(err);
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
  let { delay, step, amount } = data;
  if (delay < 0 || step < 0 || amount <= 0) {
    Notiflix.Notify.warning('You enter incorrect values');
  } else {
    for (let i = 0; i < amount; i++) {
      createPromise(i + 1, delay);
      delay += step;
    }
  }
});
