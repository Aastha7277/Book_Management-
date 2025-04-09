#!/bin/sh

echo "🛠 Running Prisma DB push..."
npx prisma db push

echo "📦 Generating Prisma client..."
npx prisma generate

echo "🚀 Starting the server..."
node index.js