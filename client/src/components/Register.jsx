import React,{useState} from 'react'
import axios from "axios"
import {useNavigate } from 'react-router-dom';

function Register() {
      const navigate=useNavigate()
     const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
      });
      const handleRegister = async (e,registerData) => {
        console.log("registerData",registerData);
        
        e.preventDefault();
        if (registerData.password !== registerData.repeatPassword) {
          alert("Passwords don't match!");
          return;
        }
        try {
          await axios.post('http://localhost:4000/api/user/register', registerData);
          navigate("/")
          
        } catch (error) {
          console.log(error.response)
          console.error('Registration failed:', error);
        }
      };
  return (
    <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-xl-10">
        <div className="card rounded-3 text-black">
          <div className="row g-0">
            <div className="col-lg-6">
              <div className="card-body p-md-5 mx-md-4">
                
                <form onSubmit={(e) => handleRegister(e, registerData)}>
                  <p>Create your account</p>

                  <div data-mdb-input-init className="form-outline mb-4">
                      <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={registerData.name}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, name: e.target.value })
                      }
                      placeholder="Name"
                    />
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                      <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, email: e.target.value })
                      }
                      placeholder="Email"
                    />
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                      <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, password: e.target.value })
                      }
                      placeholder="Password"
                    />
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                      <label className="form-label">Repeat Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={registerData.repeatPassword}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, repeatPassword: e.target.value })
                      }
                      placeholder="Repeat password"
                    />
                  </div>

                  <div className="text-center pt-1 mb-5 pb-1">
                    <button
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-primary btn-block fa-lg gradient-custom-1 mb-3"
                      type="submit"
                    >
                      Register
                    </button>
                  </div>

                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <p className="mb-0 me-2">Already have an account?</p>
                    <button
                      type="button"
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-outline-danger"
                      onClick={() => navigate("/")}
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>

            
            <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        
    
  )
}

export default Register
