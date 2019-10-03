
//show/hide mobile filters
$(document).ready(function () {

    var fillerEl = document.querySelector('.js-mobile-filters');
    if (fillerEl) {

        fillerEl.addEventListener('click', function () {
            var item = document.querySelector('.js-nav');
            item.classList.add('is-active');
        });
    };
    var closeEl = document.querySelector('.js-close');
    if (closeEl) {
        closeEl.addEventListener('click', function () {
            var item = document.querySelector('.js-nav');
            item.classList.remove('is-active');
        })
    };

//Datapicker for filters
    var dateToday = new Date();
    $( function() {
        $( "#datepicker" ).datepicker({
            minDate: dateToday,
        });
    } );

    $("body").on("focus", "#datepicker", function(){
        $(this).datepicker({minDate: dateToday});
    });
    $.datepicker.setDefaults( $.datepicker.regional[ "ru" ] );

});
