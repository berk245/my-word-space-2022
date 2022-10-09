const bcrypt = require("bcrypt");

module.exports = async function (database, username, passwordFromRequest){
    const User = await database.getUserByUsername(username);
    if (!User) return false;
    
    let isPasswordMatching = await bcrypt.compare(passwordFromRequest, User.Password);
    if(!isPasswordMatching) return false

    return User
}
