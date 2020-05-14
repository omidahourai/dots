function Carousel(el){

	let carousel = this;

	 carousel.element = $(el);
	 carousel.slides;
	 carousel.currentSlide = 0;
	 carousel.previousSlide = 0;
	 carousel.numberOfSlides = 0;



	 carousel.changePosition = function(direction){

	 	if(direction === false) {
	 		carousel.currentSlide--;
	 	} else
	 	if(direction === true) {
	 		carousel.currentSlide++;
	 	}
	 	if(carousel.currentSlide < 0){
	 		carousel.currentSlide = carousel.numberOfSlides-1;
	 	} else
	 	if(carousel.currentSlide >= carousel.numberOfSlides){
	 		carousel.currentSlide = 0;
	 	}
	 	carousel.showPosition();
	 };



	 carousel.showPosition = function(){
	 	carousel.slides
	 		.eq(carousel.currentSlide).addClass("active")
	 		.siblings().removeClass("active");
	 	};



	 carousel.init = function(){

	 	carousel.slides = carousel.element.find(".carousel-slide");
	 	carousel.numberOfSlides = carousel.slides.length;

	 	carousel.slides.eq(0).addClass("active");
	 	};
	 	carousel.element.on("click",".carousel-control-left",function(){
	 	carousel.changePosition(false);
		 });
	 	carousel.element.on("click",".carousel-control-right",function(){
	 	carousel.changePosition(true);
	 	});


	 carousel.init();
}



$(function(){
	$(".carousel").each(function(){
		new Carousel(this);
	});
});