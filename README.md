# 🔍 Tool Finder

A modern web app for discovering and comparing software tools. Built with React and Tailwind CSS.

## ✨ Features

- Browse 13+ curated tools across 5 categories
- AI-powered recommendations
- Smart search and category filters
- Compare up to 3 tools side-by-side
- Responsive design with modern UI

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- React 18+
- Tailwind CSS
- Lucide React (icons)

## 📊 Adding Tools

Edit the `toolsData` object in `ToolFinder.jsx`:

```javascript
{
  id: 14,
  name: 'Tool Name',
  shortDescription: 'Brief description',
  category: 'productivity',
  pricing: { model: 'Freemium', tiers: [...] },
  features: ['Feature 1', 'Feature 2'],
  pros: ['Pro 1'],
  cons: ['Con 1'],
  tags: ['tag1', 'tag2'],
  affiliateLink: 'https://example.com',
  featured: false
}
```

## 📁 Categories

- Productivity
- Design
- Development
- Marketing
- Analytics

## 📝 License

MIT License

---

Built with ❤️ using React and Tailwind CSS