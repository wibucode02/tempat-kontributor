import rateLimit from "../../utils/rate-limit";
import * as uuid from "uuid";
import { Low, JSONFile } from "lowdb";
import { setCookie } from "../../utils/cookies";

const one_year = 1000 * 60 * 60 * 24 * 356; // 1 year

const limiter = rateLimit({
  interval: one_year,
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

const attendJsonPath = "./data/attended.json";

export default async function handler(req, res) {
  const {
    headers: { cookie },
  } = req;

  const cookies = ((typeof cookie === "string" && cookie) || "")
    .split("; ")
    .reduce((obj, v) => {
      const [key, val] = v.split("=");
      obj[key] = val;
      return obj;
    }, {});
  let token = cookies.token || null;
  if (!token) {
    token = uuid.v4();
    await setCookie(res, "token", token, { maxAge: one_year });
  }
  try {
    await limiter.check(res, 2, token); // 1 requests per 1 year
    if (req.method === "POST" && req.body && req.body.name) {
      // handle submit name attended
      const { name } = req.body;

      if (typeof name === "string" && name.length) {
        const id = uuid.v4();
        const adapter = new JSONFile(attendJsonPath);
        const db = new Low(adapter);

        // Read data from JSON file, this will set db.data content
        try {
          await db.read();
        } catch (error) {
          db.data = [];
        }

        if (Array.isArray(db.data) && db.data.length) {
          db.data.push({ id, name });
        } else {
          db.data = [{ id, name }];
        }

        // Write db.data content to db.json
        await db.write();
      }

      res.json({ status: 200, message: "ok" });
    } else {
      res.status(404).json({ status: 404, message: "not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(429).json({ error: "Rate limit exceeded" });
  }
}
