package com.example.performmentor.activities

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.performmentor.R
import com.example.performmentor.adapters.RewardAdapter
import com.example.performmentor.models.UserReward
import com.example.performmentor.models.RewardResponse
import com.example.performmentor.network.RetrofitInstance
import com.example.performmentor.services.RewardService
import com.example.performmentor.util.BaseActivity
import com.example.performmentor.util.SessionManager
import com.example.performmentor.util.NavigationUtil
import com.google.android.material.bottomnavigation.BottomNavigationView
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class RewardActivity : BaseActivity() {

    private val rewardService: RewardService by lazy {
        RetrofitInstance.retrofit.create(RewardService::class.java)
    }

    private lateinit var sessionManager: SessionManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        layoutInflater.inflate(R.layout.activity_reward, findViewById(R.id.activity_content), true)

        sessionManager = SessionManager(this)

        setupBottomNavigationView()
        loadRewards()
    }

    private fun setupBottomNavigationView() {
        val bottomNavigationView = findViewById<BottomNavigationView>(R.id.bottomNavigationView)
        bottomNavigationView.setOnNavigationItemSelectedListener { item ->
            NavigationUtil.handleBottomNavigation(this, item.itemId)
            true
        }
    }

    private fun loadRewards() {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val userId: String? = sessionManager.getUserId()
                userId?.let { id ->
                    Log.d("RewardActivity", "Fetching rewards for user ID: $id")
                    val response: RewardResponse = rewardService.getRewardsByUserId(id.toInt())
                    val rewards: List<UserReward> = response.rewards
                    Log.d("RewardActivity", "Fetched rewards: $rewards")
                    withContext(Dispatchers.Main) {
                        handleRewards(rewards)
                    }
                } ?: run {
                    Log.e("RewardActivity", "User ID not found in session")
                    withContext(Dispatchers.Main) {
                        Toast.makeText(this@RewardActivity, R.string.user_id_not_found, Toast.LENGTH_SHORT).show()
                    }
                }
            } catch (e: Exception) {
                Log.e("RewardActivity", "Failed to load rewards", e)
                withContext(Dispatchers.Main) {
                    Toast.makeText(this@RewardActivity, R.string.failed_to_load_rewards, Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    private fun handleRewards(rewards: List<UserReward>) {
        val layoutManager = LinearLayoutManager(this)
        val recyclerView = findViewById<RecyclerView>(R.id.rewardRecyclerView)
        recyclerView.layoutManager = layoutManager
        val adapter = RewardAdapter(this, rewards) { userReward ->
            redeemReward(userReward)
        }
        recyclerView.adapter = adapter
    }

    private fun redeemReward(userReward: UserReward) {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                Log.d("RewardActivity", "Attempting to redeem reward with ID: ${userReward.users_reward_id}")
                val updatedReward = rewardService.markRewardAsRedeemed(userReward.users_reward_id)
                Log.d("RewardActivity", "Reward redeemed successfully: $updatedReward")
                withContext(Dispatchers.Main) {
                    Toast.makeText(this@RewardActivity, R.string.reward_redeemed_successfully, Toast.LENGTH_SHORT).show()
                    loadRewards()  // Update the list of rewards
                }
            } catch (e: Exception) {
                Log.e("RewardActivity", "Failed to redeem reward", e)
                withContext(Dispatchers.Main) {
                    Toast.makeText(this@RewardActivity, R.string.failed_to_redeem_reward, Toast.LENGTH_SHORT).show()
                }
            }
        }
    }
}

