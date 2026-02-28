import { google } from "googleapis";

const SPREADSHEET_ID = "1bdqKdPcjy4cUlErJQIrWY_ModdTWKn3PtuIFSNLMSq4";
const SHEET_NAME = "Results";

if (!process.env.GOOGLE_CREDENTIALS) {
    throw new Error("❌ GOOGLE_CREDENTIALS chưa được set trên Render");
}

const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

const sheets = google.sheets({ version: "v4", auth });

export async function appendExamResult(row) {
    try {
        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: ${SHEET_NAME}!A:Z, // ✅ FIXED
            valueInputOption: "RAW",
            insertDataOption: "INSERT_ROWS",
            requestBody: {
                values: [row]
            }
        });

        console.log("✅ Ghi Google Sheet thành công");
    } catch (err) {
        console.error("❌ GHI SHEET LỖI:", err.response?.data || err.message);
        throw err;
    }
}
