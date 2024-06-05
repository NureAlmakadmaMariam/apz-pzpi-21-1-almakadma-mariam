package com.example.performmentor.activities

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.performmentor.R
import com.example.performmentor.models.WorkHours
import com.example.performmentor.adapters.WorkHoursAdapter
import com.example.performmentor.services.WorkHoursService
import com.example.performmentor.services.UserIdRequest
import com.example.performmentor.network.RetrofitInstance
import com.example.performmentor.util.SessionManager
import com.example.performmentor.util.NavigationUtil
import com.google.android.material.bottomnavigation.BottomNavigationView
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch

class WorkHoursActivity : AppCompatActivity() {
    private val workHoursService = RetrofitInstance.retrofit.create(WorkHoursService::class.java)
    private lateinit var sessionManager: SessionManager

    private lateinit var recyclerViewWorkHours: RecyclerView
    private lateinit var workHoursAdapter: WorkHoursAdapter
    private val workHoursList = mutableListOf<WorkHours>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_work_hours)

        sessionManager = SessionManager(this)

        setupBottomNavigationView()
        setupButtons()
        setupRecyclerView()

        fetchWorkHours()
    }

    private fun setupBottomNavigationView() {
        val bottomNavigationView = findViewById<BottomNavigationView>(R.id.bottomNavigationView)
        bottomNavigationView.selectedItemId = R.id.work_hours
        bottomNavigationView.setOnNavigationItemSelectedListener { item ->
            NavigationUtil.handleBottomNavigation(this, item.itemId)
            true
        }
    }

    private fun setupButtons() {
        findViewById<Button>(R.id.btnStartWork).setOnClickListener { onStartWorkClicked() }
        findViewById<Button>(R.id.btnStartBreak).setOnClickListener { onStartBreakClicked() }
        findViewById<Button>(R.id.btnEndBreak).setOnClickListener { onEndBreakClicked() }
        findViewById<Button>(R.id.btnEndWork).setOnClickListener { onEndWorkClicked() }
    }

    private fun setupRecyclerView() {
        recyclerViewWorkHours = findViewById(R.id.recyclerViewWorkHours)
        workHoursAdapter = WorkHoursAdapter(workHoursList)
        recyclerViewWorkHours.layoutManager = LinearLayoutManager(this)
        recyclerViewWorkHours.adapter = workHoursAdapter
    }

    private fun fetchWorkHours() {
        val userId = sessionManager.getUserId()
        if (userId != null) {
            GlobalScope.launch(Dispatchers.Main) {
                val response = workHoursService.getAllByUser(userId.toLong())
                if (response.isSuccessful) {
                    val fetchedWorkHoursList = response.body()
                    if (fetchedWorkHoursList != null && fetchedWorkHoursList.isNotEmpty()) {
                        workHoursList.clear()
                        workHoursList.addAll(fetchedWorkHoursList)
                        workHoursAdapter.notifyDataSetChanged()
                    }
                } else {
                    showToast(getString(R.string.failed_to_fetch_work_hours))
                }
            }
        } else {
            showToast(getString(R.string.user_id_not_found))
        }
    }

    private fun onStartWorkClicked() {
        val userId = sessionManager.getUserId()
        if (userId != null) {
            GlobalScope.launch(Dispatchers.Main) {
                val response = workHoursService.startWork(UserIdRequest(userId.toLong()))
                if (response.isSuccessful) {
                    showToast(getString(R.string.work_started_successfully))
                    fetchWorkHours()
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
                    fetchWorkHours()
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
                    fetchWorkHours()
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
                    fetchWorkHours()
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
