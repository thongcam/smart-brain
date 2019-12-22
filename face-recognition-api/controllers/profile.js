const handleProfileGet = (knex) => (req,res) =>
{
 const {id} = req.params;
 knex('users').select('*').where({id})
   .then(user => {
     if (user.length === 1) {
       res.json(user[0]);
     } else {
       res.status(404).json('User not found');
     }
   })
}

module.exports = {
  handleProfileGet: handleProfileGet
}
