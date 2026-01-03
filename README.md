# NimbusCdk

This package contains CDK TypeScript code for deploying infrastructure for the Nimbus app.

## Project Structure

- `bin/` - CDK app entry point
- `lib/` - CDK stack definitions
- `test/` - Unit tests

## Getting Started

### Prerequisites

- Node.js 18.x or later
- AWS CLI configured with appropriate credentials
- AWS CDK Toolkit (`npm install -g aws-cdk`)

### Installation

```bash
npm install
```

### Useful Commands

- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Watch for changes and compile
- `npm run test` - Run unit tests
- `cdk deploy` - Deploy this stack to your default AWS account/region
- `cdk diff` - Compare deployed stack with current state
- `cdk synth` - Emit the synthesized CloudFormation template

## Development

This is an initial setup that doesn't provision any cloud resources yet. The infrastructure code will be added incrementally as the application requirements are defined.