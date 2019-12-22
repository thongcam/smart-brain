const clarifai = require('clarifai');

const handleAPICall = (req,res) => {
  const app = new Clarifai.App({
    apiKey: ''
  });
  app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.url)
    .then(response => {
      console.log(response);
      return res.send (response)
    })
}


const handleImage = (knex) => (req,res) =>
{
  const {id} = req.body;
  knex('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0])
    })
    .catch(err => res.status(400).json())
}

module.exports = {
  handleImage: handleImage,
  handleAPICall: handleAPICall
}
