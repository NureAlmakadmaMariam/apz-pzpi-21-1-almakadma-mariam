package com.example.performmentor.models

data class WorkHours(
    val id: Long,
    val user_id: Long,
    val date: String,
    val start_time: String?,
    val break_start_time: String?,
    val break_end_time: String?,
    val end_time: String?,
    val total_work_duration_minutes: Int?,
    val total_break_duration_minutes: Int?
)
