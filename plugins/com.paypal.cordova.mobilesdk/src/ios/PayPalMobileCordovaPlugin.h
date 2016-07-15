//
//  PayPalMobileCordovaPlugin.h
//  Copyright (c) 2014 PayPal. All rights reserved.
//


#import <Cordova/CDV.h>
#import "PayPalMobile.h"

@interface PayPalMobileCordovaPlugin : CDVPlugin<PayPalPaymentDelegate, PayPalFuturePaymentDelegate>

- (void)version:(CDVInvokedUrlCommand *)command;

- (void)init:(CDVInvokedUrlCommand *)command;
- (void)prepareToRender:(CDVInvokedUrlCommand *)command;

- (void)renderSinglePaymentUI:(CDVInvokedUrlCommand *)command;

- (void)applicationCorrelationIDForEnvironment:(CDVInvokedUrlCommand *)command;
- (void)renderFuturePaymentUI:(CDVInvokedUrlCommand *)command;

@end
