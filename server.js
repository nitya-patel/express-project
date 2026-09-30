const express = require("express")
const fs = require("fs").promises
const path = require("path")

const app = express();

const port = 3000

const cache = {}

const pathToFile = path.join(__dirname, "db.json");
// Get /products
async function readFile() {
    let data = await fs.readFile(pathToFile, "utf-8");
    return JSON.parse(data);
}


app.get("/products", async(req,res)=>{
    try{
    let key = req.url;
    let value = cache[key];
    if(value){ // if value exist in the cache
        return res.json(value);
    }
    let products = await readFile();
    cache[key] = products;
    res.json(products);
    }catch(err){
        console.log(err);
    }
});

app.get("/products/:id", async(req,res)=>{
    try{
    let products = await readFile();
    let {id} = req.params;
    id = Number(id);
    let product = products.find((item) => {return item.id === id});
    res.json(product);
    }catch(err){
        console.log(err);
    }
});

async function readFileWithDelay() {
    await new Promise((resolve,reject)=>{
        setTimeout(resolve,1500);
    });
    let products = await readFile();
    return products;
}

readFileWithDelay();
app.listen(port, () => {
    console.log(`Example app listening on ${port}`)
})