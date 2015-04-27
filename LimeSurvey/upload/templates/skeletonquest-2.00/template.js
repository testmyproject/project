/*  This file is part of Lime Survey Template : SkeletonQuest

  Copyright (C) 2010-2013 Denis Chenu for http://sondages.pro
  Distributed under GPL 3 licence
  Distributed under MIT licence
  Inspiration by Skeleton V1.1, Copyright 2011, Dave Gamache, http://www.getskeleton.com under open-source MIT license
  Inspiration by Spip-dist http://www.spip.net/ , Collectif SPIP distributed under GPL licence
  Inspiration by THE CSS NINJA http://cssn.in/ja/023, Ryan Seddon
  Inspiration by Bootstrap http://getbootstrap.com/ under Apache License.
  Inspiration by jquery mobile http://jquerymobile.com/ under Dual licensed under the MIT or GPL Version 2 licenses.
  Tango Icon Project http://tango.freedesktop.org/ distributed under Public Domain
*/


// Uncomment this part to replace default alert
function alert(text) {
	jalert(text);
}
$(document).ready(function(){
	//moveLanguageChanger();
	hovercolumn();
	tableinput();
	movePrevButton();
	// Opera mini labelling touch
	operamini = window.operamini && ({}).toString.call( window.operamini ) === "[object OperaMini]";
	if(operamini){
		$('label > input:checkbox, label > input:radio, input:radio + label, input:checkbox + label').bind('click', function(){
		});
	}
})

function navbuttonsJqueryUi(){
    // Just deactivate default jquery-ui button
    $("#movenextbtn").append(" <i class='ui-icon ui-icon-arrowthick-1-e'>   </i>");
    $("#moveprevbtn").prepend("<i class='ui-icon ui-icon-arrowthick-1-w'>   </i> ");
    $("#movesubmitbtn").append(" <i class='ui-icon ui-icon-arrowthickstop-1-s'>   </i>");
}

// Replace common alert with jquery-ui dialog
function jalert(text) {
	var $dialog = $('<div></div>')
		.html(text)
		.dialog({
			title: '',
			dialogClass: 'alert',
			buttons: { "Ok": function() { $(this).dialog("close"); } },
			modal: true
		});
	$dialog.dialog('open');
}

/* Adapt column hover */
function hovercolumn(){
    $(".question-wrapper:not(.array-flexible-duel-scale) .answers-wrapper table.question").delegate('td','mouseover mouseleave', function(e) {
        if (e.type == 'mouseover') {
          $(this).closest("table.question").find("col").eq($(this).index()).addClass("hover");
          $(this).closest("table.question").find("thead tr").children().eq($(this).index()).addClass("hover");
        }
        else {
          $(this).closest("table.question").find("col").eq($(this).index()).removeClass("hover");
          $(this).closest("table.question").find("thead tr").children().eq($(this).index()).removeClass("hover");
        }
    });
    $(".array-flexible-duel-scale .answers-wrapper table.question").delegate('td','mouseover mouseleave', function(e) {
        if (e.type == 'mouseover') {
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
    $(".question-wrapper:not(.array-flexible-duel-scale) .answers-wrapper table.question").delegate('input','focusin focusout', function(e) {
        activeindex=$(this).parents('td').index();
        if (e.type == 'focusin') {
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
function moveLanguageChanger(){
	if($("#languageselect-wrapper").text()){
		offset=$("#languageselect-wrapper").offset();
		$("#languageselect-wrapper").css("float",'rigth').css('margin-top','-'+(offset.top)+'px')
	}
}

/* Fire event hide and show for "Expression Manager" hide/show */
jQuery(function($) {
    var _oldShow = $.fn.show;
    $.fn.show = function(speed, oldCallback) {
        return $(this).each(function() {
        var obj = $(this),
        newShowCallback = function() {
            //console.log('afterShow');
            obj.trigger('afterShow');
        };
        obj.trigger('beforeShow');
        _oldShow.apply(obj, [speed, newShowCallback]);
        });
    }
    var _oldHide = $.fn.hide;
    $.fn.hide = function(speed, oldCallback) {
        return $(this).each(function() {
        var obj = $(this),
        newHideCallback = function(obj) {
            if ($.isFunction(oldCallback)) {
              oldCallback.apply(obj);
            }
            //console.log('afterHide');
            obj.trigger('afterHide');
        };
        obj.trigger('beforeHide');
        _oldHide.apply(obj, [speed, newHideCallback]);
        });
    }
});
