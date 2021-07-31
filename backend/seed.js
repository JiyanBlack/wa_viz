const axios = require('axios');
const fs = require('fs');
const { addOrUpdateZone } = require('./dynamo');
const cliProgress = require('cli-progress');
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);



const data_url = "https://www.police.wa.gov.au/apiws/CrimeStatsApi/GetLocalityCrimeStats/";
const saved_data = "./data/crime_wa.json";

async function seedDB() {
    const raw_data = fs.readFileSync(saved_data);
    const zones = JSON.parse(raw_data);
    
    console.log("Populating DB with data length: " + zones.length);
    bar1.start(zones.length, 0);

    for (let i = 0; i < zones.length; i++) {
        await addOrUpdateZone(zones[i]);
        bar1.update(i);
    }
    bar1.stop();
}


async function getData() {
    try {

        console.log('Start downloading data...')
        const { data: zones } = await axios.get(data_url);
        let data = JSON.stringify(zones);

        fs.writeFile(saved_data, data, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    } catch (error) {
        console.error(error);
    }
}

// getData();
seedDB();