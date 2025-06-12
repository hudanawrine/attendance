const express = require ("express")
const connection = require("./Config/Mongoos")
const app = express()
const router = require("./Routes/authRoutes")
const cors = require("cors")



connection()

app.use(cors())
app.use(express.json()) 
app.use('/',router)


app.listen(4000,() => {
    console.log('Server is running..')
})