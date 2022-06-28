

# Run locally

On Windows,

```
minikube start --driver=hyperv
```

On MacOS,
```
minikube start- -driver=hyperkit
```

Create k8s namespace

```
kubectl create namespace e-commerce
```

```
kubectl kustomize cart/overlays/local

```
```
kubectl apply -k cart/overlays/local
```

```
kubectl port-forward <cart pod name> 8080:8080 -n e-commerce
```

```
kubectl kustomize platform-services/overlays/local
kubectl apply -k platform-services/overlays/local
```