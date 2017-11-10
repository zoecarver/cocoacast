package com.reactlibrary;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.media.MediaPlayer;
import android.os.Build;
import android.support.annotation.RequiresApi;
import android.support.v4.app.NotificationCompat;
import android.util.Log;
import android.widget.RemoteViews;

import com.reactlibrary.JcPlayerNotificationReceiver;
import com.zmxv.RNSound.RNSoundModule;

/**
 * Created by zoe on 11/07/17.
 */
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
    private Notification notification;
    private NotificationCompat.Builder notificationCompat;

    public int next = -1;

    public JcNotificationPlayerService(Context context){
        this.context = context;
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    public void createNotificationPlayer(String title, int iconResourceResource) {
        Log.d("in", "create notification");
        this.title = title;
        Intent openUi = new Intent(context, context.getClass());
        openUi.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);

        if (notificationManager == null) {
            notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        }

        notification = new Notification.Builder(context)
                .setVisibility(Notification.VISIBILITY_PUBLIC)
                .setSmallIcon(R.drawable.icon)
                .setLargeIcon(BitmapFactory.decodeResource(context.getResources(), R.drawable.icon))
                .setContent(createNotificationPlayerView())
                .setContentIntent(PendingIntent.getActivity(context, NOTIFICATION_ID, openUi, PendingIntent.FLAG_CANCEL_CURRENT))
                .setCategory(Notification.CATEGORY_SOCIAL)
                .build();

        int mNotificationId = 001;
        NotificationManager mNotifyMgr =
                (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        mNotifyMgr.notify(mNotificationId, notification);
    }

//    public void updateNotification() {
//        createNotificationPlayer(title);
//    }

    private RemoteViews createNotificationPlayerView() {
        RemoteViews remoteView;
        MediaPlayer player = RNSoundModule.playerPool.get(1);

        if (player != null && player.isPlaying()) {
            Log.d("player", "is playing");
            remoteView = new RemoteViews(context.getPackageName(), R.layout.notification_play);
            remoteView.setOnClickPendingIntent(R.id.btn_play_notification, buildPendingIntent(PLAY, 1));
        } else if (player != null) {
            Log.d("Player", "not playing");
            remoteView = new RemoteViews(context.getPackageName(), R.layout.notification_pause);
            remoteView.setOnClickPendingIntent(R.id.btn_pause_notification, buildPendingIntent(PAUSE, 1));
        } else {
            Log.d("player", "does not exist");
            return null;
        }

        remoteView.setTextViewText(R.id.txt_current_music_notification, title);
        remoteView.setTextViewText(R.id.txt_duration_notification, time);
        //remoteView.setImageViewResource(R.id.icon_player, iconResource);

        return remoteView;
    }

    private PendingIntent buildPendingIntent(String action, int id) {
        Intent playIntent = new Intent(context.getApplicationContext(), com.reactlibrary.JcPlayerNotificationReceiver.class);
        playIntent.putExtra(ACTION, action);
        next++;

        return PendingIntent.getBroadcast(context, next, playIntent, PendingIntent.FLAG_UPDATE_CURRENT);
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