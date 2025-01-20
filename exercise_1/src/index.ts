import express from "express";
import axios from "axios";
import * as XLSX from "xlsx";
import { Readable } from "stream";

const app = express();
const port = 3000;

app.get("/read-xlsx", async (req, res) => {
  try {
    const url = "https://go.microsoft.com/fwlink/?LinkID=521962";
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });

    const workbook = XLSX.read(response.data, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const rawJsonData = XLSX.utils.sheet_to_json(worksheet);

    const normalizedData = rawJsonData.map((row: any) => {
      const cleanedRow: any = {};
      
      Object.entries(row).forEach(([key, value]) => {
        const cleanKey = key.trim();
        cleanedRow[cleanKey] = value;
      });

      
      return cleanedRow;
    });


    const results = normalizedData.filter((row: any) => {

      return row.Sales && Number(row.Sales) > 50000;
    });

    const exportWorkbook = XLSX.utils.book_new();
    const exportWorksheet = XLSX.utils.json_to_sheet(results);
    XLSX.utils.book_append_sheet(exportWorkbook, exportWorksheet, "Filtered Sales");

    const excelBuffer = XLSX.write(exportWorkbook, {
      type: "buffer",
      bookType: "xlsx"
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=filtered_sales_report.xlsx"
    );

    res.send(excelBuffer);

  } catch (error: any) {
    console.error("Error processing Excel:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});