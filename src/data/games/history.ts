import type { Game } from "../../types";

export const historyGames: Game[] = [
  {
    id: "cold-war-timeline",
    title: "Cold War Timeline",
    subjectId: "history",
    topicId: "cold-war",
    engine: "order",
    tagline: "Eight flashpoints, 1945 to 1962. One wrong move starts a crisis.",
    emoji: "☢️",
    difficulty: 2,
    minutes: 4,
    data: {
      rounds: [
        {
          prompt: "Put these Cold War events in chronological order.",
          items: [
            "Yalta Conference, February 1945",
            "Potsdam Conference, July 1945",
            "Truman Doctrine, 1947",
            "Berlin Blockade and airlift, 1948–49",
            "NATO formed, 1949",
            "Warsaw Pact formed, 1955",
            "Berlin Wall built, 1961",
            "Cuban Missile Crisis, 1962",
          ],
          note: "The pattern is action and reaction: NATO answers Soviet expansion, the Warsaw Pact answers NATO, and each crisis hardens the division of Europe.",
        },
      ],
    },
  },
  {
    id: "medicine-through-time",
    title: "Medicine Through Time",
    subjectId: "history",
    topicId: "medicine",
    engine: "sort",
    tagline: "Nine breakthroughs. File each one in the right century.",
    emoji: "🩺",
    difficulty: 2,
    minutes: 4,
    data: {
      bins: [
        { id: "medieval", label: "c.1250–1500", hint: "Religion, humours, the Black Death" },
        { id: "early-modern", label: "c.1500–1750", hint: "Renaissance, dissection, the printing press" },
        { id: "industrial", label: "c.1750–1900", hint: "Germ theory, vaccination, public health" },
        { id: "modern", label: "c.1900–present", hint: "Penicillin, the NHS, DNA" },
      ],
      items: [
        {
          text: "The theory of the four humours",
          bin: "medieval",
          why: "Hippocrates and Galen's ideas still dominated medieval medicine — illness was treated with bloodletting and purging.",
        },
        {
          text: "The Black Death reaches England (1348)",
          bin: "medieval",
          why: "Medieval people blamed miasma and God's punishment; treatments included prayer and flagellation.",
        },
        {
          text: "Vesalius publishes 'On the Fabric of the Human Body' (1543)",
          bin: "early-modern",
          why: "Dissection challenged Galen's errors, but treatments barely improved — knowledge grew faster than practice.",
        },
        {
          text: "Harvey proves blood circulates (1628)",
          bin: "early-modern",
          why: "Harvey showed the heart pumps blood around the body, contradicting Galen's 1400-year-old theory.",
        },
        {
          text: "Jenner's smallpox vaccination (1796)",
          bin: "industrial",
          why: "Jenner used cowpox to prevent smallpox — the first vaccination, though he could not explain why it worked.",
        },
        {
          text: "Pasteur and Koch establish germ theory (1860s–70s)",
          bin: "industrial",
          why: "Germ theory explained disease and led to vaccines, antiseptics and pasteurisation.",
        },
        {
          text: "Florey and Chain mass-produce penicillin (1940s)",
          bin: "modern",
          why: "Fleming noticed penicillin in 1928; the war effort turned it into the first mass-produced antibiotic.",
        },
        {
          text: "The NHS is created (1948)",
          bin: "modern",
          why: "Free healthcare at the point of use — the culmination of a century of public health reform.",
        },
        {
          text: "Watson and Crick publish the structure of DNA (1953)",
          bin: "modern",
          why: "Understanding DNA started the era of genetics, gene therapy and modern medical research.",
        },
      ],
    },
  },
  {
    id: "weimar-nazi-quiz",
    title: "Weimar to Reich",
    subjectId: "history",
    topicId: "weimar",
    engine: "quiz",
    tagline: "Dates, turning points and the collapse of a democracy. Ten seconds each.",
    emoji: "🎭",
    difficulty: 3,
    minutes: 4,
    data: {
      timer: 20,
      questions: [
        {
          q: "In which year was the Treaty of Versailles signed?",
          options: ["1918", "1919", "1920", "1923"],
          answer: 1,
          why: "June 1919. Germany accepted the War Guilt clause, army limits and £6.6 billion reparations.",
        },
        {
          q: "In which year did the Munich Putsch take place?",
          options: ["1919", "1922", "1923", "1929"],
          answer: 2,
          why: "November 1923. It failed, but the trial gave Hitler national publicity.",
        },
        {
          q: "What happened to German prices in 1923?",
          options: [
            "They fell sharply",
            "Hyperinflation made money almost worthless",
            "They were fixed to gold",
            "They stayed unchanged",
          ],
          answer: 1,
          why: "The Ruhr occupation led to printing money; by November 1923 it took billions of marks to buy bread.",
        },
        {
          q: "Which event in October 1929 plunged Germany into depression?",
          options: [
            "The Reichstag Fire",
            "The Wall Street Crash",
            "The Munich Putsch",
            "The Kapp Putsch",
          ],
          answer: 1,
          why: "US loans were recalled, businesses collapsed and unemployment passed 6 million by 1932.",
        },
        {
          q: "When did Hitler become Chancellor of Germany?",
          options: ["January 1933", "March 1933", "August 1934", "November 1932"],
          answer: 0,
          why: "30 January 1933 — a backroom deal, with only three Nazis in a cabinet of eleven.",
        },
        {
          q: "The Reichstag Fire (February 1933) was used to...",
          options: [
            "Ban the Nazi Party",
            "Pass the Enabling Act and suspend civil rights",
            "Call new elections under a coalition",
            "Restore the Kaiser",
          ],
          answer: 1,
          why: "The decree suspended civil liberties; the Enabling Act in March then let Hitler legislate without the Reichstag.",
        },
        {
          q: "Who was murdered during the Night of the Long Knives (1934)?",
          options: [
            "President Hindenburg",
            "Ernst Röhm and the SA leadership",
            "The leader of the SS",
            "Communist deputies",
          ],
          answer: 1,
          why: "Hitler removed the SA threat and won army loyalty — the SS then became his real instrument of terror.",
        },
        {
          q: "When did Hindenburg die, allowing Hitler to become Führer?",
          options: ["March 1933", "August 1934", "April 1935", "November 1938"],
          answer: 1,
          why: "Hitler merged the roles of president and chancellor and demanded personal oaths from the army.",
        },
        {
          q: "What was Kristallnacht (November 1938)?",
          options: [
            "A Nazi rally in Nuremberg",
            "Coordinated attacks on Jewish homes, shops and synagogues",
            "A failed assassination attempt on Hitler",
            "The annexation of Austria",
          ],
          answer: 1,
          why: "Around 7,500 businesses were destroyed and 30,000 Jewish men were sent to camps — a turning point in Nazi persecution.",
        },
        {
          q: "What was the main purpose of the Hitler Youth?",
          options: [
            "To prepare children for university",
            "To indoctrinate young people with Nazi ideology and prepare them for war",
            "To train young people as apprentices",
            "To provide food and shelter for the poor",
          ],
          answer: 1,
          why: "Propaganda and control of education aimed to create a loyal, militarised generation — loyalty to Hitler came before family.",
        },
      ],
    },
  },
];
