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
    // checks if error log exists already if not creates it in local storage
    let errorLog: string[] = JSON.parse(localStorage.getItem("errorLog") || "[]");

    // adds error message
    errorLog.push(errorMessage);
  
    // puts the log back into session storage
    localStorage.setItem("errorLog", JSON.stringify(errorLog));
  
    console.log("Successfully logged error to local storage");
}
