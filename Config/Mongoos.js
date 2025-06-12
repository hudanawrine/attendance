const mongoose = require ('mongoose')
const uri = "mongodb+srv://hudavkd1:hudanawrin@cluster0.6jjjf37.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"



const connection = async ()=>
{
    try {
        const connect = await mongoose.connect(
            uri,{
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        console.log("Databse is successfully connected")
    }catch(error){
        console.log(`Database error is ${error}`)
        process.exit()
    }
}

module.exports = connection;