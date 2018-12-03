(function($){
	function DataList(ele,options,data){
		this.ele = ele;
		this.checkData = [];
		this.allData = [];
		this.options = {
			striped:options.striped,//隔行变色 boolean
			line:options.line||'odd',
			singleSelect:options.singleSelect,//boolean
			rownumbers:options.rownumbers,
			columns:options.columns//数组
		};
		this.data = data;
//		console.log(this);
		this.init();
	}
	DataList.prototype = {
		init:function(){
			this.getList();
			
		},
		getList:function(){
			
			var str = '';
			var me = this;
			var column = this.options.columns;
			var dataArr = [];
			me.ele.html('');
			var isCheck = false;
			if(column){
				str += "<div class=\"table_head_box\">";
				str += "<table class=\"tab_head\">";
				str += "<thead>";
				str += "<tr>";
				for(let i = 0,len=column.length;i<len;i++){
					if(me.options.rownumbers){
						str += "<th>编号</th>";
					}
					for(let j = 0,len1=column[i].length;j<len1;j++){
						if(column[i][j].checkbox&&column[i][j].field==='ck'){
							if(me.options.singleSelect){
								str += '<th></th>';								
							}else{
								str += '<th><input type="checkbox" name="" value="" id="Allck" /></th>';
								
							}
						}else if(column[i][j].title){
							
							
							if(column[i][j].rowspan){
						
								str += "<th rowspan='"+column[i][j].rowspan+"'>";
							}else if(column[i][j].colspan){
						
								str += "<th colspan='"+column[i][j].colspan+"'>";
							}else{
								str += "<th>";
							}
							str += "<div>"+column[i][j].title+"</div>";
							str += "</th>";
						}
					
					
					}
				}
				str += "</tr>";
				str += "</thead>";
				str += "</table>";
				str += "</div>";
				str += "<div class=\"table_body_box\">";
				str += "<table class=\"tab_body_head\"  id=\"q_table_id\">";
				
				
				for(let i = 0,len2 = me.data.length;i<len2;i++){
					str += "<tr>";
					if(me.options.rownumbers){
						str += "<td>"+(i+1)+"</td>";
					}
					for(let m = 0,len=column.length;m<len;m++){
						for(let j = 0,len1=column[m].length;j<len1;j++){
							if(column[m][j].checkbox&&column[m][j].field==='ck'){
								if(me.options.singleSelect){
									str += '<td><input type="radio" name="" /></td>';								
								}else{
									str += '<td><input type="checkbox" name="" /></td>';
								}
								isCheck = true;
							}else if(column[m][j].field!=='ck'){
//								dataArr.push(column[m][j].field);
	//							str += "<td>"+column[i][j].field+"</td>";
//								
								if(column[m][j].width){
		
									if(column[m][j].formatter&&typeof column[m][j].formatter==="function"){
										var val = me.data[i][column[m][j].field];
										var row = me.data[i];
										var $num = i;
										var $rowData = column[m][j].formatter(val,row,$num);
										if($rowData){
											
											str += "<td width='"+column[m][j].width+"px'>"+$rowData+"</td>";
										}
										
	//									console.log(arguments[0]);
									}else{
										
										
										str += "<td width='"+column[m][j].width+"px'>"+me.data[i][column[m][j].field]+"</td>";
									
									}
								}else{
									if(column[m][j].formatter&&typeof column[m][j].formatter==="function"){
										var val = me.data[i][column[m][j].field];
										var row = me.data[i];
										var $num = i;
										var $rowData = column[m][j].formatter(val,row,$num);
										if($rowData){
											
											str += "<td>"+$rowData+"</td>";
										}
									}else{
										str += "<td>"+me.data[i][column[m][j].field]+"</td>";
									}
								}
							}
						}
					}
					str += "</tr>";
				}
				str += "</table>";
				str += "</div>";
				me.ele.append(str);
				var tby = me.ele.find('.table_body_box');
				console.log($('.Qui_body').height());
				tby.css("max-height",$('.Qui_body ').height()-$('.toolbar').outerHeight()-$('.table_head_box').outerHeight()-$('.pageBox').outerHeight()-80);
				if(isCheck){
					
					me.getCheck(me.data);
				}
				var x_tr = me.ele.find('.table_body_box .tab_body_head tr');
				var thed_td = me.ele.find('.table_head_box .tab_head tr th');
				var thed_last_td = me.ele.find('.table_head_box .tab_head tr th:last');
				var tby_td = me.ele.find('.table_body_box .tab_body_head tr').eq(0).children();
				if(me.options.striped){
					me.discolor(x_tr,this.options.line);
				}
				if($('.tab_body_head').height()>$('.table_body_box').height()){
					$(".table_head_box").addClass("pr-4");
				}
				else{
					$(".table_head_box").removeClass("pr-4");
				}
				thed_td.each(function(m,ite){
					
					$(this).width(tby_td.eq(m).width());
					
				});
				//窗口改变
				$(window).resize(function(){
					thed_td.each(function(m,ite){
					
						$(this).width(tby_td.eq(m).width());
						
					});
					tby.css("max-height",$('.Qui_body ').height()-$('.toolbar').outerHeight()-$('.table_head_box').outerHeight()-$('.pageBox').outerHeight()-80);
					if($('.tab_body_head').height()>$('.table_body_box').height()){
						$(".table_head_box").addClass("pr-4");
					}
					else{
						$(".table_head_box").removeClass("pr-4");
					}
				});
			}
			
		},
		
		discolor:function(elName,sta){
			for(var i = 0;i<elName.length;i++){
				if(sta ==='odd'){
					
					if(i%2 !== 0){
						elName.eq(i).addClass('on');
					}
				}else if(sta ==='even'){
					if(i%2 === 0){
						elName.eq(i).addClass('on');
						
					}
				}
			}
		},
		//选中行
		getCheck:function(list){
			var tab_tr = this.ele.find('.tab_body_head tr');
			var ipts = this.ele.find('.tab_body_head input');
			var Allipt = this.ele.find('#Allck');
			var checkArray = [];
			var radioArray = [];
			var dataList = [];
			var that = this;
			var count = 0;
			for(var i = 0;i<ipts.length;i++){
				if(ipts.eq(i).attr('type')=='checkbox'){
					checkArray.push(ipts.eq(i));
				}
			}
			for(var i = 0;i<ipts.length;i++){
				if(ipts.eq(i).attr('type')=='radio'){
					radioArray.push(ipts.eq(i));
				}
			}
			if(!this.options.singleSelect){
				list.forEach(function(cur,i){
					cur.data_key = false;
				});
				Allipt.click(function(){
//					console.log($(this).prop('checked'));
					if($(this).prop('checked')){
						for(var i = 0;i<checkArray.length;i++){
							checkArray[i].prop('checked',true);
							tab_tr.eq(i).attr('flag',false);
							tab_tr.eq(i).addClass('active');
//							that.checkData=list;
							list[i].data_key = true;
						}
						count = checkArray.length;
					}else{
						for(var i = 0;i<checkArray.length;i++){
							checkArray[i].prop('checked',false);
							tab_tr.eq(i).attr('flag',true);
							tab_tr.eq(i).removeClass('active');
//							that.checkData=[];
							list[i].data_key = false;
						}
						count = 0;
					}
					that.checkData = that.getCheckData(list);
				});
				
				
				for(let i = 0,len = tab_tr.length;i<len;i++){
					
					tab_tr.eq(i).attr('flag',true);
					tab_tr.eq(i).on('click',function(){
						if($(this).attr('flag')==='true'){
							$(this).addClass('active');
							checkArray[$(this).index()].prop('checked',true);
							$(this).attr('flag',false);
							count++;
						}else{
							$(this).removeClass('active');
							checkArray[$(this).index()].prop('checked',false);
							$(this).attr('flag',true);
							
							count--;
						}
						if($(this).hasClass('active')){
//							that.checkData.push(list[$(this).index()]);
//							that.checkData.splice($(this).index(),0,list[$(this).index()]);
							list[$(this).index()].data_key = true;
						}
						else{
							list[$(this).index()].data_key = false;
//							for(let j = 0,len2 = that.checkData.length;j<len2;j++){
//								if(that.checkData[j]===list[i]){
////									that.checkData.splice(j,1);
//									that.checkData[j]=null;
//								}
//								
//							}
							
							
//							that.checkData.splice($(this).index(),1);
//							that.checkData.forEach(function(item,j){
//								if(item.data_key === list[i].data_key){
//									that.checkData.splice(j,1);
//								}
//							});
							
//							that.checkData.splice($(this).attr('data_key'),1);
						}
					
						if(count===checkArray.length){
							Allipt.prop('checked',true);
						}else{
							Allipt.prop('checked',false);
						}
//						console.log(that.checkData);
//						that.checkData.map(function(val,i){
//							//过滤规则为，不为空串、不为null、不为undefined，也可自行修改
//					        if (val !== "" && val != undefined) {
//					            that.allData.push(val);
//							}
//						})
//						console.log(that.getCheckData());
						that.checkData = that.getCheckData(list);
					});
					
		}
//				for(let k = 0,len3 = that.checkData;k<len3;k++){
//					if(that.checkData[k]){
//						checkData.push(that.checkData[k]);
//					}
//				}
			}//判断allipt
			else{
				tab_tr.each(function(i,item){
//					console.log(item);
					$(item).attr('flag',true);
					$(item).off('click');
					$(item).click(function(){
						
						if($(this).attr('flag')==='true'){
							
							$(this).addClass('active').siblings().removeClass('active');
							$.each(radioArray,function(j,ele){
								$(ele).prop('checked',false);
								
							});
							tab_tr.each(function(j,ele){
								$(ele).attr('flag',true);
								
							});
							$(this).attr('flag',false);
							radioArray[$(this).index()].prop('checked',true);
						}else{
							$(this).removeClass('active');
							radioArray[$(this).index()].prop('checked',false);
//							tab_tr.each(function(j,ele){
//								$(ele).attr('flag',true);
//								
//							});
							$(this).attr('flag',true);
						}
						$.each(list,function(k,ele){
							list[k].data_key = false;
								
						});
						if($(this).hasClass('active')){
							list[i].data_key = true;
						}else{
							list[i].data_key = false;
						}
						that.checkData = that.getCheckData(list);
					});
				});
			}
			
		},
		
		iptClick:function(){
			
		},
		
		
		
		getCheckData:function(me){
			var that = this;

	        return $.grep(me, function (row) {
	            // fix #2424: from html with checkbox
	            return row['data_key'] === true;
	        });
		}
		
	}
	
	$.fn.datalist = function(options,data){
		return new DataList($(this),options,data);
	}
	
	
	
	//序列化遍历input框内数据
	$.fn.traveData = function(obj){
		var ipt =  $(this).find("input");
		ipt.each(function(i,el) {
	//		console.log($(el));
			var self = $(this);
			for(var k in obj){
				
	//			console.log(k);
				if(self.attr("name") === k){
					if(self.attr("type")==="checkbox"){
						if(obj[k]==="是"){
							self.prop("checked",true);
						}else{
							self.prop("checked",false);
							
						}
					}else{
						
						self.val(obj[k]);
					}
				}
			}
			
		});
	}
	
	//序列化转换
	$.fn.serializeObject = function()
	{
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || null);
			} else {
				o[this.name] = this.value || null;
			}
		});
		return o;
	};
	
	//序列化清除input框数据
	
	function clearVal(ele){
		var ipt = $(ele).find("input");
		ipt.each(function(i,el) {
	//		console.log(el);
			if($(this).attr("type")==="checkbox"){
				$(this).prop("checked",false);
			}else{
				$(this).val('');
			}
		});
	}
	
	
	//判断是否是数组
	function isArray(o){
		return Object.prototype.toString.call(o)=='[object Array]';
	}
	
	//阻止冒泡
	function stopPropagation(e){
		e = e||window.event;
		if(e.stopPropagation){
			e.stopPropagation();//W3C阻止冒泡
		}else{
			e.cancelBubble = true;//IE阻止冒泡
		}
	}
	// 验证手机还有邮箱
	function isPhone(val) {
	    var reg = /(^1[3|4|5|7|8][0-9]{9}$)/;
	    if (!reg.test(val)) {
	        return false;
	    } else {
	        return true;
	    }
	};
	
	function isMail(val) {
	    // var reg = /^[a-z0-9]([a-z0-9\\.]*[-_]{0,4}?[a-z0-9-_\\.]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+([\.][\w_-]+){2,5}$/i;
	    var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]{2,5}$/;
	    if (reg.test(val)) {
	        return true;
	    } else {
	        return false;
	    }
	};
	// 去空格
	function trim(str, is_global) {
	    var result = str.replace(/(^\s+)|(\s+$)/g, "");
	    if (is_global.toLowerCase() == "g") {
	        result = result.replace(/\s/g, "");
	    }
	    return result;
	}
	
	//查找同辈元素
	function siblings(el) {
	    var a = [],
	        p = el.previousSibling;
	
	    while (p) {
	        if (p.nodeType === 1) {
	            a.push(p);
	        }
	        p = p.previousSibling;
	    }
	    a.reverse();
	    var n = el.nextSibling;
	    while (n) {
	        if (n.nodeType === 1) {
	            a.push(n);
	        }
	        n = n.nextSibling;
	    }
	    return a;
	}
	
	// 查找祖先元素
	function parents(el, name) {
	    var x = el.parentNode;
	    var result = null;
	    while (!hasClass(x, name) && x.tagName !== name.toUpperCase()) {
	        x = x.parentNode;
	    }
	    result = x;
	    return result;
	}
	// 移除元素的类名
	
	function clearSiblingClass(el, name, type) {
	    siblings(el).forEach(function(item) {
	        item.classList[type](name);
	    });
	};
	
	function removeClass(obj, type, name, obj2) {
	    let arr = Array.prototype.slice.apply(obj);
	    arr.forEach(function(el) {
	        el.classList[type](name);
	    })
	    if (obj2) {
	        var type2 = (type === 'remove') ? 'add' : 'remove';
	        obj2.classList[type2](name);
	    }
	}
	
	// 获取单选按钮值
	function getVal(radio_Arr) {
	    var value = '',
	        len = radio_Arr.length;
	    for (var i = 0; i < len; i++) {
	        if (radio_Arr[i].checked === true) {
	            value = radio_Arr[i].value;
	            break;
	        }
	    }
	    return value;
	}
	
	// loading显示
	function loading(content) {
		var loading = document.getElementsByClassName('loading')[0],
		header = loading.getElementsByTagName('h1')[0];
		if (content) {
			header.innerHTML = content;
		}
		loading.classList.toggle('hidden');
	};
	
	//图片查看大图
	function pic_check(img_arr) {
	    var detail = document.getElementsByClassName('pic_detail')[0],
	        pic = detail.getElementsByClassName('pic')[0],
	        img = pic.getElementsByTagName('img')[0],
	        len = img_arr.length;
	
	    for (var i = 0; i < len; i++) {
	        img_arr[i].onclick = function(event) {
	            stopPropagation(event)
	            var src = this.src;
	            img.src = src;
	            detail.classList.remove('hidden');
	            setTimeout(function() {
	               img.classList.add('scale');
	            }, 100)
	        }
	    }
	    detail.addEventListener('click', function() {
	        var self = this;
	        img.classList.remove('scale');
	        setTimeout(function() {
	           self.classList.add('hidden');
	        }, 300)
	    })
	}
	
	(function() {
	    var lastTime = 0;
	    var vendors = ['webkit', 'moz'];
	    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || // Webkit中此取消方法的名字变了
	            window[vendors[x] + 'CancelRequestAnimationFrame'];
	    }
	
	    if (!window.requestAnimationFrame) {
	        window.requestAnimationFrame = function(callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
	            var id = window.setTimeout(function() {
	                callback(currTime + timeToCall);
	            }, timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };
	    }
	    if (!window.cancelAnimationFrame) {
	        window.cancelAnimationFrame = function(id) {
	            clearTimeout(id);
	        };
	    }
	}());
	
	// function scrollToTop(scrollTop) {
	//     var speed = scrollTop / 12,
	//         timer = requestAnimationFrame(function() {
	//             scrollTop -= speed;
	//             if (scrollTop > 1) {
	//                 if (scrollTop < 5) {
	//                     scrollTop = 0;
	//                 }
	//                 window.scrollTo(0, scrollTop);
	//                 scrollToTop(scrollTop);
	//             } else {
	//                 window.scrollTo(0, 0);
	//                 cancelAnimationFrame(timer);
	//             }
	//         })
	// };
	
	// let toTop = (function() {
	//     let sideBox = document.getElementsByClassName('sideBox')[0],
	//         topItem = document.getElementsByClassName('topItem')[0],
	//         nav = document.getElementById('navbar'),
	//         scrollDown = 0;
	
	//     window.addEventListener('scroll', function() {
	//         scroll()
	//     }, false);
	
	//     function scroll() {
	//         var scrollUp = document.documentElement.scrollTop || document.body.scrollTop;
	
	//         if (scrollUp > 100) {
	//             topItem.classList.add('topItem2');
	//             sideBox.classList.add('sideBox2');
	
	//         } else {
	//             topItem.classList.remove('topItem2');
	//             sideBox.classList.remove('sideBox2');
	
	//         }
	//         if (scrollUp > scrollDown && scrollUp > 100) {
	//             nav.classList.add('nav_hidden');
	//             nav.classList.add('nav_hidden2');
	//         } else {
	//             nav.classList.remove('nav_hidden2');
	//             if (scrollUp == 0) {
	//                 nav.classList.remove('nav_hidden');
	//             }
	//         }
	//         scrollDown = scrollUp;
	//     };
	// });
	
	// var success_box = (function(content) {
	//     var success = document.getElementsByClassName('success_box')[0],
	//         mask = document.getElementsByClassName('mask')[0],
	//         title = success.getElementsByClassName('title')[0],
	//         success_child = success.getElementsByClassName('success')[0],
	//         green_raduis = success.getElementsByClassName('green_raduis')[0];
	
	//     title.innerText = content;
	//     success.classList.remove('hidden');
	//     mask.classList.remove('hidden');
	//     setTimeout(function() {
	//         success_child.classList.add('success2');
	//         green_raduis.classList.add('bgc');
	//     }, 100);
	
	// })
	
	//判断元素是否进入可视区域
	function isElementInViewport(el) {
	    var rect = el.getBoundingClientRect();
	    return (
	        rect.top >= 0 &&
	        rect.left >= 0 &&
	        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
	        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
	    );
	}
	
	function showTab(el1, el2, type) {
	    let arr = Array.prototype.slice.apply(el1),
	        tableArr = Array.prototype.slice.apply(el2),
	        num = null;
	    arr.forEach(function(el) {
	        if (hasClass(el, 'active')) {
	            num = el.getAttribute('data-' + type);
	        }
	    });
	    tableArr.forEach(function(el) {
	        let tbId = el.getAttribute('data-' + type);
	        if (tbId === num) {
	            el.classList.remove('hidden');
	        } else {
	            el.classList.add('hidden');
	        }
	    });
	
	}
	//刷新页面局部
	function reload_message_frame(el) {
	    if (el.location) {
	        el.location.reload(true);
	    }
	    //else if (el.contentWindow.location) {
	    //     el.contentWindow.location.reload(true);
	    // } 
	    else if (el.src) {
	        el.src = el.src;
	    } else {
	        //fail condition, respond as appropriate, or do nothing
	        alert("Sorry, unable to reload that frame!");
	    }
	}
	
	//跨浏览器的事件处理程序
	let EventUtil = {
	    addHandler: function(element, type, handler) {
	        if (element.addEventListener) {
	            element.addEventListener(type, handler, false);
	        } else if (element.attachEvent) {
	            element.attachEvent('on' + type, handler);
	        } else {
	            element['on' + type] = handler;
	        }
	    },
	    removeHandler: function(element, type, handler) {
	        if (element.removeEventListener) {
	            element.removeEventListener(type, handler, false);
	        } else if (element.detachEvent) {
	            element.detachEvent('on' + type, handler);
	        } else {
	            element['on' + type] = null;
	        }
	    },
	    getEvent: function(event) {
	        return event ? event : window.event;
	    },
	    getTarget: function(event) {
	        return event.target || event.srcElement;
	    },
	    preventDefault: function(event) {
	        if (event.preventDefault) {
	            event.preventDefault();
	        } else {
	            event.returnValue = false;
	        }
	    },
	    stopPropagation: function(event) {
	        if (event.stopPropagation) {
	            event.stopPropagation();
	        } else {
	            event.cancelBubble = true;
	        }
	    }
	}
	
	function selectDown(el, el2) {
	    let filterType = el.getElementsByClassName('filter-type')[0];
	    if (filterType) {
	        filterType.classList.toggle('hidden');
	
	        el.onblur = function() {
	            selectUp(el, el2);
	        }
	    } else {
	        return;
	    }
	
	}
	
	function selectUp(el, el2) {
	    let typeArr = Array.prototype.slice.apply(el2);
	
	    typeArr.forEach(function(el3) {
	        let parent = parents(el3, 'type-title');
	        el3.classList.add('hidden');
	
	    });
	    if (hasClass(el, 'type-items')) {
	        let text = el.innerText,
	            val = el.value,
	            parent = parents(el, 'type-title'),
	            inputBox = parent.getElementsByTagName('input')[0],
	            selected = parent.getElementsByClassName('selected-type')[0];
	        selected.innerText = text;
	        if (inputBox) {
	            inputBox.value = val;
	        }
	    }
	}
	
	//cookie设置,获取,删除
	var cookie = {
	    set:function(name,value){
	    	var Days = 30; 
	        var exp = new Date(); 
	        exp.setTime(exp.getTime() + Days*60*60*1000); 
	        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
	    },
	    get:function(name){
	    	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	        if(arr=document.cookie.match(reg))
	            return unescape(arr[2]); 
	        else 
	            return null; 
	    },
		delete:function(name){
			var exp = new Date(); 
		    exp.setTime(exp.getTime() - 1); 
		    var cval=cookie.get(name);
		    if(cval!=null){
		    	document.cookie= name + "="+cval+";expires="+exp.toGMTString();
		    }  
	    }
	}
	//序列化转换
	$.fn.serializeObject = function()
	{
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || null);
			} else {
				o[this.name] = this.value || null;
			}
		});
		return o;
	};
	
	$.fn.extend({
		slider_bar:function(opt){
			var d = {
				
				eve:opt.eve,
				className:opt.className||'active'
			};
			var me = $(this);
			me.on(d.eve,function(){
				if($(this).next().is(':visible')){
					$(this).next().slideUp().end().removeClass(d.className);
				}else{
					$(this).next().slideDown().end().addClass(d.className);
				}
			});
		},
		addMenu:function(opt){
			$(this).html('');
			var str = "";
			var $iconEle = $('.icon_box i');
			var $iconArr = [];
			var that = this;
			$iconEle.each(function(i,item){
				var icon_Name = $iconEle.eq(i).attr('class').split(' ')[2];
				$iconArr.push(icon_Name);
			});
			console.log($iconArr);
			if(isArray(opt)){
				$.each(opt,function(i,cur){
//					console.log(cur.src);
					if(cur.src){
						str += '<dl>';
						str += '<a data-href="'+cur.src+'" data-title="'+cur.name+'" href="javascript:void(0)" style="width:100%">';
						str += '<dt><i class="side- iconfont '+$iconArr[i]+'"></i>'+cur.name+'</dt>';
						str += '</a>';
						str += '</dl>';
						
					}
					else{
						$.each(cur,function(k,val){
//							console.log(cur[k]);
							if(isArray(val)){
									
								
									str += '<dl>';
									str += '<dt>';
									str += '<i class="side- iconfont '+$iconArr[i]+'"></i>';
									str += '<span>'+cur.name+'</span>';
									str += '<i class="iconfont icon-sanjiaoright menu_dropdown-arrow"></i>';
									str += '</dt>';
									str += '<dd>';
									str += '<ul>';
									$.each(val,function(j,m){
										
										if(m.list_c&&m.list_c.length>0){
											
											str += '<li>';
//											str += '<a data-href="'+m.src+'" data-title="'+m.name+'" href="javascript:void(0)">';
											str += '<p data-title="'+m.name+'" href="javascript:void(0)">';
											str += '<span>'+m.name+'</span>';
											str += '<i class="iconfont icon-sanjiaoright menu_dropdown-arrow"></i>';
											str += '</p>';
											str += '<ol>';
											$.each(m.list_c, function(c,l) {
//												str += '<dd>';
												str += '<li>';
												str += '<a data-href="'+l.src+'" data-title="'+l.name+'" href="javascript:void(0)">'+l.name+'</a>';
												str += '</li>';
//												str += '</dd>';
											});
											str += '</ol>';
											str += '</li>';
										}else{
											str += '<li>';
											str += '<a data-href="'+m.src+'" data-title="'+m.name+'" href="javascript:void(0)">'+m.name+'</a>';
											str += '</li>';
										}
									});
									str += '</ul>';
									str += '</dd>';
									str += '</dl>';
							}
						})
					}
				});
				$(this).append(str);
				
				var menu_a = $(this).find('dl a');
				var menu_dt = $(this).find('dl dt');
				var menu_p = $(this).find('dl ul li p');
				if(window.location.hash==''){
					
					var IndexSrc = menu_a.eq(0).attr("data-href");
					window.location.hash = IndexSrc.split('.')[0];
				}
//				menu_a.eq(0).addClass('active');
				menu_a.click(function(e){
					var me = $(this);
					var Psrc = $(this).attr('data-href');
					if (typeof Psrc !=="undefined") {
						window.location.hash = Psrc.split('.')[0];
						menu_a.parents('dd').siblings('dt').removeClass('on');
						if(menu_a.parents('ol').siblings('p').length>0){
							menu_a.parents('ol').siblings('p').removeClass('on');
							
						}
//						that.hashChange(me);
//						that.createXMLHttpRequest();  
//			  	  		xmlHttp.open("GET",Psrc,true);  
//			          	xmlHttp.send(null);
//			          	$('.Qui_body .loader').show();
//			          	xmlHttp.onreadystatechange = function(){  
//			                if(xmlHttp.readyState==4){
//			                    if(xmlHttp.status==200){ 
//			                    	menu_a.removeClass('active');
//									me.addClass("active");
//									
//									menu_dt.removeClass('on');
//									menu_p.removeClass('on');
//									var pasb = me.parents('dd').siblings('dt');
//									var oLp = me.parents('ol').siblings('p');
//									if(pasb){
//										pasb.addClass('on');
//									}
//									if(oLp){
//										oLp.addClass('on');
//									}
//			                    	$('.Qui_body .loader').hide();
//			                        that.loadPage(Psrc);
//			                    }else {  
//			                        alert("页面不存在");  
//			                    }  
//			                }
//			                setTimeout(function(){
//			                	$('.Qui_body .loader').hide();
//			                },4000);
//			          	}
//						me.GetURL(Psrc);
					}else{
						console.log('没有找到该页面');
					}
				});
				
			}
		},
		
//		dtClass:function(){
//			var menu_a = $(this).find('dl a');
//			menu_a.each(function(i,val){
//				var pasb = $(this).parents('dd').siblings('dt'); 
//				if($(val).hasClass('active')&&pasb){
//					pasb.addClass('on');
//				}else{
//					pasb.removeClass('on');
//				}
//			});
//		},
		Quifold:function(options){
			var defaults = {
				titcell:options.titcell,
				maincell:options.maincell,
				type:1||options.type,//1只打开一个;2必须一个打开;3 可以打开多个
				trigger:'click'||options.trigger,
				className:'selected'||options.className,
				speed:'normal'||options.speed
			};
			var that = $(this);
			that.find(defaults.titcell).on(defaults.trigger,function(){
				if($(this).next().is(':visible')){
					if(defaults.type===2){
						return false;
					}else{
						$(this).next().slideUp(options.speed).end().removeClass(defaults.className);
					}
				}else{
					if(defaults.type===3){
						$(this).next().slideDown(options.speed).end().addClass(defaults.className);
					}else{
						that.find(defaults.maincell).slideUp(options.speed);
						that.find(defaults.titcell).removeClass(defaults.className);
						$(this).next().slideDown(options.speed).end().addClass(defaults.className);
					}
				}
			});
			
			//二级下三级菜单
			that.find(defaults.maincell).find('ul li p').on(defaults.trigger,function(){
				if($(this).next().is(':visible')){
					if(defaults.type===2){
						return false;
					}else{
						$(this).next().slideUp(options.speed).end().removeClass(defaults.className);
					}
				}else{
					if(defaults.type===3){
						$(this).next().slideDown(options.speed).end().addClass(defaults.className);
					}else{
						that.find(defaults.maincell).find('ul li p').removeClass(defaults.className);
						that.find(defaults.maincell).find('ul li ol').slideUp(options.speed);
						$(this).next().slideDown(options.speed).end().addClass(defaults.className);
					}
				}
			});
			
			that.Prouter();
			
		},
		loadPage:function(src){
			$(".iframe_box").empty();
			$(".iframe_box").load(src,function(res,sta,xhr){
//				console.log(res);
//				console.log(sta);
				
				$(".iframe_box").fadeIn('slow');
			});
			window.location.hash = src.split('.')[0];
		},
		//判断页面是否存在
		createXMLHttpRequest:function(){
			if (window.XMLHttpRequest) {
                //Firefox,Netscape,Chrome,Safari等浏览器
                xmlHttp = new XMLHttpRequest();
            } else if (window.ActiveXObject) { //IE浏览器
                try {
                    xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); //创建xmlHttp对象
                } catch (e) {
                    try {
                        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); //创建xmlHttp对象
                    } catch (e) { }
                }
            }
		},

		GetURL:function(){
			var that = this;
			var url = $(this).attr('data-href');
			var me = $(this);
			if($(this).parents('dl').length===0&&url){
				window.location.hash = url.split('.')[0];
//				that.hashChange();
				var pageHash = window.location.hash;
				var oA = $(document).find("a");
				var oDl = $(document).find('dl');
				oA.each(function(i,item){
					if($(item).attr('data-href')){
						
						var dHref = $(item).attr('data-href').split('.')[0];
					}
					var pHref = pageHash.split('#')[1];
					
					oDl.find('dd').slideUp();
					oDl.find('dt').removeClass('selected on');
					$(".Qui_card").html('');
					if($(this).parents('dd').siblings('dt').length>0){
						$(".Qui_card").show();
						
					}else{
						$(".Qui_card").hide();
					}
					
					
				});
//				me.createXMLHttpRequest();  
//	  	  		xmlHttp.open("GET",url,true);  
//	          	xmlHttp.send(null);
//	          	xmlHttp.onreadystatechange = function(){  
//	          		$('.Qui_body .loader').fadeIn();
//	                if(xmlHttp.readyState==4){
//	                    if(xmlHttp.status==200){ 
//	                    	$('.Qui_body .loader').fadeOut();
//	//                  	menu_a.removeClass('active');
//	//						$(this).addClass("active");
//							
//	                        me.loadPage(url);
//	                        
////	                        $(".Qui_card").html('');
//							
//							$(".Qui_card").hide();
//							
//	                        
//	                    }else {  
//	                        alert("页面不存在");  
//	                    }  
//	                }
//	                setTimeout(function(){
//	                	$('.Qui_body .loader').fadeOut();
//	                },4000);
//	          	}   
			}
		},

		Prouter:function(){
			this.hashChange();
			this.replaceMent();
		},
		hashChange:function(){
			var me = this;
			window.addEventListener('hashchange', e => {
//				console.log(location.hash);
//				console.log(location.href);
				me.replaceMent();
			}, false);
		},
		replaceMent:function(){
			var pageHash = window.location.hash;
			var page = pageHash.split('#')[1]+".html";
			var that = this;
			var me = $(this);
			var menu_a = me.find('dl a');
			var menu_dt = me.find('dl dt');
			var menu_p = me.find('dl ul li p');
//			console.log(pageHash);
//			console.log(page);
//			$(".iframe_box").empty();
//			$(".iframe_box").load(page,function(res,sta,xhr){
//			});
			
			that.createXMLHttpRequest();  
	  	  	xmlHttp.open("GET",page,true);  
	        xmlHttp.send(null);
	        xmlHttp.onreadystatechange = function(){  
	          	$('.Qui_body .loader').fadeIn();
	            if(xmlHttp.readyState==4){
	                if(xmlHttp.status==200){ 
	                    $('.Qui_body .loader').fadeOut();
							
	                    that.loadPage(page);
							
	                        
	                }else {  
	                    alert("页面不存在");  
	                }  
	            }
	            setTimeout(function(){
	                $('.Qui_body .loader').fadeOut();
	            },4000);
	        };
			
			var oA = this.find("dl a");
			oA.each(function(i,item){
//				console.log($(item).attr('data-href'));
//				var dHref = $(item).attr('data-href');
//				if(dHref&&dHref.indexOf(pHref)>=0){
	
	
	
				var dHref = $(item).attr('data-href').split('.')[0];
				var pHref = pageHash.split('#')[1];
				if(dHref&&dHref==pHref){
					$(this).addClass('active');
					$(this).parents('dd').slideDown();
					$(this).parents('dd').siblings('dt').addClass('selected on');
					$(".Qui_card").html('');
					if($(this).parents('dd').siblings('dt').length>0){
						$(".Qui_card").show();
						var str = ""; 
						str += '<a href="javascript:void(0);"><cite>'+$(this).parents('dd').siblings('dt').text()+'</cite></a>';
						str += '<span Qui-separator>/</span>';
						if($(this).parents('ol').siblings('p').length>0){
							$(this).parents('ol').slideDown();
							$(this).parents('ol').siblings('p').addClass('selected on');
							str += '<a href="javascript:void(0);"><cite>'+$(this).parents('ol').siblings('p').text()+'</cite></a>';
							str += '<span Qui-separator>/</span>';
						}
						str += '<a><cite>'+$(this).text()+'</cite></a>';
						$(".Qui_card").html(str);
					}else{
						$(".Qui_card").hide();
					}
				}else{
					$(this).removeClass('active');
				}
				
			});
		},
		
		
	});
	
	
	
	
	(function(){
      	var Router = function(){
        	/*
          	this.routes['/'] = function(){}  
          	this.routes['/html'] = function(){}
       	 */ 
        	this.routes = {};//用来保存路由
        	this.curUrl = ''; //获取当前的hash
     	 }
      	Router.prototype.init = function(){ //监听路由变化
        //call,apply
        	window.addEventListener( 'hashchange', this.reloadPage.bind(this) );
      	}
      	Router.prototype.reloadPage = function(){
        	this.curUrl = location.hash.substring(1) || '/';
        	this.routes[this.curUrl]();    
      	}
      	Router.prototype.map = function( key, callback ){ //保存路由对应的函数
        	this.routes[key] = callback;
        	// console.log( this.routes );
      	} 
    	window.Router = Router;
    })();
	
    (function(){
//  	$('.QuiDrop').mouseenter(function(){
//  		$(this).addClass('open');
//  	}).mouseleave(function(){
//  		$(this).removeClass('open');
//  	});
    	var flag = true;
		$(".shrink_icon").click(function(){
			if(flag){
				
				$('.Qui_aside').stop().animate({left:-198},'slow');
				$('.Qui_body').stop().animate({left:0},'slow');
				$(this).addClass('active');
			}else{
				$('.Qui_aside').stop().animate({left:0},'slow');
				$('.Qui_body').stop().animate({left:198},'slow');
				$(this).removeClass('active');
			}
			flag = !flag;
			
		});
		$(window).resize(function(){
			shrink();
		});
		shrink();
		function shrink(){
			
			if($(this).width()<800){
				$('.Qui_aside').stop().animate({left:-198},'slow');
				$('.Qui_body').stop().animate({left:0},'slow');
				$(".shrink_icon").addClass('active');
				flag = false;
			}else{
				$('.Qui_aside').stop().animate({left:0},'slow');
				$('.Qui_body').stop().animate({left:198},'slow');
				$(".shrink_icon").removeClass('active');
				flag = true;
			}
		}
		
//		var AllcheckBox = $('input[type="checkbox"]');
//  	$.each(AllcheckBox, function(i,item) {
//  		if($(item).is(':checked')){
//  			$(this).parent().addClass('active');
//  		}else{
//  			$(this).parent().removeClass('active');
//  		}
//  	});
		
		//遮罩层
		function cloneLi(){
			
			var oNav = $(".nav_bar").find('li.Qui_hide_xs');
			if(oNav.length>0){
				$('.layer_menu_ul').html('');
				var str = '';
				oNav.each(function(i,item){
					
	//				console.log(item);
					$('.layer_menu_ul').append($(item).clone().removeClass('Qui_hide_xs'));
				});
			
			}
			
		}
//		if($('.dn').is(":visible")){
			cloneLi();
			$('.dn').click(function(){
				if($('#CloneLI').is(":hidden")){
					$('#CloneLI').fadeIn();
				}else{
					$('#CloneLI').fadeOut();
				}
				
			});
			
//		}
		$('.QuiDrop').mouseenter(function(){
			$(this).addClass('open');
			$(this).children('.Qui_drop_menu').stop().slideDown();
    	}).mouseleave(function(){
    		$(this).removeClass('open');
			$(this).children('.Qui_drop_menu').stop().slideUp();
    		
    	});
		$('.modal_back').click(function(){
			$(this).parents('.modal_popup').fadeOut();
		});
		$(window).resize(function(){
			hideLi();
		});
		function hideLi(){
			
			if($(window).width()>768){
				$('#CloneLI').hide();
			}
		}
		var oDoc = $(document).find('li a');
    	oDoc.on('click',function(){
    		$(this).GetURL();
    	});
		
    })();
	
	
})(jQuery);

!function(win){
	function Qui(){
		
	}
	Qui.fn = Qui.prototype;
	var doc = document, config = Qui.fn.cache = {};
	config.event = {}; //记录模块自定义事件
	
	//遍历
	Qui.fn.each = function(obj, fn){
	  var that = this, key;
	  if(typeof fn !== 'function') return that;
	  obj = obj || [];
	  if(obj.constructor === Object){
	    for(key in obj){
	      if(fn.call(obj[key], key, obj[key])) break;
	    }
	  } else {
	    for(key = 0; key < obj.length; key++){
	      if(fn.call(obj[key], key, obj[key])) break;
	    }
	  }
	  return that;
	};
	//自定义模块事件
	Qui.fn.onevent = function(modName, events, callback){
	  if(typeof modName !== 'string' 
	  || typeof callback !== 'function') return this;
	  config.event[modName + '.' + events] = [callback];
	  
	  return this;
	};
	
	//执行自定义模块事件
	Qui.fn.event = function(modName, events, params){
	  var that = this, result = null, filter = events.match(/\(.*\)$/)||[]; //提取事件过滤器
	  var set = (events = modName + '.'+ events).replace(filter, ''); //获取事件本体名
	  var callback = function(_, item){
	    var res = item && item.call(that, params);
	    res === false && result === null && (result = false);
	  };
	  Qay.each(config.event[set], callback);
	  filter[0] && Qay.each(config.event[events], callback); //执行过滤器中的事件
	  return result;
	};
	
	win.Qay = new Qui();

}(window);

//表单
//+function(win){
	function newForm(){
			
	}
	var MOD_NAME = 'form';
	newForm.prototype.render = function(){
		var DISAB = "Qui_disabled",
			HIDE = 'Qui_hide',
			THIS = 'Qui_this',
			Elem = '.Qui_form',
			SHOW = 'Qui_show';
		var items = {
			select:function(){
				var tips = '请选择',Class = 'Qui_form_select',
				Title = 'Qui_select_title',
				NONE = 'Qui_select_none',
				initVal = '',
				thatInput,
				selects = $(Elem).find('select'),
				hide = function(e,clear){
					if(!$(e.target).parent().hasClass(Title)||clear){
						$('.'+Class).removeClass(Class+'ed');
						thatInput && initVal && thatInput.val(initVal);
					}
					thatInput = null;
				},
				events = function(re,disabled,isSearch){
					var me = $(this),
						title = re.find('.'+Title),
						input = title.find('input'),
						dl = re.find('dl'),dds = dl.children('dd');
					if(disabled){
						return;
					}
							
					//展开
					var showDown = function(){
						re.addClass(Class+'ed');
						dds.removeClass(HIDE);
					},hideDown = function(){
						re.removeClass(Class+'ed');
						input.blur();
						notOption(input.val(), function(none){
			              if(none){
			                initVal = dl.find('.'+THIS).html();
			                input && input.val(initVal);
			              }
			            });
						
					};
					
					//点击标题区域
					title.on('click',function(e){
						re.hasClass(Class+'ed')?(hideDown()):(hide(e,true),showDown());
						dl.find('.'+NONE).remove();
					});
							
					//点击箭头获取焦点
					title.find('.Qui_edge').on('click',function(){
						input.focus();
					});
							
					//键盘事件
					input.on('keyup',function(e){
						var keyCode = e.keyCode;
						if(keyCode === 9){
							showDown();
						}
					}).on('keydown',function(e){
						var keyCode = e.keyCode;
						//
						if(keyCode === 9){//tab键
							hideDown();
						}else if(keyCode === 13){//回车
							e.preventDefault();
						}
					});
							
					//检测是否不属于select项
					var notOption = function(value,callback,keyup){
						var num = 0;
						$.each(dds, function() {
							var othis = $(this)
				              ,text = othis.text()
				              ,not = text.indexOf(value) === -1;
				              if(value === '' || (keyup ? not : value !== text)) num++;
				              keyup && othis[not ? 'addClass' : 'removeClass'](HIDE);
						});
						var none = num === dds.length;
	    				return callback(none), none;
					};
							
					//搜索匹配
			        var search = function(e){
				        var value = this.value, keyCode = e.keyCode;
				            
				        if(keyCode === 9 || keyCode === 13 
				            || keyCode === 37 || keyCode === 38 
				            || keyCode === 39 || keyCode === 40
				        ){
				            return false;
				        }
				            
				        notOption(value, function(none){
				            if(none){
				               dl.find('.'+NONE)[0] || dl.append('<p class="'+ NONE +'">无匹配项</p>');
				            } else {
				                dl.find('.'+NONE).remove();
				            }
				        }, true);
			            
			        };
			        if(isSearch){
			            input.on('keyup', search).on('blur', function(e){
			              thatInput = input;
			              initVal = dl.find('.'+THIS).html();
			              if(!initVal){
			                input.val('');
			              }
			            });
			        }
					
					        //选择
					dds.on('click', function(){
						var othis = $(this), value = othis.attr('Qui_value');
				        var filter = me.attr('Qui_filter'); //获取过滤器
					
					    if(othis.hasClass(DISAB)) return false;
					            
					    me.val(value).removeClass('Qui_form_danger'), input.val(othis.text());
					    othis.addClass(THIS).siblings().removeClass(THIS);
					    Qay.event.call(this, MOD_NAME, 'select('+ filter +')', {
					         elem: me[0]
					         ,value: value
					         ,othis: re
					    });
				
					    hideDown();
					            
					    return false;
					});
				          
			        re.find('dl>dt').on('click', function(e){
			            return false;
			        });
					          
			        //关闭下拉
			        $(document).off('click', hide).on('click', hide);
						
						
						
				};
					
				selects.each(function(index, select){
			          var othis = $(this), hasRender = othis.next('.'+Class), disabled = this.disabled;
			          var value = select.value, selected = $(select.options[select.selectedIndex]); //获取当前选中项
			          
			          if(typeof othis.attr('Qui_ignore') === 'string') return othis.show();
			          
			          var isSearch = typeof othis.attr('Qui_search') === 'string';
			
			          //替代元素
			          var reElem = $(['<div class="Qui_unselect '+ Class + (disabled ? ' Qui_select_disabled' : '') +'">'
			            ,'<div class="'+ Title +'"><input type="text" placeholder="'+ (select.options[0].innerHTML ? select.options[0].innerHTML : tips) +'" value="'+ (value ? selected.html() : '') +'" '+ (isSearch ? '' : 'readonly') +' class="Qui_input Qui_unselect'+ (disabled ? (' '+DISAB) : '') +'">'
			            ,'<i class="Qui_edge"></i></div>'
			            ,'<dl class="Qui_anim Qui_anim_upbit'+ (othis.find('optgroup')[0] ? ' Qui_select_group' : '') +'">'+ function(options){
			              var arr = [];
			              $.each(options, function(index, item){
			                if(index === 0 && !item.value) return;
			                if(item.tagName.toLowerCase() === 'optgroup'){
			                  arr.push('<dt>'+ item.label +'</dt>'); 
			                } else {
			                  arr.push('<dd Qui_value="'+ item.value +'" class="'+ (value === item.value ?  THIS : '') + (item.disabled ? (' '+DISAB) : '') +'">'+ item.innerHTML +'</dd>');
			                }
			              });
			              return arr.join('');
			            }(othis.find('*')) +'</dl>'
			          ,'</div>'].join(''));
			          
			          hasRender[0] && hasRender.remove(); //如果已经渲染，则Rerender
			          othis.after(reElem);
			          events.call(this, reElem, disabled, isSearch);
			    });
						
			},
			checkbox:function(){
				var Class = {
					checkbox:["Qui_form_checkbox","Qui_form_checked","checkbox"],
					_switch:["Qui_form_switch", "Qui_form_onswitch", "switch"]
				};
					
				var checks = $(Elem).find('input[type=checkbox]');
				var events = function(re,cla){
					var me = $(this);
					re.on('click',function(){
						var filter = me.attr('Qfilter'), //获取过滤器
	    					text = (me.attr('Qtext')||'').split('|');
						if(me[0].disabled){
							return;
						}
						me[0].checked?(me[0].checked=false,re.removeClass(cla[1])).find("em").text(text[1]):(me[0].checked = true,re.addClass(cla[1]).find("em").text(text[0]) );
					});
				}
				checks.each(function(i,item){
					var me = $(this),
					skin = me.attr("Qskin"),
//					text =(me.attr('Qtext')||'').split('|'),
					text =me.attr('Qtext')?me.attr('Qtext').split('|'):'',
					disabled = this.disabled;
					t = me.attr('title');
					if(skin === "switch"){
						skin = '_'+skin;
					}
					var Reclass = Class[skin]||Class.checkbox;
							
					//替代元素
					var ReSe = me.next("."+Reclass[0]);
					var reElm = $(['<div class="Qui_unselect '+ Reclass[0] + (item.checked ? (' '+Reclass[1]) : '') + (disabled ? ' Qui_checkbox_disbaled '+DISAB : '') +'" Qskin="'+ (skin||'') +'">',
					{_switch: '<em>'+ ((item.checked ? text[0] : text[1])||'') +'</em><i></i>'}[skin] || (skin?(item.title ? ('<span>'+item.title+'</span><i class="Qui_icon"></i>'):'<i class="Qui_icon"></i>'):('<span>'+(item.title||'未命名')+'</span><i class="Qui_icon"></i>')),'</div>'].join(''));
						
					ReSe[0] && ReSe.remove();//如果已经渲染
					me.after(reElm);
					events.call(this,reElm,Reclass);
				});
			},//checkbox
			//radio
			radio:function(){
				var CLASS = ['Qui_form_radio','Qui_radio_check'],
				radioAll = $(Elem).find('input[type=radio]'),
				myeve = function(re){
					var me = $(this);
					re.on('click',function(){
						var name = me[0].name,forms = me.parents(Elem);
						var filter = me.attr('Qfilter'); //获取过滤器
						var sameName = forms.find('input[name='+ name.replace(/(\.|#|\[|\])/g, '\\$1') +']'); //找到相同name的兄弟
						if(me[0].disabled){
							return;
						}
						$.each(sameName, function() {
							var next = $(this).next("."+CLASS[0]);
							this.checked =false;
							next.removeClass(CLASS[1]);
								
						});
						me[0].checked = true;
						re.addClass(CLASS[1]);
							
					});
				};
						
				radioAll.each(function(i,radio){
					var me = $(this),
						Rese = me.next("."+CLASS[0]),
						disabled = this.disabled;
//					var reElm = "";						
//					reElm += "<div class='Qui_unselect "+CLASS[0] + (radio.checked?(' '+CLASS[1]):'') + (disabled?' Qui_radio_disabled '+DISAB:'')+"'>";
//					reElm += "<i class='Qui_icon'></i>";
//					reElm += "<span>"+(radio.title||'')+"</span>";
//					reElm += "</div>";
					
					//替代元素
			          var reElem = $(['<div class="Qui_unselect '+ CLASS[0] + (radio.checked ? (' '+CLASS[1]) : '') + (disabled ? ' Qui_radio_disabled '+DISAB : '') +'">'
			          ,'<i class="Qui_icon"></i>'
			          ,'<span>'+ (radio.title||'') +'</span>'
			          ,'</div>'].join(''));
					
					Rese[0] && Rese[0].remove();
					me.after(reElem);
					myeve.call(this,reElem);
//					myeve.call(this,$(reElm));
				});
			}
		};
			
		$.each(items, function(k,item) {
			item();
		});
	};
	
	newForm.prototype.CheckboxVal = function(ele){
		$(ele).click(function(){
	        //$('input:checkbox:checked') 等同于 $('input[type=checkbox]:checked')
	        //意思是选择被选中的checkbox
	        $.each($('input:checkbox:checked'),function(){
	            window.alert("你选了："+
	                $('input[type=checkbox]:checked').length+"个，其中有："+$(this).val());
	        });
	   	});
	};
	
	newForm.prototype.RadioVal = function(ele){
		$(ele).click(function(){
	        //$('input:checkbox:checked') 等同于 $('input[type=checkbox]:checked')
	        //意思是选择被选中的checkbox
	        $.each($('input:radio:checked'),function(){
	            window.alert("你选了："+
	                $('input[type=radio]:checked').length+"个，其中有："+$(this).val());
	        });
	   	});
	};
	newForm.prototype.formEvent = function(parm,obj){
			
	};
	newForm.prototype.on = function(events, callback){
		return Qay.onevent(MOD_NAME, events, callback);
	}
		
//}(window);
function Quiform(){
	var f = new newForm();
	f.render();
	return f;
}

//富文本编辑
function Editor(ele){
	this.editor = new window.wangEditor(ele);
	 //处理上传图片的controller路径 
    this.editor.customConfig.uploadImgServer = '/admin/uploadImg';
     // 定义上传图片的默认名字 
    this.editor.customConfig.uploadFileName = 'myFileName';
	// 将图片大小限制为 3M
	this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
	
	// 允许上传到七牛云存储
	this.editor.customConfig.qiniu = true;
	
	this.editor.create();
}
Editor.prototype = {
	//上传到七牛云
	uploadInit:function(){
		// 获取相关 DOM 节点的 ID
	    var btnId = this.editor.imgMenuId;
	    var containerId = this.editor.toolbarElemId;
	    var textElemId = this.editor.textElemId;
	
	    // 创建上传对象
	    var uploader = Qiniu.uploader({
	        runtimes: 'html5,flash,html4',    //上传模式,依次退化
	        browse_button: btnId,       //上传选择的点选按钮，**必需**
	        uptoken_url: '/uptoken',
	            //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
	        // uptoken : '<Your upload token>',
	            //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
	        // unique_names: true,
	            // 默认 false，key为文件名。若开启该选项，SDK会为每个文件自动生成key（文件名）
	        // save_key: true,
	            // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
	        domain: 'http://7xrjl5.com1.z0.glb.clouddn.com/',
	            //bucket 域名，下载资源时用到，**必需**
	        container: containerId,           //上传区域DOM ID，默认是browser_button的父元素，
	        max_file_size: '100mb',           //最大文件体积限制
	        flash_swf_url: '../js/plupload/Moxie.swf',  //引入flash,相对路径
	        filters: {
	                mime_types: [
	                  //只允许上传图片文件 （注意，extensions中，逗号后面不要加空格）
	                  { title: "图片文件", extensions: "jpg,gif,png,bmp" }
	                ]
	        },
	        max_retries: 3,                   //上传失败最大重试次数
	        dragdrop: true,                   //开启可拖曳上传
	        drop_element: textElemId,        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
	        chunk_size: '4mb',                //分块上传时，每片的体积
	        auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
	        init: {
	            'FilesAdded': function(up, files) {
	                plupload.each(files, function(file) {
	                    // 文件添加进队列后,处理相关的事情
	                    this.printLog('on FilesAdded');
	                });
	            },
	            'BeforeUpload': function(up, file) {
	                // 每个文件上传前,处理相关的事情
	                this.printLog('on BeforeUpload');
	            },
	            'UploadProgress': function(up, file) {
	                // 显示进度
	                this.printLog('进度 ' + file.percent)
	            },
	            'FileUploaded': function(up, file, info) {
	                // 每个文件上传成功后,处理相关的事情
	                // 其中 info 是文件上传成功后，服务端返回的json，形式如
	                // {
	                //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
	                //    "key": "gogopher.jpg"
	                //  }
	                this.printLog(info);
	                // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
	                
	                var domain = up.getOption('domain');
	                var res = $.parseJSON(info);
	                var sourceLink = domain + res.key; //获取上传成功后的文件的Url
	
	                this.printLog(sourceLink);
	
	                // 插入图片到editor
	                editor.cmd.do('insertHtml', '<img src="' + sourceLink + '" style="max-width:100%;"/>')
	            },
	            'Error': function(up, err, errTip) {
	                //上传出错时,处理相关的事情
	                this.printLog('on Error');
	            },
	            'UploadComplete': function() {
	                //队列文件处理完毕后,处理相关的事情
	                this.printLog('on UploadComplete');
	            }
	            // Key 函数如果有需要自行配置，无特殊需要请注释
	            //,
	            // 'Key': function(up, file) {
	            //     // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
	            //     // 该配置必须要在 unique_names: false , save_key: false 时才生效
	            //     var key = "";
	            //     // do something with key here
	            //     return key
	            // }
	        }
	        // domain 为七牛空间（bucket)对应的域名，选择某个空间后，可通过"空间设置->基本设置->域名设置"查看获取
	        // uploader 为一个plupload对象，继承了所有plupload的方法，参考http://plupload.com/docs
	    });
	},
	// 封装 console.log 函数
	printLog:function(title, info) {
	    window.console && console.log(title, info);
	}
};
function QuiEditor(ele){
	var e = new Editor(ele);
	return e;
}

//时间类

//获取当前日期格式为xxxx-xx-xx
function getDateTime(dt) {
	var year = dt.getFullYear();
	var month = dt.getMonth() + 1;
	var day = dt.getDate();
	month = month < 10 ? "0" + month : month;
	day = day < 10 ? "0" + day : day;
	return year + "-" + month + "-" + day;
}
//补0操作    
function getzf(num){    
    if(parseInt(num) < 10){    
        num = '0'+num;    
    }    
    return num;    
}
//把毫秒数转换成日期格式
function getMyDate(str){    
    var oDate = new Date(str),    
    oYear = oDate.getFullYear(),    
    oMonth = oDate.getMonth()+1,    
    oDay = oDate.getDate(),    
    oHour = oDate.getHours(),    
    oMin = oDate.getMinutes(),    
    oSen = oDate.getSeconds(),
    
    oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay);//最后拼接时间    
    return oTime;    
};

function $Date(ele,flag){
	this.ele = ele;
	this.flag = flag;
}
$Date.prototype.init = function(){
	
	if(this.flag){
		laydate.render({
		
		  	elem: this.ele,
		  	type: 'datetime',
		  	range: true
		  	
		});
	}else{
		//常规用法
		laydate.render({
			
		  	elem: this.ele
		  	
		});
	}
};
function QuiDate(ele,f){
	return new $Date(ele,f).init();
}
//时间范围
function DateRange(ele1,ele2){
	var ele1 = ele1||'#startTime',
		ele2 = ele2||'#endTime';
	//laydate日期
	var startDate = laydate.render({
	  elem: ele1, //指定元素
	  type: 'datetime',
//	  max:getNowFormatDate(),
	  done: function (value, dates) {                
	      endDate.config.min ={
	               year:dates.year,
	               month:dates.month-1, //关键
	               date: dates.date,
	               hours: dates.hours,
	               minutes: dates.minutes,
	               seconds : dates.seconds
	      }; 
	      //自动弹出结束日期的选择器
       	endDate.config.elem[0].focus();
	  }
	});
	var endDate = laydate.render({
	    elem: ele2, //指定元素
	    type: 'datetime',
//	    max:getNowFormatDate()
	});
	//获取当前的日期时间 格式“yyyy-MM-dd HH:MM:SS”
	function getNowFormatDate() {
	    var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	            + " " + date.getHours() + seperator2 + date.getMinutes()
	            + seperator2 + date.getSeconds();
	    return currentdate;
	}
}

//弹出层
function Msg(){
	this.init();
}
Msg.prototype = {
	init:function(){
		
		this.box = document.createElement('div');
		this.box.id = 'Qui_box';
		this.box.style.cssText = 'position: fixed;width: 100%;height: 100%;top: 0;right: 0;bottom: 0;left: 0;z-index: 1;overflow: hidden;-webkit-overflow-scrolling: touch;outline: 0;display:none';
		document.body.appendChild(this.box);
		this.back = document.createElement('div');
		this.back.style.cssText = 'width: 100%;height: 100%;background: rgba(0, 0, 0, 0.2);position: absolute;op: 0;right: 0;left: 0;z-index: 2;';
		this.box.appendChild(this.back);
		this.boxMain = document.createElement('div');
		this.boxMain.style.cssText = 'position: absolute;top: 50%;left: 59%;z-index: 3;transform: translate(-50%,-50%);background: #fff;border-radius: 2px;padding:20px 40px;box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);border: 4px solid #f89002;text-align: center;border-radius: 4px;';
		this.box.appendChild(this.boxMain);
		this.icon = document.createElement('div');
		this.icon.style.cssText = 'width: 40px;height: 40px;border-radius: 50px;line-height: 40px;color: #fff;text-align: center;position: relative;flex-shrink: 0;background-color: #f89002;border: 4px solid #ffd07a;margin: 0 auto;font-family: iconfont;margin-bottom: 6px;';
		this.boxMain.appendChild(this.icon);
		this.textBox = document.createElement('p');
		this.boxMain.appendChild(this.textBox);
		this.hide();
	},
	warn:function(msg){
		this.MsgShow();
		this.icon.innerHTML = '&#xe6c1';
		this.textBox.style.color = 'rgb(248, 144, 2)';
		this.icon.style.fontSize = '20px';
		this.icon.style.lineHeight = '35px';
		this.icon.innerHTML = '!';
		this.textBox.innerText = msg;
	},
	success:function(msg){
		this.MsgShow();
		this.boxMain.style.border = '4px solid #1fce11';
		this.textBox.style.color = '#1fce11';
		this.icon.style.backgroundColor = '#1fce11';
		this.icon.style.border = '4px solid #63ea58';
		this.icon.style.fontSize = '20px';
		this.icon.style.lineHeight = '35px';
		this.icon.innerHTML = '&#xe6c1';
		this.textBox.innerText = msg;
	},
	error:function(msg){
		this.MsgShow();
		this.boxMain.style.border = '4px solid #e20000';
		this.textBox.style.color = '#e20000';
		this.icon.style.backgroundColor = '#e20000';
		this.icon.style.border = '4px solid rgb(255, 125, 125)';
		this.icon.style.fontSize = '20px';
		this.icon.style.lineHeight = '32px';
		this.icon.innerHTML = '&#xe603;';
		this.textBox.innerText = msg;
	},
	hide:function(){
		this.back.onclick = function(){
			this.parentNode.style.display = 'none';
		}
	},
	MsgShow:function(){
		var that =this;
		that.box.style.display = 'block';
		setTimeout(function(){that.box.style.display = 'none';}, 4000);
	}
};
var ot = new Msg();