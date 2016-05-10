
function css_browser_selector(u) { var ua = u.toLowerCase(), is = function (t) { return ua.indexOf(t) > -1 }, g = 'gecko', w = 'webkit', s = 'safari', o = 'opera', m = 'mobile', h = document.documentElement, b = [(!(/opera|webtv/i.test(ua)) && /msie\s(\d)/.test(ua)) ? ('ie ie' + RegExp.$1) : is('firefox/2') ? g + ' ff2' : is('firefox/3.5') ? g + ' ff3 ff3_5' : is('firefox/3.6') ? g + ' ff3 ff3_6' : is('firefox/3') ? g + ' ff3' : is('gecko/') ? g : is('opera') ? o + (/version\/(\d+)/.test(ua) ? ' ' + o + RegExp.$1 : (/opera(\s|\/)(\d+)/.test(ua) ? ' ' + o + RegExp.$2 : '')) : is('konqueror') ? 'konqueror' : is('blackberry') ? m + ' blackberry' : is('android') ? m + ' android' : is('chrome') ? w + ' chrome' : is('iron') ? w + ' iron' : is('applewebkit/') ? w + ' ' + s + (/version\/(\d+)/.test(ua) ? ' ' + s + RegExp.$1 : '') : is('mozilla/') ? g : '', is('j2me') ? m + ' j2me' : is('iphone') ? m + ' iphone' : is('ipod') ? m + ' ipod' : is('ipad') ? m + ' ipad' : is('mac') ? 'mac' : is('darwin') ? 'mac' : is('webtv') ? 'webtv' : is('win') ? 'win' + (is('windows nt 6.0') ? ' vista' : '') : is('freebsd') ? 'freebsd' : (is('x11') || is('linux')) ? 'linux' : '', 'js']; c = b.join(' '); h.className += ' ' + c; return c; }; css_browser_selector(navigator.userAgent);

var $ = jQuery;
var mouseOnSearch = false;
var site_culture;
var site_folder;
var download_ID;
var timer;
var directToOpenbook;

if (window.location.href.indexOf('application/help/contact.aspx')>-1){
	if (getURLParameter('culture') == null || getURLParameter('culture') == 'en-us' ){
 		window.location.href = 'http://www.etoro.com/support/'	
	}

}
 
var mobile_handler = function(){

	var obj = {};
	obj.getParameterByName = function(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	};
	obj.isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
		any:function(){
			return 	isMobile.Android() || isMobile.iOS()|| isMobile.Opera() || isMobile.Windows() || $(window).width() < 700 ?true:false;
		}
    };
	obj.get_qa = function(){
		var pid = obj.getParameterByName('pid');
		var c = obj.getParameterByName('c');
		var qs = '';
		if (pid && c){
			qs = '?pid='+pid+'&c='+c;
		}
		return qs;
	}
	obj.get_app_link = function(){
			var html = '';	
			var url = null;	
			var device = 'apple';
			var qs = obj.get_qa(); 
			if (obj.isMobile.iOS()){
				url = (qs == ''?'http://m.onelink.me/69c5bed':'http://app.appsflyer.com/id674984916'+qs);
			}
			if (obj.isMobile.Android()){
				url = 'http://app.appsflyer.com/com.etoro.openbook'+qs;
				device = 'android';
			}
			if (url){
				html = '<div class="mobile_link '+device+'"><a href="'+url+'"></a></div>';	
			}
			return html;
			 
	}
	obj.append = function(){
		$(obj.get_app_link()).appendTo('body');	
	}
	return obj;
	
}()
// ajax
function postAJAX(requestUrl, requestData, callbackFunction) {
    if(jQuery.browser.msie && window.XDomainRequest)  {
		 
        // ajax Request for IE 
        xdr = new XDomainRequest(); 
        
        if (typeof callbackFunction != 'undefined') {
            
            xdr.onload = function() {
                var parsedData = $.parseJSON(xdr.responseText);
                callbackFunction(parsedData);
            }
        }

        xdr.open("POST", requestUrl);
       // xdr.contentType = "text/plain";
        
        var normalizedData = $.param(requestData);
        xdr.send(normalizedData);
        }
    else {
		 
        // ajax Request for all browsers except IE
        $.ajax({ type: 'POST', dataType: 'json', url: requestUrl, data: requestData, cache: false, async: true, global: false, success: function(data) {
            if (typeof callbackFunction != 'undefined') {
                callbackFunction(data);
            }
        }});
    }
}

	// A Fix for IE8-9 Cross Domain Problem
	

function getAJAX(url, type, callback) {

    var xmlhttp;
    var callbackFunction = callback;

    if (window.XDomainRequest) {



        xmlhttp = new XDomainRequest();

        xmlhttp.onprogress = function () { };
        xmlhttp.ontimeout = function () { };
        xmlhttp.onerror = function (err) { };
        xmlhttp.onload = function () {

            if (type == 'xml') {

                callbackFunction($.parseXML(xmlhttp.responseText));

            } else if (type == 'json') {
                callbackFunction($.parseJSON(xmlhttp.responseText));

            } else {
                callbackFunction(xmlhttp.responseText);
            }


        };



    } else if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (type == 'xml') {
                callbackFunction($.parseXML(xmlhttp.responseText));
            } else if (type == 'json') {
                callbackFunction($.parseJSON(xmlhttp.responseText));
            } else {
                callbackFunction(xmlhttp.responseText);
            }
        }

    }

    xmlhttp.open("GET", url, true);

    setTimeout(function () {
        xmlhttp.send();
    }, 0);



}


function loadRegistrationForm(){

	if (typeof jQuery == 'undefined'){
		//console.log("typeof jQuery == 'undefined'");
		setTimeout('loadRegistrationForm()',250);	
	}
	else{
		//console.log("jQuery IS 'defined!!!!!!'");
		
		
		
			 
				try {
					new regForm({
					formCulture: site_culture,
					funnelFromID: 12,
					downloadID: download_ID,
					trigger:'a[rel="register"], div[rel="register"], button[rel="register"], .button a.openFormReg'
					});
				} catch(e) {
					//console.log("regForm == 'undefined'");
					setTimeout('loadRegistrationForm()',250);
				}
			 
			
	}
	 
}

// STRAT onload main function (necessary for the embedded)   
function onloadMainFunction (){
//console.log('onloadMainFunction START');

// menu
	
		jQuery("#main-menu li.menu-item.languages ul li."+site_culture).remove();
		var maxColumnHeight;
		var columnArray = new Array;
		jQuery("#main-menu li.more  .sub-menu .column").each(function () {
			columnArray.push( jQuery(this).height() );
	 
			maxColumnHeight = Math.max.apply( Math, columnArray );
			if ( jQuery(this).height() < maxColumnHeight){
				jQuery(this).find('li.gap').height(maxColumnHeight-jQuery(this).height() -10);
			}
		});
		
		 // login box 
	mobile_handler.append();
    var sub_m_toolTipHeight = jQuery(".limited .sub-m-toolTip .sub-m-toolTipContent").height()+14;
    jQuery(".limited .sub-m-toolTip").css({
        'top': -((sub_m_toolTipHeight / 2)-14)
    });
    jQuery(".limited .sub-m-toolTip .sub-m-toolTipArrow").css({
        'margin-top': -((sub_m_toolTipHeight / 2) * -1)
    });
    jQuery(".limited .sub-m-toolTip").css({
        'display': 'none',
        'opacity': 1
    });
    jQuery("#main-menu li.sign-in").removeClass('loading');
	jQuery("#main-menu li.sign-in div.login-box .login-footer .limited .limitedTxt").mouseenter(function () {
          jQuery("#main-menu li.sign-in div.login-box .login-footer .limited .sub-m-toolTip").show();
    });
    jQuery("#main-menu li.sign-in div.login-box .login-footer .limited .limitedTxt").mouseleave(function () {
         jQuery("#main-menu li.sign-in div.login-box .login-footer .limited .sub-m-toolTip").hide();
    });
	


 		jQuery("#main-menu").addClass('done');
		jQuery("#main-menu li.more .sub-menu").css({'display':'none','opacity':'1'});
	//-------------   Login  ------------------//
	
	// Cross-Browser Support for HTML5 Placeholder
		jQuery("#main-menu label").inFieldLabels();
	  
	// onload, check if input contains value, if so - hide label
	if ( jQuery("#main-menu .login-box form .row input").val() != ""){
		jQuery(this).parent('.row').find('label').hide();
	}
	  
	jQuery('#main-menu button.login-button').click(function(e) {
		var formName = jQuery(this).attr("name");
		var formParent = jQuery("#"+formName);
 
		jQuery(".errorConteiner .missingFields, .errorConteiner .loginFailed, .errorConteiner .valid").hide();
		e.preventDefault();
		var login_form = jQuery(formParent);
		
		var username = jQuery('input[type="text"]', login_form).val();
		var password = jQuery('input[type="password"]', login_form).val();
		
		if ( username == "" || password == ""){
			jQuery(formParent).parent('div').find(".errorConteiner .missingFields").css({'display':'inline-block'});
		}
		else if (username.indexOf(" ") != -1 ||password.indexOf(" ") != -1 ){
			
			jQuery(formParent).parent('div').find(".errorConteiner .text.valid").css({'display':'inline-block'});
		}
		else {
		// Send User's Information
		jQuery(formParent).find("button").hide();
		postAJAX('https://www.etoro.com/en/wp-content/themes/etoro/assets/login/openbookLogin.php', { username: username , password: password }, 																				                 function(data) {
					if (data.IsLoggedIn == true) {
						// Logged In Successfully
						jQuery(formParent).find("button").show();
						var token = data.Token;
						var html = '<form method="post" action="https://openbook.etoro.com/LoginByToken?ApplicationName=etoro_inner_login" id="login-action"><input type="hidden" value="' +token+ '" name="token"/></form>';
						jQuery('body').append(html);
						jQuery('#login-action').submit();
						jQuery(formParent).find("button").hide();
					} else {
						jQuery(formParent).find("button").show();
						// Not Logged
						jQuery(formParent).parent('div').find(".errorConteiner .loginFailed").css({'display':'inline-block'});
					}
		});
		}
		 
	});
	
	// submit button effect
	 jQuery(".submitRow button, .activeButton, .floatHeaderWrapper .left .button a.openFormReg, .mainButtonConteiner a, .sub-menu .more-bottom a.more-button, a.activable").mouseup(function () {
		jQuery(this).removeClass('active');
	}).mousedown(function () {
		jQuery(this).addClass('active');
	 }).mouseleave(function () {
		jQuery(this).removeClass('active');
	});
	
	// temp solution for ie
	$('.ie #main-menu li.sign-in div.login-box').remove();
	$('.ie .sign-up a.top-link').attr('href','https://openbook.etoro.com');

	
    var mouseoverOnMenu = false;
 
	
	$("body").on("mouseenter", 'html:not(.mobile) .menu-item.drop-down', function(e) {
        mouseoverOnMenu = true;
        $(this).addClass('open');
    });
	$("body").on("mouseleave", 'html:not(.mobile) .menu-item.drop-down', function(e) {
        mouseoverOnMenu = false;
        $(this).removeClass('open');
    });
	
	$("body").on("click", '.mobile  .menu-item.drop-down', function(e) {
		// console.log(e);
		 if (e.target.className!='close'){
 			$(this).toggleClass('open');
		 }
		 
		 $(document).bind('click touchstart', function(e) {
                  if (($(e.target).hasClass("menu-item") || $(e.target).parents('li').hasClass('menu-item'))){
                    
                  }else{
                    $('.mobile  .menu-item.drop-down').removeClass("open");
                    $(document).unbind('click touchstart');
                  }
   		 });
    });
 
	$("body").on("click", '.mobile  .mobileArea .close', function(e) {
		 $(this).parents('.menu-item.drop-down').removeClass('open');
    });
	
	var footer_links = $('#main-menu li.more .sub-menu').html();
	$('<div class="footer_mobile">'+footer_links+'</div>').insertBefore( ".newFooter:eq(0)" );
	
	/* search box */
	
jQuery(".searchBox .searchButton").click(function () {
	/*var query = jQuery(".searchBox input").val();
	window.location.href = "http://www.etoro.com/search/?q=" + query + "&culture=" + site_culture + "&site_folder=" + site_folder;*/

});	

 jQuery(".searchBox").mouseenter(function() {
        mouseOnSearch = true;
    }).mouseleave(function() {
        mouseOnSearch = false;
    
    });
	
	 jQuery(".searchBox input").focus(function () {
        $(this).parents('.searchBox').addClass('focus');
	 });
	 jQuery(".searchBox").focusout(function () {
        $(this).removeClass('focus');
	});
	
 

jQuery('.searchBox input').keypress(function (e) {
	code = e.keyCode ? e.keyCode : e.which;
	if (code.toString() == 13) {
		jQuery('.searchBox .searchButton').trigger('click');
	}
});
	
	
	 loadRegistrationForm();
}
// END onload main function 


   // main menu - estimate size
jQuery(document).ready(function () {
	//console.log('jQuery(document).ready');
	try {
		if (externalHeader != true){
			//console.log('externalHeader != true');
			onloadMainFunction(); 
		}
	}
	catch(e) {
		onloadMainFunction(); 
	}
	
	
	/* 11.2.2015 */
 
$('#main-menu li.sign-in div.login-box').remove();
if ($('#main-menu .rightMenu .menu-item.drop-down a.top-link').eq(1).attr('href') == '#'){
	$('#main-menu .rightMenu .menu-item.drop-down a.top-link').eq(1).attr('href','https://openbook.etoro.com');
}

 
/* 26.1.2015  path */
	

});

// load Form Registraion

	
function directToOpenbookLightBox(){
		trigger = jQuery("#main-menu li.sign-in div.login-box .login-footer a");
		var href = 'https://openbook.etoro.com/?ref=hp_bannerbtn#/main';
		jQuery(trigger).attr('href',href);
}
	