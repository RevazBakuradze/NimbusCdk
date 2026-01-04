import {Stack, Aws} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Code, Function, Runtime} from 'aws-cdk-lib/aws-lambda';
import {Cors, LambdaIntegration, RestApi} from 'aws-cdk-lib/aws-apigateway';
import {Bucket, BucketEncryption, BlockPublicAccess} from 'aws-cdk-lib/aws-s3';
import {ManagedPolicy, Role, ServicePrincipal} from "aws-cdk-lib/aws-iam";

export class CropperLambda extends Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // S3 bucket to store Lambda artifacts
    const lambdaArtifactBucket = new Bucket(this, 'CropperArtifactBucket', {
      bucketName: `nimbus-${Aws.REGION}-cropper-lambda-artifact`,
      versioned: true,
      enforceSSL: true,
      encryption: BucketEncryption.S3_MANAGED,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
    });

    // IAM role for the Lambda with basic execution permissions
    const cropperLambdaRole = new Role(this, 'CropperLambdaRole', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });

    // Allow lambda role read and put to only 'cropper-lambda/' folder
    lambdaArtifactBucket.grantRead(cropperLambdaRole, 'cropper-lambda/*');
    lambdaArtifactBucket.grantPut(cropperLambdaRole, 'cropper-lambda/*');

    const imageCropper = new Function(this, 'ImageCropper', {
      runtime: Runtime.PYTHON_3_9,
      handler: 'cropper.handler',
      code: Code.fromBucket(lambdaArtifactBucket, 'cropper-lambda/lambda.zip'),
      role: cropperLambdaRole,
    });

    // API Gateway to expose the Lambda function
    const api = new RestApi(this, 'ImageCropApi', {
      restApiName: 'ImageCropService',
      description: 'API for cropping images',
      binaryMediaTypes: ['image/png', 'image/jpeg', 'image/*'],
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: ['POST'],
        allowHeaders: Cors.DEFAULT_HEADERS,
      },
    });

    const cropResource = api.root.addResource('cropImage');
    cropResource.addMethod(
      'POST',
      new LambdaIntegration(imageCropper, { proxy: true })
    );
  }
}
