
package com.reactlibrary;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.media.MediaPlayer;
import android.support.v7.app.NotificationCompat;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.zmxv.RNSound.RNSoundModule;

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
  public void SendNotification(final Integer key) {
      JcNotificationPlayerService jcNotificationPlayer;
      jcNotificationPlayer = new JcNotificationPlayerService(reactContext);
      MediaPlayer player = RNSoundModule.playerPool.get(1);

      Log.d("SOUND", "ALARM 2");

      jcNotificationPlayer.createNotificationPlayer("hello", key);

//      String CHANNEL_ID = "my_channel_01";
//
//      // First let's define the intent to trigger when notification is selected
//      // Start out by creating a normal intent (in this case to open an activity)
//      Intent intent = new Intent(reactContext, HandleSound.class);
//      // Next, let's turn this into a PendingIntent using
//      //   public static PendingIntent getActivity(Context context, int requestCode,
//      //       Intent intent, int flags)
//      int requestID = (int) System.currentTimeMillis(); //unique requestID to differentiate between various notification with same NotifId
//      int flags = PendingIntent.FLAG_UPDATE_CURRENT; // cancel old intent and create new one
//      PendingIntent pIntent = PendingIntent.getActivity(reactContext, requestID, intent, flags);
//
//      Notification notification =
//              new NotificationCompat.Builder(reactContext)
//                      // Show controls on lock screen even when user hides sensitive content.
//                      .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
//                      .setSmallIcon(R.drawable.ic_stat_player)
//                      // Add media control buttons that invoke intents in your media service
//                      .addAction(R.drawable.ic_pause, "Pause", pIntent)  // #1
//                      // Apply the media style template
//                      .setContentTitle("Wonderful music")
//                      .setContentText("My Awesome Band")
//                      .setStyle(new NotificationCompat.MediaStyle()
//                              .setMediaSession(null))
//                      .build();
//
//      // Get the notification manager system service
//      NotificationManager mNotificationManager =
//              (NotificationManager) reactContext.getSystemService(reactContext.NOTIFICATION_SERVICE);
//      // mId allows you to update the notification later on.
//      mNotificationManager.notify(0, notification);

  }
}