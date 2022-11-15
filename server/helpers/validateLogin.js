const bcrypt = require("bcrypt");
const getUser = require('./getUser')

module.exports = async function (username, passwordFromRequest){
    const User = await getUser.byUsername(username);
    if (!User) return false;
    
    let isPasswordMatching = await bcrypt.compare(passwordFromRequest, User.Password);
    if(!isPasswordMatching) return false

    return User
}
