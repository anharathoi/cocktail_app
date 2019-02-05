const express = require('express');
const router = express.Router();
const User = require('../../../models/User.model');
require('dotenv').config();

// /**
// |--------------------------------------------------
// | UPDATE USER PERSONAL DETAILS AND ADDRESS
// |--------------------------------------------------
// */

// // UPDATE // - guy figure this shit out 



router.patch('/update-details', (req,res) => {
  const {firstName, lastName, email,  streetAddress, suburb, postcode, ausState, } = req.body;
  if (email) {
    User.findOne({email})
    .then(user => {
      
      
        router.put('/posts/:post/upvote', function(req, res, next)
        {
            req.post.upvote(function(err, post)
            {
                if(err) { return next(err); }
                console.log(post);
                res.json(post);
            });
        });
      
      
    })
}
})
      
      
//         if (user) {
//         return res.status(403).send('this user already exists')
//       }
//       else {
//           const user = new User({
//             firstName,
//             lastName,
//             email,
//             streetAddress, 
//             suburb, 
//             postcode, 
//             ausState,
//           })
//           user.save(err => {
//             if (err) return res.status(400).send('there was an error')
//             const token = generateToken(user);
//             return res.send(token)
//           })
//         })
//       }
//     })
//     .catch( err => {
//     res.status(400).send(err)
//   })
//   } 


module.exports = router