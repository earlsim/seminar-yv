//document ready
$(function(){
    swiperEvent.init();
    textEvent.init();
    gnbEvent.init();
    footEvent.init();
    btnEffect.init();
    pageManager.init();
    $(".header .gnb .menu>ul>li>a").stop().animate({ color:"#333", borderWidth:0 }, 0);
    $(".header .gnb").stop().animate({ backgroundColor:"rgba(255,255,255,0.5)" }, 0); 
});

//window load
$(window).load(function(){
    //footer product document ready and hidden process
//	$(".footer .product").slideUp(0);
    lineBg.init();
	setTimeout(function(){
		$(".footer .product").slideUp(0);
	},500);
});

//window resize
$(window).resize(function(){
    gnbEvent.mobileEvent();
});

//window scroll
$(window).scroll(function(){
    var curTop = $(window).scrollTop();
    gnbEvent.scrollEvent(curTop);
});

//main page event
var mainPage = {
    scrollTime:500,
    hoverTime:200,
    prevSlideIdx:0,
    slideIdx:0,
    slideBgTime:1000,
    slideTxtTime:1500,
    autoTime:5000,
    maxSlideIdx:2,
    storyTime:300,
    sStory:false,
    slideTit:["<img src='/local/templates/yvoire/images/main/visual_tit00.png' alt='Healing of Beauty YVOIRE' />", "<img src='/local/templates/yvoire/images/main/visual_tit01.png' alt='Yvoire не знает границ' />", "<img src='/local/templates/yvoire/images/main/visual_tit02.png' alt='produces distinguished' />"],
    mslideTit:["<img src='/local/templates/yvoire/images/main/mvisual_tit00.png' alt='Healing of Beauty YVOIRE' />", "<img src='/local/templates/yvoire/images/main/visual_tit01.png' alt='Yvoire не знает границ' />", "<img src='/local/templates/yvoire/images/main/visual_mtit02.png' alt='produces distinguished' />"],
    slideSubTit:["", "YVOIRE<span class='suffix'>Ⓡ</span> экспортируется более чем в 20 стран мира.", "LG Chem разрабатывает и производит препараты на основе гиалуроновой кислоты более 20 лет."],
    mslideSubTit:["", "YVOIRE<span class='suffix'>Ⓡ</span> экспортируется более чем в 20 стран мира.</p>", "LG Chem разрабатывает и производит препараты на основе гиалуроновой кислоты более 20 лет."],
    moreUrl:["/brand/","/lgchem/","/whyyvoire/"],
    init:function(){
        this.visualBtnEvent();
        this.slideEvent(this.slideIdx);
        this.autoSlide();
        this.storyHoverEvent();
        this.storyList();
        setTimeout(function(){
            lineBg.init();
            mainPage.resizeList();
        },120);
    },
    mainSetting:function(){
//        var visualHeight = $(".keyVisual").height();
//        $(".main_visual").height(visualHeight);
    },
    visualScroll:function(curTop){
        if(curTop > 0){
//            $(".main_visual").stop().animate({ marginTop:-curTop }, this.scrollTime);
        }else if(curTop < 500){
//            $(".main_visual").stop().animate({ marginTop:0 }, this.scrollTime);
        }
    },
    visualBtnEvent:function(){
        var _ = this;
        
        //hover event
        $(".main_visual .slideBtn ul li a").hover(function(){
            $(this).stop().animate({ backgroundColor:"#f2f2f4" }, _.hoverTime);
        },function(){
            $(this).stop().animate({ backgroundColor:"transparent" }, _.hoverTime);
        });
        //click event
        $(".main_visual .slideBtn ul li a").unbind("click");
        $(".main_visual .slideBtn ul li a").on("click",function(){
            var curIdx = $(this).parent().index();
            $(".main_visual .slideBtn ul li").removeClass("active");
            $(this).parent().addClass("active");
            switch(curIdx){
                case 0:
                    _.slideIdx--;
                    if(_.slideIdx < 0){
                        _.slideIdx = _.maxSlideIdx;
                    }
                    break;
                case 1:
                    _.slideIdx++;
                    if(_.slideIdx > _.maxSlideIdx){
                        _.slideIdx = 0;
                    }
                    break;
            }
            _.slideEvent(_.slideIdx);
        });
    },
    autoSlide:function(){
        var _ = this;
        setTimeout(function(){
            _.slideIdx++;
            if(_.slideIdx > _.maxSlideIdx){
                _.slideIdx = 0;
            }
            _.slideEvent(_.slideIdx);
            _.autoSlide();
        },this.autoTime);
    },
    slideEvent:function(idx){
        var _ = this;
        var windowWidth = $(window).width();
        var sTit = this.slideTit[idx];
        var ssTit = this.slideSubTit[idx];
        if(windowWidth <= 768){
            sTit = this.mslideTit[idx];
            ssTit = this.mslideSubTit[idx];
        }
        var imgAniPosition = "30%";
        var txtAniPosition = "-30%";
        
        $(".main_visual .keyVisual .keyContent").removeClass("slide0"+this.prevSlideIdx);
        $(".main_visual .keyVisual .keyContent").addClass("slide0"+idx);
        
        //index value is odd number
        //var oddIdx = idx % 2;
        //switch(oddIdx){
        switch(this.slideIdx){
            case 1:
            case 2:
                imgAniPosition = "-30%";
                txtAniPosition = "30%";
                break;
        }
        $(".main_visual .keyVisual .keyContent h2").html("");
        $(".main_visual .keyVisual .keyContent h2").html(sTit);
        $(".main_visual .keyVisual .keyContent h3 p").html(ssTit);

        //BG
        if(windowWidth <= 768){
            $(".main_visual .keyVisual>img").eq(0).attr("src","/local/templates/yvoire/images/main/main_mvisual0"+idx+".png");
            $(".main_visual .keyVisual>img").eq(1).attr("src","/local/templates/yvoire/images/main/main_mvisual0"+idx+"_model.png");
        }else{
            $(".main_visual .keyVisual>img").eq(0).attr("src","/local/templates/yvoire/images/main/main_visual0"+idx+".png");
            $(".main_visual .keyVisual>img").eq(1).attr("src","/local/templates/yvoire/images/main/main_visual0"+idx+"_model.png");
        }

        //More button
        $(".btn_type01").css("opacity",0);
        
        $("a.btn-1").attr("href",this.moreUrl[idx]);
        
        if(windowWidth <= 768){
            $(".btn_type01").css("margin-top","13%");
            $(".btn_type01").stop().animate({ marginTop:"7%", opacity:1 },this.slideTxtTime+500);
            switch(this.slideIdx){
	            case 2:
	                imgAniPosition = "30%";
	                txtAniPosition = "-30%";
	                break;
	        }
        }else{
            $(".btn_type01").css("margin-top","10%");
            $(".btn_type01").stop().animate({ marginTop:"4%", opacity:1 },this.slideTxtTime+500);
        }
        
        $(".main_visual .keyVisual>img").css("opacity",0);
        $(".main_visual .keyVisual>img").css("margin-left",imgAniPosition);
        $(".main_visual .keyVisual>img").stop().animate({ marginLeft:0, opacity:1 },_.slideBgTime);
        
        //TEXT
        $(".keyContent h2").css("opacity",0);
        $(".keyContent h2").css("margin-left",txtAniPosition);
        $(".keyContent h2").stop().animate({ marginLeft:0, opacity:1 },_.slideTxtTime);

        $(".keyContent h3").css("opacity",0);
        $(".keyContent h3").css("margin-left",txtAniPosition);
        $(".keyContent h3").stop().animate({ marginLeft:0, opacity:1 },_.slideTxtTime+500);
        
        this.prevSlideIdx = idx;
    },
    storyScrollEvent:function(curTop){
        var storyTop = $(".story_contents").offset().top - 500;
        var listLen = $(".yvoire_story .story_contents ul li.showlist").length;
        
        if(curTop > storyTop && !this.sStory){
            this.sStory = true;
            for(var i=0; i<listLen; i++){
                var aniTime = this.storyTime * i;
                $(".yvoire_story .story_contents ul li.showlist").eq(i).stop().animate({ top:0, opacity:1 }, aniTime);
            }
        }else if(curTop < storyTop-300){
            this.sStory = false;
            $(".yvoire_story .story_contents ul li.showlist").stop().animate({ top:"7.5rem", opacity:0 }, 0);
        }
    },
    storyHoverEvent:function(){
        var _ = this;
        $(".yvoire_story .story_contents ul li").hover(function(){
            $(this).find("div.hNotice").stop().animate({ top:0 }, _.hoverTime);
        },function(){
            $(this).find("div.hNotice").stop().animate({ top:"100%" }, _.hoverTime);
        });
    },
    resizeList:function(){
        var listH = $(".yvoire_story .story_contents ul li").eq(1).find(">div").width();
        var listLen = $(".yvoire_story .story_contents ul li").length;
        var windowWidth = $(window).width();
        if(windowWidth <= 768){
            for(var i=0; i<listLen; i++){
                if(i!=0 && i!=6){
                    $(".yvoire_story .story_contents ul li").eq(i).css("min-height",listH);
                    $(".yvoire_story .story_contents ul li").eq(i).css("max-height",listH);
                }
            }
        }else{
            $(".yvoire_story .story_contents ul li").css("min-height",listH);
            $(".yvoire_story .story_contents ul li").css("max-height",listH);
        }
    },
    storyList:function(){
        facebookLoad();
        instaLoad();
        
        function facebookLoad(){
            window.fbAsyncInit = function() {
                FB.init({
                    appId      : FacebookAPI.AppID,
                    xfbml      : true,
                    version    : 'v3.1'
                });
            };

            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/ko_KR/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
            
            FB.api("me?fields=posts", 'GET', {
                access_token : FacebookAPI.Token,
                fields : "posts.limit("+FacebookAPI.Count+"){object_id,name,full_picture,picture,link,message,type,likes.summary(true),created_time}"
            }, function(response){
            	var dataPosts = response.posts.data;
                var dataLen = dataPosts.length;
                var listWidth = $(".story_contents ul li").eq(1).width();
               
                var showPictureList = [];
                var showMsgList = [];
                var showLinkList = [];
            
                for(var i=0; i<dataLen; i++){
                    showPictureList.push(dataPosts[i].full_picture);
                    showMsgList.push(dataPosts[i].message);
                    showLinkList.push(dataPosts[i].link);
                    
                    if(dataPosts[i].full_picture == undefined){
                        showPictureList.splice(i,1);
                    }
                    
                    if(dataPosts[i].message == undefined){
                        showMsgList.splice(i,1);
                    }
                    
                    if(dataPosts[i].link == undefined){
                        showLinkList.splice(i,1);
                    }
                }
                
                $(".story_contents ul li").eq(4).find("div>img").css("opacity",1);
                $(".story_contents ul li").eq(8).find("div>img").css("opacity",1);
                $(".story_contents ul li").eq(10).find("div>img").css("opacity",1);
                
                $(".story_contents ul li").eq(4).find("div>img").attr("src",showPictureList[0]);
                $(".story_contents ul li").eq(4).height(listWidth);
                $(".story_contents ul li").eq(4).find(">div").height(listWidth);
                $(".story_contents ul li").eq(4).find(".hNotice p").text(showMsgList[0]);
                $(".story_contents ul li").eq(4).find(">div").on("click",function(){
                    window.open(showLinkList[0]);
                });
                
                $(".story_contents ul li").eq(8).find("div>img").attr("src",showPictureList[1]);
                $(".story_contents ul li").eq(8).height(listWidth);
                $(".story_contents ul li").eq(8).find(">div").height(listWidth);
                $(".story_contents ul li").eq(8).find(".hNotice p").text(showMsgList[1]);
                $(".story_contents ul li").eq(8).find(">div").on("click",function(){
                    window.open(showLinkList[1]);
                });
                
                $(".story_contents ul li").eq(10).find("div>img").attr("src",showPictureList[2]);
                $(".story_contents ul li").eq(10).height(listWidth);
                $(".story_contents ul li").eq(10).find(">div").height(listWidth);
                $(".story_contents ul li").eq(10).find(".hNotice p").text(showMsgList[2]);
                $(".story_contents ul li").eq(10).find(">div").on("click",function(){
                    window.open(showLinkList[2]);
                });
                
                $(window).resize(function(){
                    var listWidth = $(".story_contents ul li").eq(1).width();
                    $(".story_contents ul li").eq(4).height(listWidth);
                    $(".story_contents ul li").eq(8).height(listWidth);
                    $(".story_contents ul li").eq(10).height(listWidth);
                    $(".story_contents ul li").eq(4).find(">div").height(listWidth);
                    $(".story_contents ul li").eq(8).find(">div").height(listWidth);
                    $(".story_contents ul li").eq(10).find(">div").height(listWidth);
                });
                
                txtOver.init();
            });
        };
        
        function instaLoad(){
            var userFeed = new Instafeed({
                get: 'user',
                userId: '8351083922',
                clientId: 'c1fba87ce9fb47cc86bef86b17eabaee',
                accessToken: '8351083922.c1fba87.fd4f72d5bce5441ea3ab5e5b1b9ec5f9',
                resolution: 'standard_resolution',
                template:"<div class='trashData'><span class='instaLink'>{{link}}</span><span class='instaFImg'>{{image}}</span><span class='instaFMsg'>{{caption}}</span></div>",
                sortBy: 'most-recent',
                links: false,
                after: function() {
                    var listWidth = $(".story_contents ul li").eq(1).width();
                    var trashLastIdx = $("#instafeed .trashData").length-1;
                    var listImg00 = $("#instafeed .trashData").eq(trashLastIdx).find(".instaFImg").text();
                    var listMsg00 = $("#instafeed .trashData").eq(trashLastIdx).find(".instaFMsg").text();
                    var listImg01 = $("#instafeed .trashData").eq(trashLastIdx-1).find(".instaFImg").text();
                    var listMsg01 = $("#instafeed .trashData").eq(trashLastIdx-1).find(".instaFMsg").text();
                    var listLink00 = $("#instafeed .trashData").eq(trashLastIdx).find(".instaLink").text();
                    var listLink01 = $("#instafeed .trashData").eq(trashLastIdx-1).find(".instaLink").text();
                    var instaLink00 = listLink00;
                    var instaLink01 = listLink01;
                    
                    $(".story_contents ul li").eq(1).find("div>img").attr("src",listImg00);
                    $(".story_contents ul li").eq(1).height(listWidth);
                    $(".story_contents ul li").eq(1).find(">div").height(listWidth);
                    $(".story_contents ul li").eq(1).find(".hNotice p").text(listMsg00);
                    $(".story_contents ul li").eq(1).find(">div").on("click",function(){
                        window.open(instaLink00);
                    });
                    
                    $(".story_contents ul li").eq(7).find("div>img").attr("src",listImg01);
                    $(".story_contents ul li").eq(7).height(listWidth);
                    $(".story_contents ul li").eq(7).find(">div").height(listWidth);
                    $(".story_contents ul li").eq(7).find(".hNotice p").text(listMsg01);
                    $(".story_contents ul li").eq(7).find(">div").on("click",function(){
                        window.open(instaLink01);
                    });
                    
                    $(window).resize(function(){
                        var listWidth = $(".story_contents ul li").eq(1).width();
                        $(".story_contents ul li").eq(1).height(listWidth);
                        $(".story_contents ul li").eq(7).height(listWidth);
                        $(".story_contents ul li").eq(1).find(">div").height(listWidth);
                        $(".story_contents ul li").eq(7).find(">div").height(listWidth);
                    });
                    
                    $("#instafeed .trashData").remove();
                    
                    txtOver.init();
                }
            }).run();
        };
    }
};

//LG GROUP LOAD
var lgGroup = {
    mapOffice:[37.5279663,126.9290969],
    mapPark:[37.562273,126.827691],
    init:function(){
        googleMap.init(this.mapOffice[0],this.mapOffice[1]);
        this.listActive();
    },
    listActive:function(){
        var _ = this;
        $(".lggroup_map .map_tap .tapbox ul li a").on("click",function(){
            var curIdx = $(this).parent().index();
            $(".lggroup_map .map_tap .tapbox ul li").removeClass("active");
            $(this).parent().addClass("active");
            switch(curIdx){
                case 0:
                    $(".map_tap .office").removeClass("blind");
                    $(".map_tap .park").addClass("blind");
                    googleMap.init(_.mapOffice[0],_.mapOffice[1]);
                    break;
                case 1:
                    $(".map_tap .office").addClass("blind");
                    $(".map_tap .park").removeClass("blind");
                    googleMap.init(_.mapPark[0],_.mapPark[1]);
                    break;
            }
        });
    }
};

//LG Chem LOAD
var lgChem = {
    mapOffice:[37.562273,126.827691],
    mapPlant:[35.9466547,127.0040843],
    slideImg:["slide00.jpg","slide01.jpg","slide02.jpg","slide03.jpg","slide04.jpg"],
    slideIdx:0,
    prevIdx:0,
    nextIdx:0,
    slideTime:250,
    slideMove:"",
    init:function(){
        this.prevIdx = this.slideImg.length-1;
        this.nextIdx = this.slideIdx+1;
        googleMap.init(this.mapOffice[0],this.mapOffice[1]);
        this.listActive();
        this.slideEvent();
    },
    listActive:function(){
    	var _ = this;
        $(".lgchem_map .map_tap .tapbox ul li a").on("click",function(){
            var curIdx = $(this).parent().index();
            $(".lgchem_map .map_tap .tapbox ul li").removeClass("active");
            $(this).parent().addClass("active");
            switch(curIdx){
                case 0:
                    $(".map_tap .office").removeClass("blind");
                    $(".map_tap .plant").addClass("blind");
                    googleMap.init(_.mapOffice[0],_.mapOffice[1]);
                    break;
                case 1:
                    $(".map_tap .office").addClass("blind");
                    $(".map_tap .plant").removeClass("blind");
                    googleMap.init(_.mapPlant[0],_.mapPlant[1]);
                    break;
            }
        });
    },
    slideEvent:function(){
        var _ = this;
        var srcPath = "/local/templates/yvoire/images/sub/lgchem/";
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

//Product LOAD
var productLoader = {
    init:function(){
        this.tabList();
    },
    tabList:function(){
        $(".yvoire_view .tab_list ul li a").on("click",function(){
            var curIdx = $(this).parent().index();
            $(".yvoire_view .tab_list ul li").removeClass();
            $(this).parent().addClass("active");
            switch(curIdx){
                case 0:
                    $(".yvoire_view .yvoire").removeClass("blind");
                    $(".yvoire_view .solution").addClass("blind");
                    break;
                case 1:
                    $(".yvoire_view .yvoire").addClass("blind");
                    $(".yvoire_view .solution").removeClass("blind");
                    break;
            }
        });
    }
};

//Review LOAD
var reviewLoader = {
    init:function(){
        this.tabList();
        this.changeTab();
        this.tabScroll();
    },
    tabList:function(){
    	var sessionGnbIdx = sessionStorage.getItem("gnbIdx");
        var sessionDepthIdx = sessionStorage.getItem("depthIdx");
    	if(sessionGnbIdx == 3 && sessionDepthIdx == 1){
    		$(".review_view .tab_list ul li").removeClass("active");
    		$(".review_view .tab_list ul li").eq(sessionDepthIdx).addClass("active");
    		$(".ctx_review").addClass("cBefore");
            $(".visual_content>div").eq(0).addClass("blind");
            $(".visual_content>div").eq(1).removeClass("blind");
            $(".location .cReview").addClass("blind");
            $(".location .cBefore").removeClass("blind");
            $(".review_view .procedure").addClass("blind");
            $(".review_view .beforeafter").removeClass("blind");
            $(".procedure_conbody").removeClass("blind");
            $(".movie_procedure iframe").attr("src","https://www.youtube.com/embed/YvH8QUei9sM?rel=0&autoplay=1");
    	}
    	
        $(".review_view .tab_list ul li a").on("click",function(){
            var curIdx = $(this).parent().index();
            $(".review_view .tab_list ul li").removeClass("active");
            $(this).parent().addClass("active");
            switch(curIdx){
                case 0:
                    $(".ctx_review").removeClass("cBefore");
                    $(".visual_content>div").eq(0).removeClass("blind");
                    $(".visual_content>div").eq(1).addClass("blind");
                    $(".location .cReview").removeClass("blind");
                    $(".location .cBefore").addClass("blind");
                    $(".review_view .procedure").removeClass("blind");
                    $(".review_view .beforeafter").addClass("blind");
                    $(".procedure_conbody").addClass("blind");
                    break;
                case 1:
                    $(".ctx_review").addClass("cBefore");
                    $(".visual_content>div").eq(0).addClass("blind");
                    $(".visual_content>div").eq(1).removeClass("blind");
                    $(".location .cReview").addClass("blind");
                    $(".location .cBefore").removeClass("blind");
                    $(".review_view .procedure").addClass("blind");
                    $(".review_view .beforeafter").removeClass("blind");
                    $(".procedure_conbody").removeClass("blind");
                    $(".movie_procedure iframe").attr("src","https://www.youtube.com/embed/YvH8QUei9sM?rel=0&autoplay=1");
                    break;
            }
        });
    },
    //BEFORE & AFTER
    changeTab:function(){
        $(".change_tab .change_conbox .tabScroll ul li a").on("click",function(){
            var curIdx = $(this).parent().index();
            if(curIdx == 1 || curIdx == 7){
                alert("To be updated");
               return false; 
            }
            $(".change_tab .change_conbox .tabScroll ul li").removeClass("active");
            $(this).parent().addClass("active");
            $(".procedure_conbody .imageBox>ul>li").addClass("blind");
            $(".procedure_conbody .imageBox>ul>li").eq(curIdx).removeClass("blind");
        });
        
        $(".procedure_conbody .imageBox .case_line ul li a").on("click",function(){
            var curIdx = $(this).parent().index();
            $(".procedure_conbody .imageBox .case_line ul li").removeClass("active");
            $(this).parent().addClass("active");
            $(".procedure_conbody .imageBox>ul>li .case0").addClass("blind");
            $(".procedure_conbody .imageBox>ul>li .case1").addClass("blind");
            $(this).parents(".case_line").parent().find(".case"+curIdx).removeClass("blind");
        });
    },
    tabScroll:function(){
        if(this.setDevice() == "pc"){
            $(".change_tab").css("text-align","center");
            $(".change_tab .change_conbox").css("width","100% !important");
            return false;
        }
        var windowWidth = $(window).width();
        if(windowWidth > 768){
            $(".change_tab .change_conbox").css("width","100%");
        }
        else{
            var listLen = $(".change_tab ul li").length;
            var listWidth = $(".change_tab ul li").width();
            var scrollWidth = listLen * listWidth + 200;
            $(".change_tab .change_conbox").width(scrollWidth);
        }
        
        $(window).resize(function(){
            var windowWidth = $(window).width();
            if(windowWidth > 768){
                $(".change_tab .change_conbox").css("width","100%");
            }
            else{
                var listLen = $(".change_tab ul li").length;
                var listWidth = $(".change_tab ul li").width();
                var scrollWidth = listLen * listWidth + 200;
                $(".change_tab .change_conbox").width(scrollWidth);
            }
        });
    },
    setDevice:function(){
        var filter = "win16|win32|win64|mac|macintel"; 
        var returnValue = "";
        if(navigator.platform){ 
            if(filter.indexOf(navigator.platform.toLowerCase())<0){ 
                returnValue = "mobile";
            }else{ 
                returnValue = "pc";
            }
        }
        return returnValue;
    }
};

//SNS LOAD
var snsLoader = {
    eventTime:200,
    init:function(){
        this.tabList();
        snsLoad.init();
    },
    tabList:function(){
        var listLen = $(".sns_view .tab_list ul li").length;
        $(".sns_view .tab_list ul li a").on("click",function(){
            var curIdx = $(this).parent().index();
            $(".sns_view .tab_list ul li").removeClass();
            $(this).parent().addClass("active");
            for(var i=0; i<listLen; i++){
                $(".sns_view .tab_list ul li").eq(i).find("a img").attr("src","/local/templates/yvoire/images/sub/sns/tablist0"+i+"_off.png");
            }
            $(this).find("img").attr("src","/local/templates/yvoire/images/sub/sns/tablist0"+curIdx+"_on.png");
            
            switch(curIdx){
                case 0:
                    $(".facebookList").removeClass("blind");
                    $(".instaList").addClass("blind");
                    var listWidth = $(".listbox.facebookList ul li").width();
                    $(".listbox.facebookList ul li a>img").height(listWidth);
                    break;
                case 1:
                    $(".facebookList").addClass("blind");
                    $(".instaList").removeClass("blind");
                    var listWidth = $(".listbox.instaList ul li").width();
                    $(".listbox.instaList ul li a>img").height(listWidth);
                    break;
            }
        });
    },
    listHover:function(){
        txtOver.init();
        var _ = this;
        $(".listbox ul li a .detail_view").stop().animate({top:"100%"},0);
        $(".listbox ul li a").hover(function(){
            $(this).find(".detail_view").stop().animate({top:0}, _.eventTime);
        },function(){
            $(this).find(".detail_view").stop().animate({top:"100%"}, _.eventTime);
        });
    }
};

//NEWS LOAD
var newsLoader = {
    //NEWS LIST
    listInit:function(){
        var trLen = $(".news_board ul li").length;
        for(var i=0; i<trLen; i++){
            var isThumb = $(".news_board ul li").eq(i).find(".thumbnail").length;
            if(!isThumb){
                $(".news_board ul li").eq(i).find(".thumbnail_txt p.notice").removeClass("v-ellipsis");
            } 
        }
        txtOver.init();
        paging.init();
    },
    //NEWS VIEW
    viewInit:function(){
        var shareOn = "/local/templates/yvoire/images/icon/share_on.png";
        var shareOff = "/local/templates/yvoire/images/icon/share_off.png";
        $(".share_box .share_plus").slideUp(0);
        $(".share_box>a").on("click",function(){
            if(!$(this).hasClass("active")){
                $(this).find("img").attr("src",shareOn);
                $(this).addClass("active");
                $(this).parent().find(".share_plus").slideDown(200);
            }else{
                $(this).find("img").attr("src",shareOff);
                $(this).removeClass("active");
                $(this).parent().find(".share_plus").slideUp(200);
            }
        });
    }
};


//FAQ LOAD
var faqLoder = {
    init:function(){
        this.listActive();
    },
    listActive:function(){
        $(".container.ctx_faq .question_list ul li .reply").slideUp(0);
        $(".container.ctx_faq .question_list ul li p a").on("click",function(){
            if(!$(this).parent().parent().hasClass("active")){
                $(this).parent().parent().addClass("active");
                $(this).parent().parent().find(".reply").slideDown(300);
            }else{
                $(this).parent().parent().removeClass("active");
                $(this).parent().parent().find(".reply").slideUp(200);
            }
        });
    }
};