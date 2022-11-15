const bcrypt = require("bcrypt");
const GetUser = require('./GetUser')

module.exports = async function (username, passwordFromRequest){
    const User = await GetUser.byUsername(username);
    if (!User) return false;
    
    let isPasswordMatching = await bcrypt.compare(passwordFromRequest, User.Password);
    if(!isPasswordMatching) return false

    return User
}
