package com.example.performmentor.util

import android.content.Context
import android.content.SharedPreferences

class SessionManager(context: Context) {

    private val sharedPreferences: SharedPreferences = context.getSharedPreferences(
        "UserSession",
        Context.MODE_PRIVATE
    )

    fun saveUserId(userId: String) {
        val editor = sharedPreferences.edit()
        editor.putString("user_id", userId)
        editor.apply()
    }

    fun getUserId(): String? {
        return sharedPreferences.getString("user_id", null)
    }

    fun clear() {
        sharedPreferences.edit().clear().apply()
    }
}
