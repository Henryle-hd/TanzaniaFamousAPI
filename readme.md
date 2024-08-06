# TanzaniaFamousAPI Documentation

An API providing information about famous Tanzanian personalities.

## Overview

TanzaniaFamousAPI is a service that offers data on notable individuals from Tanzania. This documentation provides details on how to use the API, available endpoints, and example requests and responses.

## Usage

To use the API, make GET requests to the provided endpoints to retrieve information about famous Tanzanians.

## API Endpoints

- `GET /api/famous` - Retrieve all famous personalities
- `GET /api/famous/:id` - Get a specific famous personality by ID
- `GET /api/v1/query` - Query famous personalities with various parameters

## Examples

### Get Famous Person by ID

Example request:

GET https://tanzania-famous-api.netlify.app/api/famous/1

Example response:

```
{
"success": true,
"data": {
"id": 1,
"name": "Julius Nyerere",
"dob": "1922-04-13",
"description": "First President of Tanzania and African socialist leader."
}
}
```

### Get All Famous Personalities

Example request:

GET https://tanzania-famous-api.netlify.app/api/famous

### Query Famous Personalities

The query endpoint supports various parameters for filtering and pagination.

Example requests:

1. Get all famous personalities:

   GET https://tanzania-famous-api.netlify.app/api/v1/query

2. Search by name:

   GET https://tanzania-famous-api.netlify.app/api/v1/query?search=John

3. Filter by date of birth:

   GET https://tanzania-famous-api.netlify.app/api/v1/query?dob=1990-01-01

4. Limit results:

   GET https://tanzania-famous-api.netlify.app/api/v1/query?limit=10

5. Paginate results:

   GET https://tanzania-famous-api.netlify.app/api/v1/query?page=1

6. Combine multiple parameters:

   GET https://tanzania-famous-api.netlify.app/api/v1/query?search=John&dob=1990-01-01&limit=10&page=1

Example response structure:

```json
{
  "success": true,
  "data": [
    /* Array of famous personalities */
  ],
  "total": 10,
  "page": 1,
  "limit": 10
}
```

#### More info

- [Docs](https://tanzania-famous-api.netlify.app/)
- [Twitter](https://x.com/Henrylee_hd)
- [Blog](https://easyone.hashnode.dev/)
