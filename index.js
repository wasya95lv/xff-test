import express from 'express';

const ENV = process.argv[2].split("=")[1]
console.log(ENV)

const app = express();
const port = process.env.PORT || 3000;
    
app.set('port', port);



app.enable('trust proxy')


app.get('/', (req, res) => {
    const headers = JSON.parse(JSON.stringify(req.headers));
    const agentIp = req.ip;
    const hasXff = Object.prototype.hasOwnProperty.call(headers, 'x-forwarded-for');
    
    console.log(agentIp);

    const resp = 
    `Request has X-Forwarded-For Header: ${hasXff}\n` +
    `Agent IP: ${agentIp}`;

    
    res.send(resp)
});
 
app.get('/admin', (req, res) => {
    const validIp = "127.0.0.1";
    const callerIp = req.ip;

    if (callerIp !== validIp) {
        console.log(callerIp)
        return res.status(401).send("Unauthorized!");
    }

    res.status(200).send(`IP ${callerIp} authorized! IP trace: ${req.ips}`);
});

app.get('/login', (req, res) => {
    res.send('To proceed with access you need to provide valid credentials or use IP from white list. \
        #TODO: Configure whitelist from file whitelists.txt \
        ### Please remove it after configuration ###');
});

app.get('/login/whitelists.txt', (req, res) => {
    const listOfIp = ['127.0.0.1 — Actual', '192.168.0.1 — Obsolote'];
    res.send(`IP's to whitelist:\n\t * ${listOfIp.join('\n\t * ')}\n #TODO: Remove file after configuration`);
});

const listener = app.listen(port,() => {
    console.log(`App started on port ${listener.address().port}`);
})
