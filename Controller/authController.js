// const userModel = require("../Models/authModel.js")



// const createUser = async (req, res) => {
//     const { FirstName, LastName, Age, ContactNumber, Email, Address } = req.body;


//     try {
//         const userDetails = await userModel.create({
//             FirstName,
//             LastName,
//             Age,
//             ContactNumber,
//             Email,
//             Address,
//         })
//         res.json({ message: "Success", data:userDetails })
//     } catch (error){
//         res.json({
//             status: false,  
//             error: {}
//         })
//         return res.status(500).json("Something went wrong")
//     }
// }

// module.exports = { createUser }

const { userModel, adminModel, userlModel } = require("../Models/authModel.js");

const createUser = async (req, res) => {
    const { FirstName, LastName, Age, ContactNumber, Email, Address } = req.body;

    try {
        const employeeDetails = await userModel.create({
            FirstName,
            LastName,
            Age,
            ContactNumber,
            Email,
            Address,
        });

        return res.status(201).json({
            status: true,
            message: "User created successfully",
            data: employeeDetails,
        });
    } catch (error) {
        console.error(error); // For debugging
        return res.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};




const employeeList = async (req, res) => {
    try {
        const employeeget = await userModel.find();
        res.json(employeeget);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' })

    }
}




const profile = async (req , res) => {
    try{
        const _id = req.params.id;
        const emprofile = await userModel.findOne({_id});
        if(emprofile){
            res.json(emprofile);
        }else{
            res.status(404).json('Not Found.')
        }
        
    }catch(error){
        console.log(error)
        res.status(500).json({ error : 'Internal Server Error'})
    }
}










module.exports = { createUser,employeeList,profile };
