module.exports = {
    apps : [
        {
          name: "googleService",
          script: "./index.js",
          //watch: true,
          env: {
              "PORT": 8000,
            "NODE_ENV": "development",
          },
          env_production: {
            "PORT": 7070,
            "NODE_ENV": "production",
            }
        }
    ]
  }