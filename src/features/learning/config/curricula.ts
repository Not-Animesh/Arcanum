import { CurriculumDetail } from "../types";

export const CURRICULA: Record<string, CurriculumDetail> = {
  // COMPUTER NETWORKS (Full Featured Reference Curriculum)
  cn: {
    slug: "cn",
    title: "Computer Networks",
    subtitle:
      "Understand how devices communicate, how network protocols work, and how data moves across the internet.",
    trackId: "core-cs",
    trackLabel: "Core CS",
    estimatedDuration: "35 hours",
    totalModules: 10,
    totalTopics: 38,
    quizzesCount: 10,
    about: {
      overview:
        "Computer Networks is the bedrock of modern distributed applications and internet infrastructure. This curriculum walks you systematically from physical data transmission and link layer framing up to application protocols and network security.",
      whyItMatters:
        "Whether you are optimizing HTTP/3 payload latency, troubleshooting socket timeouts in production microservices, or answering systems questions in technical interviews, networking fluency separates average developers from senior systems engineers.",
      organization:
        "Modules are ordered strictly from bottom-up: starting with physical signals and the OSI/TCP-IP reference models, traversing IP addressing, routing algorithms, transport-layer flow/congestion control, up to HTTP/DNS and zero-trust security.",
      whatYoullLearn: [
        "Packet transmission, framing, collision domains, and CSMA/CD mechanisms.",
        "IPv4 & IPv6 addressing schemes, CIDR subnetting, NAT, and ARP.",
        "Interior and exterior routing algorithms including Dijkstra's link-state and Bellman-Ford distance-vector.",
        "TCP 3-way handshake, 4-way teardown, sliding window flow control, and Tahoe/Reno congestion control.",
        "DNS resolution hierarchies, HTTP/1.1 vs HTTP/2 vs HTTP/3, TLS 1.3 handshakes, and WebSockets.",
      ],
      practicalRelevance:
        "Widely tested in backend, DevOps, site reliability engineering, and core systems interviews at top technology companies.",
    },
    prerequisites: [
      "Basic understanding of operating system processes and memory.",
      "Familiarity with binary numbers, hexadecimal representations, and bitwise operations.",
    ],
    learningObjectives: [
      "Explain the exact path of a packet from client socket to server kernel.",
      "Calculate subnet ranges, broadcast addresses, and CIDR masks with precision.",
      "Diagnose network bottlenecks using packet inspection principles and latency telemetry.",
      "Compare trade-offs between TCP and UDP for real-time and fault-tolerant distributed workloads.",
    ],
    suggestedStudyOrder:
      "Follow Modules 1 through 7 sequentially before tackling Application Layer (Module 8) and Network Security (Module 9).",
    faqs: [
      {
        question: "Can I start Computer Networks without prior networking knowledge?",
        answer:
          "Yes. Module 1 starts from absolute zero: defining transmission mediums, bandwidth vs throughput, and basic topologies before moving to complex models.",
      },
      {
        question: "Do I need programming knowledge to learn Computer Networks?",
        answer:
          "No deep programming is required, although basic familiarity with sockets in languages like Python, C, or Go helps solidify transport layer concepts.",
      },
      {
        question: "Which topics should I study before routing?",
        answer:
          "Ensure you are fully comfortable with IP Addressing, Subnetting (CIDR), and the difference between MAC and IP addresses covered in Modules 3 and 5.",
      },
      {
        question: "How should I revise this subject for interviews?",
        answer:
          "Focus on the classic interview core: TCP vs UDP, TCP 3-way handshake, what happens when you type a URL into a browser, and DNS resolution.",
      },
    ],
    modules: [
      {
        id: "cn-m1",
        moduleNumber: 1,
        title: "Network Fundamentals",
        description: "Introduction to networks, physical mediums, and core metrics.",
        topics: [
          { id: "cn-1-1", title: "Introduction to Computer Networks", duration: "25 min" },
          { id: "cn-1-2", title: "Network Topologies (Mesh, Star, Bus, Ring)", duration: "30 min" },
          { id: "cn-1-3", title: "Types of Networks (LAN, MAN, WAN, PAN)", duration: "20 min" },
          { id: "cn-1-4", title: "Transmission Modes (Simplex, Half-Duplex, Full-Duplex)", duration: "25 min" },
        ],
      },
      {
        id: "cn-m2",
        moduleNumber: 2,
        title: "Network Models (OSI & TCP/IP)",
        description: "Layered architectures, encapsulation, and protocol hierarchies.",
        topics: [
          { id: "cn-2-1", title: "The 7 Layers of OSI Reference Model", duration: "45 min" },
          { id: "cn-2-2", title: "TCP/IP 4-Layer Architecture", duration: "35 min" },
          { id: "cn-2-3", title: "Data Encapsulation and Protocol Data Units (PDUs)", duration: "30 min" },
        ],
      },
      {
        id: "cn-m3",
        moduleNumber: 3,
        title: "Physical and Data Link Layers",
        description: "Framing, error detection, flow control, and MAC addressing.",
        topics: [
          { id: "cn-3-1", title: "Framing and Bit/Byte Stuffing", duration: "35 min" },
          { id: "cn-3-2", title: "Error Detection: Parity, Checksum, and CRC", duration: "45 min" },
          { id: "cn-3-3", title: "MAC Addresses and Address Resolution Protocol (ARP)", duration: "40 min" },
          { id: "cn-3-4", title: "Collision Detection: CSMA/CD and CSMA/CA", duration: "40 min" },
        ],
      },
      {
        id: "cn-m4",
        moduleNumber: 4,
        title: "Network Topologies and VLANs",
        description: "Switching hardware, broadcast domains, and virtual LANs.",
        topics: [
          { id: "cn-4-1", title: "Hubs, Switches, and Bridges", duration: "30 min" },
          { id: "cn-4-2", title: "Virtual LANs (VLANs) and Trunking (802.1Q)", duration: "40 min" },
          { id: "cn-4-3", title: "Spanning Tree Protocol (STP) Essentials", duration: "45 min" },
        ],
      },
      {
        id: "cn-m5",
        moduleNumber: 5,
        title: "Network Layer and IP Addressing",
        description: "IPv4/IPv6 headers, CIDR subnetting, and address translation.",
        topics: [
          { id: "cn-5-1", title: "IPv4 Header Format and Fragmentation", duration: "40 min" },
          { id: "cn-5-2", title: "Classful vs Classless Addressing (CIDR)", duration: "50 min" },
          { id: "cn-5-3", title: "Subnetting and Supernetting Calculations", duration: "60 min" },
          { id: "cn-5-4", title: "IPv6 Architecture and Transition Mechanisms", duration: "35 min" },
          { id: "cn-5-5", title: "Network Address Translation (NAT) & PAT", duration: "40 min" },
        ],
      },
      {
        id: "cn-m6",
        moduleNumber: 6,
        title: "Routing",
        description: "Packet forwarding, routing tables, and distributed routing algorithms.",
        topics: [
          { id: "cn-6-1", title: "Router vs. Forwarding Engine", duration: "30 min" },
          { id: "cn-6-2", title: "Routing Table Fundamentals & Longest Prefix Match", duration: "40 min" },
          { id: "cn-6-3", title: "Static Routing vs. Dynamic Routing", duration: "30 min" },
          { id: "cn-6-4", title: "Distance Vector Routing & Count to Infinity", duration: "50 min" },
          { id: "cn-6-5", title: "Link State Routing & Dijkstra Algorithm", duration: "55 min" },
          { id: "cn-6-6", title: "Routing Protocols (RIP, OSPF, and BGP overview)", duration: "50 min" },
        ],
      },
      {
        id: "cn-m7",
        moduleNumber: 7,
        title: "Transport Layer",
        description: "End-to-end reliability, multiplexing, TCP state machine, and UDP.",
        topics: [
          { id: "cn-7-1", title: "Port Numbers and Socket Multiplexing", duration: "30 min" },
          { id: "cn-7-2", title: "User Datagram Protocol (UDP) Header & Use Cases", duration: "35 min" },
          { id: "cn-7-3", title: "TCP 3-Way Handshake and Connection Teardown", duration: "45 min" },
          { id: "cn-7-4", title: "TCP Flow Control & Sliding Window Protocol", duration: "45 min" },
          { id: "cn-7-5", title: "TCP Congestion Control (Slow Start, Fast Retransmit)", duration: "55 min" },
        ],
      },
      {
        id: "cn-m8",
        moduleNumber: 8,
        title: "Application Layer",
        description: "High-level protocols powering the World Wide Web and internet services.",
        topics: [
          { id: "cn-8-1", title: "Domain Name System (DNS) Hierarchies & Resolution", duration: "45 min" },
          { id: "cn-8-2", title: "HTTP/1.1, HTTP/2 (Multiplexing), and HTTP/3 (QUIC)", duration: "55 min" },
          { id: "cn-8-3", title: "HTTPS, SSL/TLS Handshake Mechanics", duration: "50 min" },
          { id: "cn-8-4", title: "Email Protocols (SMTP, POP3, IMAP) & WebSockets", duration: "35 min" },
        ],
      },
      {
        id: "cn-m9",
        moduleNumber: 9,
        title: "Network Security",
        description: "Firewalls, symmetric/asymmetric encryption, and threat models.",
        topics: [
          { id: "cn-9-1", title: "Symmetric vs Asymmetric Key Cryptography", duration: "40 min" },
          { id: "cn-9-2", title: "Firewalls (Packet Filtering vs Stateful Inspection)", duration: "40 min" },
          { id: "cn-9-3", title: "Virtual Private Networks (VPNs) & IPsec", duration: "45 min" },
        ],
      },
      {
        id: "cn-m10",
        moduleNumber: 10,
        title: "Network Performance",
        description: "Latency metrics, bandwidth delay products, CDN caching, and telemetry.",
        topics: [
          { id: "cn-10-1", title: "Measuring Latency, Bandwidth, Throughput & Jitter", duration: "30 min" },
          { id: "cn-10-2", title: "Content Delivery Networks (CDNs) and Edge Caching", duration: "40 min" },
          { id: "cn-10-3", title: "Network Troubleshooting: ping, traceroute, and Wireshark", duration: "45 min" },
        ],
      },
    ],
  },

  // DATA STRUCTURES & ALGORITHMS
  dsa: {
    slug: "dsa",
    title: "Data Structures & Algorithms",
    subtitle:
      "Build deep algorithmic intuition and problem-solving mastery for coding interviews.",
    trackId: "dsa",
    trackLabel: "DSA",
    estimatedDuration: "80 hours",
    totalModules: 12,
    totalTopics: 54,
    quizzesCount: 12,
    about: {
      overview:
        "The complete path to algorithmic mastery. Covers foundational structures (arrays, linked lists) through complex dynamic programming, trees, and graphs.",
      whyItMatters:
        "DSA remains the foundational technical assessment benchmark across software engineering hiring pipelines globally.",
      organization:
        "Structured in progressively challenging tiers: Linear data structures -> Hierarchical structures -> Algorithmic design paradigms -> Advanced graph & string algorithms.",
      whatYoullLearn: [
        "Time and space asymptotic complexity analysis (Big-O, Big-Theta, Big-Omega).",
        "Two-pointer techniques, sliding windows, and fast-slow pointer patterns.",
        "Tree traversals, binary search tree operations, and balanced tree rotations.",
        "Graph representations, breadth-first search, depth-first search, and shortest path algorithms.",
        "Dynamic programming state identification, memoization, and bottom-up tabulation.",
      ],
      practicalRelevance:
        "Essential for passing technical rounds at product companies, high-frequency trading firms, and top startups.",
    },
    prerequisites: [
      "Fluency in at least one programming language (C++, Java, Python, or TypeScript).",
      "Basic mathematical logic and recursive reasoning.",
    ],
    learningObjectives: [
      "Identify optimal algorithmic patterns within 2 minutes of reading problem statements.",
      "Analyze exact time and space complexity bounds under varying constraint sizes.",
      "Write bug-free, edge-case resilient implementations with clean modular code.",
    ],
    suggestedStudyOrder:
      "Complete Linear Structures (Modules 1–4) thoroughly before attempting Trees, Graphs, and Dynamic Programming.",
    faqs: [
      {
        question: "Which language is best for practicing DSA?",
        answer:
          "Any modern language works. C++ and Java offer rich standard library primitives, while Python enables rapid prototyping. Choose the one you are most fluent with.",
      },
      {
        question: "How many problems should I solve per topic?",
        answer:
          "Aim for 4–6 high-signal pattern problems per topic rather than grinding hundreds of repetitive variations.",
      },
    ],
    modules: [
      {
        id: "dsa-m1",
        moduleNumber: 1,
        title: "Programming Fundamentals & Complexity",
        topics: [
          { id: "dsa-1-1", title: "Asymptotic Analysis & Big-O Notation", duration: "40 min" },
          { id: "dsa-1-2", title: "Space Complexity & Recursion Stack Bounds", duration: "35 min" },
          { id: "dsa-1-3", title: "Basic Math & Bitwise Tricks", duration: "45 min" },
        ],
      },
      {
        id: "dsa-m2",
        moduleNumber: 2,
        title: "Arrays & Strings",
        topics: [
          { id: "dsa-2-1", title: "Two Pointer Approach & In-Place Manipulations", duration: "50 min" },
          { id: "dsa-2-2", title: "Sliding Window Patterns (Fixed & Variable)", duration: "60 min" },
          { id: "dsa-2-3", title: "Prefix Sum & Kadane's Algorithm", duration: "45 min" },
          { id: "dsa-2-4", title: "Matrix Traversal & Rotation", duration: "40 min" },
        ],
      },
      {
        id: "dsa-m3",
        moduleNumber: 3,
        title: "Linked Lists",
        topics: [
          { id: "dsa-3-1", title: "Singly & Doubly Linked List Fundamentals", duration: "35 min" },
          { id: "dsa-3-2", title: "Fast & Slow Pointers (Floyd's Cycle Finding)", duration: "45 min" },
          { id: "dsa-3-3", title: "Reversal & In-Place Reordering", duration: "50 min" },
        ],
      },
      {
        id: "dsa-m4",
        moduleNumber: 4,
        title: "Stacks & Queues",
        topics: [
          { id: "dsa-4-1", title: "Stack Implementation & Parentheses Validation", duration: "35 min" },
          { id: "dsa-4-2", title: "Monotonic Stack Pattern (Next Greater Element)", duration: "60 min" },
          { id: "dsa-4-3", title: "Circular Queues & Deque", duration: "40 min" },
        ],
      },
      {
        id: "dsa-m5",
        moduleNumber: 5,
        title: "Searching & Sorting",
        topics: [
          { id: "dsa-5-1", title: "Binary Search on Value Space", duration: "60 min" },
          { id: "dsa-5-2", title: "Merge Sort & Quick Sort Mechanics", duration: "55 min" },
          { id: "dsa-5-3", title: "Custom Comparators and Stable Sorting", duration: "35 min" },
        ],
      },
      {
        id: "dsa-m6",
        moduleNumber: 6,
        title: "Binary Trees & BSTs",
        topics: [
          { id: "dsa-6-1", title: "Tree Traversals (Pre, In, Post, Level-order)", duration: "50 min" },
          { id: "dsa-6-2", title: "Height, Diameter, and Path Sum Algorithms", duration: "55 min" },
          { id: "dsa-6-3", title: "Binary Search Tree Search, Insertion & Deletion", duration: "60 min" },
          { id: "dsa-6-4", title: "Lowest Common Ancestor (LCA)", duration: "45 min" },
        ],
      },
      {
        id: "dsa-m7",
        moduleNumber: 7,
        title: "Heaps & Priority Queues",
        topics: [
          { id: "dsa-7-1", title: "Min-Heap and Max-Heap Implementation", duration: "45 min" },
          { id: "dsa-7-2", title: "Top K Elements & Median in a Stream", duration: "55 min" },
        ],
      },
      {
        id: "dsa-m8",
        moduleNumber: 8,
        title: "Graphs & Disjoint Set Union",
        topics: [
          { id: "dsa-8-1", title: "Graph Representations & BFS/DFS Traversals", duration: "60 min" },
          { id: "dsa-8-2", title: "Cycle Detection in Directed and Undirected Graphs", duration: "50 min" },
          { id: "dsa-8-3", title: "Topological Sort (Kahn's Algorithm)", duration: "50 min" },
          { id: "dsa-8-4", title: "Shortest Path (Dijkstra, Bellman-Ford)", duration: "65 min" },
          { id: "dsa-8-5", title: "Disjoint Set Union (DSU) & Kruskal's MST", duration: "60 min" },
        ],
      },
      {
        id: "dsa-m9",
        moduleNumber: 9,
        title: "Recursion & Backtracking",
        topics: [
          { id: "dsa-9-1", title: "Subsets, Combinations, and Permutations", duration: "55 min" },
          { id: "dsa-9-2", title: "N-Queens and Sudoku Solver", duration: "60 min" },
        ],
      },
      {
        id: "dsa-m10",
        moduleNumber: 10,
        title: "Dynamic Programming",
        topics: [
          { id: "dsa-10-1", title: "1D DP: Climbing Stairs & House Robber", duration: "50 min" },
          { id: "dsa-10-2", title: "2D Grid DP & Unique Paths", duration: "55 min" },
          { id: "dsa-10-3", title: "Knapsack Variations (0/1 and Unbounded)", duration: "65 min" },
          { id: "dsa-10-4", title: "Longest Common Subsequence (LCS) & LIS", duration: "65 min" },
        ],
      },
      {
        id: "dsa-m11",
        moduleNumber: 11,
        title: "Tries & Advanced Data Structures",
        topics: [
          { id: "dsa-11-1", title: "Trie Insertion, Search, and Prefix Matching", duration: "45 min" },
          { id: "dsa-11-2", title: "Segment Tree & Fenwick Tree Basics", duration: "60 min" },
        ],
      },
      {
        id: "dsa-m12",
        moduleNumber: 12,
        title: "Interview Pattern Synthesis",
        topics: [
          { id: "dsa-12-1", title: "Recognizing Patterns under Time Pressure", duration: "45 min" },
          { id: "dsa-12-2", title: "Writing Clean Production Code on Whiteboards", duration: "40 min" },
        ],
      },
    ],
  },

  // DATABASE MANAGEMENT SYSTEMS
  dbms: {
    slug: "dbms",
    title: "Database Management Systems",
    subtitle:
      "Master relational algebra, SQL optimization, ACID transactions, and storage indexing.",
    trackId: "core-cs",
    trackLabel: "Core CS",
    estimatedDuration: "30 hours",
    totalModules: 8,
    totalTopics: 32,
    quizzesCount: 8,
    about: {
      overview:
        "Understand how enterprise database engines persist, index, and retrieve data safely while serving thousands of concurrent transactions.",
      whyItMatters:
        "Data persistence is central to every backend system. Incorrect transaction handling or poor schema normalization leads to catastrophic data corruption and downtime.",
      organization:
        "Relational model -> Advanced SQL -> Normalization -> Storage & Indexing -> Transaction Processing -> Distributed Data.",
      whatYoullLearn: [
        "Entity-Relationship diagrams and relational schema mapping.",
        "Window functions, recursive CTEs, and query explain-plan analysis.",
        "1NF, 2NF, 3NF, and BCNF normalization anomalies.",
        "B+ Tree index mechanics, hash indexes, and covering indexes.",
        "ACID properties, serializability, Two-Phase Locking (2PL), and MVCC.",
      ],
      practicalRelevance:
        "Core requirement for backend engineering roles, database administrator positions, and systems architectural reviews.",
    },
    prerequisites: [
      "Basic understanding of set theory.",
      "Comfort with executing simple SQL SELECT queries.",
    ],
    learningObjectives: [
      "Design normalized relational schemas free from redundancy anomalies.",
      "Tune slow SQL queries using index selectivity and execution plan analysis.",
      "Choose appropriate transaction isolation levels for mission-critical workflows.",
    ],
    suggestedStudyOrder:
      "Focus deeply on Normalization (Module 3), Indexing (Module 5), and Transactions (Module 6).",
    faqs: [
      {
        question: "Is this course relevant for PostgreSQL or MySQL?",
        answer:
          "Yes. The architectural concepts (B+ Trees, WAL, MVCC, ACID) apply across all major relational database engines.",
      },
    ],
    modules: [
      {
        id: "dbms-m1",
        moduleNumber: 1,
        title: "Introduction to Databases & Architecture",
        topics: [
          { id: "dbms-1-1", title: "File Systems vs DBMS", duration: "30 min" },
          { id: "dbms-1-2", title: "Three-Schema Architecture & Data Independence", duration: "35 min" },
          { id: "dbms-1-3", title: "Relational Model & Integrity Constraints", duration: "40 min" },
        ],
      },
      {
        id: "dbms-m2",
        moduleNumber: 2,
        title: "Relational Algebra & Advanced SQL",
        topics: [
          { id: "dbms-2-1", title: "Relational Algebra Operations", duration: "45 min" },
          { id: "dbms-2-2", title: "Complex Joins, Group By, Having, and Subqueries", duration: "50 min" },
          { id: "dbms-2-3", title: "Window Functions & Common Table Expressions (CTEs)", duration: "55 min" },
        ],
      },
      {
        id: "dbms-m3",
        moduleNumber: 3,
        title: "Database Design & Normalization",
        topics: [
          { id: "dbms-3-1", title: "Functional Dependencies & Attribute Closure", duration: "45 min" },
          { id: "dbms-3-2", title: "1NF, 2NF, and 3NF Normal Forms", duration: "50 min" },
          { id: "dbms-3-3", title: "Boyce-Codd Normal Form (BCNF)", duration: "45 min" },
          { id: "dbms-3-4", title: "Lossless Join & Dependency Preservation", duration: "40 min" },
        ],
      },
      {
        id: "dbms-m4",
        moduleNumber: 4,
        title: "Storage Engine & Buffer Management",
        topics: [
          { id: "dbms-4-1", title: "Page Storage, Slotted Pages & Tuple Layout", duration: "40 min" },
          { id: "dbms-4-2", title: "Buffer Pool Manager & Eviction Strategies", duration: "45 min" },
        ],
      },
      {
        id: "dbms-m5",
        moduleNumber: 5,
        title: "Indexing & Hashing",
        topics: [
          { id: "dbms-5-1", title: "Primary, Secondary, and Clustered Indexes", duration: "45 min" },
          { id: "dbms-5-2", title: "B+ Tree Index Structures and Operations", duration: "60 min" },
          { id: "dbms-5-3", title: "Composite Indexes & Index Scan Types", duration: "50 min" },
        ],
      },
      {
        id: "dbms-m6",
        moduleNumber: 6,
        title: "Transactions & Concurrency Control",
        topics: [
          { id: "dbms-6-1", title: "ACID Properties & Transaction States", duration: "40 min" },
          { id: "dbms-6-2", title: "Conflict Serializability & View Serializability", duration: "50 min" },
          { id: "dbms-6-3", title: "Two-Phase Locking (2PL) Protocol", duration: "45 min" },
          { id: "dbms-6-4", title: "Deadlock Detection & Prevention", duration: "40 min" },
          { id: "dbms-6-5", title: "Multi-Version Concurrency Control (MVCC)", duration: "55 min" },
        ],
      },
      {
        id: "dbms-m7",
        moduleNumber: 7,
        title: "Crash Recovery & Logging",
        topics: [
          { id: "dbms-7-1", title: "Write-Ahead Logging (WAL)", duration: "40 min" },
          { id: "dbms-7-2", title: "ARIES Recovery Algorithm & Checkpointing", duration: "50 min" },
        ],
      },
      {
        id: "dbms-m8",
        moduleNumber: 8,
        title: "Distributed Data & NoSQL",
        topics: [
          { id: "dbms-8-1", title: "Replication, Sharding & Partitioning", duration: "45 min" },
          { id: "dbms-8-2", title: "Relational vs Document vs Key-Value Databases", duration: "40 min" },
        ],
      },
    ],
  },

  // OPERATING SYSTEMS
  os: {
    slug: "os",
    title: "Operating Systems",
    subtitle:
      "Explore processes, threads, virtual memory, CPU scheduling, and file systems.",
    trackId: "core-cs",
    trackLabel: "Core CS",
    estimatedDuration: "32 hours",
    totalModules: 8,
    totalTopics: 34,
    quizzesCount: 8,
    about: {
      overview:
        "Understand how the kernel abstracts hardware resources into processes, memory spaces, and storage streams.",
      whyItMatters:
        "Concurrency, race conditions, memory leaks, and CPU throttling can only be properly diagnosed with a firm mental model of the OS kernel.",
      organization:
        "Hardware abstraction -> Process lifecycle -> Scheduling -> Synchronization -> Memory -> Storage -> I/O.",
      whatYoullLearn: [
        "Kernel space vs user space, system calls, and interrupt handlers.",
        "Process control blocks (PCB), context switching, and thread models.",
        "Semaphores, mutexes, condition variables, and reader-writer problems.",
        "Paging, segmentation, TLB caching, and page replacement policies.",
        "File system inodes, disk scheduling algorithms, and directory structures.",
      ],
      practicalRelevance:
        "Standard interview domain for systems programming, distributed systems, and backend infrastructure.",
    },
    prerequisites: ["Basic understanding of computer architecture and assembly concepts."],
    learningObjectives: [
      "Explain the exact mechanics of a context switch and system call.",
      "Solve concurrency problems using mutex locks and semaphores without deadlocks.",
      "Calculate virtual address translation using page tables and TLBs.",
    ],
    suggestedStudyOrder: "Follow Process Management through Memory Management sequentially.",
    modules: [
      {
        id: "os-m1",
        moduleNumber: 1,
        title: "OS Architecture & System Calls",
        topics: [
          { id: "os-1-1", title: "Functions of an Operating System", duration: "30 min" },
          { id: "os-1-2", title: "User Mode vs Kernel Mode & Dual-Mode Operation", duration: "35 min" },
          { id: "os-1-3", title: "System Calls & Interrupt Handling", duration: "45 min" },
        ],
      },
      {
        id: "os-m2",
        moduleNumber: 2,
        title: "Process & Thread Management",
        topics: [
          { id: "os-2-1", title: "Process States and Process Control Block (PCB)", duration: "40 min" },
          { id: "os-2-2", title: "Process Creation: fork(), exec(), wait()", duration: "45 min" },
          { id: "os-2-3", title: "Threads vs Processes & Threading Models", duration: "40 min" },
          { id: "os-2-4", title: "Context Switching Overhead & CPU Utilization", duration: "35 min" },
        ],
      },
      {
        id: "os-m3",
        moduleNumber: 3,
        title: "CPU Scheduling Algorithms",
        topics: [
          { id: "os-3-1", title: "Scheduling Criteria (Arrival, Burst, Turnaround, Waiting)", duration: "35 min" },
          { id: "os-3-2", title: "FCFS, SJF, and SRTF Scheduling", duration: "45 min" },
          { id: "os-3-3", title: "Round Robin & Priority Scheduling", duration: "50 min" },
          { id: "os-3-4", title: "Multi-Level Queue & Feedback Queue Scheduling", duration: "45 min" },
        ],
      },
      {
        id: "os-m4",
        moduleNumber: 4,
        title: "Process Synchronization & Concurrency",
        topics: [
          { id: "os-4-1", title: "Race Conditions & The Critical Section Problem", duration: "40 min" },
          { id: "os-4-2", title: "Peterson's Solution & Hardware Instructions (TAS, CAS)", duration: "45 min" },
          { id: "os-4-3", title: "Mutex Locks and Semaphores (Binary vs Counting)", duration: "50 min" },
          { id: "os-4-4", title: "Classic Problems: Producer-Consumer & Dining Philosophers", duration: "55 min" },
        ],
      },
      {
        id: "os-m5",
        moduleNumber: 5,
        title: "Deadlocks",
        topics: [
          { id: "os-5-1", title: "Four Necessary Conditions for Deadlock", duration: "35 min" },
          { id: "os-5-2", title: "Resource Allocation Graphs (RAG)", duration: "40 min" },
          { id: "os-5-3", title: "Banker's Algorithm for Deadlock Avoidance", duration: "55 min" },
          { id: "os-5-4", title: "Deadlock Detection and Recovery Strategies", duration: "40 min" },
        ],
      },
      {
        id: "os-m6",
        moduleNumber: 6,
        title: "Memory Management & Paging",
        topics: [
          { id: "os-6-1", title: "Logical vs Physical Address Space", duration: "35 min" },
          { id: "os-6-2", title: "Contiguous Allocation & Fragmentation (Internal vs External)", duration: "40 min" },
          { id: "os-6-3", title: "Paging Concept & Page Table Architecture", duration: "50 min" },
          { id: "os-6-4", title: "Translation Lookaside Buffer (TLB) Mechanics", duration: "45 min" },
        ],
      },
      {
        id: "os-m7",
        moduleNumber: 7,
        title: "Virtual Memory",
        topics: [
          { id: "os-7-1", title: "Demand Paging & Page Fault Handling", duration: "45 min" },
          { id: "os-7-2", title: "Page Replacement Algorithms (FIFO, Optimal, LRU)", duration: "55 min" },
          { id: "os-7-3", title: "Thrashing & Working Set Model", duration: "40 min" },
        ],
      },
      {
        id: "os-m8",
        moduleNumber: 8,
        title: "File Systems & Storage",
        topics: [
          { id: "os-8-1", title: "File Concept, Inodes, and Directory Structures", duration: "40 min" },
          { id: "os-8-2", title: "Disk Scheduling (SSTF, SCAN, C-SCAN)", duration: "45 min" },
        ],
      },
    ],
  },

  // OBJECT-ORIENTED PROGRAMMING
  oops: {
    slug: "oops",
    title: "Object-Oriented Programming",
    subtitle:
      "Grasp polymorphism, encapsulation, inheritance, SOLID design principles, and design patterns.",
    trackId: "core-cs",
    trackLabel: "Core CS",
    estimatedDuration: "20 hours",
    totalModules: 6,
    totalTopics: 24,
    quizzesCount: 6,
    about: {
      overview:
        "Master object-oriented design and design patterns to write scalable, maintainable, and loosely coupled enterprise software.",
      whyItMatters:
        "Writing scalable software in teams requires disciplined abstraction, modular interfaces, and clean separation of concerns.",
      organization:
        "Core Pillars -> SOLID Principles -> Creational Patterns -> Structural Patterns -> Behavioral Patterns.",
      whatYoullLearn: [
        "Encapsulation, Data Hiding, and Abstraction barriers.",
        "Inheritance vs Composition tradeoffs.",
        "Compile-time vs Run-time polymorphism (Virtual Tables).",
        "Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion.",
        "Key GoF patterns: Factory, Singleton, Strategy, Observer, Decorator.",
      ],
      practicalRelevance:
        "Crucial for low-level design (LLD) interviews and day-to-day software engineering craftsmanship.",
    },
    prerequisites: ["Basic programming knowledge in any OOP language."],
    learningObjectives: [
      "Design classes that follow SOLID principles without over-engineering.",
      "Select appropriate design patterns for real-world software design problems.",
    ],
    suggestedStudyOrder: "Follow Modules 1 through 6 sequentially.",
    modules: [
      {
        id: "oops-m1",
        moduleNumber: 1,
        title: "Core Pillars of OOP",
        topics: [
          { id: "oops-1-1", title: "Encapsulation & Access Modifiers", duration: "35 min" },
          { id: "oops-1-2", title: "Abstraction & Interface Contracts", duration: "40 min" },
          { id: "oops-1-3", title: "Inheritance Types & Diamond Problem", duration: "40 min" },
          { id: "oops-1-4", title: "Polymorphism: Overloading vs Overriding", duration: "45 min" },
        ],
      },
      {
        id: "oops-m2",
        moduleNumber: 2,
        title: "Object Lifecycle & Memory",
        topics: [
          { id: "oops-2-1", title: "Constructors, Destructors, and Deep vs Shallow Copy", duration: "40 min" },
          { id: "oops-2-2", title: "Virtual Functions, VTables, and Dynamic Dispatch", duration: "50 min" },
        ],
      },
      {
        id: "oops-m3",
        moduleNumber: 3,
        title: "SOLID Principles in Practice",
        topics: [
          { id: "oops-3-1", title: "Single Responsibility Principle (SRP)", duration: "35 min" },
          { id: "oops-3-2", title: "Open/Closed Principle (OCP)", duration: "35 min" },
          { id: "oops-3-3", title: "Liskov Substitution Principle (LSP)", duration: "40 min" },
          { id: "oops-3-4", title: "Interface Segregation Principle (ISP)", duration: "35 min" },
          { id: "oops-3-5", title: "Dependency Inversion Principle (DIP)", duration: "40 min" },
        ],
      },
      {
        id: "oops-m4",
        moduleNumber: 4,
        title: "Creational Design Patterns",
        topics: [
          { id: "oops-4-1", title: "Singleton Pattern (Thread-safe approaches)", duration: "40 min" },
          { id: "oops-4-2", title: "Factory Method & Abstract Factory", duration: "50 min" },
          { id: "oops-4-3", title: "Builder Pattern", duration: "40 min" },
        ],
      },
      {
        id: "oops-m5",
        moduleNumber: 5,
        title: "Structural Design Patterns",
        topics: [
          { id: "oops-5-1", title: "Adapter Pattern", duration: "35 min" },
          { id: "oops-5-2", title: "Decorator Pattern", duration: "45 min" },
          { id: "oops-5-3", title: "Facade & Proxy Patterns", duration: "40 min" },
        ],
      },
      {
        id: "oops-m6",
        moduleNumber: 6,
        title: "Behavioral Design Patterns",
        topics: [
          { id: "oops-6-1", title: "Strategy Pattern", duration: "40 min" },
          { id: "oops-6-2", title: "Observer Pattern (Pub/Sub foundations)", duration: "45 min" },
          { id: "oops-6-3", title: "Command & State Patterns", duration: "45 min" },
        ],
      },
    ],
  },

  // SYSTEM DESIGN
  "system-design": {
    slug: "system-design",
    title: "System Design Fundamentals",
    subtitle:
      "Learn to architect scalable, reliable, and high-performance distributed systems.",
    trackId: "system-design",
    trackLabel: "System Design",
    estimatedDuration: "45 hours",
    totalModules: 9,
    totalTopics: 36,
    quizzesCount: 9,
    about: {
      overview:
        "From capacity estimation to distributed consensus: design systems that gracefully scale to millions of concurrent users.",
      whyItMatters:
        "High-level system design is the defining interview format for mid-level and senior software engineering positions.",
      organization:
        "Core building blocks -> Data modeling & Caching -> Scaling & Partitioning -> Asynchronous processing -> Complete case studies.",
      whatYoullLearn: [
        "Back-of-the-envelope estimation for throughput, storage, and bandwidth.",
        "Horizontal vs Vertical scaling, Load Balancers, and DNS routing.",
        "Caching strategies (Cache-Aside, Write-Through, Write-Behind, Eviction policies).",
        "Consistent hashing and database partitioning techniques.",
        "Message queues (Kafka, RabbitMQ) and event-driven architectures.",
      ],
      practicalRelevance: "Essential for senior backend roles and technical architectural design.",
    },
    prerequisites: ["Solid knowledge of networks, databases, and client-server architectures."],
    learningObjectives: [
      "Perform fast back-of-the-envelope capacity calculations under interview constraints.",
      "Identify single points of failure (SPOF) and design high-availability failovers.",
    ],
    suggestedStudyOrder: "Complete building block modules before reviewing end-to-end case studies.",
    modules: [
      {
        id: "sd-m1",
        moduleNumber: 1,
        title: "System Design Foundations & Estimations",
        topics: [
          { id: "sd-1-1", title: "Back-of-the-Envelope Math & Latency Numbers", duration: "45 min" },
          { id: "sd-1-2", title: "Vertical vs Horizontal Scaling Trade-offs", duration: "35 min" },
          { id: "sd-1-3", title: "Availability, Reliability, and SLO/SLA Targets", duration: "40 min" },
        ],
      },
      {
        id: "sd-m2",
        moduleNumber: 2,
        title: "Networking & Load Balancing",
        topics: [
          { id: "sd-2-1", title: "L4 vs L7 Load Balancers & Algorithms", duration: "45 min" },
          { id: "sd-2-2", title: "Forward Proxy vs Reverse Proxy", duration: "35 min" },
          { id: "sd-2-3", title: "DNS Geolocation and Anycast Routing", duration: "40 min" },
        ],
      },
      {
        id: "sd-m3",
        moduleNumber: 3,
        title: "Caching Strategies",
        topics: [
          { id: "sd-3-1", title: "Client, CDN, Application, and Database Caches", duration: "45 min" },
          { id: "sd-3-2", title: "Cache-Aside, Read-Through, Write-Through, Write-Back", duration: "50 min" },
          { id: "sd-3-3", title: "Cache Eviction: LRU, LFU, and FIFO", duration: "40 min" },
          { id: "sd-3-4", title: "Cache Invalidation, Stampede, and Thundering Herd", duration: "45 min" },
        ],
      },
      {
        id: "sd-m4",
        moduleNumber: 4,
        title: "Database Scaling & Partitioning",
        topics: [
          { id: "sd-4-1", title: "Database Replication (Primary-Replica, Multi-Primary)", duration: "45 min" },
          { id: "sd-4-2", title: "Horizontal Sharding & Partition Keys", duration: "50 min" },
          { id: "sd-4-3", title: "Consistent Hashing Algorithm", duration: "55 min" },
          { id: "sd-4-4", title: "CAP Theorem & PACELC Theorem Applied", duration: "45 min" },
        ],
      },
      {
        id: "sd-m5",
        moduleNumber: 5,
        title: "Message Queues & Event Streaming",
        topics: [
          { id: "sd-5-1", title: "Point-to-Point Queues vs Publish/Subscribe", duration: "40 min" },
          { id: "sd-5-2", title: "Log-based Brokers (Kafka) vs Task Queues (RabbitMQ)", duration: "50 min" },
          { id: "sd-5-3", title: "At-least-once, At-most-once, and Exactly-once Delivery", duration: "45 min" },
        ],
      },
      {
        id: "sd-m6",
        moduleNumber: 6,
        title: "Distributed Data & Consensus",
        topics: [
          { id: "sd-6-1", title: "Distributed ID Generation (Snowflake)", duration: "45 min" },
          { id: "sd-6-2", title: "Two-Phase Commit (2PC) & Saga Pattern", duration: "50 min" },
          { id: "sd-6-3", title: "Distributed Consensus: Raft & Paxos Overview", duration: "55 min" },
        ],
      },
      {
        id: "sd-m7",
        moduleNumber: 7,
        title: "Fault Tolerance & Observability",
        topics: [
          { id: "sd-7-1", title: "Rate Limiting Algorithms (Token Bucket, Leaky Bucket)", duration: "45 min" },
          { id: "sd-7-2", title: "Circuit Breaker Pattern & Bulkheading", duration: "40 min" },
          { id: "sd-7-3", title: "Distributed Tracing, Metrics, and Logging", duration: "40 min" },
        ],
      },
      {
        id: "sd-m8",
        moduleNumber: 8,
        title: "System Design Case Studies (Part 1)",
        topics: [
          { id: "sd-8-1", title: "Design a URL Shortener (TinyURL)", duration: "55 min" },
          { id: "sd-8-2", title: "Design a Rate Limiter", duration: "50 min" },
          { id: "sd-8-3", title: "Design a Notification System", duration: "55 min" },
        ],
      },
      {
        id: "sd-m9",
        moduleNumber: 9,
        title: "System Design Case Studies (Part 2)",
        topics: [
          { id: "sd-9-1", title: "Design a News Feed System", duration: "60 min" },
          { id: "sd-9-2", title: "Design a Distributed Chat App", duration: "60 min" },
        ],
      },
    ],
  },

  // DATA ENGINEERING
  "data-engineering": {
    slug: "data-engineering",
    title: "Data Engineering Foundations",
    subtitle:
      "Build robust batch and stream data pipelines, storage formats, and orchestrations.",
    trackId: "data-engineering",
    trackLabel: "Data Engineering",
    estimatedDuration: "40 hours",
    totalModules: 7,
    totalTopics: 28,
    quizzesCount: 7,
    about: {
      overview:
        "Learn how modern data systems ingest, transform, and store petabytes of data for analytics and machine learning.",
      whyItMatters:
        "Reliable data pipelines are the foundation of modern data science, business intelligence, and ML infrastructure.",
      organization:
        "Data modeling -> Storage formats -> Distributed compute -> Streaming -> Orchestration -> Quality.",
      whatYoullLearn: [
        "Dimensional modeling: Star schema vs Snowflake schema.",
        "Columnar file formats (Parquet, ORC) vs row formats (Avro).",
        "Distributed data processing concepts with Apache Spark.",
        "Stream processing with Apache Kafka and Flink.",
        "DAG orchestration with Airflow and data transformation with dbt.",
      ],
      practicalRelevance: "Targeted at data platform engineers and analytics engineers.",
    },
    prerequisites: ["Proficiency in SQL and intermediate Python."],
    learningObjectives: [
      "Design dimensional models optimized for analytical queries.",
      "Build idempotent ETL/ELT pipelines with automated quality assertions.",
    ],
    suggestedStudyOrder: "Follow Modules 1 through 7.",
    modules: [
      {
        id: "de-m1",
        moduleNumber: 1,
        title: "Data Modeling for Analytics",
        topics: [
          { id: "de-1-1", title: "OLTP vs OLAP Architecture", duration: "35 min" },
          { id: "de-1-2", title: "Dimensional Modeling: Star & Snowflake Schemas", duration: "45 min" },
          { id: "de-1-3", title: "Slowly Changing Dimensions (SCD Types 1, 2, 3)", duration: "40 min" },
        ],
      },
      {
        id: "de-m2",
        moduleNumber: 2,
        title: "File Formats & Storage Architecture",
        topics: [
          { id: "de-2-1", title: "Row-oriented vs Columnar Formats (CSV vs Parquet)", duration: "40 min" },
          { id: "de-2-2", title: "Data Lakes vs Data Warehouses vs Lakehouses", duration: "45 min" },
          { id: "de-2-3", title: "Table Formats (Delta Lake, Apache Iceberg)", duration: "45 min" },
        ],
      },
      {
        id: "de-m3",
        moduleNumber: 3,
        title: "Distributed Compute with Spark",
        topics: [
          { id: "de-3-1", title: "Apache Spark Architecture (Driver, Executors, Tasks)", duration: "45 min" },
          { id: "de-3-2", title: "Spark Transformations vs Actions (Narrow vs Wide)", duration: "50 min" },
          { id: "de-3-3", title: "Dataframe Optimization & Shuffle Partitions", duration: "50 min" },
        ],
      },
      {
        id: "de-m4",
        moduleNumber: 4,
        title: "Streaming Systems",
        topics: [
          { id: "de-4-1", title: "Batch Processing vs Real-Time Streaming", duration: "35 min" },
          { id: "de-4-2", title: "Event Time, Processing Time, and Watermarks", duration: "45 min" },
          { id: "de-4-3", title: "Windowing Strategies (Tumbling, Sliding, Session)", duration: "40 min" },
        ],
      },
      {
        id: "de-m5",
        moduleNumber: 5,
        title: "Workflow Orchestration",
        topics: [
          { id: "de-5-1", title: "DAG Foundations and Idempotency in Pipelines", duration: "40 min" },
          { id: "de-5-2", title: "Orchestration with Apache Airflow", duration: "50 min" },
        ],
      },
      {
        id: "de-m6",
        moduleNumber: 6,
        title: "Transformation & Modeling with dbt",
        topics: [
          { id: "de-6-1", title: "ELT Paradigm and In-Warehouse Transforms", duration: "40 min" },
          { id: "de-6-2", title: "dbt Models, Tests, and Documentation", duration: "45 min" },
        ],
      },
      {
        id: "de-m7",
        moduleNumber: 7,
        title: "Data Quality & Observability",
        topics: [
          { id: "de-7-1", title: "Schema Drift Detection & Data Contracts", duration: "40 min" },
          { id: "de-7-2", title: "Monitoring Data Freshness and Lineage", duration: "40 min" },
        ],
      },
    ],
  },

  // WEB DEVELOPMENT & DESIGN
  "web-dev": {
    slug: "web-dev",
    title: "Web Development & Design",
    subtitle:
      "Master semantic HTML, responsive modern CSS, core JavaScript, and accessible UI systems.",
    trackId: "web-design",
    trackLabel: "Web Design",
    estimatedDuration: "35 hours",
    totalModules: 8,
    totalTopics: 32,
    quizzesCount: 8,
    about: {
      overview:
        "Learn the technical foundations of modern frontend web engineering: clean DOM structures, robust CSS layouts, event-driven JavaScript, and accessible design systems.",
      whyItMatters:
        "Great web experiences require precise control over layout, responsiveness, accessibility, and web performance.",
      organization:
        "Semantic HTML -> CSS Layouts -> Responsive Design -> Modern JavaScript -> UI Systems & Accessibility.",
      whatYoullLearn: [
        "Semantic HTML5 tags and accessible document outline hierarchy.",
        "CSS Flexbox, CSS Grid, and modern container queries.",
        "Color systems, typography scaling, and design tokens.",
        "JavaScript event loop, microtasks, promises, and DOM manipulation.",
        "WCAG accessibility guidelines, keyboard navigation, and ARIA attributes.",
      ],
      practicalRelevance: "Essential foundation for modern frontend and full-stack software engineers.",
    },
    prerequisites: ["No prior experience required; starts from absolute basics."],
    learningObjectives: [
      "Construct responsive layouts that adapt seamlessly from mobile to ultrawide screens.",
      "Audit and enforce WCAG 2.1 AA accessibility standards.",
    ],
    suggestedStudyOrder: "Follow Modules 1 through 8 sequentially.",
    modules: [
      {
        id: "wd-m1",
        moduleNumber: 1,
        title: "Semantic HTML Fundamentals",
        topics: [
          { id: "wd-1-1", title: "Document Structure, DOCTYPE & Meta Viewport", duration: "25 min" },
          { id: "wd-1-2", title: "Semantic Tags (header, nav, main, section, footer)", duration: "35 min" },
          { id: "wd-1-3", title: "Accessible Forms, Inputs, and Labels", duration: "40 min" },
        ],
      },
      {
        id: "wd-m2",
        moduleNumber: 2,
        title: "CSS Foundations & The Box Model",
        topics: [
          { id: "wd-2-1", title: "CSS Box Model (Content, Padding, Border, Margin)", duration: "35 min" },
          { id: "wd-2-2", title: "Box-Sizing: border-box and Overflow Mechanics", duration: "30 min" },
          { id: "wd-2-3", title: "Specificity, Cascade & Inheritance", duration: "40 min" },
        ],
      },
      {
        id: "wd-m3",
        moduleNumber: 3,
        title: "Modern Layouts with Flexbox & Grid",
        topics: [
          { id: "wd-3-1", title: "Flexbox: Main Axis, Cross Axis, and Alignment", duration: "45 min" },
          { id: "wd-3-2", title: "CSS Grid: Tracks, Areas, and minmax()", duration: "50 min" },
          { id: "wd-3-3", title: "Combining Flexbox and Grid for Enterprise Shells", duration: "45 min" },
        ],
      },
      {
        id: "wd-m4",
        moduleNumber: 4,
        title: "Responsive Web Design & Units",
        topics: [
          { id: "wd-4-1", title: "Fluid Typography, rem, em, and Viewport Units", duration: "35 min" },
          { id: "wd-4-2", title: "Media Queries & Mobile-First Design Principles", duration: "40 min" },
          { id: "wd-4-3", title: "Container Queries for Modular Components", duration: "40 min" },
        ],
      },
      {
        id: "wd-m5",
        moduleNumber: 5,
        title: "JavaScript Core Foundations",
        topics: [
          { id: "wd-5-1", title: "Variables, Scope, Closures, and Hoisting", duration: "45 min" },
          { id: "wd-5-2", title: "Asynchronous JavaScript (Promises & async/await)", duration: "50 min" },
          { id: "wd-5-3", title: "DOM Manipulation & Event Bubbling/Delegation", duration: "45 min" },
        ],
      },
      {
        id: "wd-m6",
        moduleNumber: 6,
        title: "UI Design Principles & Typography",
        topics: [
          { id: "wd-6-1", title: "Visual Hierarchy, Spacing Systems & 4px Grid", duration: "35 min" },
          { id: "wd-6-2", title: "Harmonious Color Palettes & OKLCH Color Space", duration: "40 min" },
        ],
      },
      {
        id: "wd-m7",
        moduleNumber: 7,
        title: "Web Accessibility (a11y)",
        topics: [
          { id: "wd-7-1", title: "WCAG Principles & Color Contrast Ratios", duration: "35 min" },
          { id: "wd-7-2", title: "Keyboard Navigation, Focus Rings & Tabindex", duration: "40 min" },
          { id: "wd-7-3", title: "ARIA Roles, States, and Live Regions", duration: "45 min" },
        ],
      },
      {
        id: "wd-m8",
        moduleNumber: 8,
        title: "Design Systems & Components",
        topics: [
          { id: "wd-8-1", title: "Token Systems (Colors, Spacing, Radius)", duration: "35 min" },
          { id: "wd-8-2", title: "Reusable Component Architecture & State Machine", duration: "45 min" },
        ],
      },
    ],
  },
};

export function getCurriculumBySlug(slug: string): CurriculumDetail | undefined {
  return CURRICULA[slug];
}
