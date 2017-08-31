package com.dyexample.rnlibrary;

import android.annotation.TargetApi;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.util.SparseArray;
import android.view.KeyEvent;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.Callback;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.modules.core.PermissionAwareActivity;
import com.facebook.react.modules.core.PermissionListener;

import java.util.List;

public abstract class BaseReactActivity extends AppCompatActivity implements DefaultHardwareBackBtnHandler, PermissionAwareActivity {
    protected static final int OVERLAY_PERMISSION_REQ_CODE = 0x1000;

    protected ReactInstanceManager mReactInstanceManager;

    private Callback mCallback;
    private SparseArray<PermissionListener> mListeners = new SparseArray<>();

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if(isDevSupport()) {
            if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                if(!Settings.canDrawOverlays(this)) {
                    Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                        Uri.parse("package:" + getPackageName()));
                    startActivityForResult(intent, OVERLAY_PERMISSION_REQ_CODE);
                }
            }
        }
    }

    @Override
    protected void onPause() {
        super.onPause();

        if(null != mReactInstanceManager) {
            mReactInstanceManager.onHostPause(this);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        if(null != mReactInstanceManager) {
            mReactInstanceManager.onHostResume(this, this);
        }

        if(null != mCallback) {
            mCallback.invoke();
            mCallback = null;
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        if(null != mReactInstanceManager) {
            mReactInstanceManager.onHostDestroy(this);
        }
        mListeners.clear();
    }

    @Override
    public void onBackPressed() {
        if(null != mReactInstanceManager) {
            mReactInstanceManager.onBackPressed();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if(null!=mReactInstanceManager && KeyEvent.KEYCODE_MENU==keyCode) {
            mReactInstanceManager.showDevOptionsDialog();
            return true;
        }

        return super.onKeyUp(keyCode, event);
    }

    @TargetApi(Build.VERSION_CODES.M)
    @Override
    public void requestPermissions(String[] permissions, int requestCode, PermissionListener listener) {
        mListeners.put(requestCode, listener);
        requestPermissions(permissions, requestCode);
    }

    @Override
    public void onRequestPermissionsResult(final int requestCode, final @NonNull String[] permissions, final @NonNull int[] grantResults) {
        final PermissionListener listener = mListeners.get(requestCode);
        if(null != listener) {
            mCallback = new Callback() {
                @Override
                public void invoke(Object... args) {
                    listener.onRequestPermissionsResult(requestCode, permissions, grantResults);
                }
            };
            mListeners.remove(requestCode);
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if(OVERLAY_PERMISSION_REQ_CODE == requestCode) {
            if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                if(!Settings.canDrawOverlays(this)) {
                    // SYSTEM_ALERT_WINDOW permission not granted...
                }
            }
        }

        super.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }

    protected abstract boolean isDevSupport();
    protected abstract String getMainComponentName();

    protected List<ReactPackage> getReactPackages() {
        return null;
    }
}
