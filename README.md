# My Word Space

A Node.js/Express application for the SE_22 Web Backend Technologies module at CODE University of Applied Sciences, Berlin.

The server is live on https://api.berkozzambak.online

To play around and test the features, a simple React app that is connected to the server can be visited at:
https://client.berkozzambak.online
## Project Diagram

![Untitled Diagram drawio(1)](https://user-images.githubusercontent.com/32645610/202607161-ac84d762-b91c-4bc8-afb9-46957662dbc0.png)

## Run Locally

Clone the project

```bash
  git clone https://github.com/berk245/my-word-space-2022.git
```

Go to the project directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


This project uses a MySQL database to store and retrieve data. In order to run the project locally, make sure to setup a local database. 
Files within the models folder display the required tables and fields. 

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MYSQL_HOST` 
`MYSQL_USER` 
`MYSQL_PASSWORD`  
`MYSQL_DATABASE`  
`JWT_SECRET` 

**`CLOUDWATCH_GROUP_NAME`  
**`AWS_ACCESS_KEY_ID`  
**`AWS_SECRET_ACCESS_KEY`  
**`CLOUDWATCH_REGION` 

** These environment variables are related to CloudWatch logging service. They can be left blank in development environments.


## API Reference

#### Login

```http
  POST /login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required** |
| `password` | `string` | **Required** |

#### Signup

```http
  POST /signup
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | **Required** |
| `password` | `string` | **Required** |
| `email` | `string` | **Required** |


#### Get User Exercises

Returns all the exercises of a user

```http
  GET /exercise/get-all/{userId}
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId` | `string` | **Required** |


#### Get Exercise

Returns information on an exercise

```http
  GET /exercise/get/{exerciseId}
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `exerciseId` | `string` | **Required** |

#### Begin Exercise

```http
  POST /exercise/begin
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId` | `string` | **Required** |
| `exerciseParameters` | `object` | **Required** |

**exercise parameters should look like:
    exerciseParameters: {
        amount: 15,
        notebooks: [array of notebook ids],
        wordTypes: [enum representations of 'adjective', 'verb', 'noun' ]
    } 

#### Complete Exercise

```http
  POST /exercise/complete
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId` | `string` | **Required** |
| `exerciseId` | `string` | **Required** |
| `exerciseData` | `object` | **Required** |


#### Get User Notebooks

Returns all the notebooks of a user

```http
  GET /notebook/get-all/{userId}
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId` | `string` | **Required** |


#### Get Notebook Data

Returns information on a notebook

```http
  GET /notebook/get-data/{notebookId}
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `notebookId` | `string` | **Required** |


#### Add notebook


```http
  POST /notebook/add
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId` | `string` | **Required** |
| `notebookName` | `string` | **Required** |


#### Edit notebook


```http
  POST /notebook/edit
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId` | `string` | **Required** |
| `notebookId` | `string` | **Required** |
| `newNotebookName` | `string` | **Required** |


#### Delete notebook


```http
  DELETE /notebook/delete
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId` | `string` | **Required** |
| `notebookId` | `string` | **Required** |


#### Get Words of a User

Returns all the words of a user

```http
  GET /word/get-all/{userId}
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId` | `string` | **Required** |


#### Get Word Data

Returns information on a word

```http
  GET /word/{wordId}
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `wordId` | `string` | **Required** |



#### Add word


```http
  POST /word/add
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId` | `string` | **Required** |
| `notebookId` | `string` | **Required** |
| `wordType` | `string` | **Required** |
| `wordOriginal` | `string` | **Required** |
| `wordTranslation` | `string` | **Required** |


#### Edit notebook


```http
  POST /word/edit
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId` | `string` | **Required** |
| `notebookId` | `string` | **Required** |
| `wordType` | `string` | **Required** |
| `wordOriginal` | `string` | **Required** |
| `wordTranslation` | `string` | **Required** |
| `notebookId` | `string` | **Required** |



#### Delete notebook


```http
  DELETE /word/delete
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId` | `string` | **Required** |
| `notebookId` | `string` | **Required** |
| `notebookId` | `string` | **Required** |


## Running Tests

To run tests, run the following command

```bash
  npm test
```

