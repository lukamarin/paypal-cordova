function alertDismissed() {
    // do something
}
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
		navigator.notification.alert(
			'Received Event: ' + id,  // message
			alertDismissed,         // callback
			'ready',            // title
			'Ok'                  // buttonName
		);

        // start to initialize PayPalMobile library
        app.initPaymentUI();
    },
    initPaymentUI : function () {
      var clientIDs = {
        "PayPalEnvironmentProduction": "AX851BCK3csE_lg80IptYWycLn3ljZqZmXmOekvNfVyXc8ioLq9MlMDmo26M",
        "PayPalEnvironmentSandbox": "AX851BCK3csE_lg80IptYWycLn3ljZqZmXmOekvNfVyXc8ioLq9MlMDmo26M"
      };
      PayPalMobile.init(clientIDs, app.onPayPalMobileInit);

    },
    onSuccesfulPayment : function(payment) {
      console.log("payment success: " + JSON.stringify(payment, null, 4));
		navigator.notification.alert(
			"payment success: " + JSON.stringify(payment, null, 4),  // message
			alertDismissed,         // callback
			'Paypal',            // title
			'Ok'                  // buttonName
		);
    },
    onFuturePaymentAuthorization : function(authorization) {
      console.log("authorization: " + JSON.stringify(authorization, null, 4));
    },
    createPayment : function () {
      // for simplicity use predefined amount
      var paymentDetails = new PayPalPaymentDetails("1.50", "0.40", "0.05");
      var payment = new PayPalPayment("1.95", "USD", "Awesome Sauce", "Sale", paymentDetails);
      return payment;
    },
    configuration : function () {
      // for more options see `paypal-mobile-js-helper.js`
      var config = new PayPalConfiguration({merchantName: "My test shop", merchantPrivacyPolicyURL: "https://mytestshop.com/policy", merchantUserAgreementURL: "https://mytestshop.com/agreement"});
      return config;
    },
    onPrepareRender : function() {
      // buttons defined in index.html
      //  <button id="buyNowBtn"> Buy Now !</button>
      //  <button id="buyInFutureBtn"> Pay in Future !</button>
      var buyNowBtn = document.getElementById("buyNowBtn");
      var buyInFutureBtn = document.getElementById("buyInFutureBtn");

      buyNowBtn.onclick = function(e) {
        // single payment
        PayPalMobile.renderSinglePaymentUI(app.createPayment(), app.onSuccesfulPayment, app.onUserCanceled);
      };

      buyInFutureBtn.onclick = function(e) {
        // future payment
        PayPalMobile.renderFuturePaymentUI(app.onFuturePaymentAuthorization, app.onUserCanceled);
      };
    },
    onPayPalMobileInit : function() {
      // must be called
      // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
      PayPalMobile.prepareToRender("PayPalEnvironmentNoNetwork", app.configuration(), app.onPrepareRender);
    },
    onUserCanceled : function(result) {
      console.log(result);
		navigator.notification.alert(
			result,  // message
			alertDismissed,         // callback
			'user canceled',            // title
			'Ok'                  // buttonName
		);
    }
};



