#!/bin/bash

# This script helps publish the turbolight package to npm
# Usage: ./publish.sh [version]
# Example: ./publish.sh patch (for a patch version bump)
# Example: ./publish.sh minor (for a minor version bump)
# Example: ./publish.sh major (for a major version bump)

# Check if a version argument was provided
if [ -z "$1" ]; then
  echo "Error: Version argument required (patch, minor, or major)"
  echo "Usage: ./publish.sh [version]"
  exit 1
fi

# Ensure we're in the right directory
cd "$(dirname "$0")"

# Clean up any previous builds
echo "Cleaning up previous builds..."
rm -rf dist

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Run the build
echo "Building the package..."
npm run build

# Run tests if they exist
echo "Running tests..."
npm test

# Bump the version
echo "Bumping version ($1)..."
npm version $1

# Publish to npm
echo "Publishing to npm..."
npm publish

echo "Done! Package published to npm."
