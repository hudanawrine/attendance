const adminModel = require("../Models/adminloginModel");

const adminLogin = async (req, res) => {
    const { UserName, Password, ConfirmPassword } = req.body;

    try {
        const adminDetails = await adminModel.create({
            userName,
            Password,
            setPassword,
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

module.exports = {adminLogin};
