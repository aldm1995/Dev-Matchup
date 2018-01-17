/* global $ */
//Document ready.
$(document).on('turbolinks:load', function() {
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
  //set stripe public key
  Strpe.setPublishablekey( $('meta[name="stripe-key"]').attr('content') );
  //when user clicks user submit
  submitBtn.click(function(event){
    // prevent default submission behavior.
    event.preventDefault();
    //collect credit card fields
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
    //send card info to strip
    Stripe.createToken({
      number: ccNum,
      cvc: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler);
  });
  //stripe will give back a card token
  //Inject card token as hidden field in form
  //Submit form to rails app
});
