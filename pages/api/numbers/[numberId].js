import { promises as fs } from "fs";
import path from "path";
const { readFile } = fs;

const filename = path.resolve("./db.json");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const number = JSON.parse(await readFile(filename, "utf8"));
    const numberInfo = number.phone_numbers.filter((el) => {
      return el.id === req.query.numberId;
    });
    res.status(200).json(numberInfo[0]);
  } else {
    res.status(400).json({ message: "Wrong method." });
  }
}
