// WorkHours.kt
package com.example.performmentor.models

import com.google.gson.annotations.SerializedName

data class WorkHours(
    @SerializedName("work_hours_id")
    val workHoursId: Long,

    @SerializedName("user_id")
    val userId: Long,

    @SerializedName("date")
    val date: String,

    @SerializedName("start_time")
    val startTime: String?,

    @SerializedName("break_start_time")
    val breakStartTime: String?,

    @SerializedName("break_end_time")
    val breakEndTime: String?,

    @SerializedName("end_time")
    val endTime: String?,

    @SerializedName("total_break_duration_minutes")
    val totalBreakDurationMinutes: Double?,

    @SerializedName("total_work_duration_minutes")
    val totalWorkDurationMinutes: Double?,

    @SerializedName("total_overtime_minutes")
    val totalOvertimeMinutes: Double?
)