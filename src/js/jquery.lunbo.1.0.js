;(function($){
    $.fn.banner = function(options){
        // console.log(1)
        // console.log(this)//=== $('.cont)
        var onOff = false;
        this.LOCAL = {
            index:0,
            prev:0,
            flag:false,
            btnsMove:function(index,type){
                options.items.eq(this.index).css({   //此处this == that.LOCAL
                    left:0
                }).stop().animate({
                    left:-options.items.width()*type
                },this.moveTime).end().eq(index).css({
                    left:options.items.width()*type
                }).stop().animate({
                    left:0,
                },this.moveTime)
            },
            btnsMove2:function(index,type){
                options.info.eq(this.index).css({   //此处this == that.LOCAL
                    left:0
                }).stop().animate({
                    left:-options.info.width()*type
                },this.moveTime).end().eq(index).css({
                    left:options.info.width()*type
                }).stop().animate({
                    left:0,
                },this.moveTime)
            },
            lrMove:function(type){
                options.items.eq(this.prev).css({   //此处this == that.LOCAL
                    left:0
                }).stop().animate({
                    left:options.items.width()*type
                },this.moveTime).end().eq(this.index).css({
                    left:-options.items.width()*type
                }).stop().animate({
                    left:0
                },this.moveTime)
            },
            lrMove2:function(type){
                options.info.eq(this.prev).css({   //此处this == that.LOCAL
                    left:0
                }).stop().animate({
                    left:options.info.width()*type
                },this.moveTime).end().eq(this.index).css({
                    left:-options.info.width()*type
                }).stop().animate({
                    left:0
                },this.moveTime)
            },
            active:function(){
               this.flag && options.btns.eq(this.index).addClass('btns_active').siblings().removeClass('btns_active');
            },
            left:function(){
                if(that.LOCAL.index  == 0){ //这地方用that.LOCAL.index 重中之重
                    that.LOCAL.index = options.items.length-1;
                    that.LOCAL.prev = 0;
                }else{
                    that.LOCAL.prev = that.LOCAL.index;//当前显示的
                    that.LOCAL.index--; //当前显示的下张
                }
                that.LOCAL.lrMove(1);
                that.LOCAL.active();
            },
            right:function(){
                if(that.LOCAL.index  == options.items.length-1){ 
                    that.LOCAL.prev = that.LOCAL.index;
                    that.LOCAL.index = 0;
                }else{
                    that.LOCAL.prev = that.LOCAL.index;//当前显示的
                    that.LOCAL.index++; //当前显示的下张
                }
                that.LOCAL.lrMove(-1);
                onOff&&that.LOCAL.lrMove2(-1);
                that.LOCAL.active();
            }

        };
        this.LOCAL.autoPlay = options.autoPlay===false? false:true;
        this.LOCAL.delayTime = options.delayTime || 2000;
        this.LOCAL.moveTime = options.moveTime || 200;
        this.LOCAL.eventType = options.eventType || 'click';
        
        var that = this;
        if(options.info && options.info.length>0){
            onOff = true;
            
        }
    
        if(options.btns && options.btns.length>0){ //$('.btnbox input')
            this.LOCAL.flag = true;
            options.btns.on(this.LOCAL.eventType,function(){
                if( $(this).index() > that.LOCAL.index ){
                    that.LOCAL.btnsMove($(this).index(),1)
                    onOff&&that.LOCAL.btnsMove2($(this).index(),1)
                }
                if( $(this).index() < that.LOCAL.index ){
                    that.LOCAL.btnsMove($(this).index(),-1)
                    onOff&&that.LOCAL.btnsMove2($(this).index(),-1)
                }
                that.LOCAL.index = $(this).index();
                that.LOCAL.active();   
            })
        }
     
        if(options.prev && options.prev.length>0 && options.next && options.next.length>0 ){
            options.prev.on('click',this.LOCAL.left)
            options.next.on('click',this.LOCAL.right)
        }

        if(this.LOCAL.autoPlay){
            this.LOCAL.timer = setInterval(this.LOCAL.right,that.LOCAL.delayTime);
            this.hover(function(){
                clearInterval(that.LOCAL.timer);
            },function(){
                that.LOCAL.timer = setInterval(that.LOCAL.right,that.LOCAL.delayTime);
            })
        }
    }
})(jQuery);