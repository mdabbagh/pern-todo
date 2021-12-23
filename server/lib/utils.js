import { compare, hash } from "bcrypt";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

async function validPassword(password, savedPassword) {
  const isMatch = await compare(password, savedPassword);
  return isMatch;
}

async function genPassword(password) {
  try {
    const hashedPass = await hash(password, 10);
    return hashedPass;
  } catch (error) {
    console.log(error);
  }
}

async function issueJWT(user, expiresIn = "5m") {
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

const _validPassword = validPassword;
export { _validPassword as validPassword };
const _genPassword = genPassword;
export { _genPassword as genPassword };
const _issueJWT = issueJWT;
export { _issueJWT as issueJWT };
const _validateJwt = validateJwt;
export { _validateJwt as validateJwt };
const _decodeToken = decodeToken;
export { _decodeToken as decodeToken };
