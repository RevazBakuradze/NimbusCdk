#!/usr/bin/env node
import {App} from 'aws-cdk-lib';
import {CropperLambda} from '../lib/CropperLambda';

const app = new App();
new CropperLambda(app, 'CropperLambda');

