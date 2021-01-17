module.exports = {
    urlProduction: 'http://18.192.6.172:8000/graphql',
    urlDevelopment: process.env.NODE_ENV === 'production' ? 'http://18.192.6.172:8000/graphql' :
        'http://18.192.6.172:8000/graphql'
};
