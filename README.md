# Developer Guide

## 📦 프로젝트 개요

이 프로젝트는 **Vite(React + TypeScript)** 기반 웹 애플리케이션으로,  
- **Redux Toolkit + RTK Query**  
- **axios**  
- **styled-components**  

를 사용해 게시판 기능(CRUD)을 제공합니다.  
현재는 **항상 로그인됨** 상태로 가정하여 개발을 진행하도록 설정되어 있습니다. (**현재는 그렇다. 우선 게시판만 진행**)

---

## ⚙️ 사전 준비

- **Node.js** v18 이상  
- **Yarn** 또는 **npm**  
- Git (선택)

### Node.js 버전 확인
```bash
node -v
```

### Yarn 설치 (없을 경우)
```bash
npm install --global yarn
```

```markdown
# 🚀 설치 & 실행

## 저장소 클론 (또는 프로젝트 디렉토리로 이동)
```bash
git clone <레포지토리_URL>
cd my-app
```

## 의존성 설치
```bash
yarn install
# 또는
npm install
```

## 환경 변수 파일 생성 (`.env`) -> 무시해도된다.
```env
VITE_API_BASE_URL=http://localhost:8080
```

## 개발 서버 실행
```bash
yarn dev
# 또는
npm run dev
```

## 브라우저 열기
```
http://localhost:3000
```

---

# 📂 디렉토리 구조
```text
my-app/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   ├── apiSlice.ts       # RTK Query endpoints
│   │   └── axios.ts          # axios 인스턴스
│   ├── app/
│   │   └── store.ts          # Redux 스토어 설정
│   ├── components/
│   │   └── NavBar.tsx        # 공통 네비게이션 바
│   ├── features/
│   │   └── auth/
│   │       └── authSlice.ts  # 인증 상태 관리 (preloadedState)
│   ├── pages/
│   │   ├── BoardListPage.tsx
│   │   ├── PostDetailPage.tsx
│   │   ├── PostEditPage.tsx
│   │   ├── LoginPage.tsx     # 현재 비활성화
│   │   └── RegisterPage.tsx  # 현재 비활성화
│   ├── styles/
│   │   ├── theme.ts          # styled‑components 테마
│   │   └── styled.d.ts       # DefaultTheme 타입 확장
│   ├── types/
│   │   └── index.ts          # 공통 타입 정의
│   ├── App.tsx               # 라우팅 설정
│   └── main.tsx              # 앱 진입점
├── .gitignore
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🔑 주요 설정

### 1. 스토어에 항상 로그인 상태 주입
```ts
// src/app/store.ts
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (gdm) => gdm().concat(api.middleware),
  preloadedState: {
    auth: {
      user: { id: 1, username: 'testuser', email: 'test@example.com' },
      token: 'dummy-token'
    }
  }
});
```

### 2. 환경 변수
- `VITE_API_BASE_URL`: API 서버 기본 주소 (예: `http://localhost:8080`)

---

## 🛣️ 라우팅

- `/boards`  
  → 게시글 목록 (`BoardListPage`)
- `/boards/:slug/posts/:id`  
  → 게시글 상세 (`PostDetailPage`)
- `/boards/:slug/posts/:id/edit`  
  → 게시글 작성/수정 (`PostEditPage`)
- 로그인/회원가입 라우트는 주석 처리되어 있습니다

```tsx
// src/App.tsx
<Routes>
  <Route path="/" element={<Navigate to="/boards" replace />} />
  <Route path="/boards" element={<BoardListPage />} />
  <Route path="/boards/:slug/posts/:id" element={<PostDetailPage />} />
  <Route path="/boards/:slug/posts/:id/edit" element={<PostEditPage />} />
  {/* <Route path="/login" element={<LoginPage />} /> */}
  {/* <Route path="/register" element={<RegisterPage />} /> */}
</Routes>
```

---

## 🧩 RTK Query 엔드포인트

| Hook                        | 설명                          | API 경로                                    |
| --------------------------- | ----------------------------- | ------------------------------------------- |
| `useGetPostsQuery()`        | 게시글 목록 조회              | `GET /boards/{slug}/posts`                  |
| `useGetPostQuery(id)`       | 게시글 상세 조회              | `GET /boards/{slug}/posts/{id}`             |
| `useCreatePostMutation()`   | 게시글 작성                   | `POST /boards/{slug}/posts`                 |
| `useUpdatePostMutation()`   | 게시글 수정                   | `PUT /boards/{slug}/posts/{id}`             |
| `useDeletePostMutation()`   | 게시글 삭제                   | `DELETE /boards/{slug}/posts/{id}`          |
| `useGetCommentsQuery(id)`   | 해당 게시글 댓글 목록 조회    | `GET /boards/{slug}/posts/{id}/comments`    |
| `useAddCommentMutation()`   | 댓글 작성                     | `POST /boards/{slug}/posts/{id}/comments`   |
| `useRegisterMutation()`     | 회원가입 (현재 비활성화)      | `POST /member/insert`                       |
| `useLoginMutation()`        | 로그인 (현재 비활성화)        | `POST /member/auth`                         |

---

## 🎨 스타일링

- **styled-components**
- **ThemeProvider** 적용 (`src/styles/theme.ts`)
- **DefaultTheme** 타입 확장 (`src/styles/styled.d.ts`)

```ts
// src/styles/theme.ts
export const theme = {
  colors: {
    primary: '#1a73e8',
    secondary: '#f1f3f4',
    text: '#202124',
    border: '#dadce0'
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '32px'
  },
  radius: {
    sm: '4px'
  }
};
```

---

## 📈 개발 팁

- TypeScript 의존성 추가  
  ```bash
  yarn add -D @types/react-router-dom @types/styled-components
  ```
- VSCode: **TypeScript: Restart TS Server**
- 페이지 추가: `src/pages/`에 `.tsx` 파일 생성 후, `App.tsx`에 라우트 등록
- API 테스트: Postman / Insomnia 활용

```
