// Problem Manager - Handles problem data and operations
class ProblemManager {
    constructor() {
        this.problems = [];
        this.solutions = new Map();
        this.dataStructureInfo = new Map();
        this.isLoaded = false;
    }

    async loadProblems() {
        try {
            // Load problems data
            const problemsResponse = await fetch('data/problems.json');
            if (!problemsResponse.ok) {
                throw new Error('Failed to load problems data');
            }
            this.problems = await problemsResponse.json();

            // Load solutions data
            const solutionsResponse = await fetch('data/solutions.json');
            if (!solutionsResponse.ok) {
                throw new Error('Failed to load solutions data');
            }
            const solutionsData = await solutionsResponse.json();

            // Process solutions data
            this.processSolutionsData(solutionsData);

            // Initialize data structure information
            this.initializeDataStructureInfo();

            this.isLoaded = true;
            console.log(`Loaded ${this.problems.length} problems successfully`);
        } catch (error) {
            console.error('Error loading problems:', error);
            throw error;
        }
    }

    processSolutionsData(solutionsData) {
        solutionsData.forEach(problemSolution => {
            this.solutions.set(problemSolution.problemId, problemSolution);
        });
    }

    initializeDataStructureInfo() {
        // Array data structure info
        this.dataStructureInfo.set('array', {
            name: 'Arrays',
            description: 'A collection of elements stored in contiguous memory locations. Each element can be accessed directly using its index.',
            properties: [
                'Fixed size (in most languages)',
                'Elements stored in contiguous memory',
                'Direct access using index',
                'Cache-friendly due to spatial locality',
                'Homogeneous data type'
            ],
            operations: [
                {
                    name: 'Access',
                    description: 'Access element at given index',
                    timeComplexity: 'O(1)',
                    spaceComplexity: 'O(1)'
                },
                {
                    name: 'Search',
                    description: 'Find element in array',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)'
                },
                {
                    name: 'Insert',
                    description: 'Insert element at given position',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)'
                },
                {
                    name: 'Delete',
                    description: 'Remove element from given position',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)'
                }
            ]
        });

        // Linked List data structure info
        this.dataStructureInfo.set('linkedlist', {
            name: 'Linked Lists',
            description: 'A linear data structure where elements are stored in nodes, and each node contains data and a reference to the next node.',
            properties: [
                'Dynamic size',
                'Non-contiguous memory allocation',
                'Sequential access only',
                'Efficient insertion/deletion at beginning',
                'No random access to elements'
            ],
            operations: [
                {
                    name: 'Insert at Head',
                    description: 'Add element at the beginning',
                    timeComplexity: 'O(1)',
                    spaceComplexity: 'O(1)'
                },
                {
                    name: 'Insert at Tail',
                    description: 'Add element at the end',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)'
                },
                {
                    name: 'Search',
                    description: 'Find element in list',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)'
                },
                {
                    name: 'Delete',
                    description: 'Remove element from list',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)'
                }
            ]
        });

        // Stack data structure info
        this.dataStructureInfo.set('stack', {
            name: 'Stacks',
            description: 'A linear data structure that follows the Last In, First Out (LIFO) principle. Elements are added and removed from the same end.',
            properties: [
                'LIFO (Last In, First Out) access',
                'Operations only at the top',
                'Limited access to elements',
                'Used for function calls, undo operations',
                'Can be implemented using arrays or linked lists'
            ],
            operations: [
                {
                    name: 'Push',
                    description: 'Add element to the top',
                    timeComplexity: 'O(1)',
                    spaceComplexity: 'O(1)'
                },
                {
                    name: 'Pop',
                    description: 'Remove element from the top',
                    timeComplexity: 'O(1)',
                    spaceComplexity: 'O(1)'
                },
                {
                    name: 'Top/Peek',
                    description: 'View top element without removing',
                    timeComplexity: 'O(1)',
                    spaceComplexity: 'O(1)'
                },
                {
                    name: 'IsEmpty',
                    description: 'Check if stack is empty',
                    timeComplexity: 'O(1)',
                    spaceComplexity: 'O(1)'
                }
            ]
        });

        // Queue data structure info
        this.dataStructureInfo.set('queue', {
            name: 'Queues',
            description: 'A linear data structure that follows the First In, First Out (FIFO) principle. Elements are added at the rear and removed from the front.',
            properties: [
                'FIFO (First In, First Out) access',
                'Insertion at rear, deletion at front',
                'Used for scheduling, breadth-first search',
                'Can be implemented using arrays or linked lists',
                'Circular queue for efficient space utilization'
            ],
            operations: [
                {
                    name: 'Enqueue',
                    description: 'Add element to the rear',
                    timeComplexity: 'O(1)',
                    spaceComplexity: 'O(1)'
                },
                {
                    name: 'Dequeue',
                    description: 'Remove element from the front',
                    timeComplexity: 'O(1)',
                    spaceComplexity: 'O(1)'
                },
                {
                    name: 'Front',
                    description: 'View front element without removing',
                    timeComplexity: 'O(1)',
                    spaceComplexity: 'O(1)'
                },
                {
                    name: 'IsEmpty',
                    description: 'Check if queue is empty',
                    timeComplexity: 'O(1)',
                    spaceComplexity: 'O(1)'
                }
            ]
        });

        // Tree data structure info
        this.dataStructureInfo.set('tree', {
            name: 'Trees',
            description: 'A hierarchical data structure consisting of nodes connected by edges. Each node has a parent (except root) and zero or more children.',
            properties: [
                'Hierarchical structure',
                'Root node at the top',
                'Parent-child relationships',
                'No cycles (acyclic)',
                'Various types: binary, BST, AVL, etc.'
            ],
            operations: [
                {
                    name: 'Insert',
                    description: 'Add new node to the tree',
                    timeComplexity: 'O(log n) - O(n)',
                    spaceComplexity: 'O(1)'
                },
                {
                    name: 'Search',
                    description: 'Find node in the tree',
                    timeComplexity: 'O(log n) - O(n)',
                    spaceComplexity: 'O(1)'
                },
                {
                    name: 'Traversal',
                    description: 'Visit all nodes in specific order',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(h)'
                },
                {
                    name: 'Delete',
                    description: 'Remove node from the tree',
                    timeComplexity: 'O(log n) - O(n)',
                    spaceComplexity: 'O(1)'
                }
            ]
        });

        // Graph data structure info
        this.dataStructureInfo.set('graph', {
            name: 'Graphs',
            description: 'A collection of vertices (nodes) connected by edges. Can be directed or undirected, weighted or unweighted.',
            properties: [
                'Vertices connected by edges',
                'Can be directed or undirected',
                'May contain cycles',
                'Can be weighted or unweighted',
                'Various representations: adjacency list, matrix'
            ],
            operations: [
                {
                    name: 'Add Vertex',
                    description: 'Add new vertex to the graph',
                    timeComplexity: 'O(1)',
                    spaceComplexity: 'O(1)'
                },
                {
                    name: 'Add Edge',
                    description: 'Connect two vertices with an edge',
                    timeComplexity: 'O(1)',
                    spaceComplexity: 'O(1)'
                },
                {
                    name: 'DFS/BFS',
                    description: 'Traverse all reachable vertices',
                    timeComplexity: 'O(V + E)',
                    spaceComplexity: 'O(V)'
                },
                {
                    name: 'Shortest Path',
                    description: 'Find shortest path between vertices',
                    timeComplexity: 'O(V² - V·E)',
                    spaceComplexity: 'O(V)'
                }
            ]
        });

        // Hashing data structure info
        this.dataStructureInfo.set('hashing', {
            name: 'Hash Tables',
            description: 'A data structure that maps keys to values using a hash function. Provides fast insertion, deletion, and lookup operations.',
            properties: [
                'Key-value pair storage',
                'Hash function maps keys to indices',
                'Collision handling required',
                'Average O(1) operations',
                'Load factor affects performance'
            ],
            operations: [
                {
                    name: 'Insert',
                    description: 'Add key-value pair',
                    timeComplexity: 'O(1) avg, O(n) worst',
                    spaceComplexity: 'O(1)'
                },
                {
                    name: 'Search',
                    description: 'Find value for given key',
                    timeComplexity: 'O(1) avg, O(n) worst',
                    spaceComplexity: 'O(1)'
                },
                {
                    name: 'Delete',
                    description: 'Remove key-value pair',
                    timeComplexity: 'O(1) avg, O(n) worst',
                    spaceComplexity: 'O(1)'
                },
                {
                    name: 'Hash',
                    description: 'Compute hash value for key',
                    timeComplexity: 'O(1)',
                    spaceComplexity: 'O(1)'
                }
            ]
        });
    }

    getAllProblems() {
        return [...this.problems];
    }

    getProblemById(id) {
        return this.problems.find(problem => problem.id === id);
    }

    getProblemsByCategory(category) {
        return this.problems.filter(problem => problem.category === category);
    }

    searchProblems(query) {
        if (!query.trim()) {
            return this.getAllProblems();
        }

        const searchTerms = query.toLowerCase().split(' ');
        
        return this.problems.filter(problem => {
            const searchableText = [
                problem.title,
                problem.description,
                problem.category,
                problem.difficulty,
                ...(problem.tags || [])
            ].join(' ').toLowerCase();

            return searchTerms.every(term => searchableText.includes(term));
        });
    }

    async loadSolution(problemId) {
        // Solution is already loaded in the constructor
        return this.solutions.get(problemId);
    }

    getSolution(problemId, language) {
        const problemSolutions = this.solutions.get(problemId);
        if (!problemSolutions) return null;

        return problemSolutions.solutions[language];
    }

    getDataStructureInfo(category) {
        return this.dataStructureInfo.get(category);
    }

    // Utility methods
    getProblemsByDifficulty(difficulty) {
        return this.problems.filter(problem => 
            problem.difficulty.toLowerCase() === difficulty.toLowerCase()
        );
    }

    getRandomProblem() {
        if (this.problems.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * this.problems.length);
        return this.problems[randomIndex];
    }

    getRelatedProblems(problemId, limit = 5) {
        const currentProblem = this.getProblemById(problemId);
        if (!currentProblem) return [];

        // Find problems from the same category
        let related = this.getProblemsByCategory(currentProblem.category)
            .filter(problem => problem.id !== problemId);

        // If not enough, add problems with similar difficulty
        if (related.length < limit) {
            const similarDifficulty = this.getProblemsByDifficulty(currentProblem.difficulty)
                .filter(problem => 
                    problem.id !== problemId && 
                    !related.find(p => p.id === problem.id)
                );
            related = [...related, ...similarDifficulty];
        }

        // Shuffle and return limited results
        return this.shuffleArray(related).slice(0, limit);
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Statistics methods
    getStatistics() {
        const stats = {
            total: this.problems.length,
            byCategory: {},
            byDifficulty: {}
        };

        // Count by category
        this.problems.forEach(problem => {
            stats.byCategory[problem.category] = (stats.byCategory[problem.category] || 0) + 1;
            stats.byDifficulty[problem.difficulty] = (stats.byDifficulty[problem.difficulty] || 0) + 1;
        });

        return stats;
    }

    // Validation methods
    validateProblemData(problem) {
        const required = ['id', 'title', 'description', 'category', 'difficulty', 'constraints'];
        const missing = required.filter(field => !problem.hasOwnProperty(field));
        
        if (missing.length > 0) {
            throw new Error(`Missing required fields: ${missing.join(', ')}`);
        }

        if (typeof problem.id !== 'number') {
            throw new Error('Problem ID must be a number');
        }

        const validDifficulties = ['Easy', 'Medium', 'Hard'];
        if (!validDifficulties.includes(problem.difficulty)) {
            throw new Error(`Invalid difficulty: ${problem.difficulty}`);
        }

        const validCategories = ['array', 'linkedlist', 'stack', 'queue', 'tree', 'graph', 'hashing'];
        if (!validCategories.includes(problem.category)) {
            throw new Error(`Invalid category: ${problem.category}`);
        }

        return true;
    }

    // Export/Import methods
    exportProblemsData() {
        return {
            problems: this.problems,
            timestamp: new Date().toISOString(),
            version: '1.0'
        };
    }

    importProblemsData(data) {
        if (!data.problems || !Array.isArray(data.problems)) {
            throw new Error('Invalid import data format');
        }

        // Validate each problem
        data.problems.forEach((problem, index) => {
            try {
                this.validateProblemData(problem);
            } catch (error) {
                throw new Error(`Problem ${index + 1}: ${error.message}`);
            }
        });

        this.problems = data.problems;
        console.log(`Imported ${this.problems.length} problems`);
    }
}
