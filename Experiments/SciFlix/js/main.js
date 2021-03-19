$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    dots: false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
});

$(document).ready(function(){
    $(window).scroll(function () {
      if($(document).scrollTop() > 50){
        $("header").css('background','#141414');
      }
      else{
        $("header").css('background','');
      }
    });
  });