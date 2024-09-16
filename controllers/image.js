const fetch = require('node-fetch');

const handleImageChange = (req, res, db) => {    
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'));
};

const handleApiCall = (req, res) => {
    const PAT = process.env.PAT;  
    const USER_ID = process.env.USER_ID;  
    const APP_ID = process.env.APP_ID;  
    const MODEL_ID = 'celebrity-face-detection';
    const MODEL_VERSION_ID = '2ba4d0b0e53043f38dbbed49e03917b6';
    const { input } = req.body; 

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": input
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`, requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data && data.outputs) {
                res.json(data);
            } else {
                res.status(400).json('Unable to work with API');
            }
        })
        .catch(err => res.status(400).json('Error fetching Clarifai API'));
};

module.exports = {
    handleImageChange: handleImageChange,
    handleApiCall: handleApiCall  
};
