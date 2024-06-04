package com.example.performmentor.adapters

import android.content.Context

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.performmentor.R
import com.example.performmentor.models.UserReward

class RewardAdapter(
    private val context: Context,
    private val rewards: List<UserReward>,
    private val onTakeRewardClick: (UserReward) -> Unit
) : RecyclerView.Adapter<RewardAdapter.RewardViewHolder>() {

    inner class RewardViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val titleTextView: TextView = itemView.findViewById(R.id.titleTextView)
        val descriptionTextView: TextView = itemView.findViewById(R.id.descriptionTextView)
        val rewardPointsRequired: TextView = itemView.findViewById(R.id.reward_points_required)
        val rewardType: TextView = itemView.findViewById(R.id.reward_type)
        val rewardRedeemed: TextView = itemView.findViewById(R.id.reward_redeemed)
        val takeRewardButton: Button = itemView.findViewById(R.id.take_reward_btn)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RewardViewHolder {
        val itemView = LayoutInflater.from(parent.context).inflate(R.layout.reward_list_item, parent, false)
        return RewardViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: RewardViewHolder, position: Int) {
        val currentReward = rewards[position]
        val reward = currentReward.reward
        holder.titleTextView.text = reward.title
        holder.descriptionTextView.text = reward.description
        holder.rewardPointsRequired.text = reward.points_required.toString()

        holder.rewardType.text = when (reward.type) {
            "physical" -> context.getString(R.string.physical_reward)
            "virtual" -> context.getString(R.string.virtual_reward)
            else -> reward.type
        }
        holder.rewardRedeemed.text = if (currentReward.redeemed) {
            context.getString(R.string.was_taken)
        } else {
            context.getString(R.string.was_not_taken)
        }

        holder.takeRewardButton.visibility = if (currentReward.redeemed) View.GONE else View.VISIBLE
        holder.takeRewardButton.setOnClickListener {
            onTakeRewardClick(currentReward)
        }
    }

    override fun getItemCount() = rewards.size
}
