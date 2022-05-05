const swaggerJson = require('../../../swagger/swagger.json')
module.exports = (_, res) => {
    
    if (!swaggerJson) {
       res
          .status(404)
          .set('content-type', 'application/json')
          .send({
             message: 'Cannot find swagger.json, has the server generated it?'
          })
    }
    return res
       .status(200)
       .set('content-type', 'application/json')
       .send(swaggerJson)
 };



