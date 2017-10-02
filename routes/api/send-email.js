'use strict';
/** =================================
                Packages
**==================================*/

const express = require('express');
const router  = express.Router();

// helper
const handleSendEmail = require('../middleware/handle-send-email');


/** =================================
                Body
**==================================*/

router.post('/sendemail',(req,res) => {
  let input = req.body;
  let message = "name: "    + input.name.toString() + "\n" +
                "email: "   + input.email.toString() + "\n" + 
                "message: " + input.message.toString() + "\n"; 
  handleSendEmail(message)
    .then(() => res.send("sent your email"))
    .catch((err) => res.send("could send your email") );    
})



module.exports = router;
