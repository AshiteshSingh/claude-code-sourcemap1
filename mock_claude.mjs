import http from 'http';

const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
        let promptText = "I don't have any context or memory about that.";
        if (body.includes('ZORBLAX-9')) {
            promptText = "Got it! I will remember that the codename is ZORBLAX-9 and the deploy key rotates every 19 days.";
        }
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            id: 'msg_fake123',
            type: 'message',
            role: 'assistant',
            model: 'claude-3-5-sonnet',
            content: [{ type: 'text', text: promptText }],
            stop_reason: 'end_turn',
            stop_sequence: null,
            usage: { input_tokens: 10, output_tokens: 10 }
        }));
    });
});

server.listen(8080, () => {
    console.log("Mock Anthropic API running on http://localhost:8080");
});
