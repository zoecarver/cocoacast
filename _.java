package com.reactlibrary;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.MediaPlayer;
import android.os.Build;
import android.support.v4.app.NotificationCompat;
import android.util.Log;
import android.widget.RemoteViews;

import com.zmxv.RNSound.RNSoundModule;

import java.net.URL;

class JcNotificationPlayerService {
    static final String NEXT = "NEXT";
    static final String PREVIOUS = "PREVIOUS";
    static final String PAUSE = "PAUSE";
    static final String PLAY = "PLAY";
    static final String ACTION = "ACTION";
    static final String PLAYLIST = "PLAYLIST";
    static final String CURRENT_AUDIO = "CURRENT_AUDIO";

    private static final int NOTIFICATION_ID = 100;
    private static final int NEXT_ID = 0;
    private static final int PREVIOUS_ID = 1;
    private static final int PLAY_ID = 2;
    private static final int PAUSE_ID = 3;

    private NotificationManager notificationManager;
    private Context context;
    private String title;
    private String time  = "00:00";
    private int iconResource;
    private Notification notification;
    private NotificationCompat.Builder notificationCompat;

    MediaPlayer player = RNSoundModule.playerPool.get(1);

    public JcNotificationPlayerService(Context context){
        this.context = context;
    }

    public void createNotificationPlayer(String title) {

        Log.d("JCNotification", "CreateCotificationPlayer");
        this.title = title;
        Intent openUi = new Intent(context, context.getClass());
        openUi.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);

        if (notificationManager == null) {
            notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            notification = new Notification.Builder(context)
                    .setVisibility(Notification.VISIBILITY_PUBLIC)
                    .setSmallIcon(R.drawable.icon)
                    .setLargeIcon(BitmapFactory.decodeResource(context.getResources(), R.drawable.icon))
                    .setContent(createNotificationPlayerView())
                    .setContentIntent(PendingIntent.getActivity(context, NOTIFICATION_ID, openUi, PendingIntent.FLAG_CANCEL_CURRENT))
                    .setCategory(Notification.CATEGORY_SOCIAL)
                    .build();
            //notificationManager.notify(NOTIFICATION_ID, notification);
            Log.d("notified", "in if");
            // Sets an ID for the notification
            int mNotificationId = 001;
// Gets an instance of the NotificationManager service
            NotificationManager mNotifyMgr =
                    (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
// Builds the notification and issues it.
            mNotifyMgr.notify(mNotificationId, notification);
        } else {
            notificationCompat = new NotificationCompat.Builder(context)
                    //TODO: Set to API below Build.VERSION.SDK_INT
                    .setVisibility(Notification.VISIBILITY_PUBLIC)
                    .setSmallIcon(R.drawable.icon)
                    .setLargeIcon(BitmapFactory.decodeResource(context.getResources(), R.drawable.icon))
                    .setContent(createNotificationPlayerView())
                    .setContentIntent(PendingIntent.getActivity(context, NOTIFICATION_ID, openUi, PendingIntent.FLAG_CANCEL_CURRENT))
                    .setCategory(Notification.CATEGORY_SERVICE);
            notificationManager.notify(NOTIFICATION_ID, notificationCompat.build());
            Log.d("notified", "in else");
        }
    }

    private RemoteViews createNotificationPlayerView() {
        Log.d("Creating: ", "Pending Intent Play - CNPV");
        RemoteViews remoteView;

        if (player.isPlaying()) { 
            Log.d("player:", "is playing");
            remoteView = new RemoteViews(context.getPackageName(), R.layout.notification_pause);
            remoteView.setOnClickPendingIntent(R.id.btn_pause_notification, buildPendingIntent(PAUSE, 1));
        } else {
            Log.d("player:", "is NOT playing");
            remoteView = new RemoteViews(context.getPackageName(), R.layout.notification_play);
            remoteView.setOnClickPendingIntent(R.id.btn_play_notification, buildPendingIntent(PLAY, 1));
        }

        remoteView.setTextViewText(R.id.txt_current_music_notification, title);
        remoteView.setTextViewText(R.id.txt_duration_notification, time);

        return remoteView;
    }

    private PendingIntent buildPendingIntent(String action, int id) {
        Intent playIntent = new Intent(context.getApplicationContext(), com.reactlibrary.JcPlayerNotificationReceiver.class);
        playIntent.putExtra(ACTION, action);

        return PendingIntent.getBroadcast(context.getApplicationContext(), id, playIntent, PendingIntent.FLAG_UPDATE_CURRENT);
    }
//
//    public void onPreparedAudio(String audioName, int duration) {
//
//    }
//
//    public void onCompletedAudio() {
//
//    }
//
//    public void onPaused() {
//        createNotificationPlayer(title, iconResource);
//    }
//
//    public void onContinueAudio() {
//
//    }
//
//    public void onPlaying() {
//        createNotificationPlayer(title, iconResource);
//    }
//
//    public void onTimeChanged(long currentTime) {
//        long aux = currentTime / 1000;
//        int minutes = (int) (aux / 60);
//        int seconds = (int) (aux % 60);
//        final String sMinutes = minutes < 10 ? "0" + minutes : minutes + "";
//        final String sSeconds = seconds < 10 ? "0" + seconds : seconds + "";
//        this.time = sMinutes + ":" + sSeconds;
//
//        createNotificationPlayer(title, iconResource);
//    }
//
//    public void updateTitle(String title) {
//        this.title = title;
//        createNotificationPlayer(title, iconResource);
//    }
//
//    public void destroyNotificationIfExists() {
//        if (notificationManager != null) {
//            try {
//                notificationManager.cancel(NOTIFICATION_ID);
//            } catch (NullPointerException e) {
//                e.printStackTrace();
//            }
//        }
//    }
}