package com.example.performmentor.activities

import android.content.res.Configuration
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.example.performmentor.R
import java.util.*

open class BaseActivity : AppCompatActivity() {

    protected lateinit var btnEnglish: Button
    protected lateinit var btnUkrainian: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_base)

        btnEnglish = findViewById(R.id.btn_english)
        btnUkrainian = findViewById(R.id.btn_ukrainian)

        btnEnglish.setOnClickListener {
            updateLocale("en")
        }

        btnUkrainian.setOnClickListener {
            updateLocale("uk")
        }
    }

    private fun updateLocale(languageCode: String) {
        val locale = Locale(languageCode)
        Locale.setDefault(locale)
        val config = Configuration()
        config.setLocale(locale)
        baseContext.resources.updateConfiguration(config, baseContext.resources.displayMetrics)
        updateTexts()
    }

    // Override this method in derived activities to update texts
    open fun updateTexts() {}
}

