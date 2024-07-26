package com.example.took_app

import android.Manifest
import android.content.pm.PackageManager
import android.content.Context
import android.location.Location
import android.location.LocationListener
import android.location.LocationManager
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.biometric.BiometricPrompt
import java.util.concurrent.Executor


class WebAppInterface(private val context: Context, private val webView: WebView) {

    private lateinit var locationManager: LocationManager

    @JavascriptInterface
    fun showToast(message: String){
        Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
    }

    @JavascriptInterface
    fun performAction() {
        // 여기에 Android에서 수행할 액션을 추가합니다.
        Toast.makeText(context, "Action performed!", Toast.LENGTH_SHORT).show()
    }



    @JavascriptInterface
    fun getLocation() {
        // LocationManager 초기화
        locationManager = context.getSystemService(Context.LOCATION_SERVICE) as LocationManager

        // 위치 권한 확인
        if (ContextCompat.checkSelfPermission(context, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            // 위치 업데이트 요청
            locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0, 0f, locationListener)
        } else {
            // 권한이 없을 경우
            Toast.makeText(context, "Location permission not granted", Toast.LENGTH_SHORT).show()
        }
    }




    private val locationListener = object : LocationListener {
        override fun onLocationChanged(location: Location) {
            val latitude = location.latitude
            val longitude = location.longitude
            // JavaScript로 위치 값을 전달
            webView.post {
                webView.evaluateJavascript("javascript:onLocationReceived($latitude, $longitude)", null)
            }
            locationManager.removeUpdates(this)
        }

        override fun onStatusChanged(provider: String?, status: Int, extras: Bundle?) {}
        override fun onProviderEnabled(provider: String) {}
        override fun onProviderDisabled(provider: String) {}
    }

}
