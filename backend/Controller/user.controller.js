const { User, Recipe } = require("../models/index")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


module.exports = {
    register: async (req, res) => {
        try {
            const { email, name, password } = req.body

            if (!email || !name || !password) {
                return res.status(400).send({ message: "All fields are required" })
            }

            const existingUser = await User.findOne({ where: { email } })
            if (existingUser) {
                return res.status(400).send({ message: "User already exists" })
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = await User.create({
                email,
                password: hashedPassword,
                name
            })

       
            const userResponse = {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name
            }

            return res.status(201).send({
                message: "Registration successful",
                user: userResponse
            })

        } catch (error) {
            console.error("Registration error:", error)
            return res.status(500).send({ message: "Internal server error" })
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body

         
            if (!email || !password) {
                return res.status(400).send({ message: "Email and password are required" })
            }

            const user = await User.findOne({ 
                where: { email },
                attributes: ['id', 'email', 'name', 'password'] 
            })

            if (!user) {
                return res.status(404).send({ message: "Invalid credentials" })
            }

            const validPassword = await bcrypt.compare(password, user.password)
            if (!validPassword) {
                return res.status(401).send({ message: "Invalid credentials" })
            }

            const token = jwt.sign(
                { id: user.id }, 
                process.env.JWT_SECRET || "1234", 
                { expiresIn: "7d" }
            )

          
            const userResponse = {
                id: user.id,
                email: user.email,
                name: user.name
            }

            return res.status(200).send({
                message: "Login successful",
                user: userResponse,
                token
            })

        } catch (error) {
            console.error("Login error:", error)
            return res.status(500).send({ message: "Internal server error" })
        }
    },

    currentUser: async (req, res) => {
        try {
            const user = await User.findOne({
                where: { id: req.user },
                attributes: ['id', 'email', 'name'],
                include: [{
                    model: Recipe,
                    attributes: ['id', 'title','description', 'cookingTime', 'PrepTime',' ingredients',' instructions']
                }]
            })

            if (!user) {
                return res.status(404).send({ message: "User not found" })
            }

            res.status(200).send(user)

        } catch (error) {
            console.error("Current user error:", error)
            return res.status(500).send({ message: "Internal server error" })
        }
    },

    getUser: async (req, res) => {
        try {
            const userId = req.user
            const user = await User.findByPk(userId, {
                attributes: ['id', 'name', 'email']
            })
            if (!user) {
                return res.status(404).send({ message: "User not found" })
            }
            res.status(200).send(user)
        } catch (error) {
            res.status(500).send({ message: "Error fetching user data" })
        }
    },

    updateUser: async (req, res) => {
        try {
            const userId = req.user
            const { name, email, currentPassword, newPassword } = req.body

            const user = await User.findByPk(userId)
            if (!user) {
                return res.status(404).send({ message: "User not found" })
            }

            if (currentPassword) {
                const isValidPassword = await bcrypt.compare(currentPassword, user.password)
                if (!isValidPassword) {
                    return res.status(400).send({ message: "Current password is incorrect" })
                }
                if (newPassword) {
                    const hashedPassword = await bcrypt.hash(newPassword, 10)
                    user.password = hashedPassword
                }
            }

            user.name = name || user.name
            user.email = email || user.email
            await user.save()

            res.status(200).send({ message: "Profile updated successfully" })
        } catch (error) {
            res.status(500).send({ message: "Error updating profile" })
        }
    }
}