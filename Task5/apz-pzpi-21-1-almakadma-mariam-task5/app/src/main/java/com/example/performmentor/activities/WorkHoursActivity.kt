package com.example.performmentor.activities

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.performmentor.R
import com.example.performmentor.services.WorkHoursService
import com.example.performmentor.services.UserIdRequest
import com.example.performmentor.network.RetrofitInstance
import com.example.performmentor.util.SessionManager
import com.google.android.material.bottomnavigation.BottomNavigationView
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch

class WorkHoursActivity : AppCompatActivity() {
    private val workHoursService = RetrofitInstance.retrofit.create(WorkHoursService::class.java)
    private lateinit var sessionManager: SessionManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_work_hours)

        sessionManager = SessionManager(this)

        setupBottomNavigationView()
        setupButtons()
    }

    private fun setupBottomNavigationView() {
        val bottomNavigationView = findViewById<BottomNavigationView>(R.id.bottomNavigationView)
        bottomNavigationView.selectedItemId = R.id.work_hours
        bottomNavigationView.setOnNavigationItemSelectedListener { item ->
            when (item.itemId) {
                R.id.home -> {
                    // Перехід до HomeActivity
                    startActivity(Intent(this, HomeActivity::class.java))
                    true
                }
                R.id.work_hours -> {
                    true
                }
                R.id.reward -> {
                    startActivity(Intent(this, RewardActivity::class.java))
                    true
                }
                else -> false
            }
        }
    }

    private fun setupButtons() {
        findViewById<Button>(R.id.btnStartWork).setOnClickListener { onStartWorkClicked() }
        findViewById<Button>(R.id.btnStartBreak).setOnClickListener { onStartBreakClicked() }
        findViewById<Button>(R.id.btnEndBreak).setOnClickListener { onEndBreakClicked() }
        findViewById<Button>(R.id.btnEndWork).setOnClickListener { onEndWorkClicked() }
    }

    private fun onStartWorkClicked() {
        val userId = sessionManager.getUserId()
        if (userId != null) {
            GlobalScope.launch(Dispatchers.Main) {
                val response = workHoursService.startWork(UserIdRequest(userId.toLong()))
                if (response.isSuccessful) {
                    showToast(getString(R.string.work_started_successfully))
                } else {
                    showToast(getString(R.string.failed_to_start_work))
                }
            }
        } else {
            showToast(getString(R.string.user_id_not_found))
        }
    }

    private fun onStartBreakClicked() {
        val userId = sessionManager.getUserId()
        if (userId != null) {
            GlobalScope.launch(Dispatchers.Main) {
                val response = workHoursService.startBreak(UserIdRequest(userId.toLong()))
                if (response.isSuccessful) {
                    showToast(getString(R.string.break_started_successfully))
                } else {
                    showToast(getString(R.string.failed_to_start_break))
                }
            }
        } else {
            showToast(getString(R.string.user_id_not_found))
        }
    }

    private fun onEndBreakClicked() {
        val userId = sessionManager.getUserId()
        if (userId != null) {
            GlobalScope.launch(Dispatchers.Main) {
                val response = workHoursService.endBreak(UserIdRequest(userId.toLong()))
                if (response.isSuccessful) {
                    showToast(getString(R.string.break_ended_successfully))
                } else {
                    showToast(getString(R.string.failed_to_end_break))
                }
            }
        } else {
            showToast(getString(R.string.user_id_not_found))
        }
    }

    private fun onEndWorkClicked() {
        val userId = sessionManager.getUserId()
        if (userId != null) {
            GlobalScope.launch(Dispatchers.Main) {
                val response = workHoursService.endWork(UserIdRequest(userId.toLong()))
                if (response.isSuccessful) {
                    showToast(getString(R.string.work_ended_successfully))
                } else {
                    showToast(getString(R.string.failed_to_end_work))
                }
            }
        } else {
            showToast(getString(R.string.user_id_not_found))
        }
    }

    private fun showToast(message: String) {
        Toast.makeText(this@WorkHoursActivity, message, Toast.LENGTH_SHORT).show()
    }
}