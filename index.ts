import express from 'express';
import { configDotenv } from 'dotenv';
import e from 'express';
import { Acces_token } from './interfaces';
import fs from 'node:fs/promises'

let artists_IDs: string = '';

fs.readFile('artists_list.json', 'utf-8')
.then(data => {
    let data2: any[] = JSON.parse(data);

    data2 = data2.map((ele: any) => ele.id);

    data2.forEach(ele => {
        artists_IDs += ele + ',';
    })

    artists_IDs = artists_IDs.substring(0,artists_IDs.length-1) 

})

configDotenv();

const PORT: any = process.env.PORT || 3000
const CLIENT_ID: string = process.env.CLIENT_ID || '';
const CLIENT_SECRET:string = process.env.CLIENT_SECRET || '';

let api_token: string = '';

const app = express()

const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  });

async function updateToken() {
    
    const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body,
    })
    .then((r: Response) => r.json())
    .then((data: Acces_token) => {
        api_token = data.access_token
        console.log("El api token", api_token);
    })
}

// Endpoint for testing
app.get('/artists', async (req, res) => {
    
    try {
        const response = await fetch('https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb', {
            headers: {
            Authorization: `Bearer ${api_token}`,
            },
            method: 'GET',
        
        });
        console.log(response);

        if (response.statusText == 'Unauthorized' || response.statusText == 'Bad Request') {
            
            await updateToken();
            res.redirect('/artists');
        } else {
            
            const res_json = await response.json();
            
            res.send(res_json);
        }

    }
    catch (error) {
        console.log("It ocurred an error", error);
    }
})


// Endpoint for the dashboard
app.get('/list_artists', async (req, res) => {
    
    try {
        const response = await fetch(`https://api.spotify.com/v1/artists?ids=${artists_IDs}`, {
            headers: {
            Authorization: `Bearer ${api_token}`,
            },
            method: 'GET',
        
        });
        console.log(response);
        console.log(response.statusText);

        if (response.statusText == 'Unauthorized' || response.statusText == 'Bad Request') {
            console.log("No authorized");
            
            await updateToken();
            res.redirect('/list_artists');
        } else {
            
            const res_json = await response.json();
            
            res.send(res_json);
        }

    }
    catch (error) {
        console.log("It ocurred an error", error);
    }
})

app.listen(PORT, () => {
    console.log(`Escuchando en http://localhost:${PORT}`);
})

