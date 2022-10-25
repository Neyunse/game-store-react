### React Physical game store

Repo created for the CoderHouse react course

## Preview

Public URL: https://gamestore-e-commerce.vercel.app/


## Features

* Shopping List
* Shopping cart simulator
* Wishlist
* Discount system

## Available Scripts

In the project directory, you can run:

### `yarn r:start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### `yarn r:build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

# Configurations

## ENV file

Your firebase WebApp credentials are located in yor project settings.

```env
REACT_APP_APIKEY=""
REACT_APP_AUTHDOMAIN=""
REACT_APP_DBURL=""
REACT_APP_PID=""
REACT_APP_STORAGE=""
REACT_APP_MSGSID=""
REACT_APP_APPID=""
```

##  Authentication (Firebase only)

* GitHub

## For domain autorization

First go to the Authentication settings page
`https://console.firebase.google.com/u/0/project/<YOUR_PROJECT>/authentication/settings`
and then go to Authorized domains. Next press the "Add domain" Button and add your domain.

### Firestore Json and table structure (Firebase only)



categories>ID>json data
```json
{
  "name": "Horror",
  "slug": "horror"
}
```

products>ID>json data
```json
{
  "category": "",
  "details": {
    "description": {
      "about": "",
      "short": "",
      "story": ""
    },
    "images": {
      "banner":"",
      "cover":""
    },
    "media": {
      "screenshots": [],
      "videoID": ""
    },
    "onSale": false,
    "price": 0,
    "sale": null,
    "slug": "",
    "title": "",

  },
  "initial": 1,
  "stock": 10
}
```

## Auto generated data

This data is automatically generated when the user press the "Purchase" button in the cart.

purchases>ID>json data
```json
{
  "buyer": {
    "email": "",
    "name": ""
  },

  "date": "",
  "items": [
    {
      "category": "",
      "details": {
        "description": {
          "about": "",
          "short": "",
          "story": ""
        },
        "images": {
          "banner":"",
          "cover":""
        },
        "media": {
          "screenshots": [],
          "videoID": ""
        },
        "onSale": false,
        "price": 0,
        "sale": null,
        "slug": "",
        "title": "",
      },
      "initial": 1,
      "stock": 10
    }
  ],
  "total": "",
  "uid": ""
}
```



# Packages used

* react@18.2.0
* react-toastify@9.0.8
* react-content-loader@6.2.0
* react-loader-spinner@5.3.4
* react-youtube@10.0.0
* firebase@9.10.0
* jwt-decode@3.1.2
* node-sass@7.0.1
* moment@2.29.4
* @kagarisoft/csc-react@1.4.5 ([My own package npm](https://classstyle.netlify.app/))
  |-@kagarisoft/csc@1.4.5