#!/bin/bash

# Script to connect local repository to GitHub
# Run this after creating your GitHub repository

echo "🔗 Connecting to GitHub..."
echo ""

# Check if remote already exists
if git remote get-url origin &>/dev/null; then
    echo "⚠️  Remote 'origin' already exists. Removing it first..."
    git remote remove origin
fi

# Prompt for GitHub repository URL
echo "Please provide your GitHub repository URL"
echo "Example: https://github.com/SaiAnjan/my-portfolio.git"
echo ""
read -p "GitHub repo URL: " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ No URL provided. Exiting."
    exit 1
fi

# Add remote
echo ""
echo "Adding remote origin..."
git remote add origin "$REPO_URL"

# Verify remote
echo ""
echo "✅ Remote added. Verifying..."
git remote -v

# Push to GitHub
echo ""
echo "🚀 Pushing to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Done! Your repository is now connected to GitHub."
echo ""
echo "Next steps:"
echo "1. Go to https://vercel.com and import this repository"
echo "2. Set up Supabase project at https://supabase.com"
echo "3. Add environment variables in Vercel dashboard"

