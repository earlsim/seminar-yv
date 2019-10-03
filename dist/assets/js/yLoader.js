//LG Chem LOAD
var eventLoc = {
    slideImg:["slide00.jpg","slide01.jpg","slide02.jpg"],
    slideIdx:0,
    prevIdx:0,
    nextIdx:0,
    slideTime:250,
    slideMove:"",
    init:function(){
        this.prevIdx = this.slideImg.length-1;
        this.nextIdx = this.slideIdx+1;
        this.slideEvent();
    },
    slideEvent:function(){
        var _ = this;
        var srcPath = "/assets/img/sub/location/";
        var maxIdx = this.slideImg.length - 1;
        $(".slide_box .slide_navi span a").on("click",function(){
            var curIdx = $(this).parent().index();
            switch(curIdx){
                case 0:
                    _.slideMove = "-100%";
                    _.slideIdx--;
                    _.prevIdx--;
                    _.nextIdx--;
                    if(_.slideIdx < 0){
                       _.slideIdx = maxIdx; 
                    }
                    if(_.prevIdx < 0){
                       _.prevIdx = maxIdx; 
                    }
                    if(_.nextIdx < 0){
                       _.nextIdx = maxIdx; 
                    }
                    break;
                case 1:
                    _.slideMove = "100%";
                    _.slideIdx++;
                    _.prevIdx++;
                    _.nextIdx++;
                    if(_.slideIdx > maxIdx){
                       _.slideIdx = 0; 
                    }
                    if(_.prevIdx > maxIdx){
                       _.prevIdx = 0; 
                    }
                    if(_.nextIdx > maxIdx){
                       _.nextIdx = 0; 
                    }
                    break;
            }
            
            var prevSlide = srcPath+_.slideImg[_.prevIdx];
            var nextSlide = srcPath+_.slideImg[_.nextIdx];
            $(".slide_box ul li.prev_slide a>img").attr("src",prevSlide);
            $(".slide_box ul li.next_slide a>img").attr("src",nextSlide);
            
            $(".slide_box ul li.main_slide a").stop().animate({ opacity:0 },_.slideTime,function(){
                var curSlide = srcPath+_.slideImg[_.slideIdx];
                $(".slide_box ul li.main_slide a>img").attr("src",curSlide);
                $(this).stop().animate({opacity:1},_.slideTime);
            });
        });
    }
};