const { emplModel } = require("../Models/employeeloginModel");

const employeeLogin = async (req, res) => {
    const { Email, Password , ConfirmPassword } = req.body

    try {
        const empDetails = await emplModel.create({
            Email,
            password,
            ConfirmPassword,
        })
    } catch (error) {
        console.error(error); // For debugging
        return res.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

module.exports = employeeLogin ;