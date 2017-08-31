package com.rntemplate;

import com.dyexample.rnlibrary.BaseCustomReactActivity;

public class MainActivity extends BaseCustomReactActivity {
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
