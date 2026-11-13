import type { Game } from "../../types";

export const rsGames: Game[] = [
  {
    id: "ethics-odd",
    title: "Ethics Odd One Out",
    subjectId: "rs",
    topicId: "ethics",
    engine: "odd",
    tagline: "Four terms, one impostor. Six rounds of philosophical spotting.",
    emoji: "⚖️",
    difficulty: 3,
    minutes: 4,
    data: {
      rounds: [
        {
          prompt: "Which one is not an ethical theory?",
          options: ["Natural Law", "Utilitarianism", "Situation Ethics", "The Ten Commandments"],
          answer: 3,
          why: "The Decalogue is a set of religious rules revealed in scripture; the others are philosophical theories for deciding what is right.",
        },
        {
          prompt: "Which one is not a value used in medical ethics?",
          options: [
            "Sanctity of life",
            "Quality of life",
            "Dignity of the human person",
            "Maximum profit",
          ],
          answer: 3,
          why: "Profit is a business aim. Sanctity of life, quality of life and dignity are the values weighed in issues such as abortion and euthanasia.",
        },
        {
          prompt: "Which one is not a life-and-death ethical issue?",
          options: ["Abortion", "Euthanasia", "Capital punishment", "Confirmation"],
          answer: 3,
          why: "Confirmation is a Christian sacrament of commitment, not a debate about ending or protecting life.",
        },
        {
          prompt: "Which word is not an attribute of God?",
          options: ["Omnipotent", "Omniscient", "Omnibenevolent", "Omnivorous"],
          answer: 3,
          why: "Omnivorous means eating both plants and meat. The others mean all-powerful, all-knowing and all-loving.",
        },
        {
          prompt: "Which one does not express the Golden Rule or agape?",
          options: [
            "Love thy neighbour as thyself",
            "Do to others as you would have them do to you",
            "An eye for an eye",
            "Turn the other cheek",
          ],
          answer: 2,
          why: "'An eye for an eye' is retribution — the opposite of agape love and forgiveness.",
        },
        {
          prompt: "Which one is not a sacred text?",
          options: ["The Bible", "The Qur'an", "The Torah", "The Trinity"],
          answer: 3,
          why: "The Trinity is a Christian doctrine — one God in three persons — not a book.",
        },
      ],
    },
  },
  {
    id: "beliefs-sort",
    title: "Beliefs & Practices",
    subjectId: "rs",
    topicId: "beliefs",
    engine: "sort",
    tagline: "Christianity, Islam or shared? Nine beliefs and practices to place.",
    emoji: "🕌",
    difficulty: 2,
    minutes: 4,
    data: {
      bins: [
        { id: "christianity", label: "Christianity", hint: "Trinity, sacraments, Easter" },
        { id: "islam", label: "Islam", hint: "Tawhid, Five Pillars, Hajj" },
        { id: "both", label: "Both", hint: "Shared beliefs" },
      ],
      items: [
        {
          text: "The Trinity — Father, Son and Holy Spirit",
          bin: "christianity",
          why: "One God in three persons. Islam rejects this and teaches Tawhid, the absolute oneness of God.",
        },
        {
          text: "Tawhid — the oneness of God",
          bin: "islam",
          why: "The central Islamic belief, expressed in the Shahadah: there is no god but Allah.",
        },
        {
          text: "The Five Pillars",
          bin: "islam",
          why: "Shahadah, Salah, Zakah, Sawm and Hajj — the framework of Muslim practice.",
        },
        {
          text: "The Eucharist",
          bin: "christianity",
          why: "Also called Holy Communion — bread and wine recalling the Last Supper.",
        },
        {
          text: "Hajj — pilgrimage to Makkah",
          bin: "islam",
          why: "The fifth pillar: every Muslim who is able should make the journey once in their lifetime.",
        },
        {
          text: "Easter — death and resurrection",
          bin: "christianity",
          why: "The most important Christian festival, celebrating the resurrection of Jesus.",
        },
        {
          text: "Belief in prophets",
          bin: "both",
          why: "Christians accept the Old Testament prophets; Muslims accept a line of prophets ending with Muhammad.",
        },
        {
          text: "Life after death and judgement",
          bin: "both",
          why: "Both faiths teach an afterlife in which moral choices matter — heaven and hell in different forms.",
        },
        {
          text: "Giving to charity as a duty",
          bin: "both",
          why: "Zakah (2.5% of savings) for Muslims; tithing and generosity for Christians.",
        },
      ],
    },
  },
];
