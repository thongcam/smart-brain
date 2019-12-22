const handleSignin = (knex,bcrypt) => (req,res) =>{
  const {email,password} = req.body;
  if (!email||!password) {
    return res.status(400).json('Invalid Sign In Information');
  }
  knex.select('email','hash').from('login')
    .where('email','=', email)
    .then(data => {
      bcrypt.compare( password, data[0].hash, function(err, resp){
          if (resp) {
            return knex.select('*').from('users').where('email','=', email).then(user => {
              res.json(user[0])
            })
              .catch(err => {
                res.status(400).json('Unable to get user');
            })
          } else {
            return res.status(400).json('Email or password is wrong')
          }
      })
    })
    .catch(err => res.status(400).json('Email or password is wrong'))
}

module.exports = {
  handleSignin: handleSignin
}
