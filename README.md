# AI-Powered Image Annotation Dashboard

![Dashboard Preview](./screenshots/dashboard-preview.png)

A sophisticated image annotation platform combining TensorFlow.js for AI-powered boundary detection and Konva.js for interactive editing. Built with the MERN stack for full-stack efficiency.

🔗 **Live Demo**: [https://mern-nextastra-vishal.netlify.app/](https://mern-nextastra-vishal.netlify.app/)

## Key Features

### 🛡️ Secure Authentication
- JWT token-based authentication
- Bcrypt password hashing
- Form validations for login/registration

### 🖼️ AI-Powered Image Processing
- **TensorFlow.js integration** for automatic boundary detection
- Custom-trained models for object recognition
- Confidence scoring for detected boundaries

### ✏️ Interactive Annotation Tools
- **Konva.js canvas** for boundary manipulation
- Create, resize, and move bounding boxes
- Label editing with confidence indicators
- Multi-object selection and editing

### 📊 Data Management
- MongoDB Atlas for cloud storage
- Image metadata preservation
- Versioned boundary data storage

## Technology Stack

### Frontend
| Technology | Usage |
|------------|-------|
| React | Core framework |
| Konva.js | Interactive canvas editing |
| TensorFlow.js | AI boundary detection |
| Tailwind CSS | Responsive styling |
| React Icons | UI icons |

### Backend
| Technology | Usage |
|------------|-------|
| Node.js | Runtime environment |
| Express | REST API framework |
| MongoDB | Database storage |
| Mongoose | ODM for MongoDB |
| JWT | Secure authentication |

### AI/ML
| Technology | Usage |
|------------|-------|
| TensorFlow.js | Client-side object detection |
| COCO-SSD | Pre-trained model |
| Custom Layers | Domain-specific adaptations |

## Screenshots

| Feature | Preview |
|---------|---------|
| **Login Page** | ![Login](./screenshots/login.png) |
| **Image Upload** | ![Upload](./screenshots/upload-flow.png) |
| **Auto-Detection** | ![Detection](./screenshots/auto-detection.png) |
| **Manual Editing** | ![Editing](./screenshots/konva-editing.png) |

## Installation Guide

### Prerequisites
- Node.js v16+
- MongoDB Atlas account or local MongoDB
- TensorFlow.js compatible browser

### Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Configure your .env file
npm start
