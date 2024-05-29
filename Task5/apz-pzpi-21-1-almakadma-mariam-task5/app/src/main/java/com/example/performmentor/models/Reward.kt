// Reward.kt
package com.example.performmentor.models

data class Reward(
    val reward_id: Long,
    val title: String,
    val description: String,
    val points_required: Int,
    val type: String,
    val company_id: Long
)