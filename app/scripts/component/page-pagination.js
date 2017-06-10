
		 $.fn.pagination = function(options){
			 (options&&typeof(options)=="object")?(options.$element=$(this)):(options={$element:$(this)});
			 return new Pagination(options);	 
		 }


		 function Pagination(options){
			 
			    defaults = {
					url : "",                                   //查询地址
					data: "",                                   //参数数据
					page: 1,                                    //当前页数
					total: 1,                                   //总页数
					theme: "lightBlue-theme",                   //主题肤色
					direction: "page-right",                    //分页控件对齐方向
					language: "cn",                             //语言类型
					test: false,                                //仅在本地测试时启用
					callback: function() { return },            //回调函数
					prompt_Info: function(){ return },          //提示框-信息
					prompt_Success: function(){ return },       //提示框-成功
					prompt_Error: function(){ return }          //提示框-失败
			    }
			    
			    this.options = $.extend({},defaults,options);

			    this._init();
			    
		 } 
		 
		 
		 
		 Pagination.prototype={
		
				 _init:function(){
					 this._ajax(this);
					 this._bindEvent(this);
				 },
				 
				 _ajax:function(that){

					 $.ajax({
						 url : that.options.url,
						 data : that.options.data,
						 type : "post",
						 dataType : 'json',
						 success : function(data) { 
							 if(data.success){
								 that.options.total = data.msg*1;
								 that.options.page=that.options.page>that.options.total?that.options.total:that.options.page;
								 that._bulidHtml();
								 that.options.callback(data.obj);
								 that.options.prompt_Success();
							 }else{
								 that.options.prompt_Info();
							 }
						 },
						 error: function(){
						 	if(that.options.test){
								that.options.page=that.options.page>that.options.total?that.options.total:that.options.page;
								that._bulidHtml();
							}
							else{
								that.options.prompt_Error();
							}
						 }
					 });
				 },
				 
				 _bulidHtml:function(){

					 this._removeHtml();

					 var ul = '<ul zzPagination="pages"></ul>';
					 var li_btn = '<li zzPagination="page"><a href="" zzPagination="btn jumpBtn"></a></li>';
					 var li_ellipsis = '<li zzPagination="page"><a zzPagination="ellipsis">...</a></li>';
					 var li_searchInput = '<li zzPagination="page"><input type="text" zzPagination="btn searchInput" value="1" tempValue="1"></li>';
					 var li_searchBtn = '<li zzPagination="page"><a zzPagination="btn searchBtn"></a></li>';

					 var $ul = $(ul);
					 this.options.$element.append($ul);
		             this.options.$element.find($ul).addPagination(this.options.theme+" "+this.options.direction);
					 var $li_btn = $(li_btn);
		             $li_btn.find("a").attr("href","#prev");
		             if(this.options.language=="cn")$li_btn.find("a").text("上一页");
					 if(this.options.language=="en")$li_btn.find("a").text("Prev");
		             this.options.$element.find($ul).append($li_btn);

		             if(this.options.total<13){
		            	 for(var i=0;i<this.options.total;i++){
		            		 var $li_btn = $(li_btn);
		            		 $li_btn.find("a").attr("href","#"+(i+1));
				             $li_btn.find("a").text(i+1);
				             this.options.$element.find($ul).append($li_btn);
		            	 }
		             }else{
		            	 if(this.options.page<7){
			            	 for(var i=0;i<8;i++){
			            		 var $li_btn = $(li_btn);
			            		 $li_btn.find("a").attr("href","#"+(i+1));
					             $li_btn.find("a").text(i+1);
					             this.options.$element.find($ul).append($li_btn);
			            	 }
				             this.options.$element.find($ul).append(li_ellipsis);
				             this.options.$element.find($ul).append('<li zzPagination="page"><a href="#'+(this.options.total-1)+'" zzPagination="btn jumpBtn">'+(this.options.total-1)+'</a></li>');
				             this.options.$element.find($ul).append('<li zzPagination="page"><a href="#'+this.options.total+'" zzPagination="btn jumpBtn">'+this.options.total+'</a></li>');
		            	 }
		            	 else if(this.options.page>this.options.total-6){
				             this.options.$element.find($ul).append('<li zzPagination="page"><a href="#1" zzPagination="btn jumpBtn">1</a></li>');
				             this.options.$element.find($ul).append('<li zzPagination="page"><a href="#2" zzPagination="btn jumpBtn">2</a></li>');
				             this.options.$element.find($ul).append(li_ellipsis);
				             for(var i=this.options.total-8;i<this.options.total;i++){
			            		 var $li_btn = $(li_btn);
			            		 $li_btn.find("a").attr("href","#"+(i+1));
					             $li_btn.find("a").text(i+1);
					             this.options.$element.find($ul).append($li_btn);
				             }
		            	 }
		            	 else{
				             this.options.$element.find($ul).append('<li zzPagination="page"><a href="#1" zzPagination="btn jumpBtn">1</a></li>');
				             this.options.$element.find($ul).append('<li zzPagination="page"><a href="#2" zzPagination="btn jumpBtn">2</a></li>');
				             this.options.$element.find($ul).append(li_ellipsis);
				             for(var i=this.options.page-3;i<this.options.page+2;i++){
			            		 var $li_btn = $(li_btn);
			            		 $li_btn.find("a").attr("href","#"+(i+1));
					             $li_btn.find("a").text(i+1);
					             this.options.$element.find($ul).append($li_btn);
				             }
							 this.options.$element.find($ul).append(li_ellipsis);
							 this.options.$element.find($ul).append('<li zzPagination="page"><a href="#'+(this.options.total-1)+'" zzPagination="btn jumpBtn">'+(this.options.total-1)+'</a></li>');
							 this.options.$element.find($ul).append('<li zzPagination="page"><a href="#'+this.options.total+'" zzPagination="btn jumpBtn">'+this.options.total+'</a></li>');
		            	 }
		             }

					 var $li_btn = $(li_btn);
					 $li_btn.find("a").attr("href","#next");
					 if(this.options.language=="cn")$li_btn.find("a").text("下一页");
					 if(this.options.language=="en")$li_btn.find("a").text("Next");
					 this.options.$element.find($ul).append($li_btn);

		             if(this.options.page==1)this.options.$element.find("a[href='#prev']").parent().addPagination("active");
		             if(this.options.page==this.options.total)this.options.$element.find("a[href='#next']").parent().addPagination("active");
		             this.options.$element.find("a[href='#"+this.options.page+"']").parent().addPagination("active");

					 var $li_searchInput = $(li_searchInput);
					 var $li_searchBtn = $(li_searchBtn);
					 $li_searchInput.find("[zzPagination~='searchInput']").val(this.options.page);
					 $li_searchInput.find("[zzPagination~='searchInput']").attr("tempValue",this.options.page);
					 if(this.options.language=="cn")$li_searchBtn.find("[zzPagination~='searchBtn']").text("跳转");
					 if(this.options.language=="en")$li_searchBtn.find("[zzPagination~='searchBtn']").text("GO");
					 this.options.$element.find($ul).append($li_searchInput);
					 this.options.$element.find($ul).append($li_searchBtn);

				 },

			     _removeHtml:function(){
					 this.options.$element.html("");
				 },

				 _bindEvent:function(that){

					 that._unBindEvent(that);

					 that.options.$element.on("input","[zzpagination~='searchInput']",function(){
						 var temp
						 temp = $(this).val()?$(this).val().replace(/\D+/gi,""):"";
						 if(temp!=""&&temp<1)temp=1;
						 if(temp!=""&&temp>that.options.total)temp=that.options.total;
						 $(this).val(temp);
					 })
					 that.options.$element.on("blur touchend","[zzpagination~='searchInput']",function(){
						 var temp
						 temp = $(this).val()?$(this).val().replace(/\D+/gi,""):"";
						 if(temp=="")temp=$(this).attr("tempValue")*1;
						 if(temp!=""&&temp<1)temp=1;
						 if(temp!=""&&temp>that.options.total)temp=that.options.total;
						 $(this).attr("tempValue",temp);
						 $(this).val(temp);
					 })
					 that.options.$element.on("click touchstart",":not([zzpagination~='active'])>[zzpagination~='jumpBtn']",function(){
					 	 var temp = that.options.$element.find("[zzpagination~='active']>[zzpagination~='jumpBtn'][href!='#prev'][href!='#next']").attr("href");
						 if(!temp||!$(this).attr("href"))return;
						 var index = temp.replace("#","")*1;
						 if($(this).attr("href")=="#prev") 
						 {
							 that.options.data.page = index - 1;
							 that.options.page = index - 1;
						 }
						 else if($(this).attr("href")=="#next") {
							 that.options.data.page = index + 1;
							 that.options.page = index + 1;
						 }else {
							 that.options.data.page = $(this).attr("href").replace("#","")*1;
							 that.options.page = $(this).attr("href").replace("#","")*1;
						 }
						 that._ajax(that);
					 })
					 that.options.$element.on("click touchstart","[zzpagination~='searchBtn']",function(){
						 var temp = that.options.$element.find("[zzpagination~='active']>[zzpagination~='jumpBtn'][href!='#prev'][href!='#next']").attr("href");
					     if(!temp)return;
						 var index = temp.replace("#","")*1;
						 that.options.data.page = that.options.$element.find("[zzpagination~='searchInput']").val()*1;
						 that.options.page = that.options.$element.find("[zzpagination~='searchInput']").val()*1;
						 if(index == that.options.data.page)return;
						 that._ajax(that);
					 })

				 },

				 _unBindEvent:function(that){
					 that.options.$element.off("input","[zzpagination~='searchInput']");
					 that.options.$element.off("blur touchend","[zzpagination~='searchInput']");
					 that.options.$element.off("click touchstart",":not([zzpagination~='active'])>[zzpagination~='jumpBtn']");
					 that.options.$element.off("click touchstart","[zzpagination~='searchBtn']")
				 },
			
		 }
 
		 
		 
   /* ------------------------自定义属性的相关工具方法 ------------------------------ */
			 
			 //判断
			 $.fn.hasPagination = function(types){
				 if(types==undefined){
					 return false;
				 }
				 var type = types.trim().split(/\s+/);
				 for(var i in type){
					 if(this.filter("[zzPagination~="+type[i]+"]").length==0)return false;
				 }
				 return true;
			 };
			 //添加
			 $.fn.addPagination = function(types){
				 if(types==undefined){
					 return;
				 }
				 var type = types.trim().split(/\s+/);
				 for(var i in type){
				    if(this.hasPagination(type[i]))return;
				    var temp;
				    temp=this.attr("zzPagination")?this.attr("zzPagination").trim():null;
				    temp?this.attr("zzPagination",temp+" "+type[i].trim()):this.attr("zzPagination",type[i].trim()); 
				 } 
			 };
			 //移除
			 $.fn.removePagination = function(types){
				 if(types==undefined){
					 return;
				 }
				 var type = types.trim().split(/\s+/);
				 for(var i in type){
				    if(!this.hasPagination(type[i]))return;
				    var temp;
				    var regexp = new RegExp("^"+type[i].trim()+"$|^"+type[i].trim()+"\\s+|\\s+"+type[i].trim()+"$|\\s+"+type[i].trim()+"(?=\\s+)","gi");
				    temp=this.attr("zzPagination").trim().replace(regexp,"");
				    temp&&temp.trim()?this.attr("zzPagination",temp):this.removeAttr("zzPagination"); 
				 } 
			 }
			 

		
		 
		 
		 
		 
		 