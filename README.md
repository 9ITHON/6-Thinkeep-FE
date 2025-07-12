<img width="155" height="48" alt="로고" src="https://github.com/user-attachments/assets/84a0acc4-237b-443a-bf4e-5d0443388229" />

# thinkeep 띵킵
하루 5분으로 당신의 추억이 더 오래 남을 수 있도록 

# 개발 기간
2025-06-24 ~ 2025-07-13 (20일)

# 사용 스택
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)


# 1. Application

| 사용 기술 | 설명 |
| --- | --- |
| React | Component Based JavaScript UI Library |
| Next.js | SSR, SSG framework |
| vercel | client server auto deployment service |
| Typescript |  A Static Type Checker, superset of the JavsScript |
| Tailwindcss | emotion |
| Fetch API | API connect |
| Yarn | Package Manager |

---

# 2. Directory Architecture

- public : 이미지 및 asset 공통 폴더
- components : page 디렉토리의 각 페이지를 구성하는 개별 컴포넌트 작성
    - APP : 프로젝트 전반을 구성하는 Layout을 AppHeader, AppFooter로 나누어서 각 영역별 컴포넌트 작성
    - Provider : 인증관리
    - UI : 모든 Domain 컴포넌트에서 쓸 수 있는 공통 UI와 관련된 컴포넌트 작성
- hooks : 기능 컴포넌트 및 함수 정의
- pages : Next.js 의 라우팅 방식에 따라 실제 url에 따라 보여질 Page 컴포넌트 작성
- styles : 전역 스타일링 설정
- states : 상태관리 시스템
- types : 타입 관리
- utils : 프로젝트 전반에서 쓰일 수 있는 공통된 함수, 클래스 등을 작성. 생성되는 각 파일은 해당 파일 내부에서 관리할 유틸리티 구현체의 성질에 따라 이름을 결정
    - Api :  API 연동 및 파일
---

# 3. Code Convention

- 항상 camelCase로 작성해야하며, 파일 이름의 경우 첫 글자는 대문자로 작성
- ESLint, Prettier를 통해 전반적인 컨벤션 관리

---

# 4. Github Convention

- feature → dev로 직접적인 merge가 아닌 항상 PR을 통해 사전 확인과 코드리뷰 후에 merge 하도록 진행
- 배포 시에만 dev → main으로 merge 예정
- pr 및 commit 작성 시 명칭
    - feat/ 기능 정의
    - fix/ 버그 수정
    - refactor/ 성능 개선 및 구조 변경
    - asset/ 에셋 추가
    - docs/ 문서 작성
- issue 작성 시 PR 올릴 때 연동
- issue + PR은 템플릿 활용할 것
