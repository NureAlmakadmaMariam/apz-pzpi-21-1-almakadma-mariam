//package com.example.performmentor
//
//import android.os.Bundle
//import androidx.activity.enableEdgeToEdge
//import androidx.appcompat.app.AppCompatActivity
//import androidx.core.view.ViewCompat
//import androidx.core.view.WindowInsetsCompat
//
//class MainActivity : AppCompatActivity() {
//    override fun onCreate(savedInstanceState: Bundle?) {
//        super.onCreate(savedInstanceState)
//        enableEdgeToEdge()
//        setContentView(R.layout.activity_main)
//        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
//            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
//            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
//            insets
//        }
//    }
//}

//package com.example.performmentor.activities
//
//import android.os.Bundle
//import android.util.Log
//import android.widget.Toast
//import androidx.appcompat.app.AppCompatActivity
//import androidx.recyclerview.widget.LinearLayoutManager
//import androidx.recyclerview.widget.RecyclerView
//import com.example.performmentor.R
//import com.example.performmentor.adapters.RewardAdapter
//import com.example.performmentor.models.UserReward
//import com.example.performmentor.models.RewardResponse
//import com.example.performmentor.network.RetrofitInstance
//import com.example.performmentor.services.RewardService
//import kotlinx.coroutines.CoroutineScope
//import kotlinx.coroutines.Dispatchers
//import kotlinx.coroutines.launch
//import kotlinx.coroutines.withContext
//
//class RewardActivity : AppCompatActivity() {
//
//    private val rewardService: RewardService by lazy {
//        RetrofitInstance.retrofit.create(RewardService::class.java)
//    }
//
//    override fun onCreate(savedInstanceState: Bundle?) {
//        super.onCreate(savedInstanceState)
//        setContentView(R.layout.activity_reward)
//
//        loadRewards()
//    }
//
//    private fun loadRewards() {
//        CoroutineScope(Dispatchers.IO).launch {
//            try {
//                val userId: Int = 2
//                val response: RewardResponse = rewardService.getRewardsByUserId(userId)
//                val rewards: List<UserReward> = response.rewards
//                // Оновити інтерфейс у головному потоці
//                withContext(Dispatchers.Main) {
//                    handleRewards(rewards)
//                }
//            } catch (e: Exception) {
//                // Оповіщення користувача про помилку
//                withContext(Dispatchers.Main) {
//                    Toast.makeText(this@RewardActivity, "Failed to load rewards", Toast.LENGTH_SHORT).show()
//                }
//                // Лог помилки
//                Log.e("RewardActivity", "Failed to load rewards", e)
//            }
//        }
//    }
//
//
//    private fun handleRewards(rewards: List<UserReward>) {
//        // Налаштувати RecyclerView
//        val layoutManager = LinearLayoutManager(this)
//        val recyclerView = findViewById<RecyclerView>(R.id.rewardRecyclerView)
//        recyclerView.layoutManager = layoutManager
//        val adapter = RewardAdapter(rewards)
//        recyclerView.adapter = adapter
//    }
//
//}

//import android.content.Intent
//import android.os.Bundle
//import android.util.Log
//import android.widget.Toast
//import androidx.appcompat.app.AppCompatActivity
//import androidx.recyclerview.widget.LinearLayoutManager
//import androidx.recyclerview.widget.RecyclerView
//import com.example.performmentor.R
//import com.example.performmentor.adapters.RewardAdapter
//import com.example.performmentor.models.UserReward
//import com.example.performmentor.models.RewardResponse
//import com.example.performmentor.network.RetrofitInstance
//import com.example.performmentor.services.RewardService
//import kotlinx.coroutines.CoroutineScope
//import kotlinx.coroutines.Dispatchers
//import kotlinx.coroutines.launch
//import kotlinx.coroutines.withContext
//
//class RewardActivity : AppCompatActivity() {
//
//    private val rewardService: RewardService by lazy {
//        RetrofitInstance.retrofit.create(RewardService::class.java)
//    }
//
//
//    override fun onCreate(savedInstanceState: Bundle?) {
//        super.onCreate(savedInstanceState)
//        setContentView(R.layout.activity_reward)
//        loadRewards()
//    }
//
//    private fun loadRewards() {
//        CoroutineScope(Dispatchers.IO).launch {
//            try {
//                val userId: Int = 2
//                Log.d("RewardActivity", "Fetching rewards for user ID: $userId")
//                val response: RewardResponse = rewardService.getRewardsByUserId(userId)
//                val rewards: List<UserReward> = response.rewards
//                Log.d("RewardActivity", "Fetched rewards: $rewards")
//                withContext(Dispatchers.Main) {
//                    handleRewards(rewards)
//                }
//            } catch (e: Exception) {
//                Log.e("RewardActivity", "Failed to load rewards", e)
//                withContext(Dispatchers.Main) {
//                    Toast.makeText(this@RewardActivity, "Failed to load rewards", Toast.LENGTH_SHORT).show()
//                }
//            }
//        }
//    }
//
//    private fun handleRewards(rewards: List<UserReward>) {
//        val layoutManager = LinearLayoutManager(this)
//        val recyclerView = findViewById<RecyclerView>(R.id.rewardRecyclerView)
//        recyclerView.layoutManager = layoutManager
//        val adapter = RewardAdapter(rewards) { userReward ->
//            redeemReward(userReward)
//        }
//        recyclerView.adapter = adapter
//    }
//
//    private fun redeemReward(userReward: UserReward) {
//        CoroutineScope(Dispatchers.IO).launch {
//            try {
//                Log.d("RewardActivity", "Attempting to redeem reward with ID: ${userReward.users_reward_id}")
//                val updatedReward = rewardService.markRewardAsRedeemed(userReward.users_reward_id)
//                Log.d("RewardActivity", "Reward redeemed successfully: $updatedReward")
//                withContext(Dispatchers.Main) {
//                    Toast.makeText(this@RewardActivity, "Reward redeemed successfully!", Toast.LENGTH_SHORT).show()
//                    loadRewards()  // Update the list of rewards
//                }
//            } catch (e: Exception) {
//                Log.e("RewardActivity", "Failed to redeem reward", e)
//                withContext(Dispatchers.Main) {
//                    Toast.makeText(this@RewardActivity, "Failed to redeem reward", Toast.LENGTH_SHORT).show()
//                }
//            }
//        }
//    }
//}
package com.example.performmentor.activities
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.performmentor.R
import com.example.performmentor.adapters.RewardAdapter
import com.example.performmentor.models.UserReward
import com.example.performmentor.models.RewardResponse
import com.example.performmentor.network.RetrofitInstance
import com.example.performmentor.services.RewardService
import com.example.performmentor.util.SessionManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class RewardActivity : AppCompatActivity() {

    private val rewardService: RewardService by lazy {
        RetrofitInstance.retrofit.create(RewardService::class.java)
    }

    private lateinit var sessionManager: SessionManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_reward)

        sessionManager = SessionManager(this)
        loadRewards()
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
                        Toast.makeText(this@RewardActivity, "User ID not found in session", Toast.LENGTH_SHORT).show()
                    }
                }
            } catch (e: Exception) {
                Log.e("RewardActivity", "Failed to load rewards", e)
                withContext(Dispatchers.Main) {
                    Toast.makeText(this@RewardActivity, "Failed to load rewards", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    private fun handleRewards(rewards: List<UserReward>) {
        val layoutManager = LinearLayoutManager(this)
        val recyclerView = findViewById<RecyclerView>(R.id.rewardRecyclerView)
        recyclerView.layoutManager = layoutManager
        val adapter = RewardAdapter(rewards) { userReward ->
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
                    Toast.makeText(this@RewardActivity, "Reward redeemed successfully!", Toast.LENGTH_SHORT).show()
                    loadRewards()  // Update the list of rewards
                }
            } catch (e: Exception) {
                Log.e("RewardActivity", "Failed to redeem reward", e)
                withContext(Dispatchers.Main) {
                    Toast.makeText(this@RewardActivity, "Failed to redeem reward", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }
}
