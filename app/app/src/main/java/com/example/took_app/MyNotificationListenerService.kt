package com.example.took_app

import android.app.Notification
import android.app.Service
import android.content.Intent
import android.os.IBinder
import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification
import android.util.Log

class MyNotificationListenerService : NotificationListenerService() {

    private val TAG = "MyNotificationListenerService"

    override fun onNotificationPosted(sbn: StatusBarNotification?) {
        super.onNotificationPosted(sbn)

        val packageName: String = sbn?.packageName ?: "Null"
        val extras = sbn?.notification?.extras

        val extraTitle: String = extras?.get(Notification.EXTRA_TITLE).toString()
        val extraText: String = extras?.get(Notification.EXTRA_TEXT).toString()
        val extraBigText: String = extras?.get(Notification.EXTRA_BIG_TEXT).toString()
        val extraInfoText: String = extras?.get(Notification.EXTRA_INFO_TEXT).toString()
        val extraSubText: String = extras?.get(Notification.EXTRA_SUB_TEXT).toString()
        val extraSummaryText: String = extras?.get(Notification.EXTRA_SUMMARY_TEXT).toString()

        Log.d(
            TAG, "onNotificationPosted:\n" +
                    "PackageName: $packageName" +
                    "Title: $extraTitle\n" +
                    "Text: $extraText\n" +
                    "BigText: $extraBigText\n" +
                    "InfoText: $extraInfoText\n" +
                    "SubText: $extraSubText\n" +
                    "SummaryText: $extraSummaryText\n"
        )
    }
}