import AWS from 'aws-sdk';

let dynamodb;
if (!process.env.IS_OFFLINE) {
  dynamodb = new AWS.DynamoDB.DocumentClient({
    convertEmptyValues: true
  });
}
else {
  console.log('Operating offline');
  dynamodb = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1', // process.env.AWS_REGION,
    endpoint: 'http://localhost:8000' // process.env.DYNAMODB_URL
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
