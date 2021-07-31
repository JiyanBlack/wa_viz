const express = require('express');
const {addOrUpdateZone, getZoneById} = require('./dynamo')

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req,res) => {
  res.send('Hello World');
});

app.get('/zone/:id', async(req, res)=> {
  const id = req.params.id;
  try{
    const zone = await getZoneById(id);
    res.json(zone);
  }catch (error) {
    console.error(error);
    res.status(500).json({err:'fetch zone error'})
  }
});

app.listen(port, ()=>{console.log('listening on port ' + port)} );