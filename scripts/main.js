// Main Application Controller
class DSAApp {
    constructor() {
        this.problemManager = new ProblemManager();
        this.animationEngine = new AnimationEngine();
        this.syntaxHighlighter = new SyntaxHighlighter();
        this.currentProblem = null;
        this.currentLanguage = 'cpp';
        this.isLoading = false;
        this.solvedProblems = new Set(JSON.parse(localStorage.getItem('solvedProblems') || '[]'));
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        
        this.initializeApp();
    }

    async initializeApp() {
        this.showLoading();
        
        try {
            // Initialize theme
            this.applyTheme(this.currentTheme);
            
            // Load problems data
            await this.problemManager.loadProblems();
            
            // Initialize event listeners
            this.setupEventListeners();
            
            // Initialize UI
            this.updateCategoryCounts();
            this.renderProblemsGrid('all');
            
            // Hide loading spinner
            this.hideLoading();
            
            console.log('DSA App initialized successfully');
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.hideLoading();
            this.showError('Failed to load application. Please refresh the page.');
        }
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Category navigation
        const categoryItems = document.querySelectorAll('.category-item');
        categoryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                this.handleCategoryChange(e.currentTarget.dataset.category);
            });
        });

        // View toggle
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleViewChange(e.currentTarget.dataset.view);
            });
        });

        // Back button
        const backBtn = document.getElementById('backBtn');
        backBtn.addEventListener('click', () => {
            this.showProblemsView();
        });

        // Back to intro button
        const backToIntroBtn = document.getElementById('backToIntro');
        if (backToIntroBtn) {
            backToIntroBtn.addEventListener('click', () => {
                this.showDSAIntro();
            });
        }

        // Language toggle
        const langBtns = document.querySelectorAll('.lang-btn');
        langBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                console.log('Language button clicked:', e.currentTarget.dataset.lang); // Debug log
                this.handleLanguageChange(e.currentTarget.dataset.lang);
            });
        });
        
        // Debug: Log language buttons found
        console.log('Language buttons found:', langBtns.length);

        // Tab navigation
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleTabChange(e.currentTarget.dataset.tab);
            });
        });

        // Copy code button
        const copyBtn = document.getElementById('copyCode');
        copyBtn.addEventListener('click', () => {
            this.copyCodeToClipboard();
        });

        // Theme toggle
        const themeToggle = document.getElementById('toggleTheme');
        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        // DSA Intro buttons
        const startLearningBtn = document.getElementById('startLearning');
        const viewProblemsBtn = document.getElementById('viewProblems');
        
        if (startLearningBtn) {
            startLearningBtn.addEventListener('click', () => {
                this.showProblemsView();
            });
        }
        
        if (viewProblemsBtn) {
            viewProblemsBtn.addEventListener('click', () => {
                this.showProblemsView();
            });
        }

        // Animation controls
        const playBtn = document.getElementById('playAnimation');
        const pauseBtn = document.getElementById('pauseAnimation');
        const resetBtn = document.getElementById('resetAnimation');
        const speedSlider = document.getElementById('speedSlider');

        playBtn.addEventListener('click', () => this.animationEngine.play());
        pauseBtn.addEventListener('click', () => this.animationEngine.pause());
        resetBtn.addEventListener('click', () => this.animationEngine.reset());
        speedSlider.addEventListener('input', (e) => {
            this.animationEngine.setSpeed(parseFloat(e.target.value));
            document.getElementById('speedValue').textContent = e.target.value + 'x';
        });

        // Progress modal
        const progressToggle = document.getElementById('progressToggle');
        const closeProgress = document.getElementById('closeProgress');
        const progressModal = document.getElementById('progressModal');

        progressToggle.addEventListener('click', () => {
            this.showProgressModal();
        });

        closeProgress.addEventListener('click', () => {
            progressModal.classList.remove('active');
        });

        // Close modal on backdrop click
        progressModal.addEventListener('click', (e) => {
            if (e.target === progressModal) {
                progressModal.classList.remove('active');
            }
        });

        // Sidebar toggle for mobile
        const sidebarToggle = document.getElementById('sidebarToggle');
        sidebarToggle.addEventListener('click', () => {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('active');
        });

        // Close sidebar on mobile when clicking outside
        document.addEventListener('click', (e) => {
            const sidebar = document.getElementById('sidebar');
            const sidebarToggle = document.getElementById('sidebarToggle');
            
            if (window.innerWidth <= 1024 && 
                !sidebar.contains(e.target) && 
                !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });

        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    handleSearch(query) {
        const filteredProblems = this.problemManager.searchProblems(query);
        this.renderProblemsFromList(filteredProblems);
        
        // Update section title
        const sectionTitle = document.getElementById('sectionTitle');
        if (query.trim()) {
            sectionTitle.textContent = `Search Results for "${query}"`;
        } else {
            sectionTitle.textContent = 'All Problems';
        }
    }

    handleCategoryChange(category) {
        // Update active category
        document.querySelectorAll('.category-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        // Render problems for category
        this.renderProblemsGrid(category);

        // Update section title
        const sectionTitle = document.getElementById('sectionTitle');
        const categoryName = category === 'all' ? 'All Problems' : 
            category.charAt(0).toUpperCase() + category.slice(1) + ' Problems';
        sectionTitle.textContent = categoryName;

        // Close sidebar on mobile
        if (window.innerWidth <= 1024) {
            document.getElementById('sidebar').classList.remove('active');
        }
    }

    handleViewChange(view) {
        // Update active view button
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-view="${view}"]`).classList.add('active');

        // Update grid class
        const problemsGrid = document.getElementById('problemsGrid');
        if (view === 'list') {
            problemsGrid.classList.add('list-view');
        } else {
            problemsGrid.classList.remove('list-view');
        }
    }

    handleLanguageChange(language) {
        this.currentLanguage = language;
        console.log('Language changed to:', language); // Debug log

        // Update active language button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-lang="${language}"]`).classList.add('active');

        // Update solution display
        if (this.currentProblem) {
            this.displaySolution();
            this.displayExplanation(); // Also update explanation tab
        }
        
        // Force a small delay to ensure DOM updates
        setTimeout(() => {
            console.log('Language change completed for:', language);
        }, 100);
    }

    handleTabChange(tab) {
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

        // Show corresponding tab content
        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.getElementById(`${tab}Tab`).classList.add('active');

        // Load tab-specific content
        if (tab === 'visualization' && this.currentProblem) {
            this.setupVisualization();
        } else if (tab === 'datastructure' && this.currentProblem) {
            this.displayDataStructureInfo();
        }
    }

    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + K for search focus
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('searchInput').focus();
        }

        // Escape to close modals or go back
        if (e.key === 'Escape') {
            const progressModal = document.getElementById('progressModal');
            if (progressModal.classList.contains('active')) {
                progressModal.classList.remove('active');
            } else if (document.getElementById('problemDetail').classList.contains('active')) {
                this.showProblemsView();
            }
        }

        // Arrow keys for tab navigation when in problem detail
        if (document.getElementById('problemDetail').classList.contains('active')) {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                const tabs = document.querySelectorAll('.tab-btn');
                const activeIndex = Array.from(tabs).findIndex(tab => tab.classList.contains('active'));
                
                let newIndex;
                if (e.key === 'ArrowLeft') {
                    newIndex = activeIndex > 0 ? activeIndex - 1 : tabs.length - 1;
                } else {
                    newIndex = activeIndex < tabs.length - 1 ? activeIndex + 1 : 0;
                }
                
                tabs[newIndex].click();
            }
        }
    }

    handleResize() {
        // Update animation canvas size if needed
        if (this.currentProblem && document.getElementById('visualizationTab').classList.contains('active')) {
            this.animationEngine.resize();
        }
    }

    updateCategoryCounts() {
        const problems = this.problemManager.getAllProblems();
        const counts = {};

        // Initialize counts
        ['all', 'array', 'linkedlist', 'stack', 'queue', 'tree', 'graph', 'hashing'].forEach(category => {
            counts[category] = 0;
        });

        // Count problems by category
        problems.forEach(problem => {
            counts[problem.category]++;
            counts.all++;
        });

        // Update UI
        Object.keys(counts).forEach(category => {
            const countElement = document.getElementById(`${category}Count`);
            if (countElement) {
                countElement.textContent = counts[category];
            }
        });
    }

    renderProblemsGrid(category) {
        const problems = category === 'all' ? 
            this.problemManager.getAllProblems() : 
            this.problemManager.getProblemsByCategory(category);
        
        this.renderProblemsFromList(problems);
    }

    renderProblemsFromList(problems) {
        const problemsGrid = document.getElementById('problemsGrid');
        
        if (problems.length === 0) {
            problemsGrid.innerHTML = `
                <div class="no-problems">
                    <i class="fas fa-search"></i>
                    <h3>No problems found</h3>
                    <p>Try adjusting your search or category filter.</p>
                </div>
            `;
            return;
        }

        problemsGrid.innerHTML = problems.map(problem => {
            const isSolved = this.solvedProblems.has(problem.id);
            return `
                <div class="problem-card ${isSolved ? 'solved' : ''} stagger-item" data-problem-id="${problem.id}">
                    <div class="problem-header">
                        <div>
                            <h3 class="problem-title">${problem.title}</h3>
                            <div class="problem-status">
                                ${isSolved ? '<i class="fas fa-check"></i> Solved' : 'Not attempted'}
                            </div>
                        </div>
                    </div>
                    <div class="problem-meta">
                        <span class="difficulty ${problem.difficulty.toLowerCase()}">${problem.difficulty}</span>
                        <span class="category-tag">${problem.category}</span>
                    </div>
                    <div class="problem-description">
                        ${problem.description.substring(0, 150)}${problem.description.length > 150 ? '...' : ''}
                    </div>
                </div>
            `;
        }).join('');

        // Add click listeners to problem cards
        document.querySelectorAll('.problem-card').forEach(card => {
            card.addEventListener('click', () => {
                const problemId = parseInt(card.dataset.problemId);
                this.showProblemDetail(problemId);
            });
        });
    }

    async showProblemDetail(problemId) {
        this.showLoading();
        
        try {
            this.currentProblem = this.problemManager.getProblemById(problemId);
            
            if (!this.currentProblem) {
                throw new Error('Problem not found');
            }

            // Load solution data
            await this.problemManager.loadSolution(problemId);
            
            // Debug: Check available solutions
            const availableSolutions = this.problemManager.getProblemSolutions(problemId);
            console.log('Available solutions for problem', problemId, ':', availableSolutions);
            console.log('Current language:', this.currentLanguage);
            
            // Display problem details
            this.displayProblemInfo();
            this.displaySolution();
            this.displayExplanation();

            // Switch to detail view
            document.getElementById('problemsList').classList.remove('active');
            document.getElementById('problemDetail').classList.add('active');

            // Reset to first tab
            this.handleTabChange('solution');

            this.hideLoading();
        } catch (error) {
            console.error('Failed to load problem:', error);
            this.hideLoading();
            this.showError('Failed to load problem details. Please try again.');
        }
    }

    showProblemsView() {
        document.getElementById('dsaIntro').classList.remove('active');
        document.getElementById('problemDetail').classList.remove('active');
        document.getElementById('problemsList').classList.add('active');
        this.currentProblem = null;
        
        // Stop any running animations
        this.animationEngine.stop();
    }

    showDSAIntro() {
        document.getElementById('problemsList').classList.remove('active');
        document.getElementById('problemDetail').classList.remove('active');
        document.getElementById('dsaIntro').classList.add('active');
    }

    displayProblemInfo() {
        const problem = this.currentProblem;
        
        document.getElementById('problemTitle').textContent = problem.title;
        document.getElementById('problemDifficulty').textContent = problem.difficulty;
        document.getElementById('problemDifficulty').className = `difficulty ${problem.difficulty.toLowerCase()}`;
        document.getElementById('problemCategory').textContent = problem.category;
        document.getElementById('problemCategory').className = 'category-tag';
        
        document.getElementById('problemStatement').innerHTML = `
            <h3>Problem Statement</h3>
            <p>${problem.description}</p>
            ${problem.examples ? `
                <h4>Examples:</h4>
                ${problem.examples.map(example => `
                    <div class="example">
                        <strong>Input:</strong> ${example.input}<br>
                        <strong>Output:</strong> ${example.output}<br>
                        ${example.explanation ? `<strong>Explanation:</strong> ${example.explanation}` : ''}
                    </div>
                `).join('')}
            ` : ''}
        `;

        document.getElementById('problemConstraints').innerHTML = `
            <h3>Constraints</h3>
            <ul>
                ${problem.constraints.map(constraint => `<li>${constraint}</li>`).join('')}
            </ul>
        `;
    }

    displaySolution() {
        const solution = this.problemManager.getSolution(this.currentProblem.id, this.currentLanguage);
        console.log('Current language:', this.currentLanguage); // Debug log
        console.log('Solution found:', solution); // Debug log
        
        if (solution) {
            const codeElement = document.getElementById('solutionCode');
            
            // Clear any previous content
            codeElement.innerHTML = '';
            
            // For now, let's display clean code without syntax highlighting to fix the HTML markup issue
            const preElement = document.createElement('pre');
            preElement.className = 'code-content';
            preElement.textContent = solution.code; // Use textContent to avoid HTML parsing
            
            codeElement.appendChild(preElement);
            
            console.log('Displaying clean code without syntax highlighting');
            
            // TODO: Re-enable syntax highlighting once the HTML markup issue is fixed
            /*
            try {
                const highlightedCode = this.syntaxHighlighter.highlight(solution.code, this.currentLanguage);
                if (highlightedCode && highlightedCode !== solution.code) {
                    codeElement.innerHTML = highlightedCode;
                } else {
                    console.log('Syntax highlighting returned same code, keeping plain text');
                }
            } catch (error) {
                console.error('Syntax highlighting failed, using plain text:', error);
            }
            */
        } else {
            document.getElementById('solutionCode').innerHTML = `
                <div class="no-solution">
                    <p>Solution for ${this.currentLanguage.toUpperCase()} is not available yet.</p>
                    <p>Available languages: ${Object.keys(this.problemManager.getProblemSolutions(this.currentProblem.id) || {}).join(', ')}</p>
                </div>
            `;
        }
    }

    displayExplanation() {
        const solution = this.problemManager.getSolution(this.currentProblem.id, this.currentLanguage);
        
        if (solution) {
            document.getElementById('algorithmExplanation').innerHTML = `
                <h3>Algorithm Explanation</h3>
                <div class="explanation-steps">
                    ${solution.explanation.map((step, index) => `
                        <div class="explanation-step">
                            <strong>Step ${index + 1}:</strong> ${step}
                        </div>
                    `).join('')}
                </div>
            `;

            document.getElementById('timeComplexity').innerHTML = `
                <h4>Time Complexity</h4>
                <p><strong>${solution.timeComplexity}</strong></p>
                <p>${solution.timeExplanation || ''}</p>
            `;

            document.getElementById('spaceComplexity').innerHTML = `
                <h4>Space Complexity</h4>
                <p><strong>${solution.spaceComplexity}</strong></p>
                <p>${solution.spaceExplanation || ''}</p>
            `;
        }
    }

    setupVisualization() {
        const canvas = document.getElementById('animationCanvas');
        const solution = this.problemManager.getSolution(this.currentProblem.id, this.currentLanguage);
        
        if (solution && solution.animationData) {
            this.animationEngine.initialize(canvas, solution.animationData, this.currentProblem.category);
            this.setupVariableTracker(solution.animationData.variables || []);
        } else {
            canvas.innerHTML = `
                <div class="no-animation">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h4>Visualization Not Available</h4>
                    <p>Interactive animation for this problem is coming soon.</p>
                </div>
            `;
        }
    }

    setupVariableTracker(variables) {
        const tracker = document.getElementById('variableTracker');
        
        if (variables.length > 0) {
            tracker.innerHTML = `
                <h4>Variable Tracker</h4>
                <div class="variables-grid">
                    ${variables.map(variable => `
                        <div class="variable-item" id="var-${variable.name}">
                            <div class="variable-name">${variable.name}</div>
                            <div class="variable-value">${variable.initialValue}</div>
                        </div>
                    `).join('')}
                </div>
            `;
            tracker.style.display = 'block';
        } else {
            tracker.style.display = 'none';
        }
    }

    displayDataStructureInfo() {
        const problem = this.currentProblem;
        const dsInfo = this.problemManager.getDataStructureInfo(problem.category);
        
        if (dsInfo) {
            document.getElementById('dsDescription').innerHTML = `
                <h3>${dsInfo.name}</h3>
                <p>${dsInfo.description}</p>
                <h4>Key Properties:</h4>
                <ul>
                    ${dsInfo.properties.map(prop => `<li>${prop}</li>`).join('')}
                </ul>
            `;

            document.getElementById('dsOperations').innerHTML = `
                <h4>Common Operations:</h4>
                <div class="operations-table">
                    ${dsInfo.operations.map(op => `
                        <div class="operation-row">
                            <strong>${op.name}:</strong> ${op.description} 
                            <span class="complexity">(Time: ${op.timeComplexity}, Space: ${op.spaceComplexity})</span>
                        </div>
                    `).join('')}
                </div>
            `;

            // Create visual representation
            this.createDataStructureVisualization(problem.category);
        }
    }

    createDataStructureVisualization(category) {
        const container = document.getElementById('dsVisualization');
        
        // Create basic visual representation based on data structure type
        switch (category) {
            case 'array':
                container.innerHTML = this.createArrayVisualization();
                break;
            case 'linkedlist':
                container.innerHTML = this.createLinkedListVisualization();
                break;
            case 'stack':
                container.innerHTML = this.createStackVisualization();
                break;
            case 'queue':
                container.innerHTML = this.createQueueVisualization();
                break;
            case 'tree':
                container.innerHTML = this.createTreeVisualization();
                break;
            case 'graph':
                container.innerHTML = this.createGraphVisualization();
                break;
            default:
                container.innerHTML = '<div class="ds-placeholder">Visual representation coming soon...</div>';
        }
    }

    createArrayVisualization() {
        return `
            <div class="ds-visual">
                <h4>Array Structure</h4>
                <div class="array-visual">
                    ${Array.from({length: 6}, (_, i) => `
                        <div class="array-element">${i}</div>
                    `).join('')}
                </div>
                <div class="indices">
                    ${Array.from({length: 6}, (_, i) => `
                        <div class="index">[${i}]</div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    createLinkedListVisualization() {
        return `
            <div class="ds-visual">
                <h4>Linked List Structure</h4>
                <div class="linkedlist-visual">
                    ${Array.from({length: 4}, (_, i) => `
                        <div class="node">
                            <div class="data">${i + 1}</div>
                            <div class="pointer">${i < 3 ? '→' : 'null'}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    createStackVisualization() {
        return `
            <div class="ds-visual">
                <h4>Stack Structure (LIFO)</h4>
                <div class="stack-visual">
                    ${Array.from({length: 4}, (_, i) => `
                        <div class="stack-element">${4 - i}</div>
                    `).join('')}
                </div>
                <div class="stack-label">← Top</div>
            </div>
        `;
    }

    createQueueVisualization() {
        return `
            <div class="ds-visual">
                <h4>Queue Structure (FIFO)</h4>
                <div class="queue-visual">
                    <div class="queue-label">Front →</div>
                    ${Array.from({length: 4}, (_, i) => `
                        <div class="queue-element">${i + 1}</div>
                    `).join('')}
                    <div class="queue-label">← Rear</div>
                </div>
            </div>
        `;
    }

    createTreeVisualization() {
        return `
            <div class="ds-visual">
                <h4>Binary Tree Structure</h4>
                <div class="tree-visual">
                    <div class="tree-level">
                        <div class="tree-node">1</div>
                    </div>
                    <div class="tree-level">
                        <div class="tree-node">2</div>
                        <div class="tree-node">3</div>
                    </div>
                    <div class="tree-level">
                        <div class="tree-node">4</div>
                        <div class="tree-node">5</div>
                        <div class="tree-node">6</div>
                        <div class="tree-node">7</div>
                    </div>
                </div>
            </div>
        `;
    }

    createGraphVisualization() {
        return `
            <div class="ds-visual">
                <h4>Graph Structure</h4>
                <div class="graph-visual">
                    <svg width="300" height="200">
                        <circle cx="50" cy="50" r="20" fill="var(--card-bg)" stroke="var(--accent-primary)" stroke-width="2"/>
                        <text x="50" y="55" text-anchor="middle" fill="var(--text-primary)">A</text>
                        
                        <circle cx="150" cy="50" r="20" fill="var(--card-bg)" stroke="var(--accent-primary)" stroke-width="2"/>
                        <text x="150" y="55" text-anchor="middle" fill="var(--text-primary)">B</text>
                        
                        <circle cx="250" cy="50" r="20" fill="var(--card-bg)" stroke="var(--accent-primary)" stroke-width="2"/>
                        <text x="250" y="55" text-anchor="middle" fill="var(--text-primary)">C</text>
                        
                        <circle cx="100" cy="150" r="20" fill="var(--card-bg)" stroke="var(--accent-primary)" stroke-width="2"/>
                        <text x="100" y="155" text-anchor="middle" fill="var(--text-primary)">D</text>
                        
                        <circle cx="200" cy="150" r="20" fill="var(--card-bg)" stroke="var(--accent-primary)" stroke-width="2"/>
                        <text x="200" y="155" text-anchor="middle" fill="var(--text-primary)">E</text>
                        
                        <line x1="70" y1="50" x2="130" y2="50" stroke="var(--border-color)" stroke-width="2"/>
                        <line x1="170" y1="50" x2="230" y2="50" stroke="var(--border-color)" stroke-width="2"/>
                        <line x1="60" y1="70" x2="90" y2="130" stroke="var(--border-color)" stroke-width="2"/>
                        <line x1="160" y1="70" x2="190" y2="130" stroke="var(--border-color)" stroke-width="2"/>
                        <line x1="120" y1="150" x2="180" y2="150" stroke="var(--border-color)" stroke-width="2"/>
                    </svg>
                </div>
            </div>
        `;
    }

    copyCodeToClipboard() {
        const codeBlock = document.getElementById('solutionCode');
        const code = codeBlock.textContent || codeBlock.innerText;
        
        navigator.clipboard.writeText(code).then(() => {
            const copyBtn = document.getElementById('copyCode');
            const originalIcon = copyBtn.innerHTML;
            
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            copyBtn.style.color = 'var(--accent-primary)';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalIcon;
                copyBtn.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy code:', err);
            this.showError('Failed to copy code to clipboard');
        });
    }

    showProgressModal() {
        const totalProblems = this.problemManager.getAllProblems().length;
        const solvedCount = this.solvedProblems.size;
        const progressPercent = Math.round((solvedCount / totalProblems) * 100);

        // Update stats
        document.getElementById('solvedCount').textContent = solvedCount;
        document.getElementById('totalCount').textContent = totalProblems;
        document.getElementById('progressPercent').textContent = progressPercent + '%';

        // Show modal
        document.getElementById('progressModal').classList.add('active');

        // Generate progress chart
        this.generateProgressChart();
    }

    generateProgressChart() {
        const chartContainer = document.getElementById('progressChart');
        const problems = this.problemManager.getAllProblems();
        const categories = ['array', 'linkedlist', 'stack', 'queue', 'tree', 'graph', 'hashing'];
        
        const categoryStats = categories.map(category => {
            const categoryProblems = problems.filter(p => p.category === category);
            const solvedInCategory = categoryProblems.filter(p => this.solvedProblems.has(p.id)).length;
            
            return {
                name: category.charAt(0).toUpperCase() + category.slice(1),
                total: categoryProblems.length,
                solved: solvedInCategory,
                percentage: categoryProblems.length > 0 ? (solvedInCategory / categoryProblems.length) * 100 : 0
            };
        });

        chartContainer.innerHTML = `
            <h4>Progress by Category</h4>
            <div class="category-progress">
                ${categoryStats.map(stat => `
                    <div class="progress-item">
                        <div class="progress-header">
                            <span>${stat.name}</span>
                            <span>${stat.solved}/${stat.total}</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${stat.percentage}%"></div>
                        </div>
                        <div class="progress-percentage">${Math.round(stat.percentage)}%</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    markProblemAsSolved(problemId) {
        this.solvedProblems.add(problemId);
        localStorage.setItem('solvedProblems', JSON.stringify([...this.solvedProblems]));
        
        // Update UI
        const problemCard = document.querySelector(`[data-problem-id="${problemId}"]`);
        if (problemCard) {
            problemCard.classList.add('solved');
            problemCard.querySelector('.problem-status').innerHTML = '<i class="fas fa-check"></i> Solved';
        }
    }

    showLoading() {
        this.isLoading = true;
        document.getElementById('loadingSpinner').style.display = 'flex';
    }

    hideLoading() {
        this.isLoading = false;
        document.getElementById('loadingSpinner').style.display = 'none';
    }

    showError(message) {
        // Create error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-circle"></i>
                <span>${message}</span>
                <button class="error-close"><i class="fas fa-times"></i></button>
            </div>
        `;

        document.body.appendChild(errorDiv);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);

        // Manual close
        errorDiv.querySelector('.error-close').addEventListener('click', () => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        });
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        
        // Update theme toggle button icon
        const themeIcon = document.querySelector('#toggleTheme i');
        if (themeIcon) {
            themeIcon.className = this.currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        
        // Update theme toggle button icon
        const themeIcon = document.querySelector('#toggleTheme i');
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dsaApp = new DSAApp();
});

// Global error handler
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    if (window.dsaApp) {
        window.dsaApp.showError('An unexpected error occurred. Please refresh the page.');
    }
});

// Service worker registration for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
