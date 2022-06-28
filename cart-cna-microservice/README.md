# Shopping Cart Cloud Native Microservice

## Prerequisites

### Java 17
Install OpenJDK by executing following instructions,

For Windows
```bsh
choco install openjdk@18
```
For MacOS
```bsh
brew install openjdk@18
```

## Build
Set Redis server environment variables in '.env' file. This file will not checked into Git as it holds sensitive information such as Redis password.
```bsh
export $(cat .env | xargs)
gradle build
```


## Run Locally
gradle bootRun


### Build Docker Image

Tell Docker CLI to talk to minikube's VM.

For MacOS,
`eval $(minikube docker-env)`

For Windows,
`& minikube -p minikube docker-env --shell powershell | Invoke-Expression`

Build docker image,
`docker build -t cart:latest .`
