const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

async function validPassword(password, savedPassword) {
  const isMatch = await bcrypt.compare(password, savedPassword);
  return isMatch;
}

async function genPassword(password) {
  try {
    const hashedPass = await bcrypt.hash(password, 10);
    return hashedPass;
  } catch (error) {
    console.log(error);
  }
}

async function issueJWT(user, expiresIn = "15m") {
  const userId = user.user_id;

  const payload = {
    sub: userId,
  };

  // Use HS256 here since everything is managed under the same app
  // In applications where data is exchanged between 2 independent parties, use RSA256 (pub/private keys)
  const signedToken = jsonwebtoken.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: expiresIn,
  });

  return {
    token: "Bearer " + signedToken,
  };
}

async function validateJwt(jwt) {
  try {
    const stripToken = jwt.token.split(" ")[1];
    const token = jsonwebtoken.verify(stripToken, process.env.TOKEN_SECRET);
    return token;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function decodeToken(jwt) {
  try {
    const decodedToken = jsonwebtoken.decode(jwt);
    return decodedToken;
  } catch (err) {
    return false;
  }
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;
module.exports.validateJwt = validateJwt;
module.exports.decodeToken = decodeToken;
