# NimbusCdk

This package contains CDK TypeScript code for deploying infrastructure for the Nimbus app
* S3 bucket for lambda
* API gateway for accessing lambda cropper function
* Lambda function for cropping images


## Getting Started

Make sure you have AWS cli configured

```bash
aws sts get-caller-identity
```

Install nvm 
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.6/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

Should be version 20.x

```bash
nvm install 20
nvm use 20
node -v
```

Bootstrap new AWS environment

```bash
ACCOUNT_ID=
REGION=
npx cdk bootstrap aws://$ACCOUNT_ID/$REGION
```

### Useful Commands

- `npm run build` - Compile TypeScript to JavaScript
- `npx cdk deploy` - Deploy this stack to your default AWS account/region
- `npx cdk diff` - Compare deployed stack with current state
