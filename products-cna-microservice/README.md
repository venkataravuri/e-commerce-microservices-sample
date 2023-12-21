# Products Cloud Native Microservice

## Prerequisites

## 제품 설치를 위한 사전 요구 사항

### Node 18

For Windows

```bsh
choco install node
```

For MacOS

```bsh
brew install node
```

### Popuate MonoDB with data

### MongoDB에 데이터 채우기

#### MongoDB 도구를 설치하기 위해 아래 명령어 사용

```bsh
brew tap mongodb/brew
brew install mongodb-database-tools
```

.env.development.local 파일에서 MongoDB 연결 정보를 설정하고, 제공된 JSON 파일을 사용하여 데이터를 MongoDB에 채웁니다.
.env.local 파일은 일반적으로 프로젝트의 환경 변수를 저장하는 데 사용됩니다. 이 파일에는 데이터베이스 연결 문자열, API 키 등과 같은 중요한 정보가 포함될 수 있습니다.
따라서 source .env.local 명령을 실행하면, .env.local 파일에 정의된 모든 환경 변수들이 현재 쉘 세션에 로드되어, 이후 실행되는 명령들에서 이 환경 변수들을 사용할 수 있게 됩니다.

```bsh
source .env.development.local
mongoimport --uri $MONGO_URI --collection='product-summaries' --file='data/product-summaries.json' --jsonArray --authenticationDatabase 'admin' --db='e-commerce'
mongoimport --uri $MONGO_URI --collection='deals' --file='data/deals.json' --jsonArray --authenticationDatabase 'admin' --db='e-commerce'
```

## Build

```bsh
npm install //프로젝트의 종속성 설치
npm install -g nodemon // nodemon을 전역으로 설치하여 파일 변경을 감지하고 서버를 자동으로 다시 시작할 수 있도록 함
```

## Run Locally

## 로컬에서 실행

```bsh
npm start
```

## Build Docker Image

## Docker 이미지 빌드:

Tell Docker CLI to talk to minikube's VM.
Minikube의 VM에 Docker CLI가 연결되도록 설정:

For MacOS,
`eval $(minikube docker-env)`
For Windows,
`& minikube -p minikube docker-env --shell powershell | Invoke-Expression`

Build docker image,
`docker build -t products:latest .`
