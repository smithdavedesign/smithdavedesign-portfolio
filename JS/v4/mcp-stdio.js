#!/usr/bin/env node
// Local stdio transport for the resume MCP server:
//   claude mcp add dave-smith -- node /path/to/JS/v4/mcp-stdio.js
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { createMcpServer } = require('./mcpServer');

createMcpServer()
    .connect(new StdioServerTransport())
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
