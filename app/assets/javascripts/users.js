/* global $, Stripe */
//Document ready.
$(document).on('turbolinks:load', function() {
  var theForm = $('#pro_form');
  var submitBtn = $('#form-signup-btn');
  
  //set stripe public key
  Stripe.setPublishablekey( $('meta[name="stripe-key"]').attr('content') );
  
  //when user clicks user submit
  submitBtn.click(function(event){
    // prevent default submission behavior.
    event.preventDefault();
    submitBtn.val("Processing").prop('disabled', true);
    
    //collect credit card fields
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
        
    //Use stripe js library to check for card errors
    var error = false;
    
    //Validate card Number.
    if(!Stripe.card.validateCardNumber(ccNum)) {
      error = true;
      alert('The Credit Card seems to be invalid');
    }
    
    //Validate CVC Number.
    if(!Stripe.card.validateCVC(cvcNum)) {
      error = true;
      alert('The CVC number seems to be invalid');
    }
    
     //Validate expiration date.
    if(!Stripe.card.validateExpiry(expMonth, expYear)) {
      error = true;
      alert('The expiration date seems to be invalid');
    }
    
    
    if(error) {
      //If card errors, don't send to stripe.
      submitBtn.prop('disabled', false).val("Sign Up")
    } else {
      //send card info to strip
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
    return false;
  });
  
  
  
  
  
  //stripe will give back a card token 
  function stripeResponseHandler(status, response) {
    //Get token from response
    var token = response.id;
    
    //Inject card token in hidden field
    theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
    
    //Submit form to rails app 
    theForm.get(0).submit();
  }
  
  
  
});
