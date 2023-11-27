package com.spotmobile;

import com.github.yamill.orientation.OrientationPackage;
import com.henninghall.date_picker.DatePickerPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.rnfs.RNFSPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;

import fr.bamlab.rnimageresizer.ImageResizerPackage;

import com.imagepicker.ImagePickerPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import com.vonovak.AddCalendarEventPackage;
import com.sbugert.rnadmob.RNAdMobPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import com.chirag.RNMail.*;
import com.dooboolab.RNAudioRecorderPlayerPackage;

import suraj.tiwari.reactnativefbads.FBAdsPackage;

import java.util.Arrays;
import java.util.List;


public class MainApplication extends NavigationApplication {
    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                return "index";
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
                new LinearGradientPackage(),
                new ImagePickerPackage(),
                new ImageResizerPackage(),
                new RNFSPackage(),
                new RNI18nPackage(),
                new RNDeviceInfo(),
                new ReactVideoPackage(),
                new MapsPackage(),
                new OrientationPackage(),
                new DatePickerPackage(),
                new AddCalendarEventPackage(),
                new RNAdMobPackage(),
                new AsyncStoragePackage(),
                new RNSoundPackage(),
                new ReactNativeYouTube(),
                new RNMail(),
                new FBAdsPackage(),
                new RNAudioRecorderPlayerPackage()
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }
}
