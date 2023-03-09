const fs=require('fs');

const eventHandler=(req,res)=>{
    const url=req.url;
    const method=req.method;
    if(url=='/'){
        return fs.readFile('message.txt',{encoding : 'utf-8'},(err,data)=>{
            res.setHeader('Content-Type','text/html');
            res.write('<html>');
            res.write('<head><title>My First Page</title></head>');
            res.write('<body>');
            res.write(`<p>${data}</p><br>`);
            res.write('<form action=/message method=POST>');
            res.write('<input type=text name=message>');
            res.write('<button>Send the message</button>');
            res.write('</form>');
            res.write('</body>');
            res.write('</html>');
            return res.end();
        });
    }

    if(url=='/message' && method=='POST'){
        const body=[];
        req.on('data',(chunk)=>{
            body.push(chunk);
        })
        return req.on('end',()=>{
            const bodyParsed=Buffer.concat(body).toString();
            const message=bodyParsed.split('=')[1];
            fs.writeFile('message.txt',message,(err)=>{
                res.statusCode=302;
                res.setHeader('Location','/');
                return res.end();
            })
        })
    }
};
// module.exports=eventHandler;
// module.exports={
//     handler:eventHandler,
//     text:'Some text are hard coded'
// }

exports.handler=eventHandler;
exports.text='Some text are hard coded';