/*---------------------------------------------------------------------------------------------*/
// BEGIN DOCUMENT READY /////////////////////////////////////////////////////
$(document).ready(function() {
/*---------------------------------------------------------------------------------------------*/

	$('button.stripe').click(function(event) {
		var str = window.location.href;
		var domain = str.substring(0, str.lastIndexOf('/'));
		alert(domain);
	 	var stripeSku = $(this).attr('data-stripe-sku');
	    var stripePlan = $(this).attr('data-stripe-plan');
	    var items = stripeSku ? [{ sku: stripeSku, quantity: 1 }] : [{ plan: stripePlan, quantity: 1 }];
	    stripe.redirectToCheckout({
			items: items,
			successUrl: domain + '/success.html?session_id={CHECKOUT_SESSION_ID}',
			cancelUrl: domain + '/canceled.html?session_id={CHECKOUT_SESSION_ID}'
		}).then(handleResult);
	});


	var handleResult = function(result) {
		if (result.error) {
			var displayError = document.getElementById('error-message');
			displayError.textContent = result.error.message;
		}
	};

	var urlParams = new URLSearchParams(window.location.search);

	if (urlParams.has('session_id')) {
		document.getElementById('session').textContent = urlParams.get('session_id');
	}


/*---------------------------------------------------------------------------------------------*/
// END DOCUMENT READY
});