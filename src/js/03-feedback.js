import throttle from 'lodash.throttle';

const feedbackFormRef = document.querySelector('.feedback-form');
const formEmailRef = document.querySelector('[name="email"]');
const formMessageRef = document.querySelector('[name="message"]');

feedbackFormRef.addEventListener('input', throttle(onFormInput, 500));
feedbackFormRef.addEventListener('submit', onFormSubmit);

const STORED_DATA_KEY = 'feedback-form-state';
const userFeedbackData = {};
const savedFeedback = localStorage.getItem(STORED_DATA_KEY);

function onFormInput() {
  userFeedbackData.email = formEmailRef.value.trim();
  userFeedbackData.message = formMessageRef.value.trim();
  localStorage.setItem(STORED_DATA_KEY, JSON.stringify(userFeedbackData));
}

retrieveUserFeedbackDataOnPageLoad();

function retrieveUserFeedbackDataOnPageLoad() {
  if (savedFeedback) {
    const parsedEmail = JSON.parse(savedFeedback).email;
    const parsedMessage = JSON.parse(savedFeedback).message;
    formEmailRef.value = parsedEmail;
    formMessageRef.value = parsedMessage;
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  if (formEmailRef.value && formMessageRef.value !== '') {
    console.log({
      email: formEmailRef.value.trim(),
      message: formMessageRef.value.trim(),
    });

    feedbackFormRef.reset();
    localStorage.removeItem(STORED_DATA_KEY);
  } else {
    alert('Error! Email and message field must be filled!');
  }
}
