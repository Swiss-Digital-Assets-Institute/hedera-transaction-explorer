import fs from "fs";
import path from "path";

// Logs error to the log file
export function logErrorToFile(error: Error | string, file: string): void {
  // gets current date
  const currentDate = new Date().toISOString();

  // creates the error message
  let errorMessage: string;
  if (typeof error === "string") {
    errorMessage = `[${currentDate}] Error in file: ${file}\n${error}\n\n`;
  } else {
    errorMessage = `[${currentDate}] Error in file: ${file}\n${
      (error as Error).stack
    }\n\n`;
  }
  // creates the log file path
  const logFilePath = path.resolve(__dirname, "../../log.txt");

  // Append the error message to the log file
  fs.appendFile(logFilePath, errorMessage, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("Succesfully logged error:", logFilePath);
    }
  });
}
