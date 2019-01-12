# Software Engineer  (Backend) - Instructions

This application was built with node.js and MongoDb. It is deploy in a Docker container using pm2 to manage production instance orchestration.

It makes use of MapBox Matrix API and as such you will need a MapBox access token.

##Running the Application
1. Sign up at MapBox.com and get a public access token
2. Rename the .env.example file to .env and add the access token from MapBox to the right hand side of the first line where MAPBOX_ACCESS_TOKEN = is located: e.g. `MAPBOX_ACCESS_TOKEN = acess_token`
3. Open your terminal and run `bash start.sh`
4. This will build three containers: enterprise_test, enterprise_mongo and enterprise_web
5. The integration/unit tests included will automatically and the results will be displayed in the terminal
6. You can access the application from the following at http://localhost:8080 from the url below

## Api interface example

#### Place order

  - Method: `POST`
  - URL path: `/orders`
  - Request body:

    ```
    {
        "origin": ["START_LATITUDE", "START_LONGTITUDE"],
        "destination": ["END_LATITUDE", "END_LONGTITUDE"]
    }
    ```

  - Response:

    Header: `HTTP 200`
    Body:
      ```
      {
          "id": <order_id>,
          "distance": <total_distance>,
          "status": "UNASSIGNED"
      }
      ```
    or

    Header: `HTTP <HTTP_CODE>`
    Body:

      ```
      {
          "error": "ERROR_DESCRIPTION"
      }
      ```

  - Tips:

    coordinates in request should be an array of strings, distance in response should be integer in meters.

#### Take order

  - Method: `PATCH`
  - URL path: `/orders/:id`
  - Request body:
    ```
    {
        "status": "TAKEN"
    }
    ```
  - Response:
    Header: `HTTP 200`
    Body:
      ```
      {
          "status": "SUCCESS"
      }
      ```
    or

    Header: `HTTP <HTTP_CODE>`
    Body:
      ```
      {
          "error": "ERROR_DESCRIPTION"
      }
      ```

#### Order list

  - Method: `GET`
  - Url path: `/orders?page=:page&limit=:limit`
  - Response:
    Header: `HTTP 200`
    Body:
      ```
      [
          {
              "id": <order_id>,
              "distance": <total_distance>,
              "status": <ORDER_STATUS>
          },
          ...
      ]
      ```

    or

    Header: `HTTP <HTTP_CODE>` Body:

    ```
    {
        "error": "ERROR_DESCRIPTION"
    }
    ```

