var stripe = Stripe('pk_live_rQWTrxNUl442BfEyf0DoC7Fy00hIkiGnEu');
/*---------------------------------------------------------------------------------------------*/
// BEGIN DOCUMENT READY /////////////////////////////////////////////////////
$(document).ready(function() {
/*---------------------------------------------------------------------------------------------*/

var handleResult = function(result) {
  if (result.error) {
    var displayError = document.getElementById("error-message");
    displayError.textContent = result.error.message;
  }
};

document.querySelectorAll("button").forEach(function(button) {
  button.addEventListener("click", function(e) {
    var skuId = e.target.dataset.skuId;
    var planId = e.target.dataset.planId;
    var items = skuId
      ? [{ sku: skuId, quantity: 1 }]
      : [{ plan: planId, quantity: 1 }];
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
});

var urlParams = new URLSearchParams(window.location.search);

if (urlParams.has("session_id")) {
  document.getElementById("session").textContent = urlParams.get(
    "session_id"
  );
}


/*---------------------------------------------------------------------------------------------*/
// END DOCUMENT READY
});