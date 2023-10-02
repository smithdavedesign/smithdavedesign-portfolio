const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");
const express = require('express');
const router = express.Router();


// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  console.log(CREDENTIALS_PATH)
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

// Function to retrieve calendar availability using Freebusy API
async function listCalendarAvailability(auth, startDate, endDate) {
  try {
    // Create a new Calendar API client
    const calendar = google.calendar({ version: "v3", auth });

    // Get a list of calendars
    const { data } = await calendar.calendarList.list();

    const calendarIds = data.items
      .filter(
        (item) => item.accessRole === "owner" || item.accessRole === "writer"
      )
      .map((item) => item.id);

    // Prepare request body for Freebusy API
    const requestBody = {
      timeMin: startDate.toISOString(),
      timeMax: endDate.toISOString(),
      items: calendarIds.map((id) => ({ id })),
    };

    // Retrieve availability using Freebusy API
    const { data: freeBusyResponse } = await calendar.freebusy.query({
      resource: requestBody,
    });

    // Map the availability results to an array of objects
    let availability = calendarIds.map((calendarId, index) => ({
      id: calendarId,
      summary: data.items[index].summary,
      busy: freeBusyResponse.calendars[calendarId].busy,
    }));

    availability = availability.filter((item) => {
      return item.busy && item.busy.length == 0;
    });
    return availability;
  } catch (error) {
    console.error("Error retrieving calendar availability:", error);
    throw error;
  }
}

// Define the route to retrieve calendar availability
router.get("/availability", async (req, res) => {
  // Specify the date range to check for availability
  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);
  //const startDate = new Date("2023-06-01");
  //const endDate = new Date("2023-06-10");
  console.log("start Date " + startDate + " EndDate : " + endDate)  
  authorize()
    .then(auth => listCalendarAvailability(auth, startDate, endDate))
    .then((availabilityCal) => {
      // Stringify the response object
      const jsonString = JSON.stringify(availabilityCal);

      // Set the content-type header to application/json
      res.setHeader("Content-Type", "application/json");

      // Send the stringified response to the client
      res.send(jsonString);
    })
    .catch(console.error);
});



module.exports = router;

  