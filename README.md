# 농산물 이커머스 웹 앱 새싹농장

**Microservices 및 클라우드 네이티브 아키텍처 패턴을 사용하여 구축된 가상의 새싹농장마켓 웹 어플리케이션**
<br/>
<br/>

- **폴리글랏(polyglot) 언어 및 프레임워크**
  - Java: Spring Boot/Cloud,
  - Python: FastAPI, SQLAlachamey,
  - JavaScript/TypeScript: Node, ExpressJS, React


- **폴리글랏(polyglot) 데이터베이스** 
  - MongoDB
  - Redis
  - PostgreSQL
    
- 로컬 Kubernetes (k8s) 클러스터로 컨테이너 (Docker)로 배포할 수 있으며, 또한 **AWS (Amazon Web Services)**에도 배포(예정)
<br/>
<br/>

## 어플리케이션 - UI/UX, 아키텍처 및 사용된 기술

### Home.tsx
<img width="1016" alt="image" src="https://github.com/aingface/e-commerce-microservices/assets/40132591/e6c296ba-09bf-4d0e-9b61-49e67cbd6a81">

### Product.tsx
<img width="1016" alt="image" src="https://github.com/aingface/e-commerce-microservices/assets/40132591/d9d7e6c2-0b3d-49d4-a352-e017f8f7940a">

### Cart.tsx
<img width="1016" alt="image" src="https://github.com/aingface/e-commerce-microservices/assets/40132591/ae835735-84e1-40e1-880a-cf1e83800018">


### Sign-in.tsx
<img width="1016" alt="image" src="https://github.com/aingface/e-commerce-microservices/assets/40132591/3b3a78e9-89be-4228-9536-b1535d9f54e0">

### Sign-up.tsx
<img width="1016" alt="image" src="https://github.com/aingface/e-commerce-microservices/assets/40132591/e5423918-4294-4cf7-96b0-1da73204e38e">


## 기능적인 마이크로서비스
| 마이크로서비스  | 설명 | 사용된 기술 |
| --- | --- | --- |
| [상품정보 ](products-cna-microservice/README.md) | 상품 정보 및 이미지 제공 | NodeJS, ExpressJS를 사용한 REST API, MongoDB를 데이터 저장소로 사용 | 
| [장바구니 ](cart-cna-microservice/README.md) | 장바구니 담기 | Spring Boot & Cloud를 사용한 REST API, Gradle을 빌드 도구로 사용, Redis를 인메모리 데이터 저장소로 사용 |
| [회원정보 ](users-cna-microservice/README.md) | 사용자 정보, 로그인,로그아웃, 회원가입 | Python FastAPI를 사용한 REST API, SQLAlchamey를 사용한 PostgreSQL |
| [새싹농장 웹 UI](store-ui/README.md) | 상위 마이크로서비스를 위한 웹 UI 프론트엔드 | React, Material UI, TypeScript/JavaScript를 사용한 웹 앱|


## Folder Structure
```bash
.
├── store-ui                    # 새싹농장마켓 React 앱 with Material UI
│   └── ...
├── cart-cna-microservice       # 쇼핑 카트 마이크로서비스 저장소
├── products-cna-microservice   # 제품 카탈로그 마이크로서비스 폴더
├── users-cna-microservice      # 사용자 프로필 관리 마이크로서비스
├── infra                       # 로컬 및 클라우드에서 앱을 설정하는 인프라 스크립트
│   ├── k8s                     # Kubernetes (k8s) YAML 파일
│   │   ├── apps               # 마이크로서비스 관련 k8s yaml 파일
│   │   └── shared-services    # 데이터베이스, ElasticSearch 관련 k8s yaml 파일
│   ├── terraform               # AWS에 배포하기 위한 Terraform 스크립트
└── └── performance             # 성능 및 부하 테스트 스크립트
```

## 시작하기

### 빌드
각 마이크로서비스의 README.md 파일에 명시된 자세한 지침을 따르세요.

### 배포
어플리케이션 및 MongoDB, Redis 등 필수 서비스를 로컬 머신이나 AWS에 배포하는 방법에 대한 [지침](infra/README.md)을 참조하세요.
