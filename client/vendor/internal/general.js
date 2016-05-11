   function enableActive(item) {
            jQuery(".likeMapBox .content .right .socialconteiner .sharrre .box a").mouseup(function () {
                jQuery(this).removeClass('active');
            }).mousedown(function () {
                jQuery(this).addClass('active');
            }).mouseleave(function () {
                jQuery(this).removeClass('active');
            });
		
            
			
        }
        jQuery(function($) {
            jQuery('.mapItemTwitter').sharrre({
                share: {
                    twitter: true
                },
                enableHover: false,
                enableTracking: false,
               // buttons: { twitter: { via: 'eToro'} },
                click: function (api, options) {
                    api.simulateClick();
                    api.openPopup('twitter');
                },
                render: function () {
                    item = "twitter";
                    enableActive(item);
					jQuery('<span class="red"></span><span class="blue"></span><span class="green"></span><span class="yellow"></span>').appendTo('.sharrre.mapItemGoogleplus .box a.share span.conteiner span.icon');
                }
            });
            jQuery('.mapItemFacebook').sharrre({
                share: {
                    facebook: true
                },
                enableHover: false,
                enableTracking: false,
                action: 'like',
                click: function (api, options) {
                    api.simulateClick();
                    api.openPopup('facebook');
                },
                render: function () {
                    item = "facebook";
                    enableActive(item);
                }
            });
            jQuery('.mapItemGoogleplus').sharrre({
                share: {
                    googlePlus: true
                },
                enableHover: false,
                enableTracking: false,
                click: function (api, options) {
                    api.simulateClick();
                    api.openPopup('googlePlus');
                },
                render: function () {
                    item = "google";
                    enableActive(item);
                }
            });
            jQuery('.mapItemLinkedin').sharrre({
                share: {
                    linkedin: true
                },
                enableHover: false,
                enableTracking: false,
                click: function (api, options) {
                    api.simulateClick();
                    api.openPopup('linkedin');
                },
                render: function () {
                    item = "linketIn";
                    enableActive(item);
                }
            });







        });
    