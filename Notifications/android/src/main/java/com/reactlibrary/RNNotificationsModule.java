
package com.reactlibrary;

import android.Manifest;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.support.v7.app.NotificationCompat;
import android.util.Log;
import android.media.audiofx.Visualizer;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.zmxv.RNSound.RNSoundModule;

import java.nio.charset.StandardCharsets;

public class RNNotificationsModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public RNNotificationsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

  @Override
  public String getName() {
    return "RNNotifications";
  }

  @ReactMethod
  public void SendNotification(final Integer key, final String title) {
      JcNotificationPlayerService jcNotificationPlayer;
      jcNotificationPlayer = new JcNotificationPlayerService(reactContext);
      MediaPlayer player = RNSoundModule.playerPool.get(1);

      Log.d("SOUND: ALARM", Integer.toString(key));

      jcNotificationPlayer.createNotificationPlayer(title, key);
  }
}