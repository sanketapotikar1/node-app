const fs =require('fs');
const quote1 = "No beauty shines brighter than that of a good heart๐."
// fs.writeFile("./awesome.html",quote1,(err) =>{
// console.log(err);
// console.log("Completed Writing");
// });


const quote2 = "Live more, worry less ๐๐ค";

const[, ,a]= process.argv

const num_backupFile = a;

for(let i=0;i<num_backupFile;i++){
    fs.writeFile(`/text-${i}.html`,quote2,(err) =>{
        console.log(err);
        console.log("backup Completed.");
    })
}



