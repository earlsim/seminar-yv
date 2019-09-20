//GNB Event
var gnbEvent = {
    eventTime:250,
    gnbComTop:0,
    init:function(){
        this.mobileEvent();
        this.showActive();
    },
    mobileEvent:function(){
        $(".header .gnb .menu>ul>li").unbind('mouseenter').unbind('mouseleave');
        $(".header .gnbDepth").slideUp(0);
        var screenWidth = $(window).width();
        var screenHeight = $(window).height();
        if(screenWidth <= 768){
            $(".header .gnb .m_menu .m_list ul li .m_list02").slideUp(0);
            $(".header .gnb .menu>ul>li").eq(0).find("a").on("click",function(){
               $(".header .gnb .m_menu").css("display","block"); 
               $(".header .gnb .m_menu .m_list").css("height",screenHeight+"px");
               $(".header .gnb .m_menu .m_menu_bg").stop().animate({ right:0 },200);
            });
            
            $(".header .gnb .m_top>ul>li").eq(1).find("a").on("click",function(){
               $(".header .gnb .m_menu .m_menu_bg").stop().animate({ right:"-80%" },200,function(){
                   $(".header .gnb .m_menu").css("display","none");
                   $(".header .gnb .m_list>ul>li").removeClass("active");
                   $(".header .gnb .m_menu .m_list ul li .m_list02").slideUp(0);
                   $(this).find("span.more").text("+");
               });
            });
            
            $(".header .gnb .m_list>ul>li>a").on("click",function(){
                if(!$(this).parent().hasClass("active")){
                    $(".header .gnb .m_menu .m_list ul li .m_list02").slideUp(0);
                    $(".header .gnb .m_menu .m_list").css("height",screenHeight+"px");
                    $(".header .gnb .m_list>ul>li>a>span.more").text("+");
                    $(".header .gnb .m_list>ul>li").removeClass("active");
                    $(this).parent().addClass("active");
                    $(this).find("span.more").text("-");
                    $(this).parent().find(".m_list02").slideDown(200);
                }else{
                    
                }
            });
        }else{
            this.hoverEvent();
        }
    },
    hoverEvent:function(){
        var _ = this;
        //mouse cursor gnb out
        $(".header .gnb").mouseleave(function(){
            $(".header .gnb .menu>ul>li").removeClass("active");
            $(".header .gnb .menu>ul>li>a").stop().animate({ color:"#333", borderWidth:0 }, _.eventTime);
            $(".header .gnb").stop().animate({ backgroundColor:"rgba(255,255,255,0.5)" }, _.eventTime);
            $(".header .gnbDepth").stop().slideUp(300); 
        });

        //mouse cursor menu in
        $(".header .gnb .menu>ul>li").hover(function(){
            $(this).addClass("active");
            $(".header .gnb").stop().animate({ backgroundColor:"#fff" }, _.eventTime);
            $(this).find("a").stop().animate({ color:"#f16681",borderWidth:2 }, _.eventTime);
            $(".header .gnbDepth").stop().slideDown(300);
        },function(){
            $(".header .gnb .menu>ul>li").removeClass("active");
            $(".header .gnb").stop().animate({ backgroundColor:"rgba(255,255,255,0.5)" }, _.eventTime);
            $(".header .gnb .menu>ul>li>a").stop().animate({ color:"#333", borderWidth:0 }, _.eventTime);
            $(".header .gnbDepth").stop().slideUp(300);
        });
        
        //mouse cursor depth in
        $(".header .gnbDepth").hover(function(){
            $(".header .gnbDepth").stop().slideDown(0);
            $(".header .gnb").stop().animate({ backgroundColor:"#fff" }, _.eventTime);
        });

        //mouse detail menu on
        $(".header .gnbDepth .depth_list>ul>li ul li a").hover(function(){
            $(this).parent().addClass("active");
            $(this).stop().animate({ color:"#f16681",borderWidth:2 }, _.eventTime);
        },function(){
            $(this).parent().removeClass("active");
            $(this).stop().animate({ color:"#7a7f89", borderWidth:0 }, _.eventTime);
        });

        $(".header .gnbDepth .depth_list>ul>li").hover(function(){
           var curIdx = $(this).index() + 1; 
           $(".header .gnb .menu>ul>li").eq(curIdx).addClass("active");
           $(".header .gnb .menu>ul>li>a").eq(curIdx).stop().animate({ color:"#f16681",borderWidth:2 }, _.eventTime);
        },function(){
            $(".header .gnb .menu>ul>li").removeClass("active");
            $(".header .gnb .menu>ul>li>a").stop().animate({ color:"#333", borderWidth:0 }, _.eventTime);
        });
        
        this.sessionActive();
    },
    scrollEvent:function(curtop){
        this.gnbComTop = $(".main_visual").height();
        if(curtop > this.gnbComTop){
            $(".header .gnb").stop().animate({ backgroundColor:"#fff" }, this.eventTime, function(){
                $(".header .gnb").addClass("cScroll");
            });
        }else if(curtop < this.gnbComTop){
            $(".header .gnb").removeClass("cScroll");
            $(".header .gnb").stop().animate({ backgroundColor:"rgba(255,255,255,0.5)" }, this.eventTime);
        }
    },
    sessionActive:function(){
        var gnbIdx = 0;
        var depthIdx = 0;
        $(".header .gnb .menu>ul>li>a").on("click",function(){
            gnbIdx = $(this).parent().index();
            sessionStorage.setItem("gnbIdx", gnbIdx);
            $(".header .gnb .menu>ul>li").removeClass("onlink");
            $(this).parent().addClass("onlink");
        });

        $(".header .gnb .gnbDepth .depth_list>ul>li ul li a").on("click",function(){
            gnbIdx = $(this).parent().parent().parent().index()+1;
            depthIdx = $(this).parent().index();
            sessionStorage.setItem("gnbIdx", gnbIdx);
            sessionStorage.setItem("depthIdx", depthIdx);
            $(".header .gnb .menu>ul>li").removeClass("onlink");
            $(".header .gnb .menu>ul>li").eq(gnbIdx).addClass("onlink");
            $(".header .gnb .gnbDepth .depth_list>ul>li ul li").removeClass("onlink");
            $(this).parent().addClass("onlink");
        });
    },
    showActive:function(){
    	var curLoc = location.href.split("/");
    	var locLastIdx = curLoc.length-1;
    	var compareLoc = curLoc[locLastIdx].split(".php")[0];
    	if(compareLoc == "index"){
    		sessionStorage.removeItem("gnbIdx");
    		sessionStorage.removeItem("depthIdx");
    		return false;
    	}
        var sessionGnbIdx = sessionStorage.getItem("gnbIdx");
        var sessionDepthIdx = sessionStorage.getItem("depthIdx");
        if(sessionGnbIdx != null){
            $(".header .gnb .menu>ul>li").eq(sessionGnbIdx).addClass("onlink");
            $(".header .gnb .gnbDepth .depth_list>ul>li").eq(sessionGnbIdx-1).find("ul li").eq(sessionDepthIdx).addClass("onlink");
        }
    }
};

//Footer Event
var footEvent = {
    btnTime:200,
    moveTime:300,
    init:function(){
        this.productEvent();
        this.moveEvent();
        this.moveLink();
    },
    productEvent:function(){
    	var html = "";
        html += "<div class='hoverAction'>";
            html += "<img src='/local/templates/yvoire/images/footer/list_hover.png' />";
        html += "</div>";
        
        $(".swiper-slide a").hover(function(){
            $(this).append(html);
        },function(){
            $(this).find(".hoverAction").remove();
        });
    },
    moveEvent:function(){
        var _ = this;
        
        //button hover
        $(".footer .moveTop a").hover(function(){
            $(this).stop().animate({ backgroundColor:"#f16681" }, _.btnTime);
        },function(){
            $(this).stop().animate({ backgroundColor:"#7a818b" }, _.btnTime);
        });
        
        $(".footer .sProduct a").hover(function(){
            $(this).stop().animate({ backgroundColor:"#fff", borderWidth:2, borderColor:"#fff" }, _.btnTime);
        },function(){
            $(this).stop().animate({ backgroundColor:"#f4f4f4", borderWidth:2, borderColor:"#ececec" }, _.btnTime);
        });
        
        //button click
        $(".footer .moveTop a").on("click",function(){
            $("html ,body").animate({ scrollTop:0 }, _.moveTime);
        });
        
        $(".footer .sProduct a").on("click",function(){
            if(!$(".footer .product").hasClass("open")){
                $(".footer .product").addClass("open");
                $(this).parent().addClass("active");
                $(".footer .product").slideDown(_.moveTime);
            }else{
                $(".footer .product").removeClass("open");
                $(this).parent().removeClass("active");
                $(".footer .product").slideUp(_.moveTime);
            }
        });
    },
    moveLink:function(){
        $(".footer .aside .asideBot .selectbox select").on("change",function(){
            var curLink = $(this).find("option:selected").val();
            switch(curLink){
                case "LG": window.open("http://www.lgcorp.com"); break;
                case "LG Chem": window.open("http://www.lgchem.com/global/main"); break;
            };
        });
    }
};

//Swiper Slide Event
var swiperEvent = {
    init:function(){
        this.footerEvent();
    },
    footerEvent:function(){
        var mySwiper = new Swiper("#product_visual",{
            slidesPerView:6,
            slidesPerGroup:6,
            autoplay:false,
            loop: false,
            prevButton: "#fPrev",
            nextButton: "#fNext"
	});
        $("#fPrev").on("click",function(){ mySwiper.swipePrev(); });
        $("#fNext").on("click",function(){ mySwiper.swipeNext(); });
        
        $(function(){
            var windowWidth = $(window).width();
            if(windowWidth < 1281 && windowWidth > 769) {
                mySwiper.params.slidesPerView = 4;
                mySwiper.params.slidesPerGroup = 4;
            }else if(windowWidth < 769 && windowWidth > 414){
                mySwiper.params.slidesPerView = 3;
                mySwiper.params.slidesPerGroup = 3;
            }else if(windowWidth < 415){
                mySwiper.params.slidesPerView = 2;
                mySwiper.params.slidesPerGroup = 2;
            }else{
                mySwiper.params.slidesPerView = 6;
                mySwiper.params.slidesPerGroup = 6;
            }
        });
        
        $(window).resize(function(){
            var windowWidth = $(window).width();
            if(windowWidth < 1281 && windowWidth > 769) {
                mySwiper.params.slidesPerView = 4;
                mySwiper.params.slidesPerGroup = 4;
            }else if(windowWidth < 769 && windowWidth > 414){
                mySwiper.params.slidesPerView = 3;
                mySwiper.params.slidesPerGroup = 3;
            }else if(windowWidth < 415){
                mySwiper.params.slidesPerView = 2;
                mySwiper.params.slidesPerGroup = 2;
            }else{
                mySwiper.params.slidesPerView = 6;
                mySwiper.params.slidesPerGroup = 6;
            }
        });
    }
};

//Label Text Event
var textEvent = {
    init:function(){
        var selectTarget = $('.selectbox select');
        selectTarget.on('blur', function(){
            $(this).parent().removeClass('focus');
        });
        selectTarget.change(function(){
           var select_name = $(this).children('option:selected').text();
           $(this).siblings('label').text(select_name);
        });
    }
};

//button hover effect
var btnEffect = {
    hoverTime:300,
    init:function(){
        var _ = this;
        $(".btn_type01, .btn_type02").hover(function(){
            $(this).find(".hEffect").stop().animate({ width:"120%", height:"300%",top:"-120%", left:"-10%" }, _.hoverTime);
        },function(){
            $(this).find(".hEffect").stop().animate({ width:0, height:0, top:"50%", left:"50%" }, _.hoverTime);
        });
    }
};

//Background Line
var lineBg = {
    init:function(){
        var windowWidth = $(window).width();
        var documentHeight = $(".container").height();
        var lineLen = $(".lineBg ul li").length-1;
    
        for(var i=0; i<=lineLen; i++){
            $(".lineBg ul li").eq(i).css("height",documentHeight);
            console.log(documentHeight);
        }
        
        if(windowWidth <= 768){
            $(".lineBg ul li").eq(0).addClass("blind");
            $(".lineBg ul li").eq(lineLen-1).addClass("blind");
        }else{
            $(".lineBg ul li").eq(0).removeClass("blind");
            $(".lineBg ul li").eq(lineLen-1).removeClass("blind");
        }
    }
};

//Google Map
var googleMap = {
    init:function(coor01, coor02){
        $("#google_map").html("");
        var mapOptions = { //구글 맵 옵션 설정
            zoom : 16, //기본 확대율
            center : new google.maps.LatLng(coor01,coor02), // 지도 중앙 위치
            scrollwheel : false, //마우스 휠로 확대 축소 사용 여부
            mapTypeControl : false //맵 타입 컨트롤 사용 여부
        };

        var map = new google.maps.Map(document.getElementById('google_map'), mapOptions); //구글
        
        var image = "/local/templates/yvoire/images/icon/marker.png"; //마커 이미지 설정
 
        var marker = new google.maps.Marker({ //마커 설정
            map : map,
            position : map.getCenter(), //마커 위치
            icon : image //마커 이미지
        });
        google.maps.event.addDomListener(window, "resize", function() { //리사이즈에 따른 마커 위치
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center); 
        });
    }
};

//PAGING
var paging = {
    init:function(){
        $(".paging ol li a").on("click",function(){
            $(".paging ol li").removeClass("active");
            $(this).parent().addClass("active");
        });
    }
};

//TEXT OVER
var txtOver = {
    init:function(){
    	$(".v-ellipsis").vEllipsis({
            'onlyFullWords': false,
            'lines':2, 
            'tolerance': 5,
            'animationTime': '0',
            'char': '...',
            'delay': 300,
            'responsive': true
        });
    }
};

//SNS Load
var snsLoad = {
    init:function(){
        this.faceBookLoad();
        this.instaLoad();
    },
    faceBookLoad:function(){
        FacebookAPI.Load();
    },
    instaLoad:function(){
        var _ = this;
        var userFeed = new Instafeed({
            get: 'user',
            userId: '8351083922',
            clientId: 'c1fba87ce9fb47cc86bef86b17eabaee',
            accessToken: '8351083922.c1fba87.fd4f72d5bce5441ea3ab5e5b1b9ec5f9',
            resolution: 'standard_resolution',
            template:"<li><a href='{{link}}' target='_blank'><img src='{{image}}' alt='INSTAGRAM LIST' /><span class='detail_view'><p class='hLike'>{{likes}}</p><p class='tit v-ellipsis'>{{caption}}</p></span></a></li>",
            sortBy: 'most-recent',
            limit: 20,
            links: false,
            after: function() {
                var listWidth = $(".listbox.instaList ul li").width();
                $(".listbox.instaList ul li a>img").height(listWidth);
                
                $(window).resize(function(){
                    var listWidth = $(".listbox.instaList ul li").width();
                    $(".listbox.instaList ul li a>img").height(listWidth);
                });
                
                snsLoader.listHover();
                $(".listbox.instaList").addClass("blind");
            }
        }).run();
    }
};

//Page move
var pageManager = {
    idx:0,
    pageList:["lggroup","lgchem","brand",
        "whyyvoire","yvoire","review",
        "sns","news_list","faq"],
    init:function(){
        var _ = this;
        var locationHref = location.href.split("/");
        var locationIdx = locationHref.length - 2;
        var curPage = locationHref[locationIdx].split(".")[0];
        var curIdx = this.pageList.indexOf(curPage);
        
        this.idx = curIdx;
        //
        // $(".sub_visual .page_navi.left a").on("click",function(){
        //     _.idx--;
        //     if(_.idx<0){
        //         _.idx = _.pageList.length-1;
        //     }
        //     window.location.href = "/"+_.pageList[_.idx]+".html";
        // });
        //
        // $(".sub_visual .page_navi.right a").on("click",function(){
        //     _.idx++;
        //     if(_.idx > _.pageList.length-1){
        //         _.idx = 0;
        //     }
        //     window.location.href = "/"+_.pageList[_.idx]+".html";
        // });
        this.hoverEvent();
    },
    hoverEvent:function(){
    	var _ = this;
    	var lastIdx = this.pageList.length-1;
    	$(".page_navi.left a").hover(function(){
    		if(_.pageList[_.idx-1] != undefined){
    			$(this).attr("title",_.pageList[_.idx-1]+" page");
    		}else{
    			$(this).attr("title",_.pageList[lastIdx]+" page");
    		}
    	});
    	$(".page_navi.right a").hover(function(){
    		if(_.pageList[_.idx+1] != undefined){
    			$(this).attr("title",_.pageList[_.idx+1]+" page");
    		}else{
    			$(this).attr("title",_.pageList[0]+" page");
    		}
    	});
    }
};