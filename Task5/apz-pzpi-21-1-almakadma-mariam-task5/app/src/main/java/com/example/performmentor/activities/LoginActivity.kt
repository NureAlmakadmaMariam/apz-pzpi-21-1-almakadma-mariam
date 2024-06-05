package com.example.performmentor.activities

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import com.example.performmentor.R
import com.example.performmentor.models.LoginRequest
import com.example.performmentor.models.User
import com.example.performmentor.network.RetrofitInstance
import com.example.performmentor.services.AuthService
import com.example.performmentor.util.BaseActivity
import com.example.performmentor.util.SessionManager
import kotlinx.coroutines.*
import retrofit2.HttpException
import retrofit2.Response

class LoginActivity : BaseActivity() {

    private lateinit var emailInput: EditText
    private lateinit var passwordInput: EditText
    private lateinit var loginBtn: Button
    private lateinit var btnEnglish: Button
    private lateinit var btnUkrainian: Button
    private lateinit var sessionManager: SessionManager
    private val authService: AuthService by lazy {
        RetrofitInstance.retrofit.create(AuthService::class.java)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        layoutInflater.inflate(R.layout.activity_login, findViewById(R.id.activity_content), true)

        sessionManager = SessionManager(this)

        emailInput = findViewById(R.id.email_input)
        passwordInput = findViewById(R.id.password_input)
        loginBtn = findViewById(R.id.login_btn)
        btnEnglish = findViewById(R.id.btn_english)
        btnUkrainian = findViewById(R.id.btn_ukrainian)

        loginBtn.setOnClickListener {
            val email = emailInput.text.toString().trim()
            val password = passwordInput.text.toString().trim()

            if (email.isNotEmpty() && password.isNotEmpty()) {
                login(email, password)
            } else {
                Toast.makeText(this, R.string.email_password_required, Toast.LENGTH_SHORT).show()
            }
        }

        btnEnglish.setOnClickListener {
            updateLocale("en")
        }

        btnUkrainian.setOnClickListener {
            updateLocale("uk")
        }
    }

    override fun updateTexts() {
        emailInput.hint = getString(R.string.email_hint)
        passwordInput.hint = getString(R.string.password_hint)
        loginBtn.text = getString(R.string.login_button)
    }

    private fun login(email: String, password: String) {
        val loginRequest = LoginRequest(email, password)
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val response: Response<User> = authService.login(loginRequest)
                if (response.isSuccessful) {
                    val user = response.body()
                    user?.let {
                        sessionManager.saveUserId(it.userId)
                        runOnUiThread {
                            Toast.makeText(this@LoginActivity, R.string.login_success, Toast.LENGTH_SHORT).show()
                            startActivity(Intent(this@LoginActivity, RewardActivity::class.java))
                            finish()
                        }
                    } ?: run {
                        Log.e("LoginActivity", "User ID not found in the response")
                        runOnUiThread {
                            Toast.makeText(this@LoginActivity, R.string.error_occurred, Toast.LENGTH_SHORT).show()
                        }
                    }
                } else {
                    Log.e("LoginActivity", "Login failed: ${response.message()}")
                    runOnUiThread {
                        Toast.makeText(this@LoginActivity, R.string.login_failed, Toast.LENGTH_SHORT).show()
                    }
                }
            } catch (e: HttpException) {
                Log.e("LoginActivity", "HTTP Error: ${e.message()}")
                runOnUiThread {
                    Toast.makeText(this@LoginActivity, R.string.login_failed, Toast.LENGTH_SHORT).show()
                }
            } catch (e: Throwable) {
                Log.e("LoginActivity", "Error: ${e.message}")
                runOnUiThread {
                    Toast.makeText(this@LoginActivity, R.string.error_occurred, Toast.LENGTH_SHORT).show()
                }
            }
        }
    }
}
