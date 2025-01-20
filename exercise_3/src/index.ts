import express, { Request, Response } from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const urlGetData = "https://share.shub.edu.vn/api/intern-test/input";
    const urlPostData = "https://share.shub.edu.vn/api/intern-test/output";

    const responseGet = await axios.get(urlGetData);
    const responseGetData = responseGet?.data;

    if (!responseGetData || !responseGetData.token || !responseGetData.data || !responseGetData.query) {
      res.status(400).json({ error: "Invalid input data" });
      return;
    }

    const { token, data, query } = responseGetData;
    const results: number[] = [];

    for (const item of query) {
      let result = 0;
      const { type, range } = item;
      const [l, r] = range;

      if (l < 0 || r >= data.length || l > r) {
        res.status(400).json({ error: "Invalid range" });
        return;
      }

      if (type === "1") {
        for (let i = l; i <= r; i++) {
          result += data[i];
        }
      } else if (type === "2") {
        for (let i = l; i <= r; i++) {
          result += (i - l) % 2 === 0 ? +data[i] : -data[i];
        }
      }

      results.push(result);
    }
    
    const responsePost = await axios.post(
      urlPostData,
      { results },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    res.status(200).json({
      dataAfter: results,
      responsePost: responsePost?.data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error API" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
