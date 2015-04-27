/*  This file is part of Lime Survey Template : SkeletonQuest

  Copyright (C) 2010-2014 Denis Chenu for http://sondages.pro
  Distributed under GPL 3 licence
  Distributed under MIT licence
  
  Inspiration by jquery mobile http://jquerymobile.com/ under Dual licensed under the MIT or GPL Version 2 licenses.
*/

// Some var to enable/disable some function
useDefaultProgress=false; // Use the default progress-wrapper from LimeSurvey core
replaceJavascriptAlert=true; // Replace common alert with jquery-ui dialog
bMoveLanguageSelect=true // Move the language selector to the top
//Update by kimi On 2014/12/23
bCloneNavigator=false // Clone the navigator in the header
bMoveIndex=true // Move index in a fixed box at rigth of the survey
bHeaderFixed=true; // Fix the header

window.onbeforeunload = function() { 
	$("body").removeClass("loaded").addClass("loading");
 };
disableEnterSubmit(); 
fixLabelClass(); 
$(document).ready(function(){
	removeBack();
	addScrollTop();
	fixSelectWidth();
	if(bMoveLanguageSelect || bCloneNavigator){$("<div class='tools cloned-tools' />").appendTo("#head .wrapper");}
	if(bCloneNavigator){cloneNavigator();}
	if(bMoveLanguageSelect){moveLanguageSelect();}
	if(bMoveLanguageSelect || bCloneNavigator){fixTitleWidth();}
	if(bHeaderFixed){headerFixed();}
	if(bMoveIndex){updateIndex();}
	hovercolumn();
	tableinput();
	movePrevButton();
	// Opera mini labelling touch
	operamini = window.operamini && ({}).toString.call( window.operamini ) === "[object OperaMini]";
	if(operamini){
		$('label > input:checkbox, label > input:radio, input:radio + label, input:checkbox + label').bind('click', function(){
		});
	}
	$("body").removeClass("loading").addClass("loaded");
})
/* Add a hash to the url to disallow previous on survey */
function removeBack(){
	window.location.hash="nbb";
	window.location.hash="";
	window.onhashchange=function(){window.location.hash="";}
}
function navbuttonsJqueryUi(){
	// Do our own button (not jquery default)
	$("#movenextbtn").wrapInner("<span class='btn-text ui-button-text' />").append(" <i class='btn-icon ui-icon ui-icon-arrowthick-1-e'>   </i>");
	$("#moveprevbtn").wrapInner("<span class='btn-text ui-button-text' />").prepend("<i class='btn-icon ui-icon ui-icon-arrowthick-1-w'>   </i> ");
	
	////disable by kimi on 2014/12/23
	$("#movesubmitbtn").wrapInner("<span class='btn-text ui-button-text' />").append(" <i class='btn-icon ui-icon ui-icon-arrowthickstop-1-s'>   </i>");
}
function disableEnterSubmit(){
	$(document).on('keypress','input[type=text],#limesurvey select',function(e){
		var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
		if (key == 13) {
			e.preventDefault();
			var inputs = $(this).closest('form').find(':input:visible:enabled,select:visible:enabled,textarea:visible:enabled,button:visible:enabled');
			if ((inputs.length-1) == inputs.index(this))
			{
				////Update by kimi On 2014/12/23
				$('#movenextbtn,#movesubmitbtn').focus();
				//$('#movenextbtn').focus();
			}
			else
				inputs.eq(inputs.index(this) + 1).focus();
		}
	});
}
function noScrollOnSelect()
{
	// Disable the default no scroll on select
}
/* Add a little icon with Scroll to top : /!\ no text put inaccessible */
function addScrollTop(){
	$("<a href='#' class='scrollToTop'>&nbsp;</a>").appendTo("body");
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});
	$('.scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},300);
		return false;
	});
}

/* Fix the max width for all option, for ip(hone|od|ad : add an empty optgroup */
function fixSelectWidth(){
	if (navigator.userAgent.match(/(ip(hone|od|ad))/i)) {
	$('select').each(function(){
		$(this).append("<optgroup label=''></optgroup>");
	});
	}
	$('p select,td select').each(function(){
		var selectwidth=$(this).innerWidth();
		$(this).find('option').outerWidth(selectwidth);
	});
	$( window ).resize(function() {
		$('p select,td select').each(function(){
			var selectwidth=$(this).innerWidth();
			$(this).find('option').outerWidth(selectwidth);
		});
	});
}

// Replace common alert with jquery-ui dialog
if(window.screen.availWidth > 600 && replaceJavascriptAlert){
	function alert(text) {
		var $dialog = $('<div></div>')
			.html(text)
			.dialog({
				title: '',
				dialogClass: 'alert',
				buttons: { "Ok": function() { $(this).dialog("close"); } },
				show: { effect: "highlight", duration: 800 },
				hide: {effect: "fade",duration: 500},
				modal: true
			});
		$dialog.dialog('open');
	}
}
/* Adapt column hover */
function hovercolumn(){
	$(document).on('mouseover mouseleave',':not(.array-flexible-duel-scale) table.question td',function(event){
		if (event.type == 'mouseover') {
		  $(this).closest("table.question").find("col").eq($(this).index()).addClass("hover");
		  $(this).closest("table.question").find("thead tr").children().eq($(this).index()).addClass("hover");
		}
		else {
		  $(this).closest("table.question").find("col").eq($(this).index()).removeClass("hover");
		  $(this).closest("table.question").find("thead tr").children().eq($(this).index()).removeClass("hover");
		}
	});
	$(document).on('mouseover mouseleave','.array-flexible-duel-scale table.question td',function(event){
		if (event.type == 'mouseover') {
		  $(this).closest("table.question").find("col").eq($(this).index()).addClass("hover");
		  $(this).closest("table.question").find("thead tr:not(.groups)").children().eq($(this).index()).addClass("hover");
		}
		else {
		  $(this).closest("table.question").find("col").eq($(this).index()).removeClass("hover");
		  $(this).closest("table.question").find("thead tr:not(.groups)").children().eq($(this).index()).removeClass("hover");
		}
	});
}
function tableinput(){
	$(document).on('focusin focusout','.array-flexible-duel-scale table.question input',function(event){
		activeindex=$(this).parents('td').index();
		if (event.type == 'focusin') {
		  $(this).closest("td").addClass("focus");
		  $(this).closest("tr").addClass("focus");
		  $(this).closest("table.question").find("col").eq(activeindex).addClass("focus");
		  $(this).closest("table.question").find("thead tr:not(.groups)").children().eq(activeindex).addClass("focus");
		}
		else {
		  $(this).closest("td").removeClass("focus");
		  $(this).closest("tr").removeClass("focus");
		  $(this).closest("table.question").find("col").eq(activeindex).removeClass("focus");
		  $(this).closest("table.question").find("thead tr:not(.groups)").children().eq(activeindex).removeClass("focus");
		}
	});
}
function movePrevButton(){
	if ((screen.width<440)) {
		$('#moveprevbtn').insertAfter('#movenextbtn');
		$('<br />').insertAfter('#movenextbtn');
	}
}
/* Clone the language selector (if exist) in the header*/
function moveLanguageSelect(){
	if($("#changelangbtn").length){
		$(document).on("change",".select-lang",function(){
			$("#lang").val($(this).val()).trigger('change');
		});
		var selectedLang=$("#lang").val();
		newLanguageMenu="<div class='menu-wrapper tool'>"
						+"<select class='select-lang'>"+$("#lang").html()+"</select></div>";
		$(newLanguageMenu).appendTo(".cloned-tools");
		$("#lang").addClass('tool-cloned');
	}
}
/* Fix the title width according to header tools */
function fixTitleWidth() {
	$("#head .pagetitle").width($("#head > .wrapper").width() - $("#head .cloned-tools").outerWidth() - 8);
	$( window ).resize(function() {
		$("#head .pagetitle").width($("#head > .wrapper").width() - $("#head .cloned-tools").outerWidth() - 8);
	});
}
/* Move the index (and accordion it) */
function updateIndex(){
	if($("#index").length){
		//$("#limesurvey").wrapInner("<div id='indexed' />");
		$("#index").appendTo("#content").wrap("<div class='aside aside-index' />");
		$("#content").addClass("with-aside");
		var mainOffset= $("#main").offset().top-$(window).scrollTop();
		minOffset=0+$(".head.affix").outerHeight();
		$("#index").css("top",Math.max(mainOffset,minOffset)+"px");
		$(window).on('scroll',function(){
			mainOffset= $("#main").offset().top-$(window).scrollTop();
			newOffset=Math.max(mainOffset,minOffset);
			$("#index").css("top",Math.max(mainOffset,minOffset)+"px");
		});
		$(document).on('click','#index :submit',function(){
			$(this).clone().removeAttr('id').appendTo("#limesurvey").click();
		});
		// Fix for ranking question type
		if(typeof doDragDropRank!="undefined" && $.isFunction( doDragDropRank )){
			$('.dragDropTable').each(function(){
				var bSameListHeigth=$(this).find(".dragDropChoiceList[style]").length;
				var bSameChoiceHeigth=$(this).find(".choice[style]").length;
				if(bSameListHeigth || bSameChoiceHeigth){
					$(this).find(".choice[style]").removeAttr('style');
					var qID=$(this).closest(".question-wrapper").data('qid');
					fixChoiceListHeight(qID,bSameChoiceHeigth,bSameListHeigth);
				}
			});
		}
//		$(document).on('click','#index .container',function(){
//			$(this).find('ol').toggle();
//		});
	accordionIndex();
	}
}
/* Set accordion to index */
function accordionIndex(){
  if( $('#index .container h3').length > 0 )
  {
	$('#index').addClass('accordion');
	$('#index .container h3').each(function(index){
	  $(this).addClass("grouptitle");
	  $(this).attr("id",'grouptitle-'+index);
	  $(this).after("<div class='group' id='groupindex-"+index+"'></div>");
	  $(this).nextUntil("h3",'.row').appendTo($("#groupindex-"+index))
	});
	// Don't find a good way to use .accordion() then redo it
	$("#index .container .current").closest(".group").addClass("current");
	thiscurrent=$("#index .container .group.current")
	currentindex=$("#index .container .group").index(thiscurrent);
	// Calculate heiht/maxheight
	maxheight=0;
	$("#index .container .group").each(function(){
	  if($(this).height()>maxheight){maxheight=$(this).height();}
	});

	//$("#index .container .group").height(maxheight);
	$("#index .container .group.current").addClass("active");
	$("#index .container .group:not(.current)").addClass("inactive");
	//$("<b class='more seemore ui-icon ui-icon-plus' />").prependTo(("#index .container h3"));
	$("#index .container h3").each(function(index){
		number=parseInt(index)+1;
		$("<i class='more seemore ui-icon ui-icon-plus'>"+number+"</i>").prependTo($(this));
	});
	$("#index .container .active").prev("h3").find(".more").toggleClass('seemore seeless').toggleClass('ui-icon-plus ui-icon-minus');
	$("#index .container .group:not(.active)").hide(0);
	//System to set haven't submit button moving
	containerheight=maxheight*1;
	$("#index .container h3").each(function(){
		containerheight+= $(this).outerHeight()*1;
	});
	$("#index .container > .row").each(function(){
		containerheight+= $(this).outerHeight()*1;
	});
	containerheight+= $("#index .container h2").outerHeight()*1;
	containerheight+=$("#index p.navigator").outerHeight()*1;
	containerheight+=40;// A 40px more 
//	$("#index .container").height(containerheight);
	$("#index .container").css('min-height', containerheight+'px');
	$("#content").css('min-height', containerheight+'px');
	$("#index .container h3").click(function(){
	  if(!$(this).next(".group").hasClass('active')){
		$("#index .container .group").slideUp(150);
		$(this).next(".group").slideDown(150);
		$("#index .container .group").removeClass('active');
		$(this).next(".group").addClass('active');
		$("#index .container h3 .more").removeClass('seeless ui-icon-minus').addClass('seemore ui-icon-plus');
		$(this).find('.more').removeClass('seemore ui-icon-plus').addClass('seeless ui-icon-minus');
		$("#index .toggleall").removeClass('seeless ui-icon-minus').addClass('seemore ui-icon-plus');
	  }else{
		$(this).next(".group").slideUp(150);
		$("#index .container h3 .more").removeClass('seeless ui-icon-minus').addClass('seemore ui-icon-plus');
		$(this).next(".group").removeClass('active');
		$("#index .toggleall").removeClass('seeless ui-icon-minus').addClass('seemore ui-icon-plus');
	  }
	});
	$("<div class='toggleall seemore ui-icon ui-icon-plus' />").prependTo("#index h2");
	$("#index h2").click(function(){
	  if($(this).find('.toggleall').hasClass("seemore")){
		$("#index .group").slideDown(150);
		$("#index .group").addClass('active');
		$('#index h3 .more').removeClass('seemore ui-icon-plus').addClass('seeless ui-icon-minus');
		$(this).find('.toggleall').removeClass('seemore ui-icon-plus').addClass('seeless ui-icon-minus');
	  }else{
		$("#index .group").slideUp(150);
		$("#index .group").removeClass('active');
		$('#index h3 .more').removeClass('seeless ui-icon-minus').addClass('seemore ui-icon-plus');
		$(this).find('.toggleall').removeClass('seeless ui-icon-minus').addClass('seemore ui-icon-plus');
	  }
	});
  }
}
/* Clone the navigator */
function cloneNavigator(){
	$(document).on('click','.navigator-clone :submit',function(event){
		event.preventDefault();
		var cloneOf=$(":submit[name='"+$(this).attr('value')+"']").filter(":first");
		$(cloneOf).removeProp('disabled').removeClass('disabled').click();
	});
	$("<div class='navigator-clone tool'/>").appendTo(".cloned-tools");
	$(".navigator button").each(function(){
		$(this).clone().removeAttr("id").removeAttr("name").removeAttr("accesskey").appendTo('.navigator-clone');
	});
}
/* Fix the header */
function headerFixed(){
	$("#head").wrap( "<div class='head affix'></div>" );;// Use same class than bootstrap
	
	if($("#completed").length==1)
	{
		if($(".pagesubtitle").length==1){
			$(".pagesubtitle").css("padding-top",$("#head").outerHeight());
		}else{
			$("#content").css("padding-top",$("#head").outerHeight());
		}
		$(".pagesubtitle")[0].innerHTML='';
	}
	else{
		
		if($(".pagesubtitle").length==1){
			$(".pagesubtitle").css("padding-top",$("#head").outerHeight());
		}else{
			$("#content").css("padding-top",$("#head").outerHeight());
		}
	}
}
/* Replace jquery ui progressbar */
if(!useDefaultProgress){
	jQuery(function($) {
		$.fn.progressbar = function(option) {
			return $(this).each(function() {
			var obj = $(this);
			if(typeof option.value== "number"){
				htmlProgress="<div class='progress-bar'><div class='progress-value' style='width:"+option.value+"%'>"+option.value+"%</div><div class='progress-over' />";
				position=0;
				for (i = 100; i > 0; i-=10)
				{
					htmlProgress+="<div class='progress-range range-"+i+"' style='right:"+position+"%'>"+i+"%</div>";
					position+=10;
				}
				htmlProgress+="</div>";
				$(this).parent().addClass("skeletonprogress");
				$(this).append(htmlProgress).addClass("skeletonprogress");
			}
			// Move preprogress
			txtPreprogress=$("#progress-wrapper > .hide").text();
			txtPreprogress=false;//comment to activate
			if(txtPreprogress){
				$(this).prepend("<div class='preprogress' style='float:left'>"+txtPreprogress+"</div>");
				$(this).find(".progress-bar").css("margin-left",$(this).find(".preprogress").outerWidth()+"px");
			}
			});
		}
	});
}
function fixLabelClass(){
	$(document).on('click','td.radio-item [type=radio]',function(){
		$('[type=radio][name="'+$(this).attr('name')+'"]').not(this).each(function(){
			$(this).closest('td').removeClass('checked');
		});
		$(this).closest('td').addClass('checked');
	});
	$(document).ready(function(){
		$('td.radio-item [type=radio][checked]').each(function(){
			$(this).closest('td').addClass('checked');
		});
	});
	$(document).on('click','td.checkbox-item',function(){
		if($(this).find("[type=checkbox]").is(':checked')){
			$(this).closest('td').addClass('checked');
		}else{
			$(this).closest('td').removeClass('checked');
		}
	});
	$(document).ready(function(){
		$('td.radio-item [type=radio][checked]').each(function(){
			$(this).closest('td').addClass('checked');
		});
	});
	$(document).ready(function(){
		$('td.checkbox-item [type=checkbox][checked]').each(function(){
			$(this).closest('td').addClass('checked');
		});
	});
	/* Move radio before label to have same HTML in list and in table */
	$(document).ready(function(){
		$('td.radio-item label + [type=radio]').each(function(){
			$(this).insertBefore($(this).prev('label'));
		});
	});
	$(document).on('blur focusout','li.other-item [type=text]',function(){
		if($(this).val()!=''){
			$(this).closest('li.other-item').addClass('checked');
		}else{
			$(this).closest('li.other-item').removeClass('checked');
		}
	});
	$(document).on('click','li.radio-item [type=radio]',function(){
		$(this).closest('ul').find('li.other-item').removeClass('checked');
	});
	$(document).on('click','li.other-item',function(){
		$(this).find("input[type=text]").focus();
	});
	$(document).on('click','td.checkbox-item,td.radio-item',function(){
		$(this).find("input[type=checkbox],input[type=radio]").focus();
	});
	$(document).ready(function(){
		$('li.other-item input[type=text][value!=""]').closest('li.other-item').addClass('checked');
	});
}
