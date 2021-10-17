const fastify = require('fastify')();
const fastifyMultipart = require('fastify-multipart');
const pump = require('pump');
const fs = require('fs');

fastify.register(fastifyMultipart);

fastify.get('/', (request: any, reply: any) => {
    reply.code(200).send({
        data: 'hello world'
    })
});

fastify.post('/', async (req: any, res: any) => {
    
  if (!req.isMultipart()) {
      res.code(400).send(new Error('Request is not multipart'))
      return
  }
  
  const mp = req.multipart(handler, onEnd)

  function onEnd(err: any) {
    console.log('upload completed')
    res.code(200).send()
  }

  function handler (field: any, file: any, filename: any, encoding: any, mimetype: any) {

    const dir = './uploads';

    // check if directory exists
    if (fs.existsSync(dir)) {
        console.log('Directory exists!');
    } else {
        fs.mkdirSync('./uploads', '777', true);
        console.log('Directory not found.');
    }

      pump(file, fs.createWriteStream('./uploads/' + filename));
      
  }

    res.send();
})


console.log('==========================');
console.log(`Port listening on 3400`);
console.log('==========================');

fastify.listen(3400);