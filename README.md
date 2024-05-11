# Skywise SDK

## Description

Skywise SDK is a comprehensive toolkit designed to simplify the integration and management of web API services in your applications. It provides robust tools for caching, API communication, and data manipulation, making it ideal for developers looking to enhance the performance and scalability of their web applications.


## Daily Contributions

Push code updates to the `prod` branch.

## Releasing to npmjs

When ready to release, create a tag to facilitate deployment to npmjs.

![npm](https://img.shields.io/npm/v/@skywise-app/sdk)

## Installation

To install the Skywise SDK, run the following command in your project directory:

```bash
npm install @skywise-app/sdk
```

## Usage

Here's a quick example to get you started with Skywise SDK:

```typescript
import { get, post } from '@skywise-app/sdk';

// Fetch data with caching
get('https://api.example.com/data', { cacheTTL: 3600 }).then(response => {
  console.log(response.data);
});

// Post data to an endpoint
post('https://api.example.com/data', { body: { key: 'value' } }).then(response => {
  console.log(response.data);
});
```

## Features

- **Caching**: Automatically caches responses to reduce load times and API calls.
- **Error Handling**: Robust error management to handle and report API issues effectively.
- **Data Manipulation**: Utilities to process and transform data easily.

## API Documentation

Detailed API documentation is available [here](#) (link to detailed API docs).

## Configuration Options

Skywise SDK can be configured to suit various needs. Configuration options include cache settings, default headers, and more.

## Examples

### Basic Data Fetching

Here's how you can fetch data using the Skywise SDK:

```typescript
import { get } from '@skywise-app/sdk';

get('https://api.example.com/data').then(response => {
  console.log(response.data);
});
```

### Advanced Data Manipulation

Manipulate data received from an API before displaying it:

```typescript
import { get } from '@skywise-app/sdk';

get('https://api.example.com/data').then(response => {
  const modifiedData = response.data.map(item => ({
    ...item,
    isNew: true
  }));
  console.log(modifiedData);
});
```

### Handling API Errors

Demonstrate how to handle errors gracefully when API requests fail:

```typescript
import { get } from '@skywise-app/sdk';

get('https://api.example.com/data').then(response => {
  console.log(response.data);
}).catch(error => {
  console.error('Failed to fetch data:', error.message);
});
```

### Using the Caching Mechanism with Different TTLs

Show how to use different time-to-live (TTL) settings for caching:

```typescript
import { get } from '@skywise-app/sdk';

// Short-lived cache for frequently updated data
get('https://api.example.com/live-stats', { cacheTTL: 300 }).then(response => {
  console.log(response.data);
});

// Long-lived cache for rarely changed data
get('https://api.example.com/static-info', { cacheTTL: 86400 }).then(response => {
  console.log(response.data);
});
```

### Posting Data to an API

Illustrate how to post data to an API endpoint:

```typescript
import { post } from '@skywise-app/sdk';

const dataToPost = { name: 'John Doe', age: 30 };

post('https://api.example.com/users', { body: dataToPost }).then(response => {
  console.log('User created:', response.data);
}).catch(error => {
  console.error('Error creating user:', error.message);
});
```

### Integrating with Frontend Frameworks (React Example)

Integrate SDK in a React application to fetch data:

```typescript
import React, { useEffect, useState } from 'react';
import { get } from '@skywise-app/sdk';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    get('https://api.example.com/data').then(response => {
      setData(response.data);
    });
  }, []);

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
}

export default App;
```

### Handling Comments

Retrieve and post comments using the SDK:

```javascript
import { loadComments, postComment } from '@skywise-app/sdk';

// Load comments
loadComments({ app: 'myApp', categoryId: '123', docId: '456' }).then(comments => {
  console.log(comments);
});

// Post a comment
postComment({
  app: 'myApp',
  categoryId: '123',
  docId: '456',
  authorUid: 'user123',
  authorName: 'John Doe',
  content: 'This is a comment'
}).then(response => {
  console.log('Comment posted:', response.data);
});
```

### DataDog Integration

Log metrics to DataDog using the SDK:

```javascript
import { datadogFactory } from '@skywise-app/sdk';

const datadog = datadogFactory({ app: 'myApp', prefix: 'myApp', env: 'production' });

// Increment a counter
datadog.increment('page_view', { page: 'homepage' });

// Log a metric with a sample rate
datadog.increment100('api_call', { endpoint: 'getData' });
```

### Managing Ratings

Post and load ratings for items:

```javascript
import { postRating, loadRatings } from '@skywise-app/sdk';

// Post a rating
postRating('products', 'product123', 5).then(() => {
  console.log('Rating posted');
});

// Load ratings
loadRatings('products', ['product123', 'product456']).then(ratings => {
  console.log('Ratings:', ratings);
});
```

### Using Key-Value Database (kvdb)

Manage local storage data with kvdb:

```javascript
import { kvdb } from '@skywise-app/sdk';

// Set a value
kvdb.set('user_session', { userId: 'user123', status: 'active' });

// Get a value
const session = kvdb.get('user_session');
console.log('Session:', session);

// Add to a list
kvdb.addToList('user_favorites', 'product123');

// Remove from a list
kvdb.removeFromList('user_favorites', 'product123');
```
