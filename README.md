# EduNewPlat

## 简介

基于 React + Ant Design 与 Spring Boot 2.7 (Java 1.8) 的湖北智慧教育数据管理复刻示例。

## 目录结构

- `frontend/` 前端工程（Vite + React + Ant Design）
- `backend/` 后端工程（Spring Boot + JPA + MySQL）

## 快速开始

### 1. 准备 MySQL

```sql
CREATE DATABASE edunewplat DEFAULT CHARACTER SET utf8mb4;
```

### 2. 启动后端

```bash
cd backend
mvn spring-boot:run
```

默认配置在 `backend/src/main/resources/application.yml`，可修改数据库账号密码。

### 3. 启动前端

```bash
cd frontend
npm install
npm run dev
```

浏览器访问 `http://localhost:5173`。

## 接口说明

- `GET /api/data-records` 获取数据管理清单
- `POST /api/data-records` 新增数据记录（JSON Body: title/category/totalCount/activeCount）
