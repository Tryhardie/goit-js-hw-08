import throttle from 'lodash.throttle';

const feedbackFormRef = document.querySelector('.feedback-form');
const formEmailRef = document.querySelector('input');
const formMessageRef = document.querySelector('textarea');

feedbackFormRef.addEventListener('input', throttle(onFormInput, 500));
feedbackFormRef.addEventListener('submit', onFormSubmit);

const STORAGE_KEY = 'feedback-form-state';

const userFeedbackData = {};

const savedFeedback = localStorage.getItem(STORAGE_KEY);

retrieveUserFeedbackDataOnPageLoad();

function onFormInput(event) {
  userFeedbackData[event.target.name] = event.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(userFeedbackData));
}

function retrieveUserFeedbackDataOnPageLoad() {
  if (savedFeedback) {
    formEmailRef.value = JSON.parse(savedFeedback).email;
    formMessageRef.value = JSON.parse(savedFeedback).message;
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  console.log(JSON.parse(savedFeedback));
  localStorage.removeItem(STORAGE_KEY);
  event.currentTarget.reset();
}
