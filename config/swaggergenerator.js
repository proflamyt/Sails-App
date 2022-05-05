module.exports['swagger-generator'] = {
    disabled: false,
    swaggerJsonPath: "./assets/swagger/swagger.json",
    swagger: {
        openapi: '3.0.0',
        info: {
            title: 'Swagger Json',
            description: 'This is a generated swagger json for your sails project',
            termsOfService: 'http://example.com/terms',
            contact: {name: 'ATC ', url: 'http://github.com/atc', email: 'atc@com.com'},
            license: {name: 'Apache 2.0', url: 'http://www.apache.org/licenses/LICENSE-2.0.html'},
            version: '1.0.0'
        },
        servers: [
            { url: 'http://localhost:1337/' }
        ],
        externalDocs: {url: 'http://atc.com.ng'}
    },
    defaults: {
        responses: {
            '200': { description: 'The requested resource' },
            '404': { description: 'Resource not found' },
            '500': { description: 'Internal server error' }
        }
    },
    excludeDeprecatedPutBlueprintRoutes: true,
    includeRoute: function(routeInfo) { return true; },
   
};