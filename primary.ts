import cluster from 'cluster';
import os from 'os';

const cpus = os.cpus().length;

cluster.setupPrimary({
    exec: __dirname + "/index.ts"
})

for (let i = 0; i < cpus; i++) {
    if (process.env.PORT)
    cluster.fork({PORT: Number(process.env.PORT) + i});
}