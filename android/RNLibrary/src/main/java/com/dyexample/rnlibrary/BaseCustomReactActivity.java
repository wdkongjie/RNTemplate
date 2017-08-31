package com.dyexample.rnlibrary;

import android.os.Bundle;
import android.support.annotation.Nullable;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactInstanceManagerBuilder;
import com.facebook.react.ReactPackage;
import com.facebook.react.ReactRootView;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.shell.MainReactPackage;

import java.util.List;

public abstract class BaseCustomReactActivity extends BaseReactActivity {
    protected ReactRootView mReactRootView;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mReactRootView = new ReactRootView(this);
        ReactInstanceManagerBuilder builder = ReactInstanceManager.builder()
            .setApplication(getApplication())
            .setBundleAssetName(getBundleAssetName())
            .setJSMainModuleName(getJSMainModuleName())
            .setUseDeveloperSupport(isDevSupport())
            .setInitialLifecycleState(LifecycleState.RESUMED);

        builder.addPackage(new MainReactPackage());
        List<ReactPackage> reactPackages = getReactPackages();
        if(null != reactPackages) {
            for (ReactPackage reactPackage :reactPackages) {
                builder.addPackage(reactPackage);
            }
        }
        mReactInstanceManager = builder.build();
        mReactRootView.startReactApplication(mReactInstanceManager, getMainComponentName());
        setContentView(mReactRootView);
    }

    protected abstract String getBundleAssetName();
    protected abstract String getJSMainModuleName();
}
