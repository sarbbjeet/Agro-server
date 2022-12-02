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
      const {
        query: { receiver, group },
      } = req;
      const allChats = await prisma.Chat.findMany();
      if (!allChats?.length > 0) return res.json({ data: [] }); //return empty
      else if (group)
        return res.json({
          data: await allChats.filter((chat) => chat?.group),
        });
      else if (!receiver) return res.json({ data: [] }); //return empty

      const conversationBw = allChats?.filter(
        (c) =>
          (c?.sender == req?.user?.id && c?.receiver == receiver) ||
          (c?.sender == receiver && c?.receiver == req?.user?.id)
      );
      return res.json({ data: conversationBw }); //return empty
    } catch (err) {
      res.status(400).json({ error: true, msg: err?.message });
    }
  } else if (req.method === "POST") {
    try {
      const sender = req?.user?.id;
      await validation(req?.body);
      await prisma.Chat.create({
        data: { ...req?.body, sender },
      });
      return res.json({ msg: "successfully send data" });
    } catch (err) {
      res.status(400).json({ error: true, msg: err?.message });
    }
  } else if (req.method == "DELETE") {
    //delete token
    try {
      const {
        query: { id },
      } = req;

      await prisma.Chat?.delete({
        where: {
          id,
        },
      });
      return res.json({ msg: "successfully delete token" });
    } catch (err) {
      res.status(400).json({ error: true, msg: err?.message });
    }
  }
};

const validation = async (data) => {
  const schema = Joi.object({
    receiver: Joi.string(),
    msg: Joi.string().required(),
    group: Joi.bool(),
  });
  return await schema.validateAsync(data);
};
export default auth(index);
