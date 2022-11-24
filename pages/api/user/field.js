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
      const {
        query: { farmer_id },
      } = req;
      if (farmer_id) {
        //fields under specific farmer id
        const fields = await prisma.Field.findMany({
          where: { farmerId: farmer_id },
        });
        return res.json({ data: fields });
      }
      const allFields = await prisma.Field.findMany();
      res.json({ data: allFields });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  } else if (req.method === "POST") {
    try {
      const convertedReq = await deepValidation(req);
      await prisma.Field.create({ data: convertedReq });
      res.json({ data: req.body });
    } catch (err) {
      console.log("error->", err.message);
      res.status(404).json({ error: err?.message || "unknown prisma error" });
    }
  } else if (req.method === "PUT") {
    try {
      const {
        query: { field_id },
      } = req;
      const convertedReq = await deepValidation(req);
      //update data
      const data = await prisma.Field.update({
        where: { id: field_id },
        data: convertedReq,
      });
      res.json({ data });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError)
        return res.status(404).json({ error: err.meta.cause });
      res.status(404).json({ error: err.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const {
        query: { id },
      } = req;
      const _fieldOld = await prisma.Field.delete({
        where: { id },
      });
      if (!_fieldOld) throw new Error("field id not found");
      return res.json({ data: "successfully delete field" });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError)
        return res.status(404).json({ error: err.meta.cause });
      res.status(404).json({ error: err.message });
    }
  }
};

const convertToInt = (data) => {
  let _data = { ...data };
  _data["field_type_id"] = parseInt(_data["field_type_id"]);
  _data["min_moist"] = parseInt(_data["min_moist"]);
  _data["max_moist"] = parseInt(_data["max_moist"]);
  _data["min_temp"] = parseInt(_data["min_temp"]);
  _data["max_temp"] = parseInt(_data["max_temp"]);
  return _data;
};

//deep validation
const deepValidation = async (req) => {
  const {
    query: { farmer_id, field_id },
  } = req;
  if (!farmer_id) throw new Error("farmer id is missing");
  if (req.method === "PUT" && !field_id) throw new Error("field id is missing");
  const user = await prisma.User.findUnique({
    where: { id: farmer_id },
  });
  if (!user) throw new Error("farmer id is incorrect");
  //http PUT only (validate field_id)
  if (req.method == "PUT") {
    const fid = await prisma.Field.findUnique({
      where: {
        id: field_id,
      },
    });
    if (!fid) throw new Error("field id is incorrect");
  }
  //arguments validation
  await validation(req.body);
  const convertedReq = convertToInt(req.body);
  //To check if gateway and node id is already exists
  const _fg = await prisma.Field.findMany({
    where: {
      gateway: convertedReq?.gateway,
    },
  });
  if (_fg?.length > 0 && req.method == "POST") {
    const _fn = _fg.filter((f) => f?.node == convertedReq?.node);
    if (_fn.length >= 1)
      throw new Error("Same gateway and node already exist in the db");
  }
  convertedReq["farmerId"] = farmer_id;
  if (
    convertedReq?.moist_auto &&
    !(convertedReq.min_moist < convertedReq.max_moist)
  )
    throw new Error("min value should be less than max value");

  return convertedReq;
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
