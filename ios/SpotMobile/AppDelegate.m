/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <ReactNativeNavigation/ReactNativeNavigation.h>
#import <React/RCTLinkingManager.h>
#import <React/RCTPushNotificationManager.h>
#import <AVFoundation/AVFoundation.h>
#import <GoogleMaps/GoogleMaps.h>
#import "Orientation.h"
#import <AVFoundation/AVFoundation.h>
#import <FBAudienceNetwork/FBAudienceNetwork.h>

@implementation AppDelegate
  
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  [GMSServices provideAPIKey:@"AIzaSyCsm_wn9YjEmh0CY5yIbX_9tNsSn9s0q0Y"];
  
  [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryPlayback error: nil];
  
  NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  [ReactNativeNavigation bootstrap:jsCodeLocation launchOptions:launchOptions];
  
  [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryAmbient error:nil];
  
  NSLog(@"isTestMode1: %d",[FBAdSettings isTestMode]);
  NSString *testDeviceKey = [FBAdSettings testDeviceHash];
  if (testDeviceKey) {
    [FBAdSettings setLogLevel:FBAdLogLevelLog];
    [FBAdSettings addTestDevice:testDeviceKey];
  }
  
  return YES;
}

- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  return [Orientation getOrientation];
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  
  return [RCTLinkingManager application:application openURL:url options:options];
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity
 restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler
{
  return [RCTLinkingManager application:application
                   continueUserActivity:userActivity
                     restorationHandler:restorationHandler];
}

//- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
//  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
//{
//  return [[RNPaypal sharedInstance] application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
//}

- (NSString *)paymentsURLScheme {
  NSString *bundleIdentifier = [[NSBundle mainBundle] bundleIdentifier];
  return [NSString stringWithFormat:@"%@.%@", bundleIdentifier, @"payments"];
}

@end
