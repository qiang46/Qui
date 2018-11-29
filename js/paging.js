
(function($) {
	function Paging(ele,options){
		this.ele = ele;
		this.options = {
			pageNo: options.pageNo || 1,
			totalSize: options.totalSize,//总条数
			size:options.size,
			totalPage: options.totalPage||Math.ceil(options.totalSize/options.size),//页数
			pList:options.pList||[1,5,10],
			listShow:options.listShow||false,
			callback:options.callback
			
		};
		this.init();
//		console.log(this);
	}
	Paging.prototype = {
		init: function(){
			this.creatHtml();
			this.bindEvent();
			
//			if(this.options.callback){
//				this.options.callback(this.options.pageNo,this.ele.find('select_page').val());
//			}
		},
		creatHtml:function(){
			var that = this;
			var content = '';
			var Page = parseInt(that.options.pageNo);
			var total = that.options.totalPage;
			var tNum = that.options.totalSize;
			content += "<div class=\"page_div\">";
            content +=	"<span class=\"showPage\">";
            content +=	"<em>显示</em>";
//          content +=	"<dl>";        
//          content +=	"<dt>5</dt>";        
//          content +=	"<dd></dd>";        
//          content +=	"<b class=\"triangle-down\"></b>";        
//          content +=	"</dl>";   
			content +="<select class='select_page'>";
			if(isArray(that.options.pList)){
				$.each(that.options.pList, function(i,e) {
					if(that.options.size==e){
						content += '<option value = "'+e+'" selected>'+e+'</option>';
					}else{
						
						content += '<option value = "'+e+'">'+e+'</option>';
					}
				});
			}else{
				return;
			}
			content +="</select>";
            content +=	"<i>条</i>";        
            content +=	"</span>";    
            if(Page == 1){
            	content +=	"<a href=\"javascript:void(0);\" class=\"prev unable-page\"><b class=\"triangle-left\"></b></a>";
            }else{
            	
            	content +=	"<a href=\"javascript:void(0);\" class=\"prev\"><b class=\"triangle-left\"></b></a>";
            }
            if(this.options.listShow){
            	
            	content += "<ul class=\"numPageBox\">";
            	//总页数大于6
            	if(total>6){
            		//当前页数小于5时显示省略号
            		if(Page<5){
            			for(var i = 1;i<6;i++){
            				if(Page == i){
            					content += "<li class='active'>"+i+"</li>";
            				}else{
            					content += "<li>"+i+"</li>";
            				}
            			}
            			content += "...";
            			content += "<li>"+total+"</li>";
            		}else{
            			//判断页码在末尾的时候
            			if(Page < total-3){
            				for(var i = Page - 2;i<Page + 3;i++){
            					if(Page == i){
            						content += "<li class=\"active\">"+ i +"</li>";
            					}else{
            						content += "<li>"+ i +"</li>";
            					}
            				}
            				content += "...";
            				content += "<li>"+total+"</li>";
        				//页码在中间的时候
            			}else{
            				content += "<li>1</li>";
            				content += "...";
            				for(var i = total - 4;i < total + 1;i++){
            					if(Page == i){
            						content += "<li class=\"active\">"+ i +"</li>";
            					}else{
            						content += "<li>"+ i +"</li>";
            					}
            				}
            			}
            		}
        		//页数小于6时
            	}else{
            		for(var i = 1;i<total+1;i++){
            			if(Page == i){
            				content += "<li class='active'>"+i+"</li>";
            			}else{
            				content += "<li>"+i+"</li>";
            			}
            		}
            	}
            	content += "</ul>";
            }else{
            	
            	content +=	"<span class=\"now\" id=\"now\">"+Page+"</span>";        
            	content +=	"<span>/</span>";        
            	content +=	"<span class=\"pageNum\">"+total+"</span>";        
            }
            if(Page == total){
				content +=	"<a href=\"javascript:void(0);\" class=\"next unable-page\"><b class=\"triangle-right\"></b></a>";        
			}else{
				content +=	"<a href=\"javascript:void(0);\" class=\"next\"><b class=\"triangle-right\"></b></a>";        
				
			}
            content +=	"<span class=\"turnBtn_box\">";        
            content +=	"<input type=\"number\" class=\"trunBtn_ipt\" min=\"1\" max=\"100\">";        
            content +=	"<input type=\"text\" value='"+Page+"' style='display:none;' class='Qiu_iptNum'>";        
            content +=	"<a href=\"javascript:void(0);\" class=\"trunBtn sure\">跳转</a>";        
            content +=	"</span>";        
            content +=	"</div>";  
			that.ele.html(content);
//			window.location.search ="page="+this.options.pageNo;
		},
		bindEvent: function(){
			var me = this;
			var prePage = this.ele.find('.prev');	
			var nextPage = this.ele.find('.next');
			var select_page = this.ele.find('.select_page');
			me.ele.off('click', 'a');
			me.ele.off('click', 'li');
			select_page.change(function(){
				me.options.size = $(this).val();
				me.options.totalPage = Math.ceil(me.options.totalSize/$(this).val());
				me.options.pageNo = 1;
				me.creatHtml();
				if(me.options.callback){
					me.options.callback(me.options.pageNo,me.options.size);
				}
			});
			
			this.ele.on('click','a',function(){
				var turnPage = me.ele.find('.trunBtn_ipt');
				var classN = $(this).attr('class');
				var ipt_val = turnPage.val();
				if(classN == 'prev'){
					if(me.options.pageNo == 1){
						me.options.pageNo = 1;
						return;
					}else{
						me.options.pageNo = +me.options.pageNo - 1;
					}
				}else if(classN == 'next'){
					if(me.options.pageNo == me.options.totalPage){
						me.options.pageNo = me.options.totalPage;
						return;
					}else{
						me.options.pageNo = +me.options.pageNo + 1;
					}
				}
				else if(classN.indexOf('trunBtn')!==-1){
					if(ipt_val&&ipt_val<=me.options.totalPage){
						me.options.pageNo = ipt_val;
					}else if(ipt_val>me.options.totalPage){
						me.options.pageNo = me.options.totalPage;
					}else{
						console.log('不能为空');
						return;
					}
				}
				me.creatHtml();
				if(classN.indexOf('unable-page')==-1&&me.options.callback){
					me.options.callback(me.options.pageNo,me.options.size);
				}
			});
			this.ele.on('click','li',function(){
				var num = parseInt($(this).text());
				me.options.pageNo = +num;
				me.creatHtml();
				if(me.options.callback){
					me.options.callback(me.options.pageNo,me.options.size);
				}
			});
		},
		reload:function(){
//			var num = window.location.hash.split('#')[1];
			var num = $(".Qiu_iptNum").val();
			console.log(num);
			if(this.options.callback){
				this.options.callback(num,this.options.size);
			}
		}
	}
	$.fn.pager = function(options){
		return new Paging($(this),options);
	}
})(jQuery);
