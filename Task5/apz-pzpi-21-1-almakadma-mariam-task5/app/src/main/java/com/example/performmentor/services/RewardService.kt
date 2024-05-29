package com.example.performmentor.services

import com.example.performmentor.models.UserReward
import com.example.performmentor.models.RewardResponse
import retrofit2.http.GET
import retrofit2.http.PUT
import retrofit2.http.Path

interface RewardService {
    @GET("users-reward/user/{userId}")
    suspend fun getRewardsByUserId(@Path("userId") userId: Int): RewardResponse

    @PUT("users-reward/{usersRewardId}")
    suspend fun markRewardAsRedeemed(@Path("usersRewardId") usersRewardId: Long): UserReward
}
