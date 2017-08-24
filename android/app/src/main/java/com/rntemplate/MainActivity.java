package com.rntemplate;

import com.dyexample.rnlibrary.BaseReactActivity;

public class MainActivity extends BaseReactActivity {
    @Override
    protected boolean isDevSupport() {
        return BuildConfig.DEBUG;
    }

    @Override
    protected String getBundleAssetName() {
        return null;
    }

    @Override
    protected String getJSMainModuleName() {
        return "index.android";
    }

    @Override
    protected String getMainComponentName() {
        return "RNTemplate";
    }
}
