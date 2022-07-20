# Products Cloud Native Microservice

## Prerequisites
---
### Node 18 
**For Windows**
```bsh
choco install node
```
**For MacOS**
```bsh
brew install node
```
### **Popuate MonoDB with data**

```bsh
brew tap mongodb/brew
brew install mongodb-database-tools
```

```bsh
source .env.local
mongoimport --uri $MONGO_URI --collection='product-summaries' --file='data/product-summaries.json' --jsonArray --authenticationDatabase 'admin' --db='e-commerce'
mongoimport --uri $MONGO_URI --collection='deals' --file='data/deals.json' --jsonArray --authenticationDatabase 'admin' --db='e-commerce'
```

## **Build**
```bsh
npm install
npm install -g nodemon
```

## **Run Locally**
```bsh 
npm start 
```

## **Build Docker Image**

*Docker CLI to talk to minikube's VM.*
 
For MacOS,  
```bash
eval $(minikube docker-env) 
```
For Windows,  
```bsh
& minikube -p mini kube docker-env --shell powershell | Invoke-Expression`
```

Build docker image,
```bsh
docker build -t products:latest.
```
