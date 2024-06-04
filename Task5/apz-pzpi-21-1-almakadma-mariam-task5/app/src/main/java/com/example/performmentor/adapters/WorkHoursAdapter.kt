package com.example.performmentor.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.performmentor.R
import com.example.performmentor.models.WorkHours

class WorkHoursAdapter(private val workHoursList: List<WorkHours>) : RecyclerView.Adapter<WorkHoursAdapter.WorkHoursViewHolder>() {

    class WorkHoursViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val tvWorkDate: TextView = itemView.findViewById(R.id.tvWorkDate)
        val tvStartTime: TextView = itemView.findViewById(R.id.tvStartTime)
        val tvBreakStartTime: TextView = itemView.findViewById(R.id.tvBreakStartTime)
        val tvBreakEndTime: TextView = itemView.findViewById(R.id.tvBreakEndTime)
        val tvEndTime: TextView = itemView.findViewById(R.id.tvEndTime)
        val tvTotalWorkDuration: TextView = itemView.findViewById(R.id.tvTotalWorkDuration)
        val tvTotalBreakDuration: TextView = itemView.findViewById(R.id.tvTotalBreakDuration)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): WorkHoursViewHolder {
        val itemView = LayoutInflater.from(parent.context).inflate(R.layout.item_work_hours, parent, false)
        return WorkHoursViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: WorkHoursViewHolder, position: Int) {
        val currentWorkHours = workHoursList[position]
        holder.tvWorkDate.text = currentWorkHours.date
        holder.tvStartTime.text = currentWorkHours.start_time ?: "N/A"
        holder.tvBreakStartTime.text = currentWorkHours.break_start_time ?: "N/A"
        holder.tvBreakEndTime.text = currentWorkHours.break_end_time ?: "N/A"
        holder.tvEndTime.text = currentWorkHours.end_time ?: "N/A"
        holder.tvTotalWorkDuration.text = currentWorkHours.total_work_duration_minutes?.toString() ?: "N/A"
        holder.tvTotalBreakDuration.text = currentWorkHours.total_break_duration_minutes?.toString() ?: "N/A"
    }

    override fun getItemCount() = workHoursList.size
}
