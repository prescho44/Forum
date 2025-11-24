# Forum Project

## Project Description

A modern forum system built with React and Firebase where users can create posts, add comments, and interact through likes. This forum is designed for automotive enthusiasts to share their thoughts, ideas, and experiences about cars, including topics like car news, technical repairs, racing, and more.

Key features:

- User authentication and profile management
- Post creation, editing, and deletion
- Comment system with likes
- Admin panel for user and content moderation
- Real-time updates using Firebase
- Responsive design using Chakra UI

## Hosted Project Link

[Visit the Forum in GitHub](https://github.com/Plamen536/Forum2)

## Local Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Steps

1. **Clone the repository**:

```sh
git clone https://github.com/Plamen536/Forum2.git
cd "Forum Project"
```

2. Install dependencies

```sh
npm install
```

3. **Set up environment variables**:

Create a `.env` file in the root directory by copying the example:

```sh
cp .env.example .env
```

Then edit `.env` and add your API keys:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project.firebasedatabase.app
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# News API
VITE_NEWS_API_KEY=your_news_api_key
```

4. Start development server

```sh
npm run dev
```

5. Open browser and visit `http://localhost:5173`

## Database Structure

```json
{
  "users": {
    "{userHandle}": {
      "handle": "string",
      "firstName": "string",
      "lastName": "string",
      "phoneNumber": "string", // Only for admin role
      "email": "string",
      "uid": "string",
      "role": "string", // "user" | "admin" | "blocked"
      "avatarUrl": "string",
      "createdOn": "timestamp",
      "posts": {
        "{postId}": {
          // Post reference
        }
      },
      "comments": {
        "{commentId}": {
          "text": "string",
          "author": "string",
          "avatar": "string",
          "postRef": "string",
          "timestamp": "number",
        }
      }
    }
  },
  "posts": {
    "{postId}": {
      "title": "string",
      "content": "string",
      "author": "string", // userHandle
      "createdOn": "timestamp",
      "uid": "string",
      "tags": boolean,
      "likes": {
        "{userId}": boolean
      },
      "comments": {
        "{commentId}": {
          "text": "string",
          "author": "string",
          "avatar": "string",
          "timestamp": "number",
          "likes": {
            "{userId}": boolean
          }
        }
      }
    }
  }
}
```
