# line-pos
A POS(Point of Sale) system for a shop name “Little Brown Book Shop”

![alt screenshot](https://raw.githubusercontent.com/vinboxx/line-pos/master/screenshot.jpg)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Environment Variables
You can specify env variables by placing the following files in your project root. See more infomation in `.env` file.
```
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.test           # only loaded in test mode
.env.production     # only loaded in production mode
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Deployment
Here is an example command to deploy to Google Cloud Platform. To set up from start, please read [Deploying a containerized web application](https://cloud.google.com/kubernetes-engine/docs/tutorials/hello-app)

```
export PROJECT_ID="$(gcloud config get-value project -q)"

docker build -t gcr.io/${PROJECT_ID}/line-pos:v1.5.1 .

docker push gcr.io/${PROJECT_ID}/line-pos:v1.5.1

kubectl set image deployment/line-pos-web line-pos-web=gcr.io/${PROJECT_ID}/line-pos:v1.5.1
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
