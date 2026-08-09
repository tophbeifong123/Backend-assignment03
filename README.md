# 🚀 Backend Assignment 03 - NestJS REST API, TypeORM & PostgreSQL Containerization

[![Node.js](https://img.shields.io/badge/Node.js-v22.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-v11.x-E0234E?style=flat-square&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeORM](https://img.shields.io/badge/TypeORM-v1.x-FE0803?style=flat-square&logo=typeorm&logoColor=white)](https://typeorm.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v16.x-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.7.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/badge/pnpm-v9.x-F69220?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Podman](https://img.shields.io/badge/Podman-v5.x-892CA0?style=flat-square&logo=podman&logoColor=white)](https://podman.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)

ระบบบริการ Backend REST API จัดการข้อมูลนักเรียน (Students Management Service) พัฒนาด้วย **NestJS (v11)**, **TypeORM** และ **PostgreSQL** โดยใช้ **pnpm** ในการจัดการ Dependencies และ Workspace พร้อมระบบ **Request Validation** ด้วย `class-validator` & `class-transformer`, ระบบ **Database Migrations**, และรองรับการสั่งรัน PostgreSQL ฐานข้อมูลผ่าน **Podman / Docker Compose** ตามหลัก Security & Performance Best Practices

---

## 📋 สารบัญ (Table of Contents)

- [คุณสมบัติเด่น (Features)](#-คุณสมบัติเด่น-features)
- [เทคโนโลยีที่ใช้ (Tech Stack)](#-เทคโนโลยีที่ใช้-tech-stack)
- [โครงสร้างโปรเจกต์ (Project Structure)](#-โครงสร้างโปรเจกต์-project-structure)
- [สิ่งที่ต้องเตรียมก่อนใช้งาน (Prerequisites)](#-สิ่งที่ต้องเตรียมก่อนใช้งาน-prerequisites)
- [ขั้นตอนการติดตั้งและการใช้งาน (Getting Started)](#-ขั้นตอนการติดตั้งและการใช้งาน-getting-started)
- [การจัดการ Database & Migrations](#-การจัดการ-database--migrations)
- [รายละเอียด API Endpoints (API Documentation & cURL)](#-รายละเอียด-api-endpoints-api-documentation--curl)
- [การใช้งานผ่าน Podman / Docker (Containerization)](#-การใช้งานผ่าน-podman--docker-containerization)
- [รูปแบบสถาปัตยกรรม (Architecture & Repository Pattern)](#-รูปแบบสถาปัตยกรรม-architecture--repository-pattern)
- [การรันระบบทดสอบ (Testing)](#-การรันระบบทดสอบ-testing)
- [ตัวแปรสภาพแวดล้อม (Environment Variables)](#-ตัวแปรสภาพแวดล้อม-environment-variables)
- [สิทธิ์การใช้งาน (License)](#-สิทธิ์การใช้งาน-license)

---

## ✨ คุณสมบัติเด่น (Features)

- 🏰 **NestJS Enterprise Architecture**: โครงสร้างแบบสถาปัตยกรรมระดับองค์กร (Modular, Controllers, Services, Repositories) เขียนด้วย TypeScript
- 🐘 **TypeORM & PostgreSQL Integration**: เชื่อมต่อฐานข้อมูลผ่าน TypeORM ด้วย `TypeOrmModule.forRootAsync` และ `@nestjs/config` แบบปลอดภัย
- 🛠️ **Database Migration Management**: มี CLI Scripts สำหรับ `generate`, `run`, `revert`, และ `show` สถานะ Migration 
- 🎓 **Full CRUD Students Management**: รองรับการดูรายการทั้งหมด (GET), ค้นหาตาม ID (GET), เพิ่มข้อมูลนักเรียน (POST), แก้ไขข้อมูล (PATCH) และลบข้อมูล (DELETE)
- ✅ **Strict DTO Validation**: ตรวจสอบความถูกต้องของข้อมูลผ่าน `ValidationPipe` ด้วย `class-validator` และ `class-transformer` (`whitelist` & `forbidNonWhitelisted`)
- 🔄 **Mapped Types DTO**: ใช้ `@nestjs/mapped-types` (`PartialType`) เพื่อทำ DRY (Don't Repeat Yourself) ใน `UpdateStudentDto`
- ⚡ **pnpm Workspace**: จัดการ Dependencies รวดเร็ว เบา และประหยัดพื้นที่ดิสก์
- 🔒 **Container Security Best Practice**: รัน Container ด้วยสิทธิ์ **Non-root user (`node`)** เพื่อความปลอดภัยสูงสุด
- 🐳 **Docker Compose & Podman**: รองรับการเริ่มบริการ PostgreSQL Database พร้อมสั่ง Healthcheck ผ่าน Docker Compose หรือ Podman

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

| หมวดหมู่ | เทคโนโลยีที่เลือกใช้ |
|---|---|
| **Language** | TypeScript `^5.7.3` |
| **Runtime** | Node.js `>= 20.x` (แนะนำ Node.js `v22.x`) |
| **Framework** | NestJS `^11.0.1` |
| **Database & ORM** | PostgreSQL `16-alpine`, TypeORM `^1.1.0` |
| **Validation & Transformation** | `class-validator`, `class-transformer`, `@nestjs/mapped-types` |
| **Package Manager** | pnpm `^9.15.0` |
| **Container Engine** | Podman / Docker & Docker Compose |
| **Testing** | Jest `^30.0.0` & Supertest `^7.0.0` |

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```text
Backend-assignment03/
├── src/                    # ซอร์สโค้ดหลักของแอปพลิเคชัน
│   ├── config/             # การตั้งค่าคอนฟิกูเรชันของระบบ
│   │   ├── data-source.ts      # TypeORM DataSource สำหรับ CLI Migration
│   │   └── database.config.ts  # Dynamic Database Configuration (ConfigService)
│   ├── migrations/         # ไฟล์ Database Migrations
│   ├── students/           # โมดูลจัดการข้อมูลนักเรียน
│   │   ├── dto/            # Data Transfer Objects สำหรับ Validate ข้อมูล
│   │   │   ├── create-student.dto.ts
│   │   │   └── update-student.dto.ts
│   │   ├── entities/       # TypeORM Student Entity definition
│   │   │   └── student.entity.ts
│   │   ├── students.controller.ts  # REST Endpoints (/students)
│   │   ├── students.module.ts      # NestJS Students Module
│   │   ├── students.repository.ts  # TypeORM Students Repository
│   │   └── students.service.ts     # Business Logic
│   ├── app.controller.ts   # Root Controller
│   ├── app.module.ts       # Root Application Module
│   ├── app.service.ts      # Root Service
│   └── main.ts             # Entrypoint หลักของ NestJS Server (พร้อม ValidationPipe)
├── test/                   # Integration / E2E Tests
├── .dockerignore           # รายการยกเว้นการคัดลอกลง Container Image
├── .env.example            # ตัวอย่างการตั้งค่า Environment Variables
├── .gitignore              # รายการยกเว้นการนำขึ้น Git Repository
├── docker-compose.yml      # PostgreSQL Service configuration
├── Dockerfile              # Multi-stage Container Build Recipe (Best Practice)
├── nest-cli.json           # การตั้งค่า NestJS CLI
├── package.json            # Manifest Dependencies & Scripts
├── pnpm-lock.yaml          # Frozen Lockfile สำหรับ pnpm v9
└── README.md               # เอกสารอธิบายโปรเจกต์นี้
```

---

## ⚙️ สิ่งที่ต้องเตรียมก่อนใช้งาน (Prerequisites)

- [Node.js](https://nodejs.org/) (เวอร์ชัน 20 ขึ้นไป, แนะนำ v22.x)
- [pnpm](https://pnpm.io/) (เวอร์ชัน 9.x)
- [Podman](https://podman.io/) หรือ [Docker Desktop](https://www.docker.com/) (สำหรับการสร้าง Container Database และ Application)

---

## 🚀 ขั้นตอนการติดตั้งและการใช้งาน (Getting Started)

### 1. คลอนโปรเจกต์ (Clone Repository)

```bash
git clone https://github.com/tophbeifong123/Backend-assignment03.git
cd Backend-assignment03
```

### 2. ติดตั้ง Dependencies

```bash
pnpm install
```

### 3. ตั้งค่า Environment Variables

คัดลอกไฟล์ตัวอย่าง `.env.example` ไปเป็น `.env`:

```bash
cp .env.example .env
```

แก้ไขไฟล์ `.env` ตามการใช้งาน:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=assignment02
```

### 4. เริ่มต้น PostgreSQL Database

ใช้งาน Podman หรือ Docker Compose เพื่อเปิด PostgreSQL Service:

```bash
podman compose up -d
# หรือ
docker compose up -d
```

### 5. รัน Database Migrations

```bash
pnpm migration:run
```

### 6. เริ่มต้นรันเซิร์ฟเวอร์ (Development Mode)

```bash
# พัฒนาแบบ Watch Mode (รีโหลดอัตโนมัติเมื่อแก้โค้ด)
pnpm run start:dev
```

เซิร์ฟเวอร์จะพร้อมให้บริการที่: `http://localhost:3000`

---

## 🗄️ การจัดการ Database & Migrations

โปรเจกต์นี้ใช้ **TypeORM CLI** ในการจัดการ Schema Migration:

| คำสั่ง | คำอธิบาย |
|---|---|
| `pnpm migration:show` | ตรวจสอบและแสดงสถานะของ Migration ทั้งหมด (Executed / Pending) |
| `pnpm migration:generate src/migrations/<Name>` | สร้างไฟล์ Migration ใหม่จากการเปรียบเทียบ Entity และ Database Schema |
| `pnpm migration:run` | ทำการรัน Migration ที่ยังค้างอยู่ทั้งหมดเข้าสู่ Database |
| `pnpm migration:revert` | ยกเลิก Migration ล่าสุดที่เพิ่งรันไป (Rollback) |

---

## 📖 รายละเอียด API Endpoints (API Documentation & cURL)

### 1. Root Endpoint (Hello World)

- **URL**: `/`
- **Method**: `GET`
- **Response**: `Hello World!`

#### Example cURL:
```bash
curl -X GET http://localhost:3000/
```

---

### 2. ดึงรายการนักเรียนทั้งหมด (Get All Students)

- **URL**: `/students`
- **Method**: `GET`

#### Example cURL:
```bash
curl -X GET http://localhost:3000/students
```

#### Example Response (`200 OK`):
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "major": "Computer Engineering",
    "isAdmin": false,
    "status": "active"
  }
]
```

---

### 3. ดึงข้อมูลนักเรียนตาม ID (Get Student by ID)

- **URL**: `/students/:id`
- **Method**: `GET`

#### Example cURL:
```bash
curl -X GET http://localhost:3000/students/1
```

---

### 4. เพิ่มข้อมูลนักเรียนใหม่ (Create Student)

- **URL**: `/students`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`

#### Example cURL:
```bash
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Somchai Jaidee",
    "email": "somchai@example.com",
    "major": "Computer Science"
  }'
```

#### Example Response (`201 Created`):
```json
{
  "id": 1,
  "name": "Somchai Jaidee",
  "email": "somchai@example.com",
  "major": "Computer Science",
  "isAdmin": false,
  "status": "active"
}
```

---

### 5. แก้ไขข้อมูลนักเรียน (Update Student)

- **URL**: `/students/:id`
- **Method**: `PATCH`
- **Headers**: `Content-Type: application/json`

#### Example cURL:
```bash
curl -X PATCH http://localhost:3000/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Somchai Srisuk",
    "major": "Data Science"
  }'
```

---

### 6. ลบข้อมูลนักเรียน (Delete Student)

- **URL**: `/students/:id`
- **Method**: `DELETE`

#### Example cURL:
```bash
curl -X DELETE http://localhost:3000/students/1
```

---

## 🐳 การใช้งานผ่าน Podman / Docker (Containerization)

### 1. สั่ง Build Container Image

```bash
# สำหรับ Podman
podman build -t backend-assignment:v3 .

# สำหรับ Docker
docker build -t backend-assignment:v3 .
```

### 2. สั่ง Run Container

```bash
podman run -d -p 3000:3000 --name student-app backend-assignment:v3
```

---

## 🏗️ รูปแบบสถาปัตยกรรม (Architecture & Repository Pattern)

โมดูล `Students` ถูกออกแบบโดยแยกความรับผิดชอบตามหลัก **Dependency Inversion Principle (DIP)** และ **Repository Pattern**:
- **`StudentsController`**: จัดการเรื่อง HTTP Request/Response และ DTO Validation
- **`StudentsService`**: จัดการ Logic การทำงานของแอปพลิเคชัน
- **`StudentsRepository`**: จัดการ Data Layer ผ่าน TypeORM Repository (`Repository<Student>`)
- **`Student` Entity**: กำหนดโครงสร้างตารางข้อมูล `students` ใน PostgreSQL

---

## 🧪 การรันระบบทดสอบ (Testing)

```bash
# รัน Unit Tests
pnpm run test

# รัน End-to-End (E2E) Tests
pnpm run test:e2e

# ดู Test Coverage
pnpm run test:cov
```

---

## 🔧 ตัวแปรสภาพแวดล้อม (Environment Variables)

สามารถกำหนดค่าในไฟล์ `.env` ได้ดังนี้:

| Key | คำอธิบาย | ค่าเริ่มต้น |
|---|---|---|
| `PORT` | พอร์ตที่ NestJS Server ใช้รัน | `3000` |
| `DB_HOST` | Host ของ PostgreSQL Database | `localhost` |
| `DB_PORT` | Port ของ PostgreSQL Database | `5432` |
| `DB_USERNAME` | Username สำหรับเข้าใช้งาน Database | `postgres` |
| `DB_PASSWORD` | Password สำหรับเข้าใช้งาน Database | `postgres` |
| `DB_DATABASE` | ชื่อ Database | `assignment02` |

---

## 📄 สิทธิ์การใช้งาน (License)

โปรเจกต์นี้อยู่ภายใต้ใบอนุญาต [MIT License](https://opensource.org/licenses/MIT)

