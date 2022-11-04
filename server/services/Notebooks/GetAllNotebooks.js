const db = require("../../config/database");


module.exports= async (req,res) => {
    try{
        if (!req.body.userId) {
            res.status(400).json({error: 'Missing required fields'});
            return;
          }
          const [notebooks] = await db.execute(
            `SELECT * FROM Notebook WHERE CreatorID = ?`,
            [req.body.userId]
          );
          res.status(200).json({ notebooks: notebooks });
    }catch(err){
        console.log(err)
        res.status(500).json({error: err})
    }
    
};