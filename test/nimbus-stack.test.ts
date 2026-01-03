import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as Nimbus from '../lib/nimbus-stack';

test('Empty Stack', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new Nimbus.NimbusStack(app, 'MyTestStack');
  // THEN
  const template = Template.fromStack(stack);

  // Verify that the stack has no resources (initial state)
  const resources = template.toJSON().Resources;
  expect(resources || {}).toEqual({});
});
