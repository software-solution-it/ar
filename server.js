const express = require('express');
const axios = require('axios');
const https = require('https');  // Import the 'https' module
const path = require('path');
const NodeCache = require('node-cache');

const app = express();
const port = process.env.PORT || 3030;
const host = '0.0.0.0';

app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname)));
app.use('/imgs', express.static(path.join(__dirname, 'imgs')));
app.use('/audio', express.static(path.join(__dirname, 'audio')));

const apiCache = new NodeCache();

const axiosInstance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false 
    })
});

app.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const cachedData = true

        if (cachedData) {
            res.render(path.join(__dirname, 'public/index.html'), { apiCache: cachedData });
        } else {
           // const itemsResponse = await axiosInstance.get(`https://localhost:7295/items/${id}`);
            // const itemsResponse = await axiosInstance.get(`https://8bce-2804-14d-688c-40f3-2994-28af-4815-a4.ngrok-free.app/items/${id}`);
            const itemsData = itemsResponse.data;
            apiCache.set(id, itemsData);

            res.render(path.join(__dirname, 'public/index.html'), { apiCache: itemsData });
        }
    } catch (error) {
        console.error('Erro na solicitação para a API:', error);
        res.status(500).send('Erro ao obter dados da API.');
    }
});

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
