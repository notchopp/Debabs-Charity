# DeBabs Charity Website

A modern, dignified donation platform built with React, TailwindCSS, and Supabase.

## 🚀 Live Demo

Visit the live site: [DeBabs Charity](https://debabs-charity.vercel.app)

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: TailwindCSS with custom DeBabs color palette
- **Animations**: Framer Motion
- **Database**: Supabase
- **Deployment**: Vercel

## 🎨 Brand Identity

- **Colors**: Soft White (#F9FAFB), Charcoal Black (#111827), Warm Blue (#3B82F6), Vibrant Green (#10B981)
- **Typography**: Inter font family
- **Style**: Apple-inspired minimalist design

## 📦 Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/notchopp/Debabs-Charity.git
   cd Debabs-Charity
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm start
   ```

## 🗄️ Database Setup

Run the SQL commands from `supabase-schema.sql` in your Supabase SQL editor to create the required tables.

## 🚀 Deployment

The site is automatically deployed to Vercel on every push to the main branch.

## 📱 Features

- **Homepage**: Hero section with floating animations and featured items
- **Items Page**: Browse donated items with filtering
- **Donate Page**: Donation form (coming soon)
- **About Page**: Mission, stats, and values
- **Contact Page**: Contact form with Supabase integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
