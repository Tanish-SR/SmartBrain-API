// const handleSignin = (db, bcrypt) => (req, res) => {
//   const { email, password } = req.body;
  
//   if (!email || !password) {
//     return res.status(400).json('Incomplete form submission');
//   }

//   db.select('email', 'hash').from('login')
//     .where('email', '=', email)
//     .then(data => {
//       const isValid = bcrypt.compareSync(password, data[0].hash);
      
//       if (isValid) {
//         return db.select('*').from('users')
//           .where('email', '=', email)
//           .then(user => {
//             res.json(user[0]);
//           })
//           .catch(err => res.status(400).json('Unable to retrieve user'));
//       } else {
//         res.status(400).json('Incorrect credentials');
//       }
//     })
//     .catch(err => res.status(400).json('Incorrect credentials'));
// }

// module.exports = {
//   handleSignin: handleSignin
// }

const handleSignin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
      console.log('Incorrect form submission');
      return res.status(400).json('incorrect form submission');
  }
  db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        console.log('Data from login table:', data);
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid) {
            return db.select('*').from('users')
              .where('email', '=', email)
              .then(user => {
                  console.log('User found:', user);
                  res.json(user[0]);
              })
              .catch(err => {
                  console.log('Unable to get user:', err);
                  res.status(400).json('unable to get user');
              });
        } else {
            console.log('Wrong credentials');
            res.status(400).json('wrong credentials');
        }
    })
    .catch(err => {
        console.log('Error with credentials:', err);
        res.status(400).json('wrong credentials');
    });
}

module.exports = {
  handleSignin: handleSignin
}
