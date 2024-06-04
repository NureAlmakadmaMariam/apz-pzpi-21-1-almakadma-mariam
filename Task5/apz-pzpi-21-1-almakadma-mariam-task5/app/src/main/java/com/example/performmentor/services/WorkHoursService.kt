// WorkHoursService.kt
package com.example.performmentor.services

import com.example.performmentor.models.WorkHours
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST
import retrofit2.http.GET
import retrofit2.http.Path

interface WorkHoursService {

    @POST("workH/start")
    suspend fun startWork(@Body userId: UserIdRequest): Response<WorkHours>

    @POST("workH/start-break")
    suspend fun startBreak(@Body userId: UserIdRequest): Response<WorkHours>

    @POST("workH/end-break")
    suspend fun endBreak(@Body userId: UserIdRequest): Response<Void>

    @POST("workH/end")
    suspend fun endWork(@Body userId: UserIdRequest): Response<Void>

    @GET("workH/user/{user_id}")
    suspend fun getAllByUser(@Path("user_id") userId: Long): Response<List<WorkHours>>
}

data class UserIdRequest(
    val user_id: Long
)
