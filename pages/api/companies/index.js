import { promises as fs } from "fs";
import path from "path";
const { readFile } = fs;

const filename = path.resolve("./db.json");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const companies = JSON.parse(await readFile(filename, "utf8"));
    res.status(200).json(companies.companies);
  } else {
    res.status(400).json({ message: "Wrong method." });
  }
}
