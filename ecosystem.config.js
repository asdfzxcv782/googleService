module.exports = {
    apps : [
        {
          name: "googleService",
          script: "./index.js",
          //watch: true,
          env: {
            "PORT": 8000,
            "NODE_ENV": "development",
            "CorsOrigin": 'http://localhost:8010',
            "CorsCredentials": true
          },
          env_production: {
            "PORT": 7070,
            "NODE_ENV": "production",
            "CorsOrigin": '*',
            "CorsCredentials": false
            }
        }
    ]
  }