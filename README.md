# 🚀 Backend Assignment 03 - NestJS REST API & Containerization

[![Node.js](https://img.shields.io/badge/Node.js-v22.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-v11.x-E0234E?style=flat-square&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.7.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/badge/pnpm-v9.x-F69220?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Podman](https://img.shields.io/badge/Podman-v5.x-892CA0?style=flat-square&logo=podman&logoColor=white)](https://podman.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)

ระบบบริการ Backend REST API จัดการข้อมูลนักเรียน (Students Management Service) พัฒนาด้วย **NestJS (v11)** และ **TypeScript** โดยใช้ **pnpm** ในการจัดการ Dependencies และ Workspace พร้อมระบบ **Request Validation** ด้วย `class-validator` & `class-transformer` และรองรับการ Containerize ด้วย **Podman / Docker** ตามหลัก Security & Performance Best Practices (Multi-Stage Build + Non-Root User + BuildKit Cache)

---

## 📋 สารบัญ (Table of Contents)

- [คุณสมบัติเด่น (Features)](#-คุณสมบัติเด่น-features)
- [เทคโนโลยีที่ใช้ (Tech Stack)](#-เทคโนโลยีที่ใช้-tech-stack)
- [โครงสร้างโปรเจกต์ (Project Structure)](#-โครงสร้างโปรเจกต์-project-structure)
- [สิ่งที่ต้องเตรียมก่อนใช้งาน (Prerequisites)](#-สิ่งที่ต้องเตรียมก่อนใช้งาน-prerequisites)
- [ขั้นตอนการติดตั้งและการใช้งาน (Getting Started)](#-ขั้นตอนการติดตั้งและการใช้งาน-getting-started)
- [รายละเอียด API Endpoints (API Documentation & cURL)](#-รายละเอียด-api-endpoints-api-documentation--curl)
- [การใช้งานผ่าน Podman / Docker (Containerization)](#-การใช้งานผ่าน-podman--docker-containerization)
- [รูปแบบสถาปัตยกรรม (Architecture & Repository Pattern)](#-รูปแบบสถาปัตยกรรม-architecture--repository-pattern)
- [การรันระบบทดสอบ (Testing)](#-การรันระบบทดสอบ-testing)
- [ตัวแปรสภาพแวดล้อม (Environment Variables)](#-ตัวแปรสภาพแวดล้อม-environment-variables)
- [สิทธิ์การใช้งาน (License)](#-สิทธิ์การใช้งาน-license)

---

## ✨ คุณสมบัติเด่น (Features)

- 🏰 **NestJS Enterprise Architecture**: โครงสร้างแบบสถาปัตยกรรมระดับองค์กร (Modular, Controllers, Services, Repositories) เขียนด้วย TypeScript
- 🎓 **Full CRUD Students Management**: รองรับการดูรายการทั้งหมด (GET), ค้นหาตาม ID (GET), เพิ่มข้อมูลนักเรียน (POST), แก้ไขข้อมูล (PATCH) และลบข้อมูล (DELETE)
- ✅ **Strict DTO Validation**: ตรวจสอบความถูกต้องของข้อมูลผ่าน `ValidationPipe` ด้วย `class-validator` และ `class-transformer` (`whitelist` & `forbidNonWhitelisted`)
- 🔄 **Mapped Types DTO**: ใช้ `@nestjs/mapped-types` (`PartialType`) เพื่อทำ DRY (Don't Repeat Yourself) ใน `UpdateStudentDto`
- ⚡ **pnpm Workspace**: จัดการ Dependencies รวดเร็ว เบา และประหยัดพื้นที่ดิสก์
- 🔒 **Container Security Best Practice**: รัน Container ด้วยสิทธิ์ **Non-root user (`node`)** เพื่อความปลอดภัยสูงสุด
- 🐳 **Optimized Multi-Stage Build**: สปลิตขั้นตอนการคอมไพล์ TypeScript ออกจาก Runtime Image และใช้ `--mount=type=cache` เพื่อลดเวลา Build และขนาด Image

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

| หมวดหมู่ | เทคโนโลยีที่เลือกใช้ |
|---|---|
| **Language** | TypeScript `^5.7.3` |
| **Runtime** | Node.js `>= 20.x` (แนะนำ Node.js `v22.x`) |
| **Framework** | NestJS `^11.0.1` |
| **Validation & Transformation** | `class-validator`, `class-transformer`, `@nestjs/mapped-types` |
| **Package Manager** | pnpm `^9.15.0` |
| **Container Engine** | Podman / Docker (Base Image: `node:22-alpine`) |
| **Testing** | Jest `^30.0.0` & Supertest `^7.0.0` |

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```text
Backend-assignment03/
├── src/                    # ซอร์สโค้ดหลักของแอปพลิเคชัน
│   ├── students/           # โมดูลจัดการข้อมูลนักเรียน
│   │   ├── dto/            # Data Transfer Objects สำหรับ Validate ข้อมูล
│   │   │   ├── create-student.dto.ts
│   │   │   └── update-student.dto.ts
│   │   ├── entities/       # Entity Model definitions
│   │   ├── students.controller.ts       # REST Endpoints (/students)
│   │   ├── students.module.ts           # NestJS Students Module
│   │   ├── students.repository.ts       # In-Memory Repository
│   │   ├── students-error.repository.ts # Mock Error Repository (สำหรับทดสอบ 500)
│   │   └── students.service.ts          # Business Logic
│   ├── app.controller.ts   # Root Controller
│   ├── app.module.ts       # Root Application Module
│   ├── app.service.ts      # Root Service
│   └── main.ts             # Entrypoint หลักของ NestJS Server (พร้อม ValidationPipe)
├── test/                   # Integration / E2E Tests
├── .dockerignore           # รายการยกเว้นการคัดลอกลง Container Image
├── .env.example            # ตัวอย่างการตั้งค่า Environment Variables
├── .gitignore              # รายการยกเว้นการนำขึ้น Git Repository
├── Dockerfile              # Multi-stage Container Build Recipe (Best Practice)
├── nest-cli.json           # การตั้งค่า NestJS CLI
├── package.json            # Manifest Dependencies & Scripts
├── pnpm-lock.yaml          # Frozen Lockfile สำหรับ pnpm v9
├── pnpm-workspace.yaml     # pnpm Workspace Configuration
└── README.md               # เอกสารอธิบายโปรเจกต์นี้
```

---

## ⚙️ สิ่งที่ต้องเตรียมก่อนใช้งาน (Prerequisites)

- [Node.js](https://nodejs.org/) (เวอร์ชัน 20 ขึ้นไป, แนะนำ v22.x)
- [pnpm](https://pnpm.io/) (เวอร์ชัน 9.x)
- [Podman](https://podman.io/) หรือ [Docker Desktop](https://www.docker.com/) (สำหรับการสร้างและรัน Container)

---

## 🚀 ขั้นตอนการติดตั้งและการใช้งาน (Getting Started)

### 1. คลอนหรือดาวน์โหลดโปรเจกต์ (Clone Repository)

```bash
git clone https://github.com/tophbeifong123/Backend-assignment03.git
cd Backend-assignment03
```

### 2. ติดตั้ง Dependencies

```bash
pnpm install
```

### 3. เริ่มต้นรันโปรเจกต์ (Development Mode)

```bash
# พัฒนาแบบ Watch Mode (รีโหลดอัตโนมัติเมื่อแก้โค้ด)
pnpm run start:dev

# หรือรันปกติ
pnpm run start
```

เมื่อเซิร์ฟเวอร์เริ่มทำงานสำเร็จ จะพร้อมให้บริการที่: `http://localhost:3000`

### 4. คอมไพล์สำหรับ Production (Build)

```bash
pnpm run build
pnpm run start:prod
```

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
    "name": "John",
    "email": "john@example.com",
    "major": "Computer Engineering"
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

#### Example Response (`200 OK`):
```json
{
  "id": 1,
  "name": "John",
  "email": "john@example.com",
  "major": "Computer Engineering"
}
```

---

### 4. เพิ่มข้อมูลนักเรียนใหม่ (Create Student)

- **URL**: `/students`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body Validation**:
  - `name`: String, Not Empty
  - `email`: Email Format, Not Empty
  - `major`: String, Not Empty

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
  "id": 2,
  "name": "Somchai Jaidee",
  "email": "somchai@example.com",
  "major": "Computer Science"
}
```

---

### 5. แก้ไขข้อมูลนักเรียน (Update Student)

- **URL**: `/students/:id`
- **Method**: `PATCH`
- **Headers**: `Content-Type: application/json`
- **Body Validation**: ทุก Field เป็น Optional (`PartialType`)

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

โปรเจกต์นี้ใช้ **Multi-Stage Build** บน Alpine Linux เพื่อให้ได้ Container Image ที่มีขนาดเล็ก เบา และปลอดภัย

### 1. สั่ง Build Container Image

```bash
# สำหรับ Podman
podman build -t backend-assignment:v3 .

# สำหรับ Docker
docker build -t backend-assignment:v3 .
```

### 2. สั่ง Run Container

```bash
# รัน Container ในระบบ Background (Port 3000)
podman run -d -p 3000:3000 --name student-app backend-assignment:v3
```

### 3. ตรวจสอบ Logs และสถานะ Container

```bash
# ดูรายการ Container ที่กำลังทำงาน
podman ps

# ดู Logs การทำงานของ Container
podman logs -f student-app
```

---

## 🏗️ รูปแบบสถาปัตยกรรม (Architecture & Repository Pattern)

โมดูล `Students` ถูกออกแบบโดยแยกความรับผิดชอบตามหลัก **Dependency Inversion Principle (DIP)**:
- **`StudentsController`**: จัดการเรื่อง HTTP Request/Response และ DTO Validation
- **`StudentsService`**: จัดการ Logic การทำงาน
- **`StudentsRepository`**: จัดการ Data Layer
- **`StudentsErrorRepository`**: จำลองกรณีเกิด Error จาก Database (เมื่อต้องการสลับมาใช้เพื่อทดสอบ Error Handling 500)

สามารถสลับการลงทะเบียน Repository ได้ที่ [students.module.ts](src/students/students.module.ts):
```typescript
providers: [
  StudentsService,
  StudentsRepository, // ใช้ Repository ปกติ
  // หรือใช้ Error Repository เพื่อทดสอบ 500:
  // { provide: StudentsRepository, useClass: StudentsErrorRepository }
]
```

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

สามารถสร้างไฟล์ `.env` ใน Root Directory สำหรับตั้งค่าตัวแปรสภาพแวดล้อมได้:

| Key | คำอธิบาย | ค่าเริ่มต้น |
|---|---|---|
| `PORT` | พอร์ตที่ NestJS Server ใช้รัน | `3000` |
| `NODE_ENV` | สภาพแวดล้อมการทำงาน (`development` / `production`) | `development` |

---

## 📄 สิทธิ์การใช้งาน (License)

โปรเจกต์นี้อยู่ภายใต้ใบอนุญาต [MIT License](https://opensource.org/licenses/MIT)
