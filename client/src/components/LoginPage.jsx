

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../styles/Login.css"

function LoginPage() {
  const navigate = useNavigate()
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:4000/api/user/login", loginData)
      localStorage.setItem("token", response.data.token)
      setIsAuthenticated(true)
      navigate("/main")
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
    fetch()
  }

  return (
    <div className="login-container">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card login-card">
              <div className="row g-0">
                <div className="col-md-6 login-form-container">
                  <div className="card-body p-4 p-md-5">
                    <div className="text-center mb-4">
                      <h4 className="brand-name">Habiba Collection</h4>
                      <div className="logo-container">
                        <i className="bi bi-book fs-1"></i>
                      </div>
                      <p className="mt-3 text-muted">Your personal recipe treasury</p>
                    </div>

                    <form onSubmit={handleLogin}>
                      <h5 className="fw-normal mb-4 text-center">Sign into your account</h5>

                      <div className="form-floating mb-4">
                        <input
                          type="email"
                          id="emailInput"
                          className="form-control"
                          placeholder="Email address"
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        />
                        <label htmlFor="emailInput">Email address</label>
                      </div>

                      <div className="form-floating mb-4">
                        <input
                          type="password"
                          id="passwordInput"
                          className="form-control"
                          placeholder="Password"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        />
                        <label htmlFor="passwordInput">Password</label>
                      </div>

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="rememberMe" />
                          <label className="form-check-label" htmlFor="rememberMe">
                            Remember me
                          </label>
                        </div>
                        <a href="#!" className="text-decoration-none">
                          Forgot password?
                        </a>
                      </div>

                      <div className="text-center mb-4">
                        <button className="btn btn-primary btn-lg w-100 login-btn" type="submit">
                          Log in
                        </button>
                      </div>

                      <div className="text-center">
                        <p className="mb-0">
                          Don't have an account?
                          <button
                            type="button"
                            className="btn btn-link text-decoration-none"
                            onClick={() => navigate("/register")}
                          >
                            Create new
                          </button>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="col-md-6 d-none d-md-block recipe-image-container">
                  <div className="recipe-overlay">
                    <div className="text-center text-white p-5">
                      <h2 className="fw-bold mb-4">Discover & Save</h2>
                      <p className="lead">Your favorite recipes in one place</p>
                      <div className="recipe-icons mt-5">
                        <i className="bi bi-egg-fried fs-1 mx-2"></i>
                        <i className="bi bi-cup-hot fs-1 mx-2"></i>
                        <i className="bi bi-basket fs-1 mx-2"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

