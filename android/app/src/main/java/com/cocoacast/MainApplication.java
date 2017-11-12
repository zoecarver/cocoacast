package com.cocoacast;

import android.app.Application;

import com.fabricio.vergal.RNWorkers.RNWorkersManager;
import com.facebook.react.ReactApplication;
import com.reactlibrary.RNNotificationsPackage;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.googlecast.GoogleCastPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.rnfs.RNFSPackage;
import com.fabricio.vergal.RNWorkers.RNWorkersPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.zmxv.RNSound.RNSoundPackage;
import io.fullstack.oauth.OAuthManagerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNNotificationsPackage(),
            new GoogleAnalyticsBridgePackage(),
            new GoogleCastPackage(),
            new RNFetchBlobPackage(),
            new RNFSPackage(),
            new RNWorkersPackage(),
            new ReactMaterialKitPackage(),
            new VectorIconsPackage(),
            new RNSoundPackage(),
            new OAuthManagerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

}
