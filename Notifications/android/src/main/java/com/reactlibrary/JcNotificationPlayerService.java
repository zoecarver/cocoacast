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

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by Zoe 11/07/17.
 */
class JcNotificationPlayerService {
    static final String NEXT = "NEXT";
    static final String PREVIOUS = "PREVIOUS";
    static final String PAUSE = "PAUSE";
    static final String PLAY = "PLAY";
    static final String ACTION = "ACTION";
    static final String PLAYLIST = "PLAYLIST";
    static final String CURRENT_AUDIO = "CURRENT_AUDIO";

    private static int NOTIFICATION_ID = 100;
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

    public JcNotificationPlayerService(Context context){
        this.context = context;
    }
    public static int player_key;

    public void createNotificationPlayer(String title, int iconResourceResource) {
        this.title = title;
        this.player_key = iconResourceResource;
        Intent openUi = new Intent(context, context.getClass());
        openUi.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);

        if (notificationManager == null) {
            notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        }

        //attempting to add costom images...
        Bitmap image = BitmapFactory.decodeResource(context.getResources(), R.drawable.icon);

        try {
            URL url = new URL("http://static1.squarespace.com/static/52d66949e4b0a8cec3bcdd46/52d67282e4b0cca8969714fa/59e7fd07d7bdce4230d501ea/1508419814250/1500w/Hello+Internet+slides.192.png");
            image = BitmapFactory.decodeStream(url.openConnection().getInputStream());
        } catch(IOException e) {
            System.out.println(e);
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            notification = new Notification.Builder(context)
                    .setVisibility(Notification.VISIBILITY_PUBLIC)
                    .setSmallIcon(R.drawable.icon)
                    .setLargeIcon(image)
                    .setContent(createNotificationPlayerView())
                    .setContentIntent(PendingIntent.getActivity(context, NOTIFICATION_ID, openUi, PendingIntent.FLAG_CANCEL_CURRENT))
                    .setCategory(Notification.CATEGORY_SOCIAL)
                    .build();
            notificationManager.notify(NOTIFICATION_ID, notification);
        } else {
            notificationCompat = new NotificationCompat.Builder(context)
                    //TODO: Set to API below Build.VERSION.SDK_INT
                    .setVisibility(Notification.VISIBILITY_PUBLIC)
                    .setSmallIcon(R.drawable.icon)
                    .setLargeIcon(image) //BitmapFactory.decodeResource(context.getResources(), R.drawable.icon)
                    .setContent(createNotificationPlayerView())
                    .setContentIntent(PendingIntent.getActivity(context, NOTIFICATION_ID, openUi, PendingIntent.FLAG_CANCEL_CURRENT))
                    .setCategory(Notification.CATEGORY_SOCIAL);
            notificationManager.notify(NOTIFICATION_ID, notificationCompat.build());
        }

        //NOTIFICATION_ID++;
    }

    public void updateNotification() {
        createNotificationPlayer(title, player_key);
    }

    public static Bitmap getBitmapFromURL(String src) {
        try {
            URL url = new URL(src);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoInput(true);
            connection.connect();
            InputStream input = connection.getInputStream();
            Bitmap myBitmap = BitmapFactory.decodeStream(input);
            return myBitmap;
        } catch (IOException e) {
            // Log exception
            return null;
        }
    }

    private RemoteViews createNotificationPlayerView() {
        MediaPlayer player = RNSoundModule.playerPool.get(player_key);
        RemoteViews remoteView;

        if (player != null && player.isPlaying()) {
            Log.d("SEND", "Pause");
            remoteView = new RemoteViews(context.getPackageName(), R.layout.notification_pause);
            remoteView.setOnClickPendingIntent(R.id.btn_pause_notification, buildPendingIntent(PAUSE, PAUSE_ID));
        } else {
            Log.d("SEND", "Play");
            remoteView = new RemoteViews(context.getPackageName(), R.layout.notification_play);
            remoteView.setOnClickPendingIntent(R.id.btn_play_notification, buildPendingIntent(PLAY, PLAY_ID));
        }
//
//        Log.d("SEND", "Play");
//        remoteView = new RemoteViews(context.getPackageName(), R.layout.notification_play);
//        remoteView.setOnClickPendingIntent(R.id.btn_play_notification, buildPendingIntent(PLAY, PLAY_ID));

        //remoteView = new RemoteViews(context.getPackageName(), R.layout.notification_play);
        //remoteView.setOnClickPendingIntent(R.id.btn_play_notification, buildPendingIntent(PAUSE, PLAY_ID));

        remoteView.setTextViewText(R.id.txt_current_music_notification, title);
        remoteView.setTextViewText(R.id.txt_duration_notification, time);
        remoteView.setImageViewResource(R.id.icon_player, R.drawable.icon);
        //remoteView.setOnClickPendingIntent(R.id.btn_next_notification, buildPendingIntent(NEXT, NEXT_ID));
        //remoteView.setOnClickPendingIntent(R.id.btn_prev_notification, buildPendingIntent(PREVIOUS, PREVIOUS_ID));

        return remoteView;
    }

    private PendingIntent buildPendingIntent(String action, int id) {
        Intent playIntent = new Intent(context.getApplicationContext(), JcPlayerNotificationReceiver.class);
        playIntent.putExtra(ACTION, action);

        return PendingIntent.getBroadcast(context.getApplicationContext(), id, playIntent, PendingIntent.FLAG_CANCEL_CURRENT);
    }

    public void destroyNotificationIfExists() {
        if (notificationManager != null) {
            try {
                notificationManager.cancel(NOTIFICATION_ID);
            } catch (NullPointerException e) {
                e.printStackTrace();
            }
        }
    }
}