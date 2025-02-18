import { NextApiRequest, NextApiResponse } from "next";
import ExcelJS from "exceljs";

type StudentResult = {
  email: string;
  outcome: string;
  problemArea: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { studentResults }: { studentResults: StudentResult[] } = req.body;

    if (!studentResults || studentResults.length === 0) {
      return res.status(400).json({ error: "No student data provided" });
    }

    // Create a new Excel workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Student Results");

    // Add headers
    worksheet.addRow(["Student Email", "Results %"]);

    // Add student data
    studentResults.forEach((student) => {
      worksheet.addRow([student.email, student.outcome]);
    });

    // Add problem area analysis
    worksheet.addRow([]); // Empty row for spacing
    worksheet.addRow(["Problem Area", "Number of Students"]);

    // Count occurrences of problem areas
    const problemAreasCount: { [key: string]: number } = studentResults.reduce(
      (acc, curr) => {
        curr.problemArea.forEach((area) => {
          acc[area] = (acc[area] || 0) + 1;
        });
        return acc;
      },
      {} as { [key: string]: number }
    );

    // Add problem area data
    Object.entries(problemAreasCount).forEach(([area, count]) => {
      worksheet.addRow([area, count]);
    });

    // Generate the Excel file in memory
    const buffer = await workbook.xlsx.writeBuffer();

    // Set response headers for file download
    res.setHeader("Content-Disposition", 'attachment; filename="data.xlsx"');
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    return res.status(200).send(Buffer.from(buffer));
  } catch (error) {
    console.error("Error generating Excel file:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
