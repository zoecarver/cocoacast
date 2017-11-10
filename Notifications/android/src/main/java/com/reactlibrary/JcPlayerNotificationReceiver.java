package com.reactlibrary;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.media.MediaPlayer;
import android.util.Log;

import com.zmxv.RNSound.RNSoundModule;

public class JcPlayerNotificationReceiver extends BroadcastReceiver {
    public JcPlayerNotificationReceiver() {
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d("SOUND", "recived");
        String action = "";

        MediaPlayer player = RNSoundModule.playerPool.get(0);

        JcNotificationPlayerService jcNotificationPlayer = new JcNotificationPlayerService(context);

        if (intent.hasExtra(com.reactlibrary.JcNotificationPlayerService.ACTION)) {
            action = intent.getStringExtra(com.reactlibrary.JcNotificationPlayerService.ACTION);
        }

        switch (action) {
            case JcNotificationPlayerService.PLAY:
                try {
                    com.zmxv.RNSound.RNSoundModule.play_notification(0, null);
                    jcNotificationPlayer.updateNotification();
                    //jcNotificationPlayer.createNotificationPlayer("hello", 1);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                break;

            case JcNotificationPlayerService.PAUSE:
                try {
                    if(player != null) {
                        com.zmxv.RNSound.RNSoundModule.pause_notification(0);
                        jcNotificationPlayer.updateNotification();
                        //jcNotificationPlayer.createNotificationPlayer("hello", 1);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
                break;
        }
    }
}
