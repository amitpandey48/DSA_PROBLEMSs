// Animation Engine for Algorithm Visualization
class AnimationEngine {
    constructor() {
        this.canvas = null;
        this.animationData = null;
        this.dataStructureType = null;
        this.currentStep = 0;
        this.isPlaying = false;
        this.isPaused = false;
        this.speed = 1;
        this.steps = [];
        this.variables = {};
        this.elements = [];
        this.animationId = null;
        this.stepDelay = 1000; // Default 1 second per step
        
        this.setupEventHandlers();
    }

    setupEventHandlers() {
        // Bind methods to maintain context
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.reset = this.reset.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.previousStep = this.previousStep.bind(this);
    }

    initialize(canvas, animationData, dataStructureType) {
        this.canvas = canvas;
        this.animationData = animationData;
        this.dataStructureType = dataStructureType;
        this.currentStep = 0;
        this.isPlaying = false;
        this.isPaused = false;
        
        if (animationData) {
            this.steps = animationData.steps || [];
            this.variables = { ...animationData.initialVariables } || {};
            this.setupCanvas();
            this.renderInitialState();
        }
    }

    setupCanvas() {
        this.canvas.innerHTML = '';
        this.canvas.className = 'animation-canvas';
        
        // Add step counter
        const stepCounter = document.createElement('div');
        stepCounter.className = 'step-counter';
        stepCounter.id = 'stepCounter';
        stepCounter.textContent = `Step: 0 / ${this.steps.length}`;
        this.canvas.appendChild(stepCounter);

        // Add complexity display
        const complexityDisplay = document.createElement('div');
        complexityDisplay.className = 'complexity-display';
        complexityDisplay.innerHTML = `
            <div class="complexity-time">Time: ${this.animationData.timeComplexity || 'N/A'}</div>
            <div class="complexity-space">Space: ${this.animationData.spaceComplexity || 'N/A'}</div>
        `;
        this.canvas.appendChild(complexityDisplay);

        // Create main animation area
        const animationArea = document.createElement('div');
        animationArea.className = 'animation-area';
        animationArea.id = 'animationArea';
        this.canvas.appendChild(animationArea);
    }

    renderInitialState() {
        const animationArea = document.getElementById('animationArea');
        animationArea.innerHTML = '';

        switch (this.dataStructureType) {
            case 'array':
                this.renderArrayVisualization(animationArea);
                break;
            case 'linkedlist':
                this.renderLinkedListVisualization(animationArea);
                break;
            case 'stack':
                this.renderStackVisualization(animationArea);
                break;
            case 'queue':
                this.renderQueueVisualization(animationArea);
                break;
            case 'tree':
                this.renderTreeVisualization(animationArea);
                break;
            case 'graph':
                this.renderGraphVisualization(animationArea);
                break;
            default:
                this.renderGenericVisualization(animationArea);
        }

        this.updateVariableTracker();
    }

    renderArrayVisualization(container) {
        const arrayData = this.animationData.initialData || [5, 2, 8, 1, 9, 3];
        const arrayContainer = document.createElement('div');
        arrayContainer.className = 'array-container';
        arrayContainer.innerHTML = `
            <div class="array-label">Array:</div>
            <div class="array-elements" id="arrayElements">
                ${arrayData.map((value, index) => `
                    <div class="array-element" data-index="${index}" id="element-${index}">
                        <div class="element-value">${value}</div>
                        <div class="element-index">${index}</div>
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(arrayContainer);

        // Add pointers if specified
        if (this.animationData.pointers) {
            const pointersContainer = document.createElement('div');
            pointersContainer.className = 'pointers-container';
            pointersContainer.id = 'pointersContainer';
            this.animationData.pointers.forEach(pointer => {
                const pointerElement = document.createElement('div');
                pointerElement.className = `pointer pointer-${pointer.name}`;
                pointerElement.id = `pointer-${pointer.name}`;
                pointerElement.textContent = pointer.name;
                pointerElement.style.display = 'none';
                pointersContainer.appendChild(pointerElement);
            });
            container.appendChild(pointersContainer);
        }
    }

    renderLinkedListVisualization(container) {
        const listData = this.animationData.initialData || [1, 2, 3, 4];
        const listContainer = document.createElement('div');
        listContainer.className = 'linkedlist-container';
        listContainer.innerHTML = `
            <div class="linkedlist-label">Linked List:</div>
            <div class="linkedlist-nodes" id="linkedlistNodes">
                ${listData.map((value, index) => `
                    <div class="linkedlist-node" data-index="${index}" id="node-${index}">
                        <div class="node-data">${value}</div>
                        <div class="node-pointer">${index < listData.length - 1 ? '→' : 'null'}</div>
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(listContainer);
    }

    renderStackVisualization(container) {
        const stackData = this.animationData.initialData || [1, 2, 3];
        const stackContainer = document.createElement('div');
        stackContainer.className = 'stack-visualization';
        stackContainer.innerHTML = `
            <div class="stack-label">Stack (LIFO):</div>
            <div class="stack-container" id="stackContainer">
                ${stackData.reverse().map((value, index) => `
                    <div class="stack-element" data-index="${stackData.length - 1 - index}" id="stack-${stackData.length - 1 - index}">
                        ${value}
                    </div>
                `).join('')}
            </div>
            <div class="stack-top-indicator">← Top</div>
        `;
        container.appendChild(stackContainer);
    }

    renderQueueVisualization(container) {
        const queueData = this.animationData.initialData || [1, 2, 3, 4];
        const queueContainer = document.createElement('div');
        queueContainer.className = 'queue-visualization';
        queueContainer.innerHTML = `
            <div class="queue-label">Queue (FIFO):</div>
            <div class="queue-indicators">
                <span class="front-indicator">Front →</span>
                <span class="rear-indicator">← Rear</span>
            </div>
            <div class="queue-container" id="queueContainer">
                ${queueData.map((value, index) => `
                    <div class="queue-element" data-index="${index}" id="queue-${index}">
                        ${value}
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(queueContainer);
    }

    renderTreeVisualization(container) {
        const treeData = this.animationData.initialData || {
            value: 1,
            left: { value: 2, left: { value: 4 }, right: { value: 5 } },
            right: { value: 3, left: { value: 6 }, right: { value: 7 } }
        };

        const treeContainer = document.createElement('div');
        treeContainer.className = 'tree-visualization';
        treeContainer.innerHTML = '<div class="tree-label">Binary Tree:</div>';
        
        const treeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        treeSvg.setAttribute('width', '400');
        treeSvg.setAttribute('height', '300');
        treeSvg.setAttribute('id', 'treeSvg');
        
        this.renderTreeNode(treeSvg, treeData, 200, 50, 0, 100);
        treeContainer.appendChild(treeSvg);
        container.appendChild(treeContainer);
    }

    renderTreeNode(svg, node, x, y, level, spacing) {
        if (!node) return;

        // Create node circle
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', '20');
        circle.setAttribute('fill', 'var(--card-bg)');
        circle.setAttribute('stroke', 'var(--border-color)');
        circle.setAttribute('stroke-width', '2');
        circle.setAttribute('id', `tree-node-${node.value}`);
        svg.appendChild(circle);

        // Create node text
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y + 5);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', 'var(--text-primary)');
        text.textContent = node.value;
        svg.appendChild(text);

        // Render children
        const nextSpacing = spacing * 0.6;
        if (node.left) {
            const leftX = x - spacing;
            const leftY = y + 60;
            
            // Draw edge
            const leftEdge = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            leftEdge.setAttribute('x1', x - 15);
            leftEdge.setAttribute('y1', y + 15);
            leftEdge.setAttribute('x2', leftX + 15);
            leftEdge.setAttribute('y2', leftY - 15);
            leftEdge.setAttribute('stroke', 'var(--border-color)');
            leftEdge.setAttribute('stroke-width', '2');
            svg.appendChild(leftEdge);

            this.renderTreeNode(svg, node.left, leftX, leftY, level + 1, nextSpacing);
        }

        if (node.right) {
            const rightX = x + spacing;
            const rightY = y + 60;
            
            // Draw edge
            const rightEdge = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            rightEdge.setAttribute('x1', x + 15);
            rightEdge.setAttribute('y1', y + 15);
            rightEdge.setAttribute('x2', rightX - 15);
            rightEdge.setAttribute('y2', rightY - 15);
            rightEdge.setAttribute('stroke', 'var(--border-color)');
            rightEdge.setAttribute('stroke-width', '2');
            svg.appendChild(rightEdge);

            this.renderTreeNode(svg, node.right, rightX, rightY, level + 1, nextSpacing);
        }
    }

    renderGraphVisualization(container) {
        const graphData = this.animationData.initialData || {
            nodes: [
                { id: 'A', x: 100, y: 100 },
                { id: 'B', x: 200, y: 100 },
                { id: 'C', x: 300, y: 100 },
                { id: 'D', x: 150, y: 200 },
                { id: 'E', x: 250, y: 200 }
            ],
            edges: [
                { from: 'A', to: 'B' },
                { from: 'B', to: 'C' },
                { from: 'A', to: 'D' },
                { from: 'B', to: 'E' },
                { from: 'D', to: 'E' }
            ]
        };

        const graphContainer = document.createElement('div');
        graphContainer.className = 'graph-visualization';
        graphContainer.innerHTML = '<div class="graph-label">Graph:</div>';
        
        const graphSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        graphSvg.setAttribute('width', '400');
        graphSvg.setAttribute('height', '300');
        graphSvg.setAttribute('id', 'graphSvg');

        // Render edges first
        graphData.edges.forEach((edge, index) => {
            const fromNode = graphData.nodes.find(n => n.id === edge.from);
            const toNode = graphData.nodes.find(n => n.id === edge.to);
            
            if (fromNode && toNode) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', fromNode.x);
                line.setAttribute('y1', fromNode.y);
                line.setAttribute('x2', toNode.x);
                line.setAttribute('y2', toNode.y);
                line.setAttribute('stroke', 'var(--border-color)');
                line.setAttribute('stroke-width', '2');
                line.setAttribute('id', `edge-${edge.from}-${edge.to}`);
                graphSvg.appendChild(line);
            }
        });

        // Render nodes
        graphData.nodes.forEach(node => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', node.x);
            circle.setAttribute('cy', node.y);
            circle.setAttribute('r', '25');
            circle.setAttribute('fill', 'var(--card-bg)');
            circle.setAttribute('stroke', 'var(--border-color)');
            circle.setAttribute('stroke-width', '2');
            circle.setAttribute('id', `graph-node-${node.id}`);
            graphSvg.appendChild(circle);

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', node.x);
            text.setAttribute('y', node.y + 5);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('fill', 'var(--text-primary)');
            text.textContent = node.id;
            graphSvg.appendChild(text);
        });

        graphContainer.appendChild(graphSvg);
        container.appendChild(graphContainer);
    }

    renderGenericVisualization(container) {
        const genericContainer = document.createElement('div');
        genericContainer.className = 'generic-visualization';
        genericContainer.innerHTML = `
            <div class="generic-content">
                <h3>Algorithm Visualization</h3>
                <p>Follow the step-by-step execution below:</p>
                <div class="algorithm-steps" id="algorithmSteps">
                    ${this.steps.map((step, index) => `
                        <div class="algorithm-step" data-step="${index}" id="step-${index}">
                            <strong>Step ${index + 1}:</strong> ${step.description || 'Processing...'}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        container.appendChild(genericContainer);
    }

    play() {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        this.isPaused = false;
        
        if (this.currentStep >= this.steps.length) {
            this.currentStep = 0;
        }
        
        this.executeAnimation();
    }

    pause() {
        this.isPlaying = false;
        this.isPaused = true;
        
        if (this.animationId) {
            clearTimeout(this.animationId);
            this.animationId = null;
        }
    }

    reset() {
        this.isPlaying = false;
        this.isPaused = false;
        this.currentStep = 0;
        
        if (this.animationId) {
            clearTimeout(this.animationId);
            this.animationId = null;
        }
        
        // Reset variables to initial state
        this.variables = { ...this.animationData.initialVariables } || {};
        
        // Re-render initial state
        this.renderInitialState();
        this.updateStepCounter();
    }

    executeAnimation() {
        if (!this.isPlaying || this.currentStep >= this.steps.length) {
            this.isPlaying = false;
            return;
        }

        const step = this.steps[this.currentStep];
        this.executeStep(step);
        
        this.currentStep++;
        this.updateStepCounter();
        this.updateVariableTracker();

        // Schedule next step
        const delay = this.stepDelay / this.speed;
        this.animationId = setTimeout(() => {
            this.executeAnimation();
        }, delay);
    }

    executeStep(step) {
        // Update variables
        if (step.variables) {
            Object.assign(this.variables, step.variables);
        }

        // Execute animations based on step type
        switch (step.type) {
            case 'highlight':
                this.highlightElement(step.target, step.style || 'current');
                break;
            case 'unhighlight':
                this.unhighlightElement(step.target);
                break;
            case 'swap':
                this.swapElements(step.targets[0], step.targets[1]);
                break;
            case 'move':
                this.moveElement(step.target, step.position);
                break;
            case 'compare':
                this.compareElements(step.targets, step.result);
                break;
            case 'insert':
                this.insertElement(step.target, step.value, step.position);
                break;
            case 'delete':
                this.deleteElement(step.target);
                break;
            case 'traverse':
                this.traverseElement(step.target);
                break;
            case 'pointer':
                this.movePointer(step.pointer, step.position);
                break;
            case 'codeHighlight':
                this.highlightCodeLine(step.lineNumber);
                break;
        }

        // Show step description
        this.showStepDescription(step.description);
    }

    highlightElement(elementId, style = 'current') {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('current', 'comparing', 'swapping', 'visited', 'sorted');
            element.classList.add(style);
        }
    }

    unhighlightElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('current', 'comparing', 'swapping', 'visited', 'sorted');
        }
    }

    swapElements(id1, id2) {
        const element1 = document.getElementById(id1);
        const element2 = document.getElementById(id2);
        
        if (element1 && element2) {
            // Add swapping animation class
            element1.classList.add('swapping');
            element2.classList.add('swapping');
            
            // Swap values
            const temp = element1.querySelector('.element-value').textContent;
            element1.querySelector('.element-value').textContent = element2.querySelector('.element-value').textContent;
            element2.querySelector('.element-value').textContent = temp;
            
            // Remove animation class after animation completes
            setTimeout(() => {
                element1.classList.remove('swapping');
                element2.classList.remove('swapping');
            }, 300);
        }
    }

    compareElements(elementIds, result) {
        elementIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.add('comparing');
                setTimeout(() => {
                    element.classList.remove('comparing');
                }, 500);
            }
        });
    }

    movePointer(pointerName, position) {
        const pointer = document.getElementById(`pointer-${pointerName}`);
        const targetElement = document.getElementById(`element-${position}`);
        
        if (pointer && targetElement) {
            const rect = targetElement.getBoundingClientRect();
            const containerRect = pointer.parentElement.getBoundingClientRect();
            
            pointer.style.display = 'block';
            pointer.style.left = (rect.left - containerRect.left) + 'px';
            pointer.style.top = (rect.bottom - containerRect.top + 5) + 'px';
        }
    }

    highlightCodeLine(lineNumber) {
        // Remove previous highlights
        document.querySelectorAll('.code-line').forEach(line => {
            line.classList.remove('current', 'executed');
        });
        
        // Highlight current line
        const codeLine = document.querySelector(`.code-line[data-line="${lineNumber}"]`);
        if (codeLine) {
            codeLine.classList.add('current');
        }
    }

    showStepDescription(description) {
        const stepDescription = document.getElementById('stepDescription');
        if (stepDescription) {
            stepDescription.textContent = description;
            stepDescription.classList.add('updated');
            setTimeout(() => {
                stepDescription.classList.remove('updated');
            }, 500);
        }
    }

    updateStepCounter() {
        const stepCounter = document.getElementById('stepCounter');
        if (stepCounter) {
            stepCounter.textContent = `Step: ${this.currentStep} / ${this.steps.length}`;
            stepCounter.classList.add('updating');
            setTimeout(() => {
                stepCounter.classList.remove('updating');
            }, 300);
        }
    }

    updateVariableTracker() {
        Object.keys(this.variables).forEach(varName => {
            const varElement = document.getElementById(`var-${varName}`);
            if (varElement) {
                const valueElement = varElement.querySelector('.variable-value');
                if (valueElement) {
                    const newValue = this.variables[varName];
                    if (valueElement.textContent !== String(newValue)) {
                        valueElement.textContent = newValue;
                        varElement.classList.add('variable-change');
                        setTimeout(() => {
                            varElement.classList.remove('variable-change');
                        }, 800);
                    }
                }
            }
        });
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    nextStep() {
        if (this.currentStep < this.steps.length) {
            this.pause();
            const step = this.steps[this.currentStep];
            this.executeStep(step);
            this.currentStep++;
            this.updateStepCounter();
            this.updateVariableTracker();
        }
    }

    previousStep() {
        if (this.currentStep > 0) {
            this.pause();
            this.currentStep--;
            // Would need to implement reverse step execution
            // For now, just reset and play to current step
            this.reset();
            for (let i = 0; i < this.currentStep; i++) {
                this.executeStep(this.steps[i]);
            }
            this.updateStepCounter();
            this.updateVariableTracker();
        }
    }

    stop() {
        this.pause();
        this.reset();
    }

    resize() {
        // Handle canvas resize if needed
        if (this.canvas) {
            // Re-render visualization to fit new size
            this.renderInitialState();
        }
    }

    // Utility methods
    createElementWithClass(tag, className, content = '') {
        const element = document.createElement(tag);
        element.className = className;
        if (content) element.textContent = content;
        return element;
    }

    animateCSS(element, animationName, duration = 1000) {
        return new Promise((resolve) => {
            const animationEnd = () => {
                element.style.animationName = '';
                element.style.animationDuration = '';
                element.removeEventListener('animationend', animationEnd);
                resolve();
            };

            element.style.animationName = animationName;
            element.style.animationDuration = duration + 'ms';
            element.addEventListener('animationend', animationEnd);
        });
    }

    // Performance optimization
    requestAnimationFrame(callback) {
        return window.requestAnimationFrame(callback);
    }

    cancelAnimationFrame(id) {
        return window.cancelAnimationFrame(id);
    }
}
