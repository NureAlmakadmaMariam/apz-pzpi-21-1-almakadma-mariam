package com.example.performmentor.models

import com.google.gson.annotations.SerializedName

data class User(
    @SerializedName("user_id") val userId: String,
    @SerializedName("role") val role: String?,
    @SerializedName("department_id") val departmentId: String?,
)
