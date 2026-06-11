# English Verbs Quiz

Interactive Vue 3 app to practice English verb conjugations — regular and irregular verbs, past simple and past participle forms.

## Features

- **250 questions** covering common regular and irregular verbs
- **Filters** by difficulty (easy, medium, hard), verb type (regular, irregular), and form (past simple, past participle)
- **Configurable quiz length** — 5, 10, 20, or all questions
- **Instant feedback** — options highlight green (correct) or red (incorrect) after answering
- **Scoring** — final score with percentage
- **Mistake review** — shows your wrong answers alongside the correct ones
- **Shuffled options** — answer positions are randomized in the data

## Tech Stack

| | |
|---|---|
| **Framework** | Vue 3 (Composition API, `<script setup>`) |
| **Language** | TypeScript |
| **Router** | Vue Router 5 |
| **Build** | Vite 8 |
| **Testing** | Vitest + @vue/test-utils |
| **Lint** | ESLint + oxlint |
| **Format** | Prettier |

## Project Setup

```sh
pnpm install
```

### Development

```sh
pnpm dev
```

### Production Build

```sh
pnpm build
```

### Run Tests

```sh
pnpm test:unit
```

40 tests across 6 test files:

| File | Tests |
|---|---|
| `useQuiz.spec.ts` | 14 |
| `QuestionComponent.spec.ts` | 9 |
| `FilterPanel.spec.ts` | 6 |
| `ResultScreen.spec.ts` | 5 |
| `QuizProgress.spec.ts` | 4 |
| `App.spec.ts` | 2 |

### Lint

```sh
pnpm lint
```

## Project Structure

```
src/
├── __tests__/                  Unit tests
│   ├── App.spec.ts
│   ├── FilterPanel.spec.ts
│   ├── QuizProgress.spec.ts
│   ├── QuizQuestion.spec.ts
│   ├── ResultScreen.spec.ts
│   └── useQuiz.spec.ts
├── assets/
│   └── main.css                Global styles
├── components/                 Vue components
│   ├── FilterPanel.vue         Quiz configuration screen
│   ├── QuestionComponent.vue   Single question display
│   ├── QuizProgress.vue        Progress bar and counter
│   └── ResultScreen.vue        Results and mistake review
├── composables/
│   └── useQuiz.ts              Quiz state and logic
├── data/
│   └── questions.ts            250 verb questions
├── interfaces/
│   ├── index.ts                Barrel export
│   ├── Question.interface.ts
│   ├── QuizFilters.interface.ts
│   └── WrongAnswer.interface.ts
├── pages/
│   └── HomePage.vue            Main quiz page
├── router/
│   └── index.ts                Vue Router config
├── App.vue                     Root component
└── main.ts                     App entry point
```
