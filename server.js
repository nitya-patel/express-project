const express = require("express")
const fs = require("fs").promises
const path = require("path")

const app = express();

const port = 3000
const pathToFile = path.join(__dirname, "db.json");
// Get /products
async function readFile() {
    let data = await fs.readFile(pathToFile, "utf-8");
    return JSON.parse(data);
}


app.get("/products", async(req,res)=>{
    try{
    let products = await readFile();
    console.log(products);
    res.json(products);
    }catch(err){
        console.log(err);
    }
});



app.listen(port, () => {
    console.log(`Example app listening on ${port}`)
})