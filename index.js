const express = require('express');
const cluster = require('cluster');
const process = require('process');
const os = require('os');
const cors = require('cors');
const cpus = os.cpus;
const numCpus = cpus().length;
console.log(' CPU number is:' + numCpus);

if(cluster.isMaster){
  console.log(`Primary ${process.pid} is running!`);

  // fork workers
  for(let i=0; i < numCpus; i++){
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });

} else {
    const app = express();
    require('./src/Routes/index')(app);
    
    app.use(cors());
    app.use(express.json());
    app.listen(3333);

    console.log(` Process {process.pid} started!`);
}

