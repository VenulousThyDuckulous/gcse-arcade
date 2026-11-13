# GCSE Arcade

A revision site where you pick a subject, pick a topic, then play a game on it. **30 games** across 10 GCSE subjects, built on **9 hand-made game mechanics**. Everything runs client-side: scores, XP and best runs live in `localStorage`.

## Run it

```bash
npm install
npm run dev      # http://localhost:3006
npm run build    # typecheck + production build
```

## How the flow works

Home shows the subject grid. Choosing a subject opens its topics and its games: pick a topic to filter, then pick a game. Every game is tagged with one subject and one topic, so a topic never offers an unrelated game.

## What's covered

| Subject | Specification reference | Topics with games |
| --- | --- | --- |
| Maths | AQA 8300 · Edexcel 1MA1 | Number; Algebra & graphs; Geometry & angles |
| Biology | AQA 8461 / 8464 | Cell biology; Organisation |
| Chemistry | AQA 8462 / 8464 | Bonding & structure; Chemical changes |
| Physics | AQA 8463 / 8464 | Electricity; Energy; Waves |
| English | AQA 8702 / 8700 | Macbeth; An Inspector Calls; Language devices |
| History | AQA 8145 · Edexcel 1HI0 | Cold War; Medicine through time; Weimar & Nazi Germany |
| Geography | AQA 8035 · Edexcel 1GA0 | Tectonic hazards; Rivers; Population |
| Computer Science | OCR J277 · AQA 8525 | Data representation; Algorithms; Networks |
| French | AQA 8658 · Edexcel 1FR1 | Vocabulary; Sentences; Grammar |
| Religious Studies | AQA 8062 · OCR J625 | Ethics; Beliefs & practices |

**Maths:** Number Crunch, Formula Match, Graph Detective, Angle Hunter  
**Biology:** Cell Labeller, Mitosis Mayhem, Enzyme Sorter  
**Chemistry:** Equation Balancer, Bonding Bins, Reactivity Rumble  
**Physics:** Circuit Sprint, Energy Equation Match, EM Spectrum Scramble  
**English:** Quote Hunter, Device Detective, Inspector's Chain  
**History:** Cold War Timeline, Medicine Through Time, Weimar to Reich  
**Geography:** Tectonic Tussle, River Landforms, Population Puzzler  
**Computer Science:** Binary Blitz, Algorithm Antics, Network Ninja  
**French:** Mot Match, Sentence Sprinter, Verb Vault  
**Religious Studies:** Ethics Odd One Out, Beliefs & Practices

## Game engines

| Engine | Mechanic |
| --- | --- |
| `quiz` | Timed multiple choice; answering fast scores more, every answer is explained |
| `match` | Two columns, connect each term to its partner |
| `order` | Build the correct sequence from shuffled steps, one or more rounds |
| `odd` | Four options, find the one that does not belong |
| `balance` | Steppers set coefficients; a live atom tally shows both sides |
| `tiles` | Rebuild a French sentence from word tiles, with decoys |
| `graph` | Match a scenario to the right graph or population pyramid shape |
| `sort` | File each fact into the right pile |
| `hotspot` | Click the right part of a diagram |

## Adding a game

1. Open the subject's data file in `src/data/games/`.
2. Append a `Game` object: `id`, `title`, `subjectId`, `topicId`, `engine`, `tagline`, `emoji`, `difficulty`, `minutes`, `data`.
3. If the topic is new, add it to `src/data/subjects.ts`.

No new components are needed if you reuse an engine. A new mechanic means a component in `src/engines/` plus a case in `src/components/GameShell.tsx`.

## Project layout

```
src/
  components/   Home, SubjectView, GameShell, diagrams, GraphShape
  engines/      one component per game mechanic
  data/         subjects + one game-data file per subject
  lib/          utilities, profile storage, Web Audio sound effects
  types.ts      shared data model
  styles.css    layout, home, subject and shared styles
  game.css      in-game and results styles
```

## Notes

- Content is written against the specifications listed above. It is practice, not a substitute for past papers — always check answers against your own specification.
- Sound effects are synthesised with the Web Audio API; the header button mutes them.
- Progress, XP and best scores are stored per browser. Nothing is sent to a server.
