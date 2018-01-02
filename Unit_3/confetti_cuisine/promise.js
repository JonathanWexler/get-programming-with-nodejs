const fs = require('fs');

let f = (file) => {
  return new Promise((resolve, reject) =>{
    fs.readFile(file, (error, data)=>{

      return error ? reject(error) : resolve(data.toString())
    });
  });
}

f('./package.jsons')
  .then((data)=>{
    console.log(data);
  })
  .catch((error) => {
    console.log(error.message);
  })
  .then(()=>{
    console.log("OK DONE");
  });
