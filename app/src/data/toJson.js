console.log(require('path').basename('councilseat_mentions.csv'))

console.log(process.cwd())

const csv = require('csvtojson')
const csvFilePath = './councilseat_mentions.csv'

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    console.log(jsonObj);
    /**
     * [
     * 	{a:"1", b:"2", c:"3"},
     * 	{a:"4", b:"5". c:"6"}
     * ]
     */ 
})
 