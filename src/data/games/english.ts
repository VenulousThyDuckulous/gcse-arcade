import type { Game } from "../../types";

export const englishGames: Game[] = [
  {
    id: "quote-hunter",
    title: "Quote Hunter",
    subjectId: "english",
    topicId: "macbeth",
    engine: "match",
    tagline: "Closed book, eight quotes. Who said it, and when?",
    emoji: "🗡️",
    difficulty: 2,
    minutes: 4,
    data: {
      instruction: "Match each Macbeth quotation to its speaker and moment",
      pairs: [
        { left: "“Fair is foul, and foul is fair”", right: "The Witches — Act 1, scene 1" },
        {
          left: "“Look like th'innocent flower, but be the serpent under't”",
          right: "Lady Macbeth — Act 1, scene 5",
        },
        {
          left: "“Is this a dagger which I see before me”",
          right: "Macbeth — Act 2, scene 1",
        },
        { left: "“Out, damned spot! Out, I say!”", right: "Lady Macbeth — Act 5, scene 1" },
        {
          left: "“The instruments of darkness tell us truths”",
          right: "Banquo — Act 1, scene 3",
        },
        {
          left: "“I have no spur to prick the sides of my intent”",
          right: "Macbeth — Act 1, scene 7",
        },
        { left: "“Something wicked this way comes”", right: "The Witches — Act 4, scene 1" },
        { left: "“Unsex me here”", right: "Lady Macbeth — Act 1, scene 5" },
      ],
    },
  },
  {
    id: "device-detective",
    title: "Device Detective",
    subjectId: "english",
    topicId: "language",
    engine: "match",
    tagline: "Name the method behind the line. Marks live in the terminology.",
    emoji: "🕵️",
    difficulty: 1,
    minutes: 3,
    data: {
      instruction: "Match each language device to its example",
      pairs: [
        { left: "Simile", right: "“Her laugh was like a door slamming shut”" },
        { left: "Metaphor", right: "“The classroom was a zoo”" },
        { left: "Personification", right: "“The wind whispered through the trees”" },
        { left: "Pathetic fallacy", right: "“Grey clouds gathered as the funeral began”" },
        { left: "Alliteration", right: "“The slithering, silent snake slid past”" },
        { left: "Onomatopoeia", right: "“The door creaked, then slammed”" },
        { left: "Oxymoron", right: "“That deafening silence”" },
        { left: "Rule of three", right: "“Blood, sweat and tears”" },
      ],
    },
  },
  {
    id: "inspector-chain",
    title: "Inspector's Chain",
    subjectId: "english",
    topicId: "inspector",
    engine: "order",
    tagline: "Eight moments from An Inspector Calls. Rebuild Priestley's chain of events.",
    emoji: "🕰️",
    difficulty: 2,
    minutes: 4,
    data: {
      rounds: [
        {
          prompt: "Put the events of An Inspector Calls in order.",
          items: [
            "The Birlings celebrate Sheila's engagement to Gerald",
            "Inspector Goole arrives and reveals Eva Smith has died",
            "Arthur Birling is questioned about sacking Eva for asking for a pay rise",
            "Sheila admits she had Eva dismissed from Milwards out of jealousy",
            "Gerald confesses his affair with Daisy Renton",
            "Mrs Birling refuses Eva charity help and blames the father",
            "Eric is exposed as the father who stole money from the works",
            "The Inspector leaves and the family realise he was not a real inspector",
          ],
          note: "Priestley stacks the confessions so each generation looks worse, then uses the final phone call to insist the lesson has not been learned. Responsibility is the whole play.",
        },
      ],
    },
  },
];
