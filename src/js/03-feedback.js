import throttle from 'lodash.throttle';

const feedbackFormRef = document.querySelector('.feedback-form');
const formEmailRef = document.querySelector('[name="email"]');
const formMessageRef = document.querySelector('[name="message"]');

feedbackFormRef.addEventListener('input', throttle(onFormInput, 500));
feedbackFormRef.addEventListener('submit', onFormSubmit);

const STORED_DATA = 'feedback-form-state';

const userFeedbackData = {};

const savedFeedback = localStorage.getItem(STORED_DATA);

retrieveUserFeedbackDataOnPageLoad();

function onFormInput(event) {
  userFeedbackData[event.target.name] = event.target.value;

  localStorage.setItem(STORED_DATA, JSON.stringify(userFeedbackData));
}

function retrieveUserFeedbackDataOnPageLoad() {
  if (savedFeedback) {
    formEmailRef.value = JSON.parse(savedFeedback).email;
    formMessageRef.value = JSON.parse(savedFeedback).message;
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  if (formEmailRef.value && formMessageRef.value !== '') {
    console.log({ email: formEmailRef.value, message: formMessageRef.value });
  }

  feedbackFormRef.reset();
  localStorage.removeItem(STORED_DATA);
}
