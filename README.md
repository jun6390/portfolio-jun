# Park Haejun Portfolio

개인 프로젝트, 기술 스택, 개발 경험을 소개하기 위해 제작한 포트폴리오 웹사이트입니다.  
Next.js App Router 기반으로 구축했으며, 부드러운 스크롤, 커스텀 커서, 로딩 화면, 다크 모드, 섹션별 인터랙션을 적용했습니다.

## 주요 기능

- 한국어/영어 다국어 페이지 지원
- Lenis 기반 부드러운 스크롤
- Framer Motion 기반 섹션 애니메이션
- 다크 모드/라이트 모드 전환
- 커스텀 커서와 프리로더 구현
- 반응형 헤더 네비게이션
- Hero, About, Skill, Projects, Roadmap, Contact 섹션 구성
- 프로젝트 상세 모달 제공
- 프로젝트별 Live Demo, Source Code, PDF, Demo Video 링크 지원

## 기술 스택

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion

### UI / UX

- shadcn/ui
- Radix UI
- Lucide React
- Lenis
- next-themes

## 프로젝트 구조

```txt
app/                 Next.js App Router 페이지와 전역 레이아웃
components/          공통 UI, 레이아웃, 섹션, 모달, 이펙트 컴포넌트
contents/            언어별 실제 콘텐츠 데이터
dictionaries/        언어별 UI 문구 데이터
hooks/               커스텀 React hook
lib/                 공통 유틸리티와 데이터 로더
providers/           전역 Provider 구성
public/              이미지, 로고, PDF, 정적 파일
types/               프로젝트에서 사용하는 TypeScript 타입
```

## 주요 섹션

### Intro

포트폴리오의 첫 화면입니다.  
큰 타이포그래피, 인터랙티브 파티클, 기술 로고 슬라이드를 통해 첫인상을 구성했습니다.

### About

개발자로서의 방향성과 소개 문구를 보여주는 섹션입니다.  
상세 소개는 모달로 분리해 사용자가 필요한 경우 더 긴 자기소개를 확인할 수 있도록 구성했습니다.

### Skill

프론트엔드, 백엔드, 데이터베이스, 협업 도구로 나누어 사용해본 기술을 정리했습니다.

### Projects

프로젝트를 카드 형태로 보여주는 섹션입니다.  
데스크톱에서는 세로 스크롤을 가로 이동으로 변환해 프로젝트를 탐색하도록 만들었고, 모바일에서는 세로 리스트로 보여줍니다.

### Roadmap

연도별 학습 과정과 경험을 타임라인 형태로 정리한 섹션입니다.  
스크롤 진행도에 따라 중앙 라인이 채워지도록 구현했습니다.

### Contact

이메일, 전화번호, 소셜 링크를 제공하는 마지막 섹션입니다.  
`mailto:`, `tel:` 링크를 적용해 바로 연락할 수 있도록 구성했습니다.

## 다국어 데이터 구조

UI 문구와 실제 콘텐츠를 분리했습니다.

```txt
dictionaries/ko.json     한국어 UI 문구
dictionaries/en.json     영어 UI 문구
contents/ko.json         한국어 콘텐츠
contents/en.json         영어 콘텐츠
```

이 구조를 사용해 컴포넌트는 동일하게 유지하고, 언어별 데이터만 바꿔서 렌더링할 수 있습니다.

## 개발 의도

이 프로젝트는 단순히 정보를 나열하는 포트폴리오가 아니라, 사용자가 자연스럽게 섹션을 탐색할 수 있는 경험을 목표로 제작했습니다.  
컴포넌트 재사용성, 다국어 확장성, 반응형 UI, 애니메이션 흐름을 고려해 구조를 설계했습니다.
