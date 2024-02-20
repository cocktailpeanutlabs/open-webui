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
    "method": "fs.copy",
    "params": {
      "src": "start.bat",
      "dest": "app/backend/s.bat"
    }
  }, {
    "method": "fs.copy",
    "params": {
      "src": "start.sh",
      "dest": "app/backend/s.sh"
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
      "message": [
        "pip install -r requirements.txt",
        "pip install langchain==0.1.6",
        "pip install langchain-community==0.0.19"
      ],
      "venv": "env",
      "path": "app/backend"
    }
  }, {
    "method": "input",
    "params": { "title": "Install Success", "description": "Go back to the dashboard and launch the app!" }
  }]
}
