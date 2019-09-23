let fillerEl = document.querySelector('.js-mobile-filters');
if (fillerEl) {
    fillerEl.addEventListener('click', function () {
        let item = document.querySelector('.js-nav');
        item.classList.add('is-active');
    },false);
};
let closeEl = document.querySelector('.js-close');
if (closeEl) {
    closeEl.addEventListener('click', function () {
        let item = document.querySelector('.js-nav');
        item.classList.remove('is-active');
    })
};

$(function () {
    lgChem.init();
});

$( function() {
    $( "#datepicker" ).datepicker();
} );
