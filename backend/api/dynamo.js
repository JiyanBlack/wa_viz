const { LexModelBuildingService } = require('aws-sdk');
const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = "wa_crime_db";

async function getZones(){
    const params = {
        TableName: TABLE_NAME
    };
    const characters = await dynamoClient.scan(params).promise();
    console.log(characters);
    return characters
}

async function addOrUpdateZone(zone){
    const params = {
        TableName: TABLE_NAME,
        Item: zone
    }
    return await dynamoClient.put(params).promise();
}

async function getZoneById(id){
    const params = {
        TableName:TABLE_NAME,
        Key:{
            id
        }
    } 
    return await dynamoClient.get(params).promise();
}

async function deleteZoneById(id){
    const params = {
        TableName:TABLE_NAME,
        Key:{
            id
        }
    } 
    return await dynamoClient.delete(params).promise();
}

module.exports = {
    dynamoClient,
    getZones,
    getZoneById,
    addOrUpdateZone,
    deleteZoneById,
}
// getZones();
// const testzone = { "Id": 1, "Locality": "Abba River", "Offence": "Drug Offences", "FinancialYear": "2015-16", "July": 0, "August": 0, "September": 0, "October": 2, "November": 0, "December": 0, "January": 0, "February": 0, "March": 0, "April": 0, "May": 0, "June": 0, "TotalAnnual": 2 }
// // addOrUpdateZone(testzone);