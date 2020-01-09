/*---------------------------------------------------------------------------------------------*/
// BEGIN DOCUMENT READY /////////////////////////////////////////////////////
$(document).ready(function() {
/*---------------------------------------------------------------------------------------------*/

	$('button.stripe').click(function(event) {
	 	var stripeSku = $(this).attr("data-stripe-sku");
	    var stripePlan = $(this).attr("data-stripe-plan");
	    var items = stripeSku ? [{ sku: stripeSku, quantity: 1 }] : [{ plan: stripePlan, quantity: 1 }];
	    stripe
	      .redirectToCheckout({
	        items: items,
	        successUrl:
	          DOMAIN + "/support/success.html?session_id={CHECKOUT_SESSION_ID}",
	        cancelUrl:
	          DOMAIN + "/support/canceled.html?session_id={CHECKOUT_SESSION_ID}"
	      })
	      .then(handleResult);
	});


	var handleResult = function(result) {
	  if (result.error) {
	    var displayError = document.getElementById("error-message");
	    displayError.textContent = result.error.message;
	  }
	};

	var urlParams = new URLSearchParams(window.location.search);

	if (urlParams.has("session_id")) {
	  document.getElementById("session").textContent = urlParams.get(
	    "session_id"
	  );
	}


/*---------------------------------------------------------------------------------------------*/
// END DOCUMENT READY
});