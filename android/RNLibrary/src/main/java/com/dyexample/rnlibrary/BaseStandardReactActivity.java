package com.dyexample.rnlibrary;

import android.os.Bundle;
import android.support.annotation.Nullable;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactRootView;

public abstract class BaseStandardReactActivity extends BaseReactActivity {
    protected ReactRootView mReactRootView;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mReactInstanceManager = getReactNativeHost().getReactInstanceManager();
        mReactRootView = new ReactRootView(this);
        mReactRootView.startReactApplication(mReactInstanceManager, getMainComponentName());
        setContentView(mReactRootView);
    }

    @Override
    protected boolean isDevSupport() {
        return getReactNativeHost().getUseDeveloperSupport();
    }

    protected ReactNativeHost getReactNativeHost() {
        return ((ReactApplication)getApplication()).getReactNativeHost();
    }
}
