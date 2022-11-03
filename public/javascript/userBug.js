// user bug dom behavior

const container = document.querySelector('.user-bug');
const btns = document.querySelector('.user-bug-btn-container');

container.addEventListener('mouseover', () => {
    btns.classList.toggle('hidden')
});