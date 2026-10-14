const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
const { tools, runTool } = require('./tools');

/** Build an MCP server exposing the resume tools. Transport-agnostic (used by HTTP and stdio). */
function createMcpServer() {
    const server = new McpServer({ name: 'dave-smith-resume', version: '1.0.0' });
    for (const t of tools) {
        server.registerTool(
            t.name,
            { description: t.description, inputSchema: t.input.shape, annotations: { readOnlyHint: true } },
            async (args) => ({ content: [{ type: 'text', text: JSON.stringify(runTool(t.name, args), null, 2) }] })
        );
    }
    return server;
}

module.exports = { createMcpServer };
