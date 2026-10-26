import { PracticeProblem } from "../types";

export const SAMPLE_PRACTICE_PROBLEMS: PracticeProblem[] = [
  // DSA
  {
    id: "prob-1",
    title: "Two Sum",
    category: "DSA",
    subjectSlug: "dsa",
    difficulty: "Easy",
    acceptanceRate: "49.5%",
    tags: ["Array", "Hash Table"],
    starterNote: "Classic two-pointer or hash-map lookup problem.",
    mcqQuestions: [
      {
        id: "prob-1-q1",
        topic: "Array",
        prompt:
          "What is the time complexity of finding two numbers that sum to a target using a hash map (single pass)?",
        options: [
          { id: "a", text: "O(n²)" },
          { id: "b", text: "O(n log n)" },
          { id: "c", text: "O(n)" },
          { id: "d", text: "O(1)" },
        ],
        correctOptionId: "c",
        explanation:
          "A single-pass hash map solution visits each element once and performs O(1) lookup/insertion per element, giving O(n) overall time complexity.",
      },
      {
        id: "prob-1-q2",
        topic: "Hash Table",
        prompt:
          "In the Two Sum hash map approach, what is stored as the key and value respectively?",
        options: [
          { id: "a", text: "Index as key, element value as value" },
          { id: "b", text: "Element value as key, index as value" },
          { id: "c", text: "Both element values" },
          { id: "d", text: "Both indices" },
        ],
        correctOptionId: "b",
        explanation:
          "We store each element's value as the key and its index as the value so we can quickly look up whether the complement (target − current) exists and retrieve its index.",
      },
    ],
  },
  {
    id: "prob-2",
    title: "Longest Substring Without Repeating Characters",
    category: "DSA",
    subjectSlug: "dsa",
    difficulty: "Medium",
    acceptanceRate: "34.1%",
    tags: ["String", "Sliding Window"],
    starterNote: "Variable-length sliding window with set/map tracking.",
    mcqQuestions: [
      {
        id: "prob-2-q1",
        topic: "Sliding Window",
        prompt: "Which data structure best supports O(1) character existence checks in the current sliding window?",
        options: [
          { id: "a", text: "Sorted array" },
          { id: "b", text: "Hash Set" },
          { id: "c", text: "Stack" },
          { id: "d", text: "Linked list" },
        ],
        correctOptionId: "b",
        explanation:
          "A Hash Set provides O(1) average-time insertion, deletion, and lookup, making it ideal for tracking characters currently inside the sliding window.",
      },
      {
        id: "prob-2-q2",
        topic: "Sliding Window",
        prompt: "When is the left pointer of the window moved forward?",
        options: [
          { id: "a", text: "Every iteration" },
          { id: "b", text: "When the right pointer reaches the end" },
          { id: "c", text: "When a duplicate character is encountered at the right pointer" },
          { id: "d", text: "When the window size exceeds 10" },
        ],
        correctOptionId: "c",
        explanation:
          "The left pointer advances (shrinking the window from the left) only when the character at the right pointer already exists in the current window, removing the duplicate.",
      },
    ],
  },
  {
    id: "prob-3",
    title: "Trapping Rain Water",
    category: "DSA",
    subjectSlug: "dsa",
    difficulty: "Hard",
    acceptanceRate: "59.2%",
    tags: ["Array", "Two Pointers", "Dynamic Programming"],
    starterNote: "Two pointers elevation boundary tracking.",
    mcqQuestions: [
      {
        id: "prob-3-q1",
        topic: "Two Pointers",
        prompt: "Water trapped above index i is determined by which formula?",
        options: [
          { id: "a", text: "max(leftMax, rightMax) − height[i]" },
          { id: "b", text: "min(leftMax, rightMax) − height[i]" },
          { id: "c", text: "leftMax + rightMax − height[i]" },
          { id: "d", text: "height[i] − min(leftMax, rightMax)" },
        ],
        correctOptionId: "b",
        explanation:
          "Water at index i is bounded by the shorter of the two boundary walls: min(leftMax, rightMax) − height[i]. If this is negative, no water is trapped.",
      },
    ],
  },
  {
    id: "prob-4",
    title: "Reverse Linked List",
    category: "DSA",
    subjectSlug: "dsa",
    difficulty: "Easy",
    acceptanceRate: "74.8%",
    tags: ["Linked List", "Recursion"],
    starterNote: "Iterative 3-pointer pointer manipulation.",
    mcqQuestions: [
      {
        id: "prob-4-q1",
        topic: "Linked List",
        prompt: "How many pointer variables are needed for the iterative reversal of a singly linked list?",
        options: [
          { id: "a", text: "1" },
          { id: "b", text: "2" },
          { id: "c", text: "3" },
          { id: "d", text: "4" },
        ],
        correctOptionId: "c",
        explanation:
          "Three pointers are needed: prev (initially null), curr (starts at head), and next (stores curr.next before overwriting it). This avoids losing the rest of the list while reversing each link.",
      },
      {
        id: "prob-4-q2",
        topic: "Recursion",
        prompt: "What is the base case for the recursive reversal of a linked list?",
        options: [
          { id: "a", text: "node.next == node" },
          { id: "b", text: "node == null || node.next == null" },
          { id: "c", text: "node.val == 0" },
          { id: "d", text: "node.next.next == null" },
        ],
        correctOptionId: "b",
        explanation:
          "The recursion stops when the node is null (empty list) or node.next is null (single node / last node), which becomes the new head of the reversed list.",
      },
    ],
  },
  {
    id: "prob-5",
    title: "Lowest Common Ancestor of a Binary Tree",
    category: "DSA",
    subjectSlug: "dsa",
    difficulty: "Medium",
    acceptanceRate: "60.4%",
    tags: ["Tree", "DFS"],
    starterNote: "Post-order depth-first traversal.",
  },
  {
    id: "prob-6",
    title: "Course Schedule (Topological Sort)",
    category: "DSA",
    subjectSlug: "dsa",
    difficulty: "Medium",
    acceptanceRate: "46.2%",
    tags: ["Graph", "BFS", "Topological Sort"],
    starterNote: "Cycle detection in directed graph using Kahn's algorithm.",
    mcqQuestions: [
      {
        id: "prob-6-q1",
        topic: "Graph",
        prompt: "In Kahn's algorithm for topological sort, nodes are added to the initial queue when their in-degree is:",
        options: [
          { id: "a", text: "Maximum" },
          { id: "b", text: "1" },
          { id: "c", text: "0" },
          { id: "d", text: "Equal to their out-degree" },
        ],
        correctOptionId: "c",
        explanation:
          "Nodes with in-degree 0 have no prerequisites and can be processed first. They are added to the queue initially; as we process each node we decrement the in-degree of its neighbors.",
      },
      {
        id: "prob-6-q2",
        topic: "Topological Sort",
        prompt: "A valid topological ordering of a directed graph exists if and only if the graph is:",
        options: [
          { id: "a", text: "A complete graph" },
          { id: "b", text: "A Directed Acyclic Graph (DAG)" },
          { id: "c", text: "A tree" },
          { id: "d", text: "A bipartite graph" },
        ],
        correctOptionId: "b",
        explanation:
          "Topological ordering is only possible for Directed Acyclic Graphs (DAGs). If a cycle exists, no linear ordering of all vertices is possible.",
      },
    ],
  },

  // Computer Networks
  {
    id: "prob-7",
    title: "Calculate Subnet Range and Broadcast Address",
    category: "Computer Networks",
    subjectSlug: "cn",
    difficulty: "Medium",
    acceptanceRate: "62.0%",
    tags: ["IP Addressing", "Subnetting", "CIDR"],
    starterNote: "Bitwise calculation on IPv4 CIDR blocks.",
    mcqQuestions: [
      {
        id: "prob-7-q1",
        topic: "IP Addressing",
        prompt: "How many usable host addresses are available in a /26 subnet?",
        options: [
          { id: "a", text: "62" },
          { id: "b", text: "64" },
          { id: "c", text: "30" },
          { id: "d", text: "126" },
        ],
        correctOptionId: "a",
        explanation:
          "A /26 subnet has 6 host bits, so 2^6 = 64 total addresses. Subtract 1 for the network address and 1 for the broadcast address → 62 usable host addresses.",
      },
      {
        id: "prob-7-q2",
        topic: "Subnetting",
        prompt: "For the network 192.168.1.0/24, what is the broadcast address?",
        options: [
          { id: "a", text: "192.168.1.0" },
          { id: "b", text: "192.168.1.128" },
          { id: "c", text: "192.168.1.254" },
          { id: "d", text: "192.168.1.255" },
        ],
        correctOptionId: "d",
        explanation:
          "In a /24 network the host portion is 8 bits. Setting all host bits to 1 gives 255 → the broadcast address is 192.168.1.255.",
      },
    ],
  },
  {
    id: "prob-8",
    title: "TCP 3-Way Handshake State Transition Analysis",
    category: "Computer Networks",
    subjectSlug: "cn",
    difficulty: "Easy",
    acceptanceRate: "78.4%",
    tags: ["TCP", "Transport Layer", "State Machine"],
    starterNote: "Trace SYN, SYN-ACK, and ACK sequence numbers.",
    mcqQuestions: [
      {
        id: "prob-8-q1",
        topic: "TCP",
        prompt: "What is the correct order of messages in the TCP 3-way handshake?",
        options: [
          { id: "a", text: "SYN → ACK → SYN-ACK" },
          { id: "b", text: "SYN → SYN-ACK → ACK" },
          { id: "c", text: "ACK → SYN → SYN-ACK" },
          { id: "d", text: "SYN-ACK → SYN → ACK" },
        ],
        correctOptionId: "b",
        explanation:
          "The client sends SYN, the server responds with SYN-ACK, and the client completes with ACK. This establishes the connection and synchronises sequence numbers on both sides.",
      },
      {
        id: "prob-8-q2",
        topic: "Transport Layer",
        prompt: "What is the purpose of the ISN (Initial Sequence Number) in TCP?",
        options: [
          { id: "a", text: "To identify the port number" },
          { id: "b", text: "To prevent old duplicate segments from being mistaken for new ones" },
          { id: "c", text: "To encrypt the payload" },
          { id: "d", text: "To determine maximum segment size" },
        ],
        correctOptionId: "b",
        explanation:
          "A random ISN prevents packets from an old connection being interpreted as part of a new one. It also helps in reliable ordering and detecting out-of-order or duplicate segments.",
      },
    ],
  },
  {
    id: "prob-9",
    title: "Dijkstra Link-State Routing Convergence",
    category: "Computer Networks",
    subjectSlug: "cn",
    difficulty: "Hard",
    acceptanceRate: "41.5%",
    tags: ["Routing", "Algorithms", "OSPF"],
    starterNote: "Shortest path tree computation for autonomous system routing.",
    mcqQuestions: [
      {
        id: "prob-9-q1",
        topic: "Routing",
        prompt: "Which routing protocol uses Dijkstra's link-state algorithm internally?",
        options: [
          { id: "a", text: "RIP (Routing Information Protocol)" },
          { id: "b", text: "BGP (Border Gateway Protocol)" },
          { id: "c", text: "OSPF (Open Shortest Path First)" },
          { id: "d", text: "EIGRP" },
        ],
        correctOptionId: "c",
        explanation:
          "OSPF is a link-state routing protocol that floods topology information to all routers and then each router independently runs Dijkstra's SPF algorithm to compute the shortest-path tree.",
      },
    ],
  },

  // DBMS
  {
    id: "prob-10",
    title: "Find Second Highest Salary (SQL Window Functions)",
    category: "DBMS",
    subjectSlug: "dbms",
    difficulty: "Easy",
    acceptanceRate: "68.3%",
    tags: ["SQL", "DENSE_RANK()", "Subqueries"],
    starterNote: "Ranking query with deduplication handling.",
    mcqQuestions: [
      {
        id: "prob-10-q1",
        topic: "SQL",
        prompt: "Which window function correctly handles ties when ranking salaries to find the second highest?",
        options: [
          { id: "a", text: "ROW_NUMBER()" },
          { id: "b", text: "RANK()" },
          { id: "c", text: "DENSE_RANK()" },
          { id: "d", text: "NTILE(2)" },
        ],
        correctOptionId: "c",
        explanation:
          "DENSE_RANK() assigns the same rank to tied values and does not skip ranks, so two employees with the same highest salary both get rank 1, and the next distinct salary gets rank 2.",
      },
      {
        id: "prob-10-q2",
        topic: "SQL",
        prompt: "What does the following query return if only one distinct salary exists?\n\nSELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees)",
        options: [
          { id: "a", text: "0" },
          { id: "b", text: "The same salary" },
          { id: "c", text: "NULL" },
          { id: "d", text: "An error" },
        ],
        correctOptionId: "c",
        explanation:
          "When the subquery finds the only MAX salary and the outer WHERE eliminates all rows, the MAX() aggregate over an empty set returns NULL — the correct behaviour to indicate 'no second highest salary exists'.",
      },
    ],
  },
  {
    id: "prob-11",
    title: "Detect Conflict Serializability in Transaction Schedules",
    category: "DBMS",
    subjectSlug: "dbms",
    difficulty: "Medium",
    acceptanceRate: "53.7%",
    tags: ["Transactions", "ACID", "Concurrency"],
    starterNote: "Precedence graph cycle detection.",
    mcqQuestions: [
      {
        id: "prob-11-q1",
        topic: "Transactions",
        prompt: "A schedule is conflict-serializable if and only if its precedence (conflict) graph is:",
        options: [
          { id: "a", text: "Connected" },
          { id: "b", text: "Acyclic (a DAG)" },
          { id: "c", text: "Fully connected" },
          { id: "d", text: "A tree" },
        ],
        correctOptionId: "b",
        explanation:
          "A precedence graph is built by adding an edge Ti → Tj whenever Ti has a conflicting operation before Tj. If this graph is acyclic, the schedule is conflict-serializable.",
      },
      {
        id: "prob-11-q2",
        topic: "ACID",
        prompt: "Which ACID property ensures that a committed transaction's changes survive a system crash?",
        options: [
          { id: "a", text: "Atomicity" },
          { id: "b", text: "Consistency" },
          { id: "c", text: "Isolation" },
          { id: "d", text: "Durability" },
        ],
        correctOptionId: "d",
        explanation:
          "Durability guarantees that once a transaction is committed, it remains so even in the event of a system failure — typically implemented via write-ahead logging (WAL).",
      },
    ],
  },
  {
    id: "prob-12",
    title: "Design a BCNF Normalized Schema from Functional Dependencies",
    category: "DBMS",
    subjectSlug: "dbms",
    difficulty: "Hard",
    acceptanceRate: "44.9%",
    tags: ["Normalization", "BCNF", "Schema Design"],
    starterNote: "Decomposition preserving dependency and lossless join properties.",
    mcqQuestions: [
      {
        id: "prob-12-q1",
        topic: "Normalization",
        prompt: "A relation is in BCNF if for every non-trivial functional dependency X → Y:",
        options: [
          { id: "a", text: "Y must be a primary key" },
          { id: "b", text: "X must be a superkey" },
          { id: "c", text: "X must be a foreign key" },
          { id: "d", text: "Y must be a non-key attribute" },
        ],
        correctOptionId: "b",
        explanation:
          "BCNF requires that for every non-trivial FD X → Y, X must be a superkey of the relation. This is stricter than 3NF, which also allows Y to be part of a candidate key.",
      },
    ],
  },

  // Operating Systems
  {
    id: "prob-13",
    title: "Simulate Round Robin CPU Scheduling with Context Switches",
    category: "Operating Systems",
    subjectSlug: "os",
    difficulty: "Medium",
    acceptanceRate: "58.1%",
    tags: ["CPU Scheduling", "Processes", "Simulation"],
    starterNote: "Compute average turnaround and waiting times with time slice Q.",
    mcqQuestions: [
      {
        id: "prob-13-q1",
        topic: "CPU Scheduling",
        prompt: "In Round Robin scheduling, a smaller time quantum results in:",
        options: [
          { id: "a", text: "Better CPU utilisation with less context switching" },
          { id: "b", text: "Worse response time for short processes" },
          { id: "c", text: "More context switches and higher overhead" },
          { id: "d", text: "Behaviour identical to FCFS" },
        ],
        correctOptionId: "c",
        explanation:
          "A very small quantum causes frequent context switches, increasing overhead and reducing CPU efficiency. As quantum → ∞, Round Robin degenerates into FCFS.",
      },
      {
        id: "prob-13-q2",
        topic: "Processes",
        prompt: "Turnaround time for a process is defined as:",
        options: [
          { id: "a", text: "Time from arrival to CPU burst start" },
          { id: "b", text: "Time from arrival to completion" },
          { id: "c", text: "CPU burst duration only" },
          { id: "d", text: "Waiting time + burst time - arrival time" },
        ],
        correctOptionId: "b",
        explanation:
          "Turnaround time = completion time − arrival time. It includes all waiting time plus actual CPU execution time.",
      },
    ],
  },
  {
    id: "prob-14",
    title: "Dining Philosophers Deadlock Prevention with Semaphores",
    category: "Operating Systems",
    subjectSlug: "os",
    difficulty: "Hard",
    acceptanceRate: "39.4%",
    tags: ["Concurrency", "Semaphores", "Deadlocks"],
    starterNote: "Resource ordering or asymmetric chopstick acquisition.",
    mcqQuestions: [
      {
        id: "prob-14-q1",
        topic: "Deadlocks",
        prompt: "Which of the four Coffman conditions is broken by the resource-ordering solution to the Dining Philosophers problem?",
        options: [
          { id: "a", text: "Mutual Exclusion" },
          { id: "b", text: "Hold and Wait" },
          { id: "c", text: "Circular Wait" },
          { id: "d", text: "No Preemption" },
        ],
        correctOptionId: "c",
        explanation:
          "Assigning a global order to resources and requiring all processes to acquire them in that order eliminates Circular Wait — one of the four necessary Coffman conditions for deadlock.",
      },
    ],
  },
  {
    id: "prob-15",
    title: "LRU Page Replacement Fault Rate Calculator",
    category: "Operating Systems",
    subjectSlug: "os",
    difficulty: "Easy",
    acceptanceRate: "72.0%",
    tags: ["Virtual Memory", "Paging", "LRU"],
    starterNote: "Track frame state and page miss counts.",
    mcqQuestions: [
      {
        id: "prob-15-q1",
        topic: "Virtual Memory",
        prompt: "In LRU page replacement, which page is evicted on a page fault?",
        options: [
          { id: "a", text: "The page with the lowest page number" },
          { id: "b", text: "The page that was used least recently" },
          { id: "c", text: "The page that will not be used for the longest time" },
          { id: "d", text: "A randomly selected page" },
        ],
        correctOptionId: "b",
        explanation:
          "LRU evicts the page whose most recent use was the furthest in the past. It approximates the optimal algorithm by using past access patterns as a proxy for future behaviour.",
      },
      {
        id: "prob-15-q2",
        topic: "Paging",
        prompt: "Belady's anomaly — more frames causing more page faults — can occur in which algorithm?",
        options: [
          { id: "a", text: "LRU" },
          { id: "b", text: "Optimal" },
          { id: "c", text: "FIFO" },
          { id: "d", text: "LFU" },
        ],
        correctOptionId: "c",
        explanation:
          "Belady's anomaly is specific to FIFO. Stack-based algorithms like LRU and Optimal are immune because adding more frames always results in fewer or equal page faults.",
      },
    ],
  },

  // System Design
  {
    id: "prob-16",
    title: "Consistent Hashing Ring with Virtual Nodes",
    category: "System Design",
    subjectSlug: "system-design",
    difficulty: "Medium",
    acceptanceRate: "51.2%",
    tags: ["Distributed Systems", "Hashing", "Caching"],
    starterNote: "Key redistribution minimization upon node failure.",
    mcqQuestions: [
      {
        id: "prob-16-q1",
        topic: "Distributed Systems",
        prompt: "What problem does consistent hashing solve compared to simple modular hashing?",
        options: [
          { id: "a", text: "It makes hash computation faster" },
          { id: "b", text: "It minimises the number of keys that need to be remapped when nodes are added or removed" },
          { id: "c", text: "It guarantees zero collisions" },
          { id: "d", text: "It eliminates the need for replication" },
        ],
        correctOptionId: "b",
        explanation:
          "With simple modular hashing, changing the number of servers remaps almost all keys. Consistent hashing ensures only K/n keys are remapped on average when a node is added or removed (K = keys, n = nodes).",
      },
    ],
  },
  {
    id: "prob-17",
    title: "Design a Distributed Rate Limiter (Token Bucket)",
    category: "System Design",
    subjectSlug: "system-design",
    difficulty: "Medium",
    acceptanceRate: "48.6%",
    tags: ["Rate Limiting", "Redis", "Concurrency"],
    starterNote: "Sliding window log vs token bucket evaluation.",
    mcqQuestions: [
      {
        id: "prob-17-q1",
        topic: "Rate Limiting",
        prompt: "The Token Bucket algorithm allows bursting up to a maximum of:",
        options: [
          { id: "a", text: "1 request at any time" },
          { id: "b", text: "The current number of tokens in the bucket" },
          { id: "c", text: "Twice the refill rate" },
          { id: "d", text: "The sliding window size" },
        ],
        correctOptionId: "b",
        explanation:
          "Token Bucket allows a burst up to however many tokens are currently in the bucket (up to the bucket capacity). This lets brief traffic spikes pass through while still enforcing an average rate.",
      },
    ],
  },

  // OOP Concepts
  {
    id: "prob-18",
    title: "Design a Thread-Safe Generic Object Pool",
    category: "OOP Concepts",
    subjectSlug: "oops",
    difficulty: "Medium",
    acceptanceRate: "56.3%",
    tags: ["Design Patterns", "SOLID", "Concurrency"],
    starterNote: "Creational pattern with thread synchronization.",
    mcqQuestions: [
      {
        id: "prob-18-q1",
        topic: "Design Patterns",
        prompt: "An object pool is most closely related to which creational design pattern?",
        options: [
          { id: "a", text: "Factory Method" },
          { id: "b", text: "Singleton" },
          { id: "c", text: "Flyweight" },
          { id: "d", text: "Prototype" },
        ],
        correctOptionId: "c",
        explanation:
          "The Flyweight pattern shares objects to support large numbers of fine-grained objects efficiently — the object pool concept shares expensive-to-create objects across clients rather than creating a new instance each time.",
      },
      {
        id: "prob-18-q2",
        topic: "SOLID",
        prompt: "Which SOLID principle is most directly violated if a single class both manages the object pool lifecycle AND contains business logic?",
        options: [
          { id: "a", text: "Open/Closed Principle" },
          { id: "b", text: "Single Responsibility Principle" },
          { id: "c", text: "Liskov Substitution Principle" },
          { id: "d", text: "Dependency Inversion Principle" },
        ],
        correctOptionId: "b",
        explanation:
          "The Single Responsibility Principle states a class should have only one reason to change. Mixing pool management (infrastructure concern) with business logic gives it two distinct responsibilities.",
      },
    ],
  },
];
