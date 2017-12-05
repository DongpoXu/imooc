requirejs.config({
    paths:{
        jquery:'jquery-3.2.1.min'
    }
});

requirejs(['jquery'],function ($) {
    $('body').css('background-color','red')
});





