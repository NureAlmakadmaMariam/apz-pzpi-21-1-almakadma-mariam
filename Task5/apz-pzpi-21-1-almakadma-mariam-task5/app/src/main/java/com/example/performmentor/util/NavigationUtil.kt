package com.example.performmentor.util

import android.app.Activity
import android.content.Context
import android.content.Intent
import com.example.performmentor.activities.RewardActivity
import com.example.performmentor.activities.WorkHoursActivity
import com.example.performmentor.R

object NavigationUtil {
    fun handleBottomNavigation(context: Context, itemId: Int) {
        when (itemId) {
            R.id.work_hours -> navigateToWorkHours(context)
            R.id.reward -> navigateToRewards(context)
            R.id.logout -> logout(context)
        }
    }

    private fun navigateToWorkHours(context: Context) {
        val intent = Intent(context, WorkHoursActivity::class.java)
        context.startActivity(intent)
    }

    private fun navigateToRewards(context: Context) {
        val intent = Intent(context, RewardActivity::class.java)
        context.startActivity(intent)
    }

    private fun logout(context: Context) {
        if (context is Activity) {
            context.finishAffinity()
        }
    }
}
