exports.CLIENT_URL = process.env.NODE_ENV === 'development'
    ? process.env.dev_client_url
    : process.env.prod_client_url;
