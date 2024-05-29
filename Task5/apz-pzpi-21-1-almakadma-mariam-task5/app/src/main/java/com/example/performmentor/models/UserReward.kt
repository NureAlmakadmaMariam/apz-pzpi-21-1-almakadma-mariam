// UserReward.kt
package com.example.performmentor.models

data class UserReward(
    val users_reward_id: Long,
    val redeemed: Boolean,
    val user_id: Long,
    val reward_id: Long,
    val reward: Reward
)