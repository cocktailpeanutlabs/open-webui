const path = require('path')
module.exports = {
  version: "1.2",
  title: "Open WebUI",
  description: "ChatGPT-Style WebUI for Ollama (Formerly Ollama WebUI) https://github.com/open-webui/open-webui",
  icon: "icon.png",
  menu: async (kernel) => {
    let names
    if (kernel.jsdom) {
      let JSDOM = kernel.jsdom.JSDOM
      let dom = await JSDOM.fromURL("https://ollama.com/library")
      let els = dom.window.document.querySelectorAll("#repo li a")
      let urls = []
      names = []
      for(let el of els) {
        urls.push(el.href)
        names.push(new URL(el.href).pathname.split("/").filter(x => x)[1])
      }
      console.log("names", names)
    }

    let installing = await kernel.running(__dirname, "install.js")
    let installed = await kernel.exists(__dirname, "app", "backend", "env")
    let running = await kernel.running(__dirname, "start.js")
    if (installing) {
      return [{
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }]
    } else if (installed) {
      if (running) {
        let local = kernel.memory.local[path.resolve(__dirname, "start.js")]
        if (local && local.url) {
          let o = [{
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: local.url,
          }, {
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }]
          if (names) {
            o.push({
              icon: "fa-solid fa-circle-down",
              text: "Download Models",
              menu: names.map((name) => {
                return {
                  icon: "fa-solid fa-circle-down",
                  text: name,
                  href: "down.json",
                  params: {
                    name
                  }
                }
              })
            })
          }
          return o
        } else {
          return [{
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }]
        }
      } else {
        let o = [{
          icon: "fa-solid fa-power-off",
          text: "Start",
          href: "start.js",
        }]
        if (names) {
          o.push({
            icon: "fa-solid fa-circle-down",
            text: "Download Models",
            menu: names.map((name) => {
              return {
                icon: "fa-solid fa-circle-down",
                text: name,
                href: "down.json",
                params: {
                  name
                }
              }
            })
          })
        }
        o = o.concat([{
          icon: "fa-solid fa-file-lines",
          text: "index",
          href: "download.html?raw=true"
        }, {
          icon: "fa-solid fa-plug",
          text: "Update",
          href: "update.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        }, {
          icon: "fa-solid fa-broom",
          text: "Factory Reset",
          href: "reset.js",
        }])
        return  o
      }
    } else {
      return [{
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      }]
    }
  }
}
