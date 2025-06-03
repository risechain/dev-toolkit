#!/bin/bash

echo "🔧 Testing build locally (same as Vercel)..."
echo ""

# Clean cache
echo "📦 Cleaning cache..."
rm -rf .next

# Run build
echo "🏗️  Running build..."
npm run build

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Build successful! Ready to deploy to Vercel."
else
  echo ""
  echo "❌ Build failed! Fix the errors above before deploying."
  exit 1
fi