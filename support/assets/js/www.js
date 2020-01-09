var animateFast =		300;
var animateSlow =		1000;
var animateMenu = 		200;
/*---------------------------------------------------------------------------------------------*/
// BEGIN DOCUMENT READY /////////////////////////////////////////////////////
$(document).ready(function() {
/*---------------------------------------------------------------------------------------------*/
	$('button.stripe').click(function(event) {
		$('#msg').slideUp(animateFast).empty();
		var str = window.location.href;
		var domain = str.substring(0, str.lastIndexOf('/'));
	 	var stripeSku = $(this).attr('data-stripe-sku');
	    var stripePlan = $(this).attr('data-stripe-plan');
	    var items = stripeSku ? [{ sku: stripeSku, quantity: 1 }] : [{ plan: stripePlan, quantity: 1 }];
	    stripe.redirectToCheckout({
			items: items,
			successUrl: domain + '/success.html?session_id={CHECKOUT_SESSION_ID}',
			cancelUrl: domain + '/cancel.html?session_id={CHECKOUT_SESSION_ID}'
		}).then(handleResult);
	});
	var handleResult = function(result) {
		if(result.error) {
			$('#msg').html('<div id="error">An error occured. Please try again!</div><div class="line"></div>').slideDown(animateFast);
		}
	};
	var urlParams = new URLSearchParams(window.location.search);
	if(urlParams.has('session_id')) {
		document.getElementById('session').textContent = urlParams.get('session_id');
	}
/*---------------------------------------------------------------------------------------------*/
// END DOCUMENT READY
});