SpotMobile

**Steps to start app**
- git clone https://<GITHUB_USERNAME>@github.com/atomxllc/spotJobs-mobile-app.git
- cd spotJobs-mobile-app
- git checkout develop
- npm i
- cd src/I18n/spotJobs-mobile-app/spotJobs-mobile-app
- git checkout develop

Start ios app
1. cd ios/
2. pod install
3. open ios/SpotJobs.xcworkspace in xcode

Start android app
1. open node_modules/react-native-i18n/android/src/main/AndroidManifest.xml
2. remove android:minSdkVersion="16"
3. enter your path to android sdk in the android/local.properties file

Run ios dev app
- npm start
- open ios/SpotJobs.xcworkspace in xcode
- select simulator or device (for test on the device need generate certificates)
- press "Run"

Run android dev app
- connect your device or run emulator from Android Studio
- npm start
- npm run android
