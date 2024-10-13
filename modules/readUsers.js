const fs = require("fs");
const path = require("path");
const readUsers =  ()=>{
    const filePath = path.join(__dirname,"../data/users.json")
    return new Promise ((resolve, reject)=>{
        fs.readFile(filePath,"UTF-8",(er,data)=>{
            if (er) {
                reject(er)
            } else {
                resolve(JSON.parse(data))
            }
        })
    })
}

module.exports = readUsers