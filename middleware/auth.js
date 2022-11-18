import axios from "axios";
import NextCors from "nextjs-cors";
// const auth = (handler) => {
//   return (req, res) => {
//     return handler(req, res);
//   };
// };
const url = `http://localhost:${process.env?.PORT}/api/user/login`;
const extractToken = (req) => {
  if (
    req.headers?.authorization &&
    req.headers?.authorization?.split(" ")[0] === "Bearer"
  )
    return req.headers?.authorization.split(" ")[1];
  return null;
};
const auth = (handler) => async (req, res) => {
  try {
    //cors middleware ..
    await NextCors(req, res, {
      // Options
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      origin: "*",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    const token = extractToken(req);
    if (!token) throw new Error("authorization token not found");
    if (token) {
      const { data: user } = await axios(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (user) req.user = user?.data;
    }
    return handler(req, res);
  } catch (err) {
    return res
      .status(401)
      .json({ error: err.response?.data?.error || err.message });
  }
};
export default auth;
