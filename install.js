module.exports = {
  "run": [{
    "method": "shell.run",
    "params": {
      "message": "git clone https://github.com/open-webui/open-webui app"
    }
  }, {
    "method": "fs.copy",
    "params": {
      "src": "app/example.env",
      "dest": "app/.env"
    }
  }, {
    "method": "shell.run",
    "params": {
      "message": [
        "npm i",
        "npm run build"
      ],
      "path": "app"
    }
  }, {
    "method": "shell.run",
    "params": {
      "message": "pip install -r requirements.txt",
      "venv": "env",
      "path": "app/backend"
    }
  }, {
    "method": "input",
    "params": { "title": "Install Success", "description": "Go back to the dashboard and launch the app!" }
  }]
}