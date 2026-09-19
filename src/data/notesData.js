/**
 * Stage 4: Notes System Mock Data
 * Contains 24 initial student notes across 6 core computer science subjects.
 */

export const NOTE_SUBJECTS = [
  'All',
  'Database Management Systems',
  'Data Structures & Algorithms',
  'Operating Systems',
  'Computer Networks',
  'Discrete Mathematics',
  'Python Programming'
];

export const INITIAL_NOTES = [
  {
    id: 'note-1',
    title: 'Process Synchronization & Semaphores',
    subject: 'Operating Systems',
    topic: 'Process Management',
    type: 'created',
    content: `## Process Synchronization
Process synchronization is the task of coordinating the execution of processes in a way that no two processes can have access to the same shared data and resources simultaneously.

### Critical Section Problem
A critical section is a piece of code that accesses shared resources (variables, files).
Conditions to satisfy:
1. **Mutual Exclusion**: If process Pi is executing in its critical section, no other processes can be executing in their critical sections.
2. **Progress**: If no process is executing and some processes want to enter, only those not in their remainder section can participate in the decision.
3. **Bounded Waiting**: There must be a limit on the number of times other processes are allowed to enter after a request has been made.

### Semaphores
A semaphore is a synchronization tool represented as an integer variable:
- \`wait(S)\` / \`P(S)\`: Decrements S. If negative, the process blocks.
- \`signal(S)\` / \`V(S)\`: Increments S. If <= 0, unblocks a waiting process.`,
    isFavorite: true,
    updatedAt: '2 days ago',
    tags: ['OS', 'Concurrency', 'Semaphores']
  },
  {
    id: 'note-2',
    title: 'B-Trees and B+ Trees Indexing Mechanisms',
    subject: 'Database Management Systems',
    topic: 'Indexing & Hashing',
    type: 'created',
    content: `## B-Tree & B+ Tree Differences

### B-Tree
- Keys and data pointers can be stored in both internal nodes and leaf nodes.
- Searching for a record might terminate at an internal node.
- Range queries are slower because leaf nodes are not linked sequentially.

### B+ Tree
- Data records or pointers to records are stored **only at leaf nodes**.
- Internal nodes only hold routing/search keys.
- Leaf nodes are linked via a doubly linked list, making **range queries extremely efficient**.
- High fanout leads to lower tree height and minimal disk I/O.`,
    isFavorite: true,
    updatedAt: 'Yesterday',
    tags: ['DBMS', 'Indexing', 'Storage']
  },
  {
    id: 'note-3',
    title: 'Graph Traversal: BFS vs DFS Algorithms',
    subject: 'Data Structures & Algorithms',
    topic: 'Graphs',
    type: 'created',
    content: `## Breadth-First Search (BFS)
- Uses a **Queue** (FIFO).
- Finds the shortest path on unweighted graphs.
- Time Complexity: O(V + E).
- Space Complexity: O(V).

## Depth-First Search (DFS)
- Uses a **Stack** (or recursion).
- Ideal for topological sorting, cycle detection, and strongly connected components.
- Time Complexity: O(V + E).
- Space Complexity: O(V) for the recursion call stack.`,
    isFavorite: false,
    updatedAt: '3 days ago',
    tags: ['DSA', 'Graphs', 'Algorithms']
  },
  {
    id: 'note-4',
    title: 'TCP 3-Way Handshake & Congestion Control',
    subject: 'Computer Networks',
    topic: 'Transport Layer',
    type: 'uploaded',
    fileInfo: {
      name: 'tcp_handshake_and_flow_control.pdf',
      size: '1.8 MB',
      type: 'PDF Document'
    },
    content: `Comprehensive lecture slide summary covering TCP connection establishment, sequence number synchronization, and Reno/Tahoe congestion windows.`,
    isFavorite: true,
    updatedAt: '4 days ago',
    tags: ['Networking', 'TCP', 'Transport']
  },
  {
    id: 'note-5',
    title: 'Recurrence Relations & Master Theorem',
    subject: 'Discrete Mathematics',
    topic: 'Combinatorics',
    type: 'created',
    content: `## Master Theorem for Divide-and-Conquer Recurrences

For recurrences of the form:
\`T(n) = a * T(n/b) + f(n)\`
where a >= 1, b > 1:

1. If f(n) = O(n^(log_b(a) - ε)), then T(n) = Θ(n^(log_b(a))).
2. If f(n) = Θ(n^(log_b(a))), then T(n) = Θ(n^(log_b(a)) * log n).
3. If f(n) = Ω(n^(log_b(a) + ε)), then T(n) = Θ(f(n)).`,
    isFavorite: false,
    updatedAt: '5 days ago',
    tags: ['Math', 'Complexity', 'Master Theorem']
  },
  {
    id: 'note-6',
    title: 'Python Generators and Memory Profiling',
    subject: 'Python Programming',
    topic: 'Advanced Python',
    type: 'created',
    content: `## Python Generators & Yield
Generators allow you to declare a function that behaves like an iterator.
They generate items on the fly using \`yield\` instead of loading entire lists into RAM.

\`\`\`python
def fibonacci_gen(limit):
    a, b = 0, 1
    while a < limit:
        yield a
        a, b = b, a + b
\`\`\`

Advantages:
- Huge memory savings for massive files or endless streams.
- Lazy evaluation pipelines.`,
    isFavorite: true,
    updatedAt: '6 days ago',
    tags: ['Python', 'Generators', 'Optimization']
  },
  {
    id: 'note-7',
    title: 'Relational Normalization: 1NF to BCNF',
    subject: 'Database Management Systems',
    topic: 'Normalization',
    type: 'uploaded',
    fileInfo: {
      name: 'normalization_cheatsheet.pdf',
      size: '2.1 MB',
      type: 'PDF Document'
    },
    content: `Concise decomposition rules for First Normal Form (atomic values), Second Normal Form (no partial dependencies), Third Normal Form (no transitive dependencies), and Boyce-Codd Normal Form.`,
    isFavorite: true,
    updatedAt: '1 week ago',
    tags: ['DBMS', 'Normalization', 'SQL']
  },
  {
    id: 'note-8',
    title: 'Dynamic Programming: 0/1 Knapsack Pattern',
    subject: 'Data Structures & Algorithms',
    topic: 'Dynamic Programming',
    type: 'created',
    content: `## 0/1 Knapsack Solution Breakdown
State definition:
\`dp[i][w]\` = maximum value using a subset of first \`i\` items with knapsack capacity \`w\`.

Transitions:
- Exclude item \`i\`: \`dp[i-1][w]\`
- Include item \`i\` (if weight <= w): \`val[i] + dp[i-1][w - wt[i]]\`
- Space optimization: 1D array traversed backwards.`,
    isFavorite: false,
    updatedAt: '1 week ago',
    tags: ['DSA', 'DP', 'Knapsack']
  },
  {
    id: 'note-9',
    title: 'Virtual Memory & Page Replacement (LRU, FIFO)',
    subject: 'Operating Systems',
    topic: 'Memory Management',
    type: 'uploaded',
    fileInfo: {
      name: 'os_page_replacement_algorithms.docx',
      size: '950 KB',
      type: 'Word Document'
    },
    content: `Analysis of Belady's Anomaly in FIFO, optimal page replacement proofs, and Least Recently Used (LRU) implementation using doubly linked list and hash map.`,
    isFavorite: false,
    updatedAt: '1 week ago',
    tags: ['OS', 'VirtualMemory', 'LRU']
  },
  {
    id: 'note-10',
    title: 'Subnetting & CIDR Notation Walkthrough',
    subject: 'Computer Networks',
    topic: 'Network Layer',
    type: 'created',
    content: `## IP Addressing & CIDR
Classless Inter-Domain Routing (CIDR) uses prefix notation (\`/24\`, \`/28\`).

Example: \`192.168.1.0/26\`
- Subnet mask: \`255.255.255.192\`
- Number of hosts: 2^(32-26) - 2 = 64 - 2 = 62 usable IP addresses.`,
    isFavorite: true,
    updatedAt: '2 weeks ago',
    tags: ['Networking', 'Subnetting', 'IP']
  },
  {
    id: 'note-11',
    title: 'Graph Theory: Euler and Hamiltonian Paths',
    subject: 'Discrete Mathematics',
    topic: 'Graph Theory',
    type: 'created',
    content: `## Euler Paths vs Hamiltonian Paths
- **Euler Path**: Visits every edge in a graph exactly once. Exists if graph is connected and has either 0 or 2 vertices of odd degree.
- **Hamiltonian Path**: Visits every vertex in a graph exactly once. NP-complete problem to verify generally.`,
    isFavorite: false,
    updatedAt: '2 weeks ago',
    tags: ['Math', 'Graphs', 'Euler']
  },
  {
    id: 'note-12',
    title: 'Python Decorators & Higher Order Functions',
    subject: 'Python Programming',
    topic: 'Functional Programming',
    type: 'created',
    content: `## Python Function Decorators
A decorator is a function that takes another function as an argument, extends its behavior, and returns a new function without modifying the original code.

\`\`\`python
import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.time() - start:.4f}s")
        return result
    return wrapper
\`\`\``,
    isFavorite: true,
    updatedAt: '2 weeks ago',
    tags: ['Python', 'Decorators', 'Functions']
  },
  {
    id: 'note-13',
    title: 'ACID Properties and Transaction Isolation Levels',
    subject: 'Database Management Systems',
    topic: 'Transactions',
    type: 'created',
    content: `## ACID Properties
- **Atomicity**: All or nothing transaction execution.
- **Consistency**: Database transitions from one valid state to another.
- **Isolation**: Concurrent transactions do not interfere.
- **Durability**: Committed changes survive crashes.

### Isolation Levels
1. Read Uncommitted (Dirty reads possible)
2. Read Committed (Non-repeatable reads possible)
3. Repeatable Read (Phantom reads possible)
4. Serializable (Strict order)`,
    isFavorite: false,
    updatedAt: '2 weeks ago',
    tags: ['DBMS', 'Transactions', 'ACID']
  },
  {
    id: 'note-14',
    title: 'Trie Data Structure for Autocomplete',
    subject: 'Data Structures & Algorithms',
    topic: 'Trees',
    type: 'created',
    content: `## Trie (Prefix Tree)
A specialized tree used to store associative keys (typically strings).
- Search Time Complexity: O(L) where L is string length.
- Space Complexity: O(ALPHABET_SIZE * L * N).
- Ideal for dictionary lookup and autocomplete suggestions.`,
    isFavorite: false,
    updatedAt: '3 weeks ago',
    tags: ['DSA', 'Trie', 'Strings']
  },
  {
    id: 'note-15',
    title: 'Deadlock Handling: Banker\'s Algorithm',
    subject: 'Operating Systems',
    topic: 'Deadlocks',
    type: 'uploaded',
    fileInfo: {
      name: 'deadlock_avoidance_bankers_algo.pdf',
      size: '1.2 MB',
      type: 'PDF Document'
    },
    content: `Detailed worked numerical problems on Banker's resource allocation graph, safety check algorithms, and resource request state transitions.`,
    isFavorite: false,
    updatedAt: '3 weeks ago',
    tags: ['OS', 'Deadlocks', 'BankersAlgorithm']
  },
  {
    id: 'note-16',
    title: 'DNS Resolution Workflow & Caching Hierarchy',
    subject: 'Computer Networks',
    topic: 'Application Layer',
    type: 'created',
    content: `## Domain Name System (DNS)
Resolves human-readable hostnames to IP addresses.
Steps:
1. Browser cache lookup
2. OS hosts file & resolver cache
3. Recursive resolver (ISP/1.1.1.1)
4. Root DNS servers (\`.\`)
5. TLD DNS servers (\`.com\`, \`.edu\`)
6. Authoritative name server returns IP.`,
    isFavorite: true,
    updatedAt: '3 weeks ago',
    tags: ['Networking', 'DNS', 'Web']
  },
  {
    id: 'note-17',
    title: 'Propositional Logic & Truth Tables',
    subject: 'Discrete Mathematics',
    topic: 'Logic',
    type: 'created',
    content: `## Logic Operators
- Conjunction (AND): P ∧ Q
- Disjunction (OR): P ∨ Q
- Implication: P → Q (equivalent to ¬P ∨ Q)
- Biconditional: P ↔ Q (true when both match)`,
    isFavorite: false,
    updatedAt: '3 weeks ago',
    tags: ['Math', 'Logic', 'TruthTables']
  },
  {
    id: 'note-18',
    title: 'Python Dunder Magic Methods (__init__, __repr__)',
    subject: 'Python Programming',
    topic: 'Object Oriented Programming',
    type: 'created',
    content: `## Python Special Methods
Special methods have leading and trailing double underscores.
- \`__init__\`: Object constructor initializer.
- \`__str__\`: Informal human-friendly string representation.
- \`__repr__\`: Official developer debugging representation.
- \`__len__\`: Custom length definition for \`len(obj)\`.`,
    isFavorite: false,
    updatedAt: '1 month ago',
    tags: ['Python', 'OOP', 'DunderMethods']
  },
  {
    id: 'note-19',
    title: 'SQL Window Functions (ROW_NUMBER, DENSE_RANK)',
    subject: 'Database Management Systems',
    topic: 'Advanced SQL',
    type: 'created',
    content: `## Window Functions
Perform calculations across sets of rows related to the current row.

\`\`\`sql
SELECT 
    student_id, 
    subject, 
    marks,
    DENSE_RANK() OVER (PARTITION BY subject ORDER BY marks DESC) as rank
FROM exam_results;
\`\`\``,
    isFavorite: true,
    updatedAt: '1 month ago',
    tags: ['DBMS', 'SQL', 'Analytics']
  },
  {
    id: 'note-20',
    title: 'Dijkstra\'s Shortest Path with Min-Heap',
    subject: 'Data Structures & Algorithms',
    topic: 'Graphs',
    type: 'created',
    content: `## Dijkstra's Algorithm
Finds the shortest path from a single source vertex to all other vertices in a weighted graph with non-negative edge weights.
- Implemented with Min-Priority Queue.
- Complexity: O((V + E) log V).`,
    isFavorite: false,
    updatedAt: '1 month ago',
    tags: ['DSA', 'Dijkstra', 'ShortestPath']
  },
  {
    id: 'note-21',
    title: 'Disk Scheduling Algorithms (SCAN, C-SCAN, LOOK)',
    subject: 'Operating Systems',
    topic: 'Storage Management',
    type: 'uploaded',
    fileInfo: {
      name: 'disk_head_scheduling_comparisons.txt',
      size: '140 KB',
      type: 'Text Document'
    },
    content: `C-SCAN and LOOK disk arm travel calculations with head movement minimization formulas and starvation prevention analysis.`,
    isFavorite: false,
    updatedAt: '1 month ago',
    tags: ['OS', 'DiskScheduling', 'Hardware']
  },
  {
    id: 'note-22',
    title: 'OSI 7-Layer Model Reference Sheet',
    subject: 'Computer Networks',
    topic: 'Network Foundations',
    type: 'uploaded',
    fileInfo: {
      name: 'osi_7_layer_reference_guide.pdf',
      size: '3.4 MB',
      type: 'PDF Document'
    },
    content: `Visual encapsulation diagram illustrating physical frame bits, MAC headers, IP packets, TCP segments, and application layer payload data.`,
    isFavorite: true,
    updatedAt: '1 month ago',
    tags: ['Networking', 'OSI', 'Reference']
  },
  {
    id: 'note-23',
    title: 'Set Theory Identities and Venn Diagrams',
    subject: 'Discrete Mathematics',
    topic: 'Set Theory',
    type: 'created',
    content: `## Set Identities
- De Morgan's Laws: (A ∪ B)' = A' ∩ B', (A ∩ B)' = A' ∪ B'
- Distributive: A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)
- Cardinality Principle of Inclusion-Exclusion.`,
    isFavorite: false,
    updatedAt: '1 month ago',
    tags: ['Math', 'SetTheory', 'DeMorgan']
  },
  {
    id: 'note-24',
    title: 'Python Multithreading vs Multiprocessing (GIL)',
    subject: 'Python Programming',
    topic: 'Concurrency',
    type: 'created',
    content: `## Python GIL & Concurrency
The Global Interpreter Lock (GIL) prevents multiple native threads from executing Python bytecodes at once.
- **Multithreading**: Best for I/O-bound tasks (network requests, disk writes).
- **Multiprocessing**: Best for CPU-bound tasks (image processing, heavy mathematics) by spawning distinct processes.`,
    isFavorite: true,
    updatedAt: '1 month ago',
    tags: ['Python', 'GIL', 'Concurrency']
  }
];
