const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.cards');

cards.forEach(card => {
    card.addEventListener('click', function(){
        modalOverlay.classList.add('active');        
    });    
})

document.querySelector('.close-modal')
.addEventListener('click', () =>
    modalOverlay.classList.remove('active'));


