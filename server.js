const express = require("express")
const fs = require("fs")

const app = express();

const products = JSON.parse(fs.readFileSync("db.json", "utf8"));

// Get /products
app.get("/products", (req,res)=>{
    res.send("Hello Word")
});


app.listen(3000, () => {
    console.log(`Example app listening on port`)
})