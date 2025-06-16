# Contributing to TurboLight

Thank you for your interest in contributing to TurboLight! This document provides guidelines and instructions for contributing to this project.

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/turbolight.git`
3. Install dependencies: `npm install`
4. Make your changes
5. Build the project: `npm run build`
6. Test your changes

## Development Workflow

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Ensure the code builds: `npm run build`
4. Commit your changes with a descriptive message
5. Push to your fork: `git push origin feature/your-feature-name`
6. Create a Pull Request

## Code Style

- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Write clean, maintainable code

## Pull Request Process

1. Update the README.md or documentation with details of changes if appropriate
2. Update the version number in package.json following [Semantic Versioning](https://semver.org/)
3. The PR will be merged once it receives approval from the maintainers

## Testing

Before submitting a PR, test your changes:

1. Build the project: `npm run build`
2. Test the package locally using the provided test script: `./test-local.sh`
3. Verify that your changes work as expected

## License

By contributing to TurboLight, you agree that your contributions will be licensed under the project's MIT License.
