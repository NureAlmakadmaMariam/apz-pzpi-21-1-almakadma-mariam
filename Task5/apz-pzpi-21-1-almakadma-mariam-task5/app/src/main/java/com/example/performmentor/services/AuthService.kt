package com.example.performmentor.services

import com.example.performmentor.models.LoginRequest
import com.example.performmentor.models.User
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

interface AuthService {
    @POST("users/login")
    suspend fun login(@Body loginRequest: LoginRequest): Response<User>
}
