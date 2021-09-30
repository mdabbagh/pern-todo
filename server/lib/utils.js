const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

/**
 *
 * @param {*} password - The plain text password
 *
 * This function uses the crypto library tko decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */
async function validPassword(password, savedPassword) {
  const isMatch = await bcrypt.compare(password, savedPassword);
  return isMatch;
}

/**
 *
 * @param {*} password - The password string that the user inputs to the password field in the register form
 *
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 *
 * ALTERNATIVE: It would also be acceptable to just use a hashing algorithm to make a hash of the plain text password.
 * You would then store the hashed password in the database and then re-hash it to verify later (similar to what we do here)
 */
async function genPassword(password) {
  try {
    // Hash password
    const hashedPass = await bcrypt.hash(password, 10);
    return hashedPass;
  } catch (error) {
    console.log(error);
  }
}

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
async function issueJWT(user, expiresIn = "5m") {
  const userId = user.user_id;

  const payload = {
    sub: userId,
  };

  // Use HS256 here since everything is managed under the same app
  // In applications where data is exchanged between 2 independent parties, use RSA256 (pub/private keys)
  // TODO: Make secret an env var
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

    const token = await jsonwebtoken.verify(
      stripToken,
      process.env.TOKEN_SECRET
    );
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
