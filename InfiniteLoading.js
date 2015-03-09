//
//  InfiniteLoading.js
//  InfiniteLoading for Movable Type
//
//  Created by isloop on 2015/03/09.
//  Copyright (c) @isloop. All rights reserved.
//

$(function(){

	const LIMIT       = 30;	                       //読み込むエントリー数
	const MT_PATH     = "http://hoge.com/mt/";     //mt.cgiのあるURL
	const LOADING_DIV = "#nowloading";             //ローディングを表示するdivのid名
	const APPEND_DIV  = "#recentPart";             //生成したHTMLを追加するdivのid名
	const SCRIPT_ID   = "#loading";                //スクリプトのid名

	var mode 	= $(SCRIPT_ID).data('mode');
	var style 	= $(SCRIPT_ID).data('style');
	var page 	= 1;
	var max 	= 0;
	var fire	= false;

	$(LOADING_DIV).fadeOut("fast");

	$(window).on("scroll" , function(){
		var bottomPos = 100;
		var scrollHeight = $(document).height();
		var scrollPosition = $(window).height() + $(window).scrollTop();

		if (scrollPosition > scrollHeight - bottomPos){
			$(LOADING_DIV).fadeIn("fast");
			if (max >= ((LIMIT * page) - LIMIT && fire == true
				|| max == 0 && page == 1 && fire == false){
				fire = false;
				console.log('loading...');
				getDataAPI();
				page++;
			}
			else if (max < ((page*LIMIT) - LIMIT) && max > 0) {
				console.log('end');
				$(LOADING_DIV).remove();
			}
		}
	});

	function getDataAPI(){
		$.ajax({
			type: "GET",
			url: choiceURL(mode),
			dataType: 'json',
			success: function(res){
				appendHTML(res);
				$(LOADING_DIV).fadeOut();
			},
			error:function(){console.log('Error...');},
			complete:function(){fire = true;}
		});
	}

	function appendHTML(res){
		max = res.totalResults;
		for (var i = 0; i < res.items.length; i++) {
			var image = imageURLFromStr(res.items[i].body)
			var date = dateFromStr(res.items[i].createdDate);
			if (style == "mobile") {
				html = mobileStyle(res.items[i],image,date);
			}
			else {
				html = pcStyle(res.items[i],image,date);
			}
			$(APPEND_DIV).append(html);
		}
	}

	function choiceURL(mode){
		var uri = new String();
		if (mode == "category") {
			var categoryid = $(SCRIPT_ID).data('categoryid');
			uri = MT_PATH + "mt-data-api.cgi/v2/sites/2/categories/" + categoryid + "/entries?limit=" + LIMIT + '&offset=' + page*LIMIT;
		}
		else {
			uri = MT_PATH + "mt-data-api.cgi/v2/sites/2/entries?limit=" + LIMIT + '&offset=' + page * LIMIT;
		}
		console.log(uri);
		return uri;
	}

	function mobileStyle(res,image,date) {
		var html = new String();
		html   = "<li>";
		html += 	"<span class=\"entryList\">"
		html += 		"<a href=\"" + res.permalink + "\">";
		html +=				"<span class=\"index-list-img\">"
		html += 				"<img alt=\"" + res.title + "\" src=\"" + image + "\" width=\"75\" height=\"75\" class=\"thumbImg\" />";
		html +=				"</span>";
		html += 			"<span class=\"index-list-title\">";
		html +=					"<small class=\"updateDate\">" + date + "</small><br />";
		html += 				res.title;
		html +=				"</span>"
		html +=			"</a>";
		html +=			"<br style=\"clear:both;\" />"
		html += 	"</span>";
		html += "</li>";
		return html;
	}

	function pcStyle(res,image,date) {
		var html = new String();
		html   = "<section class=\"recentCapsule\">";
		html += 	"<div class=\"thumbnailBody\">"
		html += 		"<a href=" + res.permalink + " class=\"topPageListThumbLink\">";
		html += 			"<img alt=\"" + res.title + "\" src=\"" + image + "\" />";
		html += 		"</a>";
		html += 	"</div>";
		html += 	"<h2 class=\"indexTitle\">"
		html += 		"<a href=\"" + res.permalink + "\">"
		html +=				"<span class=\"indexTitleInr\">"
		html += 				res.title;
		html +=				"</span>"
		html +=			"</a>";
		html +=			"<time class=\"updateDate\" datetime=\"" + res.createdDate + "\">";
		html +=				date;
		html +=			"</time>";
		html += 	"</h2>";
		html += "</section>";
		return html;
	}

	function dateFromStr(str){
		var dateFromStr = Date.parse(str);
		var date = new Date(dateFromStr);
		var year = date.getFullYear();
		var month = ("0" + (date.getMonth()+1)).slice(-2);
		var day = ("0" + date.getDate()).slice(-2);
		var dateStr = year + "." + month + "." + day + ".";
		return dateStr;
	}

	function imageURLFromStr(str){
		matches = str.match(/http[s]?\:\/\/[\w\+\$\;\?\.\%\,\!\#\~\*\/\:\@\&\\\=\_\-]+/g);
		var images = new Array;
		$.each(matches, function() {
			if(this != ''){
				if(this.match(/.jpg|.png|.gif|.jpeg|.JPG|.GIF|.PNG|.JPEG/)){
				    images.push(this);
				}
			}
		});
		return images[0];
	}
});
