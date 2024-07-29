# 베이스 이미지로 Node.js 사용
FROM node:14

# 애플리케이션 디렉토리 생성
WORKDIR /app

# 애플리케이션 종속성 설치
COPY package*.json ./

RUN npm install

# 애플리케이션 소스 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# nginx 설치 및 설정
FROM nginx:alpine

COPY --from=0 /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
