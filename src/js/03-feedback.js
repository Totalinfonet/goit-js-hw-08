import throttle from 'lodash.throttle';

const FEEDBACK_FORM_STATE = {
  email: '',
  message: '',
};

console.log(FEEDBACK_FORM_STATE);

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  message: document.querySelector('textarea'),
};

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

onPageReload();

function onFormInput() {
  FEEDBACK_FORM_STATE.email = refs.email.value;
  FEEDBACK_FORM_STATE.message = refs.message.value;

  const feedbackFormStateJSON = JSON.stringify(FEEDBACK_FORM_STATE);

  console.log(feedbackFormStateJSON);

  localStorage.setItem('feedback-form-state', feedbackFormStateJSON);
}

function onFormSubmit(event) {
  event.preventDefault();

  console.log('Local storage data:', FEEDBACK_FORM_STATE);

  event.target.reset();

  localStorage.clear();
}

function onPageReload() {
  const savedLocalStorageData = localStorage.getItem('feedback-form-state');
  if (savedLocalStorageData) {
    try {
      const parsedSavedLocalStorageData = JSON.parse(savedLocalStorageData);
      refs.email.value = parsedSavedLocalStorageData.email;
      refs.message.value = parsedSavedLocalStorageData.message;
      console.log(parsedSavedLocalStorageData);
    } catch (error) {
      console.log(error.name);
      console.log(error.message);
    }
  }
}
