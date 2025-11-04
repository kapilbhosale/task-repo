# My Store - React + Rails Application

A modern web application built with **React 19**, **Rails 8**, and **Tailwind CSS v4**. This project uses JSX syntax, React Router for navigation, and esbuild for fast JavaScript bundling.

---

## 📋 Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Troubleshooting](#troubleshooting)

---

## 🔧 Requirements

Before you start, make sure you have the following installed on your system:

### Required Software

| Software | Version | Check Command |
|----------|---------|---------------|
| **Ruby** | 3.4.7 | `ruby -v` |
| **Rails** | 8.0.4 | `rails -v` |
| **Node.js** | 18.x or higher | `node -v` |
| **Yarn** | 1.22+ | `yarn -v` |
| **SQLite3** | 3.x | `sqlite3 --version` |

### Operating System

This project works on:
- ✅ macOS
- ✅ Linux
- ✅ Windows (with WSL recommended)

---

## 💻 Installation

### 1. Install Ruby

#### macOS
```bash
# Install GPG keys
gpg --keyserver keyserver.ubuntu.com --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB

# Install RVM (Ruby Version Manager)
\curl -sSL https://get.rvm.io | bash -s stable

# Load RVM into your shell
source ~/.rvm/scripts/rvm

# For zsh users, add to ~/.zshrc:
echo 'source ~/.rvm/scripts/rvm' >> ~/.zshrc
source ~/.zshrc

# Install Ruby 3.4.7
rvm install 3.4.7
rvm use 3.4.7 --default

# Verify installation
ruby -v
rvm current
```

#### Linux (Ubuntu/Debian)
```bash
# Install dependencies
sudo apt update
sudo apt install -y software-properties-common gnupg2 curl

# Install GPG keys
gpg --keyserver keyserver.ubuntu.com --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB

# Install RVM
\curl -sSL https://get.rvm.io | bash -s stable

# Load RVM into your shell
source ~/.rvm/scripts/rvm

# For bash users, add to ~/.bashrc:
echo 'source ~/.rvm/scripts/rvm' >> ~/.bashrc
source ~/.bashrc

# Install Ruby 3.4.7
rvm install 3.4.7
rvm use 3.4.7 --default

# Verify installation
ruby -v
rvm current
```

#### Windows
Use **WSL (Windows Subsystem for Linux)** and follow the Linux instructions above.

### 2. Install Rails

```bash
gem install rails -v 8.0.4

# Verify installation
rails -v
```

### 3. Install Node.js and Yarn

#### macOS
```bash
# Using Homebrew
brew install node
brew install yarn

# Verify installation
node -v
yarn -v
```

#### Linux (Ubuntu/Debian)
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Yarn
npm install -g yarn

# Verify installation
node -v
yarn -v
```

### 4. Install SQLite3

#### macOS
```bash
brew install sqlite3
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt install sqlite3 libsqlite3-dev
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd store
```

### 2. Install Ruby Dependencies

```bash
bundle install
```

This installs all Ruby gems including:
- Rails 8.0.4
- Tailwind CSS Rails
- jsbundling-rails
- React Router support

### 3. Install JavaScript Dependencies

```bash
yarn install
```

This installs:
- React 19.2.0
- React DOM 19.2.0
- React Router DOM 7.9.5
- esbuild 0.25.12

### 4. Setup the Database

```bash
# Create the database
rails db:create

# Run migrations (if any)
rails db:migrate

# Load seed data (optional)
rails db:seed
```

### 5. Build JavaScript Assets

```bash
# Initial build
yarn build
```

### 6. Start the Development Server

```bash
bin/dev
```

This command starts **three processes**:
- 🟢 **Rails server** (port 3000)
- 🎨 **Tailwind CSS watcher** (auto-rebuilds CSS)
- ⚡ **esbuild watcher** (auto-bundles JavaScript)

### 7. Open Your Browser

Navigate to:
```
http://localhost:3000
```

You should see the home page! 🎉

---

## 📁 Project Structure

```
store/
├── app/
│   ├── controllers/        # Rails controllers
│   ├── models/            # Rails models
│   ├── views/             # Rails views
│   │   └── pages/
│   │       └── demo.html.erb
│   ├── javascript/        # JavaScript/React code
│   │   ├── application.js # Entry point
│   │   └── components/    # React components
│   │       ├── App.jsx
│   │       ├── Navigation.jsx
│   │       ├── HomePage.jsx
│   │       └── TasksPage.jsx
│   └── assets/
│       ├── stylesheets/   # Regular CSS
│       ├── tailwind/      # Tailwind source
│       └── builds/        # Built JavaScript & CSS
├── config/
│   ├── routes.rb          # Routes configuration
│   └── database.yml       # Database configuration
├── db/                    # Database files
├── public/                # Static files
├── Gemfile                # Ruby dependencies
├── package.json           # JavaScript dependencies
├── Procfile.dev          # Development processes config
└── README.md             # This file
```

---

## 🛠️ Development

### Available Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Welcome page |
| `/tasks` | Tasks | Tasks management page |


### Adding New Routes

1. add new page in `javascript/components` directory

2. add route to app.jsx
Edit `app/javascript/components/App.jsx`:

```jsx
import NewPage from "./NewPage";

// Add to Routes:
<Route path="/new-page" element={<NewPage />} />
```

Then add a navigation link in `Navigation.jsx`:

```jsx
<Link to="/new-page" className="text-gray-600 hover:text-gray-900">
  New Page
</Link>
```

### Using Tailwind CSS

Style components using Tailwind utility classes:

```jsx
<div className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600">
  Styled with Tailwind
</div>
```

### Running Commands

```bash
# Start development server
bin/dev

# Run Rails console
rails console

# Run database migrations
rails db:migrate

# Build JavaScript (one-time)
yarn build

# Install a new npm package
yarn add package-name

# Install a new Ruby gem
bundle add gem-name
```

---

## 🐛 Troubleshooting

### Issue: Command not found (ruby, rails, node)

**Solution:** Make sure you've installed all requirements and restarted your terminal.

```bash
# Check installations
ruby -v
rails -v
node -v
yarn -v
```

### Issue: `bin/dev` not starting

**Solution:** Make sure the file has execute permissions:

```bash
chmod +x bin/dev
```

### Issue: Port 3000 already in use

**Solution:** Kill the existing process:

```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Or use a different port
bin/rails server -p 3001
```

### Issue: JavaScript changes not reflecting

**Solution:** 
1. Stop the server (Ctrl+C)
2. Rebuild JavaScript: `yarn build`
3. Restart: `bin/dev`
4. Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)

### Issue: CSS not loading

**Solution:** Rebuild Tailwind CSS:

```bash
rails tailwindcss:build
```

### Issue: Database errors

**Solution:** Reset the database:

```bash
rails db:drop db:create db:migrate
```

### Issue: Gem installation errors

**Solution:**

```bash
# Update bundler
gem install bundler

# Clean install
bundle install --full-index
```

---

## 📚 Tech Stack

### Frontend
- **React 19.2.0** - UI library with JSX
- **React Router DOM 7.9.5** - Client-side routing
- **Tailwind CSS v4** - Utility-first CSS framework
- **esbuild 0.25.12** - Fast JavaScript bundler

### Backend
- **Ruby 3.4.7** - Programming language
- **Rails 8.0.4** - Web framework
- **SQLite3** - Database (development)
- **Puma** - Web server

### Build Tools
- **jsbundling-rails** - JavaScript bundling for Rails
- **tailwindcss-rails** - Tailwind CSS integration
- **Foreman** - Process manager (via `bin/dev`)

---

## 📖 Additional Resources

### Learning Resources
- [Rails Guides](https://guides.rubyonrails.org/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Docs](https://reactrouter.com/)


**Happy Coding! 🚀**
