const express = require('express')
const router = express.Router();
const findUsers = require('../helpers/GetUser')


module.exports = function(){
  const findUser = async(req, res) => {
    
    try{
      let user = await findUsers.byUsername('tezst-user')
      res.status(200).json(user)
    }catch(err){
      res.status(500).send('Non')
    }
   
  }

  router.get("/", findUser);

  return router
}




