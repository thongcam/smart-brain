const handleRegister = (knex,bcrypt) => (req,res) => {
  const {name,email,password} = req.body;
  if (!email||!password||!name) {
    return res.status(400).json('Invalid Sign In Information');
  }
  knex.transaction(trx => {
    bcrypt.hash(password,10,function(err,hash){
      console.log(hash, email);
      trx('login')
        .insert({
          email:email,
          hash:hash
        }).returning('email')
        .then(logInEmail => {
          return trx('users')
            .returning('*')
            .insert({
              email:logInEmail[0],
              name: name,
              joined: new Date()
          })
            .then(response => {
            res.json(response[0]);
          })
            .catch(err => {
              return res.status(400).json('unable to register')
          })
        }).then(trx.commit)
          .catch(trx => {
            res.status(400).json('unable to register')
            trx.rollBack
          })
    })
  })
}

module.exports = {
  handleRegister: handleRegister
}
