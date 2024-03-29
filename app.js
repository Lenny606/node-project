const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        message: "hello from server side"
    })
})

app.post('/', (req, res) => {
    res.status(200).json({
        message: "hello from post response"
    })
})





const port = 3000;
app.listen(port, ()=>{
    console.log('App running on port ' + port)
})