import AWS from 'aws-sdk';

let dynamodb;
if (process.env.IS_OFFLINE) {
  console.log('Online', process.env.IS_OFFLINE, process.env.AWS_REGION, process.env.DYNAMODB_URL);
  dynamodb = new AWS.DynamoDB.DocumentClient({
    convertEmptyValues: true
  });
}
else {
  console.log('Offline', process.env.IS_OFFLINE, process.env.AWS_REGION, process.env.DYNAMODB_URL);
  console.log('Operating offline');
  dynamodb = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION,
    endpoint: process.env.DYNAMODB_URL
  });
}

export function createItem(params) {
  return new Promise((resolve, reject) => dynamodb
    .put(params)
    .promise()
    .then(() => resolve(params.Item))
    .catch(err => reject(err))
  );
}

export function scan(params) {
  return new Promise((resolve, reject) => dynamodb
    .scan(params)
    .promise()
    .then(data => resolve(data.Items))
    .catch(error => reject(error))
  );
}
