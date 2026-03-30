# YouTube AI Summariser

A Chrome extension that injects an AI-powered sidebar into YouTube, 
fetching real video transcripts and generating summaries using the 
Groq LLaMA 3.1 API.

## Features
- Automatically injects a sidebar on any YouTube video page
- Generates concise AI summaries using Groq's LLaMA 3.1 8B model based on the youtube video's title
- Secure API key injection at build time via Webpack DefinePlugin

## Tech Stack
- TypeScript, React, Webpack
- Chrome Extensions API (Manifest V3)
- Groq LLaMA 3.1 API

## Installation

1. Clone the repo
   git clone https://github.com/YOUR_USERNAME/youtube-ai-summariser

2. Install dependencies
   npm install

3. Create a .env file in the root directory
   GROQ_API_KEY=your_groq_api_key_here

4. Build the extension
   npm run build

5. Load the extension in Chrome
   - Go to chrome://extensions
   - Enable Developer Mode
   - Click "Load unpacked" and select the public/ folder

## Usage
Navigate to any YouTube video with captions and click the 🤖 icon 
on the right side of the page to generate a summary.

## Getting a Groq API Key
Sign up for free at https://console.groq.com and generate an API key.
