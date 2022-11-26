import Joi from "joi";
import { prisma } from "../../../database/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import NextCors from "nextjs-cors";
import auth from "../../../middleware/auth";
import { Prisma } from "@prisma/client";

const index = async (req, res) => {
  //cors
  if (req.method === "OPTIONS") res.status(200).send("ok");
  // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  if (req.method === "GET") {
    //get all token list belong to farmer id
    try {
      const tokens = await prisma.Fcmtoken.findMany({
        where: {
          farmerId: req?.user?.id,
        },
      });
      //   if (tokens.length == 0) throw new Error("token array is empty");
      res.json({ data: tokens });
    } catch (err) {
      res.status(400).json({ error: true, msg: err?.message });
    }
  } else if (req.method === "POST") {
    //get all token list belong to farmer id
    try {
      const { token } = req?.body;
      if (!token || token == "") throw new Error("token not found");
      const isTokenExist = await prisma.Fcmtoken.findUnique({
        where: {
          token,
        },
      });
      if (isTokenExist) {
        //update token
        await prisma.Fcmtoken.update({
          where: {
            id: isTokenExist?.id,
          },
          data: { token, farmerId: req?.user?.id },
        });
      } else {
        await prisma.Fcmtoken.create({
          data: { token, farmerId: req?.user?.id },
        });
      }
      res.json({ msg: "successfully write token." });
    } catch (err) {
      res.status(400).json({ error: true, msg: err?.message });
    }
  }
};

export default auth(index);
