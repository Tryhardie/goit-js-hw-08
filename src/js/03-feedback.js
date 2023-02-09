import throttle from 'lodash.throttle';

const feedbackFormRef = document.querySelector('.feedback-form');
const formEmailRef = document.querySelector('[name="email"]');
const formMessageRef = document.querySelector('[name="message"]');

feedbackFormRef.addEventListener('input', throttle(onFormInput, 500));
feedbackFormRef.addEventListener('submit', onFormSubmit);

const STORED_DATA_KEY = 'feedback-form-state';
const userFeedbackData = {};
const savedFeedback = localStorage.getItem(STORED_DATA_KEY);

function onFormInput(event) {
  userFeedbackData[event.target.name] = event.target.value.trim();
  localStorage.setItem(STORED_DATA_KEY, JSON.stringify(userFeedbackData));
}

retrieveUserFeedbackDataOnPageLoad();

function retrieveUserFeedbackDataOnPageLoad() {
  if (savedFeedback) {
    const parsedEmail = JSON.parse(savedFeedback).email;
    const parsedMessage = JSON.parse(savedFeedback).message;

    parsedEmail !== undefined || null
      ? (formEmailRef.value = parsedEmail)
      : (formEmailRef.value = '');
    parsedMessage !== undefined || null
      ? (formMessageRef.value = parsedMessage)
      : (formMessageRef.value = '');
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  if (formEmailRef.value && formMessageRef.value !== '') {
    console.log({
      email: formEmailRef.value.trim(),
      message: formMessageRef.value.trim(),
    });
  }

  feedbackFormRef.reset();
  localStorage.removeItem(STORED_DATA_KEY);
}
