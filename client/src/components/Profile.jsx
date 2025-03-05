

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./styles.css"

const Profile = ({ toggleMenu, showMenu, handleLogout }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [editing, setEditing] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get("http://localhost:4000/api/user/getUser", {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser({
        ...user,
        name: response.data.name,
        email: response.data.email
      })
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (user.newPassword !== user.confirmPassword) {
      setError("New passwords don't match")
      return
    }

    try {
      const token = localStorage.getItem("token")
      await axios.put(
        "http://localhost:4000/api/user/update",
        {
          name: user.name,
          email: user.email,
          currentPassword: user.currentPassword,
          newPassword: user.newPassword
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setEditing(false)
      fetchUserData()
    } catch (error) {
      setError(error.response?.data?.message || "Error updating profile")
    }
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-trigger" onClick={toggleMenu}>
        <img src={user.avatar || "/placeholder.svg"} alt="Profile" className="profile-avatar" />
        <span className="profile-name">{user.name}</span>
      </div>

      {showMenu && (
        <div className="profile-dropdown">
          <div className="profile-header">
            <img src={user.avatar || "/placeholder.svg"} alt="Profile" className="profile-avatar-large" />
            <div className="profile-info">
              <h4>{user.name}</h4>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="profile-menu">
            <ul>
              <li onClick={() => navigate("/Profile")}>
                <span className="menu-item">My Profile</span>
              </li>
              <li onClick={() => navigate("/favorites")}>
                <span className="menu-item">Favorite Recipes</span>
              </li>
              <li className="divider"></li>
              <li onClick={handleLogout}>
                <span className="menu-item logout">Logout</span>
              </li>
            </ul>
          </div>

          {editing && (
            <form onSubmit={handleUpdate} className="profile-edit-form">
              {error && <div className="error-message">{error}</div>}
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                placeholder="Name"
              />
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
              />
              <input
                type="password"
                value={user.currentPassword}
                onChange={(e) => setUser({ ...user, currentPassword: e.target.value })}
                placeholder="Current Password"
              />
              <input
                type="password"
                value={user.newPassword}
                onChange={(e) => setUser({ ...user, newPassword: e.target.value })}
                placeholder="New Password"
              />
              <input
                type="password"
                value={user.confirmPassword}
                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                placeholder="Confirm New Password"
              />
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setEditing(false)}>Cancel</button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}

export default Profile

