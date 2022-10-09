const bcrypt = require("bcrypt");

module.exports = async function (database, username, password){
    const user = await database.getUserByUsername(username);
    if (!user) return false;
    
    let isPasswordMatching = await bcrypt.compare(password, user.password);
    if(!isPasswordMatching) return false

    return user
}
