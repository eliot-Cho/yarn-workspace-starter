import express from 'express';
import { config } from './config';
import { loader } from './loaders';

const serverStart = async () => {
    const app = express();

    loader(app);
    app.listen(config.port);
};

serverStart()
    .then(() => console.log(`Server Run on ${config.port}`))
    .catch((err) => {
        console.error('Server Run Failed');
        console.error(err);
        process.exit(1);
    });
