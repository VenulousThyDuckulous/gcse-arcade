import type { Game } from "../../types";

export const computingGames: Game[] = [
  {
    id: "binary-blitz",
    title: "Binary Blitz",
    subjectId: "computing",
    topicId: "data",
    engine: "quiz",
    tagline: "Bits, bytes and hex. Ten conversions against the clock.",
    emoji: "🤖",
    difficulty: 2,
    minutes: 4,
    data: {
      timer: 20,
      questions: [
        {
          q: "What is 1011 in denary?",
          options: ["9", "11", "13", "15"],
          answer: 1,
          why: "8 + 0 + 2 + 1 = 11. Each place is a power of two: 8, 4, 2, 1.",
        },
        {
          q: "What is 42 in binary?",
          options: ["101010", "110010", "100101", "111000"],
          answer: 0,
          why: "32 + 8 + 2 = 42, so the bits are 1 0 1 0 1 0.",
        },
        {
          q: "How many bits are in one byte?",
          options: ["4", "8", "16", "1024"],
          answer: 1,
          why: "A byte is 8 bits, so it can store 2⁸ = 256 different values (0–255).",
        },
        {
          q: "What is 255 in hexadecimal?",
          options: ["FF", "FE", "F0", "15F"],
          answer: 0,
          why: "255 = 15 × 16 + 15, and 15 is F in hex — so FF.",
        },
        {
          q: "What is 15 in hexadecimal?",
          options: ["E", "F", "10", "1E"],
          answer: 1,
          why: "Hex counts 0–9 then A=10, B=11, C=12, D=13, E=14, F=15.",
        },
        {
          q: "How many bytes are in one kibibyte (KiB)?",
          options: ["100", "1000", "1024", "1,048,576"],
          answer: 2,
          why: "Storage uses powers of two: 1 KiB = 2¹⁰ = 1024 bytes. A mebibyte is 1024 KiB.",
        },
        {
          q: "What is 0011 + 0101 in binary?",
          options: ["0110", "1000", "1001", "1111"],
          answer: 1,
          why: "3 + 5 = 8, and 8 in binary is 1000.",
        },
        {
          q: "Which base does hexadecimal use?",
          options: ["2", "8", "10", "16"],
          answer: 3,
          why: "Base 16. One hex digit represents exactly four bits, which is why programmers use it as shorthand.",
        },
        {
          q: "What does a left shift by 1 place do to a binary number?",
          options: ["Divides by 2", "Multiplies by 2", "Adds 1", "Reverses the bits"],
          answer: 1,
          why: "Shifting left multiplies by 2; shifting right divides by 2. Bits fall off the end if there is no room.",
        },
        {
          q: "Why can a computer not store 0.1 exactly in binary?",
          options: [
            "Binary cannot store decimals",
            "0.1 is a recurring fraction in binary, so it is rounded",
            "Floating point only works with negative numbers",
            "It can — there is no loss of precision",
          ],
          answer: 1,
          why: "0.1 in binary is 0.0001100110011… forever, so it is rounded. This causes small errors such as 0.1 + 0.2 ≠ 0.3.",
        },
      ],
    },
  },
  {
    id: "algorithm-antics",
    title: "Algorithm Antics",
    subjectId: "computing",
    topicId: "algorithms",
    engine: "order",
    tagline: "Search, sort and fetch. Three algorithms, every step in the right place.",
    emoji: "🧠",
    difficulty: 3,
    minutes: 5,
    data: {
      rounds: [
        {
          prompt: "Order the steps of a binary search on a sorted list.",
          items: [
            "Find the middle item of the list",
            "Compare the middle item with the search term",
            "If it matches, stop — the item is found",
            "If the term is larger, discard the left half; if smaller, discard the right half",
            "Repeat with the remaining half until found or the list is empty",
          ],
          note: "Binary search halves the list every time, so it is far faster than a linear search — but the data must be sorted first.",
        },
        {
          prompt: "Order one pass of a bubble sort.",
          items: [
            "Compare the first two items",
            "If they are in the wrong order, swap them",
            "Move one place to the right and compare the next pair",
            "Repeat to the end of the list — the largest item is now in place",
            "Start again from the beginning for the next pass",
          ],
          note: "Bubble sort is easy to code but slow: worst case O(n²). A 'no swaps' flag stops it early on nearly sorted data.",
        },
        {
          prompt: "Order the stages of the fetch–decode–execute cycle.",
          items: [
            "The program counter holds the address of the next instruction",
            "The address is copied to the MAR and the instruction is fetched into the MDR",
            "The instruction is copied to the CIR and decoded by the control unit",
            "The instruction is executed, using the ALU if needed",
            "The program counter is incremented to point at the next instruction",
          ],
          note: "Registers to remember: PC, MAR, MDR, CIR and the accumulator. The cycle repeats millions of times a second.",
        },
      ],
    },
  },
  {
    id: "network-ninja",
    title: "Network Ninja",
    subjectId: "computing",
    topicId: "networks",
    engine: "sort",
    tagline: "Star, mesh or bus? File nine network facts before the connection drops.",
    emoji: "🕸️",
    difficulty: 2,
    minutes: 4,
    data: {
      bins: [
        { id: "star", label: "Star", hint: "One central switch" },
        { id: "mesh", label: "Mesh", hint: "Everything connected" },
        { id: "bus", label: "Bus", hint: "One shared backbone" },
      ],
      items: [
        {
          text: "A central switch connects every device",
          bin: "star",
          why: "Each device has its own cable to the switch — the most common wired topology in schools.",
        },
        {
          text: "If the central device fails, the whole network goes down",
          bin: "star",
          why: "One point of failure, but a single broken cable only affects one device.",
        },
        {
          text: "Easy to add a new device without disrupting others",
          bin: "star",
          why: "Plug another cable into the switch; the rest of the network keeps running normally.",
        },
        {
          text: "Every device is connected to every other device",
          bin: "mesh",
          why: "Full mesh gives redundant paths, so traffic can route around a failure.",
        },
        {
          text: "Lots of cabling, so it is expensive to install",
          bin: "mesh",
          why: "The number of connections grows rapidly with devices: n(n−1)/2 links for a full mesh.",
        },
        {
          text: "No single point of failure — highly fault-tolerant",
          bin: "mesh",
          why: "This is why mesh is used in WAN backbones and in wireless mesh networks.",
        },
        {
          text: "All devices share one backbone cable",
          bin: "bus",
          why: "Terminators at each end absorb signals; every device sees every transmission.",
        },
        {
          text: "A break in the backbone stops the whole network",
          bin: "bus",
          why: "The single shared cable is the weakness, and collisions are common under heavy traffic.",
        },
        {
          text: "Cheapest and simplest to set up",
          bin: "bus",
          why: "Little cable is needed, which is why early Ethernet networks used it.",
        },
      ],
    },
  },
];
