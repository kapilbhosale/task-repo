# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"

# React
pin "react", to: "https://cdn.jsdelivr.net/npm/react@18.3.1/+esm"
pin "react-dom", to: "https://cdn.jsdelivr.net/npm/react-dom@18.3.1/+esm"
pin "react-dom/client", to: "https://cdn.jsdelivr.net/npm/react-dom@18.3.1/client/+esm"
pin "scheduler", to: "https://cdn.jsdelivr.net/npm/scheduler@0.23.2/+esm"

# React Router
pin "react-router-dom", to: "https://cdn.jsdelivr.net/npm/react-router-dom@6.22.0/+esm"
pin "react-router", to: "https://cdn.jsdelivr.net/npm/react-router@6.22.0/+esm"
pin "@remix-run/router", to: "https://cdn.jsdelivr.net/npm/@remix-run/router@1.15.0/+esm"

# React components
pin_all_from "app/javascript/components", under: "components", to: "components"
