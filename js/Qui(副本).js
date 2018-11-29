(function($){
	function DataList(ele){
		this.ele = ele;
		this.dataList = [];
	}
	DataList.prototype = {
		init:function(){
			
		},
		getList:function(options,data){
			this.options = {
				striped:options.striped,//隔行变色 boolean
				line:options.line||'odd',
				singleSelect:options.singleSelect,//boolean
				columns:options.columns//数组
			};
			var str = '';
			var me = this;
			var column = this.options.columns;
			var dataArr = [];
			me.ele.html('');
			if(column){
				str += "<div class=\"table_head_box\">";
				str += "<table class=\"tab_head\">";
				str += "<thead>";
				str += "<tr>";
				for(var i = 0,len=column.length;i<len;i++){
					for(var j = 0,len1=column[i].length;j<len1;j++){
						if(column[i][j].checkbox&&column[i][j].field==='ck'){
							str += '<th><input type="checkbox" name="" value="" id="Allck" /></th>';
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
				
				
				for(var i = 0,len2 = data.length;i<len2;i++){
					str += "<tr>";
					for(var m = 0,len=column.length;m<len;m++){
						for(var j = 0,len1=column[m].length;j<len1;j++){
							if(column[m][j].checkbox&&column[m][j].field==='ck'){
								str += '<td><input type="checkbox" name="" /></td>';
							}else if(column[m][j].field!=='ck'){
//								dataArr.push(column[m][j].field);
	//							str += "<td>"+column[i][j].field+"</td>";
								str += "<td>"+data[i][column[m][j].field]+"</td>";
							}
						}
					}
					str += "</tr>";
				}
				str += "</table>";
				str += "</div>";
				me.ele.append(str);
				me.getCheck(data);
//				console.log(dataArr);
				console.log(me.options.striped);
				var x_tr = me.ele.find('.table_body_box .tab_body_head tr');
				var thed_td = me.ele.find('.table_head_box .tab_head tr th');
				var tby_td = me.ele.find('.table_body_box .tab_body_head tr').eq(0).children();
//				console.log(thed_td)
				if(me.options.striped){
					me.discolor(x_tr,this.options.line);
				}
				tby_td.each(function(i,e){
					
					thed_td.eq(i).width($(e).width());
				});
				$(window).resize(function(){
					tby_td.each(function(i,e){
					
						thed_td.eq(i).width($(e).width());
					});
				});
			}
			
			
		},
		
		discolor:function(elName,sta){
			for(var i = 0;i<elName.length;i++){
				if(sta ==='odd'){
					
					if(i%2 !== 0){
//						elName[i].style.background = '#eee';
//						elName.eq(i).css('background','#eee');
						elName.eq(i).addClass('on');
					}
				}else if(sta ==='even'){
					if(i%2 === 0){
//						elName[i].style.background = '#eee';
//						elName.eq(i).css('background','#eee');
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
//			var tab = document.getElementById('q_table_id');
//			var tab_tr = tab.getElementsByTagName('tr');
//			var ipts = tab.getElementsByTagName('input');
//			var Allipt = document.getElementById('Allck');
			var checkArray = [];
			var dataList = [];
			var that = this;
			var count = 0;
			if(Allipt){
				for(var i = 0;i<ipts.length;i++){
//					if(ipts[i].type=='checkbox'){
//						checkArray.push(ipts[i]);
//					}
					if(ipts.eq(i).attr('type')=='checkbox'){
						checkArray.push(ipts.eq(i));
					}
				}
				
//				Allipt.onclick = function(){
//					console.log(this.checked);
//					if(this.checked){
//						for(var i = 0;i<checkArray.length;i++){
//							checkArray[i].checked = true;
//							tab_tr[i].flag = false;
//							tab_tr[i].classList.add('active');
//							dataList=list;
//						}
//						count = checkArray.length;
//					}else{
//						for(var i = 0;i<checkArray.length;i++){
//							checkArray[i].checked = false;
//							tab_tr[i].flag = true;
//							tab_tr[i].classList.remove('active');
//	//						dataList.push(list[i]);
//	//						dataList.splice(0);
//							dataList=[];
//						}
//						count = 0;
//					}
//					console.log(dataList);
//				}
				
				Allipt.click(function(){
					console.log($(this).prop('checked'));
					if($(this).prop('checked')){
						for(var i = 0;i<checkArray.length;i++){
							checkArray.eq(i).prop('checked',true);
							tab_tr.eq(i).prop('flag',true);
							tab_tr.eq(i).addClass('active');
							that.dataList=list;
						}
						count = checkArray.length;
					}else{
						for(var i = 0;i<checkArray.length;i++){
							checkArray.eq(i).prop('checked',false);
							tab_tr.eq(i).prop('flag',false);
							tab_tr.eq(i).removeClass('active');
							that.dataList=[];
						}
						count = 0;
					}
				});
				
//				for(let i = 0,len = tab_tr.length;i<len;i++){
//					tab_tr[i].index = i;
//					tab_tr[i].flag = true;
//					tab_tr[i].onclick = function(){
//						console.log(this);
//						if(this.flag){
//						
//							this.classList.add('active');
//							checkArray[this.index].checked = true;
//							count++;
//						
//						}else{
//							this.classList.remove('active');
//							checkArray[this.index].checked = false;
//							count--;
//						
//						}
//						this.flag = !this.flag;
//						if(this.classList.contains('active')){
//							dataList.push(list[this.index]);
//						}
//						else{
//							for(let j = 0,len2 = dataList.length;j<len2;j++){
//								if(list[i]===dataList[j]){
//									dataList.splice(j,1)
//								}
//							}
//						}
//					
//						if(count===checkArray.length){
//							Allipt.checked = true;
//						}else{
//							Allipt.checked = false;
//						}
//						console.log(dataList);
//					}
//				}
				
				for(let i = 0,len = tab_tr.length;i<len;i++){
					
					tab_tr.eq(i).attr('flag',true);
					tab_tr.eq(i).click(function(){
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
							that.dataList.push(list[$(this).index()]);
						}
						else{
							for(let j = 0,len2 = that.dataList.length;j<len2;j++){
								if(list[i]===that.dataList[j]){
									that.dataList.splice(j,1)
								}
							}
						}
					
						if(count===checkArray.length){
							Allipt.prop('checked',true);
						}else{
							Allipt.prop('checked',false);
						}
						console.log(that.dataList);
						dataList = that.dataList;
					});
					
				}
				
				
			}//判断allipt
			return dataList;
			
		},
		checkData:function(){
			return this.dataList;
		}
		
	}
	
	$.fn.datalist = function(){
		return new DataList($(this));
	}
	
})(jQuery);
