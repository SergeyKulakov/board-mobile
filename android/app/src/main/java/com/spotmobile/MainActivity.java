package com.spotmobile;

import com.reactnativenavigation.NavigationActivity;
import com.imagepicker.permissions.OnImagePickerPermissionsCallback;
import com.facebook.react.modules.core.PermissionListener;

import android.content.Intent;
import android.content.res.Configuration;

public class MainActivity extends NavigationActivity implements OnImagePickerPermissionsCallback {
    private PermissionListener listener;

    @Override
    public void setPermissionListener(PermissionListener listener) {
        this.listener = listener;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        if (listener != null) {
            listener.onRequestPermissionsResult(requestCode, permissions, grantResults);
        }
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }
}
