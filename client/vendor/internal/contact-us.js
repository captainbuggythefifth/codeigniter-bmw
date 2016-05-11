 $(document).ready(function () {
		  
           //CONTACT US PAGE 
			       $(".contentBottom .column .row:odd").addClass('dark');
				   // banner contact us 
				    $(".headerContent .contactUsBannerConteiner .banner .details a.button").mouseup(function () {
					$(this).removeClass('active');
					}).mousedown(function () {
						$(this).addClass('active');
					}).mouseleave(function () {
						$(this).removeClass('active');
					});
					
/* 					if($(".headerContent .contactUsBannerConteiner .banner .details").width() > 233){
						var detailsWidth = $(".headerContent .contactUsBannerConteiner .banner .details").width();
						$(".headerContent .contactUsBannerConteiner").width(425+ (detailsWidth - 233));
							if ((425+ (detailsWidth - 233)) > 505){
							$(".headerContent .introText").width(950- ( 430+ (detailsWidth - 233) ));
							}
						console.log($(".headerContent .contactUsBannerConteiner .banner .details").width());
					} */
					
					//$(".header .contactUsBannerConteiner .banner .details a.button").click(function() {
//						var supportHref = $(this).attr('href');
//					  window.open(supportHref,'','width=720,height=900');
//					  return false;
//					});
            
        });