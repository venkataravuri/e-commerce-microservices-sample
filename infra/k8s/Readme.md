

# Standup Application on local machine
Appliction and dependent services such as databases are deplolyed on local machine using Kuberenetes. 

Minikube is used to standaup Kubernetes cluster on local machine. Below are instructions to start minkube locally,

On Windows,
```
minikube start --driver=hyperv
```
On MacOS,
```
minikube start- -driver=hyperkit
```

Deploy platform services such as MongoDB, Redis, ElasticSearch to k8s cluster,
```
kubectl apply -k shared-services/overlays/local
```

Deploy application microservices to Minkube K8s cluster,
```
kubectl apply -k apps/overlays/local
```


minikube service list -n shared-services