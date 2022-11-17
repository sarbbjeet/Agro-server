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
    try {
      const fields = await prisma.Field.findMany();
      res.json({ data: fields });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  } else if (req.method === "POST") {
    try {
      //validation
      await validation(req.body);
      const convertedReq = convertToInt(req.body);
      if (
        convertedReq?.moist_auto &&
        !(convertedReq.min_moist < convertedReq.max_moist)
      )
        throw new Error("min value should be less than max value");
      await prisma.Field.create({ data: convertedReq });
      res.json({ data: req.body });
    } catch (err) {
      res.status(404).json({ error: err?.message || "unknown prisma error" });
    }
  } else if (req.method === "PUT") {
    try {
      const {
        query: { id: fieldId },
      } = req;
      const field = await prisma.Field.findUnique({
        where: { id: fieldId },
      });
      if (!field) throw new Error("id is incorrect");
      //validate input parameters
      await validation(req.body);
      //convert to int
      const convertedReq = convertToInt(req.body);
      if (
        convertedReq?.moist_auto &&
        !(convertedReq.min_moist < convertedReq.max_moist)
      )
        throw new Error("min value should be less than max value");

      //update data
      await prisma.Initial.update({
        where: { id: fieldId },
        data: convertedReq,
      });

      res.json({ data: req?.body });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError)
        return res.status(404).json({ error: err.meta.cause });
      res.status(404).json({ error: err.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const {
        query: { id: fieldId },
      } = req;
      const _fieldOld = await prisma.Initial.delete({
        where: { id: fieldId },
      });
      if (!_fieldOld) throw new Error("field id not found");
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError)
        return res.status(404).json({ error: err.meta.cause });
      res.status(404).json({ error: err.message });
    }
  }
};

const convertToInt = (data) => {
  let _data = { ...data };
  _data["min_moist"] = parseInt(_data["min_moist"]);
  _data["max_moist"] = parseInt(_data["max_moist"]);
  _data["min_temp"] = parseInt(_data["min_temp"]);
  _data["max_temp"] = parseInt(_data["max_temp"]);
  return _data;
};

const validation = async (data) => {
  const schema = Joi.object({
    field_type_id: Joi.number().required(),
    addr: Joi.string().required(),
    gateway: Joi.number().required(),
    node: Joi.number().required(),
    min_moist: Joi.number().min(0).max(100),
    max_moist: Joi.number().min(0).max(100),
    min_temp: Joi.number().min(-100).max(200),
    max_temp: Joi.number().min(-100).max(200),
    temp_auto: Joi.bool(),
    moist_auto: Joi.bool(),
  });
  return await schema.validateAsync(data);
};

export default auth(index);
