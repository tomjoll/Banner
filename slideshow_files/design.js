//  JavaScript Document
//  Written by Codify Design Studio

var windowWidth = 0;
var windowSizeCurrent = '';
var windowSizeNew = '';
var theme_url = object_name.theme_url;
	
jQuery(document).ready(function(){

	// Subscribe widget..............................................................................................
	jQuery('.s2_form_widget input[name="subscribe"]').addClass('subscribe2widget-subscribe');
	jQuery('.s2_form_widget input[name="unsubscribe"]').addClass('subscribe2widget-unsubscribe');

	// Generate mobile menu..........................................................................................
	jQuery('.mobilemenu').append('<span class="menu_icon no_select"></span><div class="content_container"><div class="content">');
	jQuery('nav > ul.dropmenu a').each(function(){
		var depth = jQuery(this).parents('ul').length;
		jQuery(this).addClass('depthlevel-' + depth);
		jQuery(this).clone().appendTo('.mobilemenu .content');	
	});
	jQuery('.mobilemenu').append('</div></div>');

	// Check window scroll position
	jQuery(window).on('scroll', function(){
		checkScrollPosition();
	}).resize(function(){
		checkScrollPosition();
	});
	checkScrollPosition();
		
	// Detect segment navigation.....................................................................................
	var navSegment = jQuery('#page > nav').attr('data-segment');
	if( navSegment !== 'creativecloud' ){
		jQuery('#page > nav ul.dropmenu li a').each(function(){
			var url = jQuery(this).attr('href');			
			if( url.indexOf('/creativecloud/') > -1 ){
				var segment_url = url + '?segment='+navSegment;
				jQuery(this).attr('href',segment_url);
			}
		});
	}

	// Activate mobile menu navigation...............................................................................
	jQuery('.menu_icon').on('click',function(){
		var currentHeight = jQuery('.mobilemenu .content_container').height();
		var contentHeight = jQuery('.mobilemenu .content_container .content').height() + 10;
		if(currentHeight < 5){
			jQuery('.mobilemenu .content_container').animate({height:contentHeight+'px'}, 500);	
		}else{
			jQuery('.mobilemenu .content_container').animate({height:'0px'}, 500);
		}
	});
	
	// Relink twitter link if tag is Adobe Stock Controbutors
	if( jQuery('h1.archive-header').html() == 'Adobe Stock Contributors' ){
		jQuery('.widget.widget_text a.social-icon.tw').attr('href','https://twitter.com/adobestockcall');	
	}
	
	

	// ................................................................................................
	// Validate Share Your Story Form
	//jQuery('#tellusyourstory').validate();


	// Create dropdown menus.........................................................................................
	jQuery('nav > ul.dropmenu').css('display','block');
	jQuery('nav > ul').dropmenu({
		effect : 'slide',
		speed : 200,
		timeout : 0,
		nbsp : false
	});
	jQuery('nav > ul.dropmenu ul:last-child').css('padding-bottom','10px');
	jQuery('nav > ul.dropmenu ul').css('left','0px');

	// Activate Sharrre buttons - Homepage, Archive, Categories, Tags and Authors....................................
/*
	jQuery('.excerpt .entry_share').sharrre({
		share: {
			facebook: true,
			linkedin: true,
			googlePlus: true,
			twitter: true
		},
		urlCurl: 'http://blogs.adobe.com/creativecloud/wp-content/themes/AdobeCreativeCloud/js/sharrre/sharrre.php',
		buttons: {
			facebook: {layout:'button_count'},			
			linkedin: {counter: 'right'},
			googlePlus: {size:'medium', annotation:'bubble'},
			twitter: {count:'horizontal', via:'CreativeCloud'}
		},
		hover: function(api, options){
			jQuery(api.element).find('.buttons').show();
		},
		hide: function(api, options){
			jQuery(api.element).find('.buttons').hide();
		},
		enableTracking: true
	});
	// Activate Sharrre buttons - Post Single
	jQuery('#sharrre').sharrre({
		share: {
			//twitter: true,
			facebook: true,
			//googlePlus: true,
			linkedin: true
		},
		buttons: { twitter: {via: 'CreativeCloud'}},
		template: '<div class="share_box"><a class="discussion" href="#discussion"></a><a href="#" class="facebook"></a><a href="#" class="twitter"></a><a href="#" class="googleplus"></a><a href="#" class="linkedin"></a><div class="total">{total}</div></div>',
		enableHover: false,
		urlCurl: 'http://blogs.adobe.com/creativecloud/wp-content/themes/AdobeCreativeCloud/js/sharrre/sharrre.php',
		enableTracking: true,
		render: function(api, options){
			jQuery(api.element).on('click', '.discussion', function() {
				var url = window.location.href + '#discussion';
				window.location = url;
			});
			jQuery(api.element).on('click', '.twitter', function() {
				//api.simulateClick();
				api.openPopup('twitter');
			});
			jQuery(api.element).on('click', '.facebook', function() {
				//api.simulateClick();
				api.openPopup('facebook');
			});
			jQuery(api.element).on('click', '.googleplus', function() {
				//api.simulateClick();
				api.openPopup('googlePlus');
			});
			jQuery(api.element).on('click', '.linkedin', function() {
				//api.simulateClick();
				api.openPopup('linkedin');
			});
		}
	});
*/

		/*
		jQuery('.post_single .entry_share').sharrre({
		share: {
			facebook: true,
			twitter: true,
			googlePlus: true,
			linkedin: true
		},
		buttons: {
			facebook: {layout: 'button_count'},
			twitter: {count:'horizontal', via:'AdobeCreativeCloud'},
			googlePlus: {size: 'medium', annotation:'bubble'},
			linkedin: {counter: 'right'}
		},
		enableHover: false,
		enableCounter: false,
		enableTracking: true,
	});
	*/

	// Activate collapsible panels..................................................................................
	jQuery('.codify_cp_trigger').on('click',function(){

		// Archive Panel in sidebar
		if( jQuery(this).parent().parent().hasClass('widget_text') ){
			var newHeight = jQuery(this).parent().parent().find('.codify_cp_content').height(); // Get height of content
			jQuery(this).parent().parent().find('.codify_cp').animate({'height':newHeight},1000); // Open content panel
			jQuery(this).parent().css('overflow','hidden').animate({'height':'0px'},1000); // Close the trigger
		}
		// Apps Page
		if( jQuery(this).parent().hasClass('app_container') ){
						jQuery(this).toggleClass('open');
			targetPanel = jQuery(this).parent().find('.codify_cp');
			
			if( jQuery(this).hasClass('open') ){
				var newHeight = jQuery(this).parent().find('.codify_cp_content').height(); // Get height of content
				targetPanel.animate({'height':newHeight},1000,function(){
					targetPanel.css('height','auto');
				});
			}else{
				targetPanel.animate({'height':'0px'},1000);
			}
		}
	});




	
	// Protect images......................................................................................
	jQuery('img.protected').each(function(){

		var protected_image_spacer = theme_url + '/images/template/protected_image.png';
		var centered = 'no';
		var image_url   = jQuery(this).attr('src');
		var img_width   = jQuery(this).attr('width');
		var img_height  = jQuery(this).attr('height');
		var img_classes = jQuery(this).attr('class');
		var new_markup = '';
		
		if( jQuery(this).hasClass('aligncenter') ){
			centered = 'yes';	
		}
		
		var new_image = '<img class="protected" src="'+protected_image_spacer+'" width="'+img_width+'" height="'+img_height+'" data-original-width="'+img_width+'" data-original-height="'+img_height+'">';

		if( centered == 'yes' ){
			new_markup += '<div style="text-align:center;">';
		}

		new_markup += '<span class="'+img_classes+'" style="display: inline-block; background-size: cover; background-image:url('+image_url+');">'+new_image+'</span>';
		
		if( centered == 'yes' ){
			new_markup += '</div>';
		}

		jQuery(this).replaceWith(new_markup);
	});





	// Record original sizes........................................................................................
	jQuery('article iframe, article img').not('article .feature_image img').each(function(){
		var thisWidth = jQuery(this).width();
		var thisHeight = jQuery(this).height();
		jQuery(this).attr({'data-original-width':thisWidth,'data-original-height':thisHeight});
	});

	// Look for all <a> tags, add target to offsite links, or lightbox links........................................
	jQuery('.post_single a').each(function(){

		var thisURL = String(jQuery(this).attr('href'));

		// Look for 'http' in the string
		if( thisURL.indexOf('http') > -1 ){
			// Look for onsite URL string
			if( thisURL.indexOf('/creativecloud') == -1 ){
				// Open offsite links in new window
				jQuery(this).attr('target','_blank');
			}
		}

		// Look for links direclty to JPG, GIF or PNG files
		if( thisURL.slice(-4) == '.jpg' || thisURL.slice(-4) == '.png' || thisURL.slice(-4) == '.gif' ){
			
			var thisRel = jQuery(this).attr('rel');
			
			//if( thisRel.indexOf('group') > -1 ){
				
			//}else{
				jQuery(this).attr('rel','lightbox');
			//}			

		}
		
	});
	
	// Activate "Tweet this" text
	jQuery('.tweet-this').each(function(){
		var tweet_url = document.location;
		var tweet_text = jQuery(this).html();
		var tweet_link = '<a href="http://twitter.com/home/?status='+tweet_text+'. via @creativecloud '+tweet_url+'" target="_blank">'+tweet_text+'</a>';
		jQuery(this).html(tweet_link);
	});

	// Activate gallery.............................................................................................
	jQuery('div.myGalleryItem a').each(function(index){
		var captionText = jQuery(this).parent().find('span').html();
		jQuery(this).attr({'data-lightbox':'slideshow','title':captionText});
	});



	// Activate iFrame Overlay Links.................................................................................	
	jQuery('a.iframe_overlay').fancybox({
		'width'				: '90%',
		'height'			: '90%',
		'overlayColor'		: '#000',
		'autoScale'			: false,
		'overlayOpacity'	: 0.8,
		'transitionIn'		: 'elastic',
		'transitionOut'		: 'elastic',
		'type'				: 'iframe'
	});



	//layoutSetHeights();
	setInterval(checkWindowSize, 250);

});

function checkScrollPosition(){

	if ( jQuery('#single_content_container').length > 0) {
		var contentContainer = document.getElementById('single_content_container');
		var contentContainerPositions = contentContainer.getBoundingClientRect();
		var contentContainerTop = contentContainerPositions.top;
		if( contentContainerTop < 60 ){
			jQuery('#single_content_container').addClass('position-fixed');
		}else{
			jQuery('#single_content_container').removeClass('position-fixed');
		}
		//console.log( contentContainerTop);
	}

}

function checkWindowSize(){

	windowWidth = jQuery(window).width();

	// Set window size variable
	if(windowWidth > 400){
		if(windowWidth > 500){
			if(windowWidth > 690){ // was 670
				if(windowWidth > 910){  // was 840
					if(windowWidth > 1095){ // was 1020
						if(windowWidth > 1325){
							windowSizeNew = 955;
						}else{
							windowSizeNew = 735;	
						}
					}else{
						windowSizeNew = 555;
					}
				}else{
					windowSizeNew = 390;
				}
			}else{
				windowSizeNew = 450;
			}
		}else{
			windowSizeNew = 350;
		}
	}else{
		windowSizeNew = 290;
	}
	
	// Detect if a change occured
	if(windowSizeCurrent != windowSizeNew){
		resizeElements(windowSizeNew);
	}
	//jQuery('header h2').html(windowWidth + ' &amp; ' + windowSizeNew);
}

function resizeElements(newWidth){

	// resize iframes
	jQuery('article iframe').each(function(){
		var thisWidth = jQuery(this).width();
		var thisHeight = jQuery(this).height();
		var widthDifference = thisWidth-newWidth;
		var scale = widthDifference/thisWidth;
		var heightDifference = thisHeight*scale;
		var newHeight = Math.floor(thisHeight-heightDifference);
		jQuery(this).attr({'width':newWidth,'height':newHeight});
	});
	
	// resize images
	jQuery('article img').not('article img.feature_image').each(function(){

		var checkWidth = jQuery(this).attr('data-original-width');
		var checkHeight = jQuery(this).attr('data-original-height');

		if(checkWidth > newWidth){
			var thisWidth = jQuery(this).width();
			var thisHeight = jQuery(this).height();
			var widthDifference = thisWidth-newWidth;
			var scale = widthDifference/thisWidth;
			var heightDifference = thisHeight*scale;
			var newHeight = Math.floor(thisHeight-heightDifference);
			jQuery(this).attr({'width':newWidth,'height':newHeight});
			jQuery(this).closest('.wp-caption').css('width',newWidth+'px');			
		}
		else{
			jQuery(this).attr({'width':checkWidth,'height':checkHeight});
			jQuery(this).closest('.wp-caption').css('width',checkWidth+'px');
		}

	});	

}