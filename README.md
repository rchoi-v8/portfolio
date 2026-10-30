# 최렘 — 개인 포트폴리오

부산대학교 심리학과 · 빅데이터 복수전공 최렘의 1페이지 포트폴리오.
정적 HTML/CSS/JS로만 구성되어 있으며 GitHub Pages로 배포합니다.

- 배포 주소: https://rchoi-v8.github.io/portfolio/
- 저장소: https://github.com/rchoi-v8/portfolio

## 구성

```
portfolio/
├── index.html      # 전체 마크업 (nav, Hero, About, Tools, Experience, Projects, Contact)
├── css/style.css   # 디자인 토큰 + 뉴모피즘 컴포넌트 + 반응형
├── js/main.js      # 동적 기능 5종
└── .gitignore      # .DS_Store 제외
```

## 로컬에서 보기

```bash
open index.html
```

또는 로컬 서버로 확인:

```bash
python3 -m http.server 8000
# 브라우저에서 http://localhost:8000
```

## 프로젝트 추가하기

`js/main.js` 상단의 `projects` 배열에 항목을 넣으면 카드가 자동으로 렌더링됩니다.

```js
var projects = [
  {
    title: "설문 응답 데이터로 본 스트레스 요인",
    category: "psych",          // psych | data | mixed
    summary: "학부 설문 120건을 분석해 요인을 분류한 과제",
    problem: "시험 기간 스트레스의 주요 요인이 무엇인가",
    data: "설문 응답 120건",
    method: "pandas 전처리 + 요인분석",
    result: "3개 요인으로 수렴"
  }
];
```

`projects`가 비어 있으면 "준비 중" 카드 3개가 표시됩니다.

## 디자인 규칙

| 항목 | 값 |
|---|---|
| 배경 | `#eef1f6` |
| 밝은 그림자 / 어두운 그림자 | `#ffffff` / `#c8ced8` |
| 액센트 | `#3182f6` |
| 카드 / 버튼 반경 | 24px / 16px |
| 폰트 | Pretendard (CDN, 실패 시 시스템 폰트로 대체) |

- 다크모드는 넣지 않습니다. 뉴모피즘 그림자가 배경과 뭉개져 효과가 사라지기 때문입니다.
- 본문 텍스트에는 그림자를 쓰지 않습니다. 대비 확보를 위해 카드·버튼에만 뉴모피즘을 적용합니다.

## 배포

```bash
git add -A
git commit -m "메시지"
git push
```

GitHub 저장소 Settings → Pages 에서 Source가 `Deploy from a branch`, Branch가 `main` / `/(root)`로 설정되어 있어야 합니다.
푸시 후 1분 안에 반영됩니다.

## 주의

이 폴더는 iCloud Drive 안에 있습니다. `.git` 디렉터리도 함께 동기화되므로
동기화가 진행 중일 때 커밋하면 충돌이 생길 수 있습니다.
저장소가 깨지면 GitHub 원격을 정본으로 다시 클론하세요.

```bash
git clone https://github.com/rchoi-v8/portfolio.git
```
