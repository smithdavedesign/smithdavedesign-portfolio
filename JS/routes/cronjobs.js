const express = require("express");
const crypto = require("crypto");
const cron = require("node-cron");
const { Octokit } = require("@octokit/core");
require("dotenv").config(); // Load environment variables from .env

const router = express.Router();

// Initialize Octokit with your GitHub Personal Access Token
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

// Function to fetch the current content and SHA of a file in a repository
async function getFileContentAndSha(owner, repo, path) {
  try {
    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner: owner,
        repo: repo,
        path: path,
      }
    );
    return {
      content: response.data.content,
      sha: response.data.sha,
    };
  } catch (error) {
    throw error;
  }
}

// Function to update the README file in a repository
async function updateReadme(owner, repo, path, message, content, sha) {
  try {
    const response = await octokit.request(
      "PUT /repos/{owner}/{repo}/contents/{path}",
      {
        owner: owner,
        repo: repo,
        path: path,
        message: message,
        content: content,
        sha: sha, // Include the SHA of the current content
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

router.get("/updateReadMe", async function (req, res, next) {
  const owner = "smithdavedesign"; // GitHub owner (your username)
  const repo = "gitHub-cron-job-app"; // GitHub repository name
  const path = "README.md"; // Replace with the path to the README file
  const message = "Update README content";
  const minRuns = 0; // Minimum number of runs
  const maxRuns = 5; // Maximum number of runs
  const randomRuns =
    Math.floor(Math.random() * (maxRuns - minRuns + 1)) + minRuns;
  const newContent = `### Updated on: ${new Date().toISOString()} automated and pushed by cronjob ${randomRuns} times`;

  async function getRandomDelay() {
    // Generate a random delay between 1 and 5 seconds
    return Math.floor(Math.random() * 4) + 1;
  }

  async function runTask(delay) {
    try {
      await new Promise((resolve) => setTimeout(resolve, delay * 1000));
      console.log(`Running task after ${delay} seconds`);
      try {
        // Fetch the current content and SHA of the README file
        const fileData = await getFileContentAndSha(owner, repo, path);

        // Encode the new content as Base64
        const newContentBase64 = Buffer.from(newContent).toString("base64");

        // Update the README file with the new content and SHA
        const result = await updateReadme(
          owner,
          repo,
          path,
          message,
          newContentBase64,
          fileData.sha
        );

        console.log("README updated successfully.");
        res.send(result);
      } catch (error) {
        console.error("Error updating README:", error);
      }
      return `Task completed after ${delay} seconds`;
    } catch (error) {
      console.error("Error occurred:", error);
      throw error;
    }
  }

  const promises = [];
  for (let i = 0; i < randomRuns; i++) {
    promises.push(runTask(await getRandomDelay()));
  }

  Promise.all(promises)
    .then((results) => {
      console.log("All tasks completed:", results);
    })
    .catch((error) => {
      console.error("Error occurred:", error);
    });
});

cron.schedule("30 14 * * 1-5", async () => {
  const owner = "smithdavedesign"; // GitHub owner (your username)
  const repo = "gitHub-cron-job-app"; // GitHub repository name
  const path = "README.md"; // Replace with the path to the README file
  const message = "Update README content";
  const minRuns = 0; // Minimum number of runs
  const maxRuns = 5; // Maximum number of runs
  const randomRuns =
    Math.floor(Math.random() * (maxRuns - minRuns + 1)) + minRuns;
  const newContent = `### Updated on: ${new Date().toISOString()} automated and pushed by cronjob ${randomRuns} times`;

  async function getRandomDelay() {
    // Generate a random delay between 1 and 5 seconds
    return Math.floor(Math.random() * 4) + 1;
  }

  async function runTask(delay) {
    try {
      await new Promise((resolve) => setTimeout(resolve, delay * 1000));
      console.log(`Running task after ${delay} seconds`);
      try {
        // Fetch the current content and SHA of the README file
        const fileData = await getFileContentAndSha(owner, repo, path);

        // Encode the new content as Base64
        const newContentBase64 = Buffer.from(newContent).toString("base64");

        // Update the README file with the new content and SHA
        const result = await updateReadme(
          owner,
          repo,
          path,
          message,
          newContentBase64,
          fileData.sha
        );

        console.log("README updated successfully.");
        res.send(result);
      } catch (error) {
        console.error("Error updating README:", error);
      }
      return `Task completed after ${delay} seconds`;
    } catch (error) {
      console.error("Error occurred:", error);
      throw error;
    }
  }

  const promises = [];
  for (let i = 0; i < randomRuns; i++) {
    promises.push(runTask(await getRandomDelay()));
  }

  Promise.all(promises)
    .then((results) => {
      console.log("All tasks completed:", results);
    })
    .catch((error) => {
      console.error("Error occurred:", error);
    });
});

module.exports = router;
