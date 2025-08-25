// Syntax Highlighter for C++ and Java
class SyntaxHighlighter {
    constructor() {
        this.keywords = {
            cpp: [
                'auto', 'break', 'case', 'char', 'const', 'continue', 'default', 'do',
                'double', 'else', 'enum', 'extern', 'float', 'for', 'goto', 'if',
                'int', 'long', 'register', 'return', 'short', 'signed', 'sizeof', 'static',
                'struct', 'switch', 'typedef', 'union', 'unsigned', 'void', 'volatile', 'while',
                'class', 'private', 'protected', 'public', 'friend', 'inline', 'template',
                'virtual', 'bool', 'true', 'false', 'namespace', 'using', 'try', 'catch',
                'throw', 'new', 'delete', 'this', 'operator', 'typeid', 'typename',
                'explicit', 'export', 'mutable', 'thread_local', 'constexpr', 'nullptr',
                'decltype', 'static_assert', 'alignas', 'alignof', 'noexcept'
            ],
            java: [
                'abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char',
                'class', 'const', 'continue', 'default', 'do', 'double', 'else', 'enum',
                'extends', 'final', 'finally', 'float', 'for', 'goto', 'if', 'implements',
                'import', 'instanceof', 'int', 'interface', 'long', 'native', 'new', 'package',
                'private', 'protected', 'public', 'return', 'short', 'static', 'strictfp',
                'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient',
                'try', 'void', 'volatile', 'while', 'true', 'false', 'null'
            ]
        };

        this.operators = [
            '\\+', '-', '\\*', '/', '%', '=', '==', '!=', '<', '>', '<=', '>=',
            '&&', '\\|\\|', '!', '&', '\\|', '\\^', '~', '<<', '>>', '\\+=', '-=',
            '\\*=', '/=', '%=', '&=', '\\|=', '\\^=', '<<=', '>>=', '\\+\\+', '--',
            '->', '\\.', '::', '\\?', ':'
        ];

        this.preprocessorDirectives = [
            '#include', '#define', '#ifdef', '#ifndef', '#if', '#else', '#elif',
            '#endif', '#pragma', '#undef', '#line', '#error', '#warning'
        ];

        this.javaAnnotations = [
            '@Override', '@Deprecated', '@SuppressWarnings', '@SafeVarargs',
            '@FunctionalInterface', '@Retention', '@Target', '@Documented',
            '@Inherited', '@Repeatable', '@Native'
        ];

        this.setupStyles();
    }

    setupStyles() {
        // Inject syntax highlighting styles if not already present
        if (!document.getElementById('syntax-highlight-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'syntax-highlight-styles';
            styleSheet.textContent = `
                .syntax-keyword { color: #ff79c6; font-weight: bold; }
                .syntax-string { color: #f1fa8c; }
                .syntax-comment { color: #6272a4; font-style: italic; }
                .syntax-number { color: #bd93f9; }
                .syntax-operator { color: #ff79c6; }
                .syntax-function { color: #50fa7b; font-weight: bold; }
                .syntax-type { color: #8be9fd; font-weight: bold; }
                .syntax-preprocessor { color: #ff79c6; font-weight: bold; }
                .syntax-annotation { color: #ffb86c; font-weight: bold; }
                .syntax-bracket { color: #f8f8f2; font-weight: bold; }
                .syntax-variable { color: #f8f8f2; }
                .syntax-constant { color: #bd93f9; font-weight: bold; }
                .code-line { 
                    display: block; 
                    line-height: 1.5; 
                    padding: 1px 0;
                    margin: 0;
                }
                .code-line.current {
                    background: rgba(0, 255, 136, 0.2);
                    border-left: 3px solid var(--accent-primary);
                    padding-left: 10px;
                    margin-left: -10px;
                }
                .code-line.executed {
                    background: rgba(0, 136, 255, 0.1);
                    border-left: 2px solid var(--accent-secondary);
                    padding-left: 8px;
                    margin-left: -8px;
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }

    highlight(code, language) {
        if (!code || !language) return code;

        // Normalize language
        language = language.toLowerCase();
        if (language === 'c++') language = 'cpp';

        // Split code into lines
        const lines = code.split('\n');
        const highlightedLines = lines.map((line, index) => {
            const highlightedLine = this.highlightLine(line, language);
            return `<span class="code-line" data-line="${index + 1}">${highlightedLine}</span>`;
        });

        return highlightedLines.join('\n');
    }

    highlightLine(line, language) {
        let highlighted = line;

        // Escape HTML first
        highlighted = this.escapeHtml(highlighted);

        // Highlight in specific order to avoid conflicts
        highlighted = this.highlightComments(highlighted, language);
        highlighted = this.highlightStrings(highlighted);
        highlighted = this.highlightPreprocessor(highlighted, language);
        highlighted = this.highlightAnnotations(highlighted, language);
        highlighted = this.highlightKeywords(highlighted, language);
        highlighted = this.highlightNumbers(highlighted);
        highlighted = this.highlightOperators(highlighted);
        highlighted = this.highlightFunctions(highlighted, language);
        highlighted = this.highlightTypes(highlighted, language);
        highlighted = this.highlightBrackets(highlighted);
        highlighted = this.highlightConstants(highlighted, language);

        return highlighted;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    highlightComments(text, language) {
        // Single line comments
        text = text.replace(/\/\/.*$/g, '<span class="syntax-comment">$&</span>');
        
        // Multi-line comments (simplified - assumes single line)
        text = text.replace(/\/\*.*?\*\//g, '<span class="syntax-comment">$&</span>');
        
        return text;
    }

    highlightStrings(text) {
        // Double quoted strings
        text = text.replace(/"(?:[^"\\]|\\.)*"/g, '<span class="syntax-string">$&</span>');
        
        // Single quoted strings (characters)
        text = text.replace(/'(?:[^'\\]|\\.)*'/g, '<span class="syntax-string">$&</span>');
        
        return text;
    }

    highlightPreprocessor(text, language) {
        if (language === 'cpp') {
            this.preprocessorDirectives.forEach(directive => {
                const regex = new RegExp(`\\b${directive.replace('#', '\\#')}\\b`, 'g');
                text = text.replace(regex, '<span class="syntax-preprocessor">$&</span>');
            });
        }
        return text;
    }

    highlightAnnotations(text, language) {
        if (language === 'java') {
            this.javaAnnotations.forEach(annotation => {
                const regex = new RegExp(`\\${annotation}\\b`, 'g');
                text = text.replace(regex, '<span class="syntax-annotation">$&</span>');
            });
        }
        return text;
    }

    highlightKeywords(text, language) {
        const keywords = this.keywords[language] || [];
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            text = text.replace(regex, '<span class="syntax-keyword">$&</span>');
        });
        return text;
    }

    highlightNumbers(text) {
        // Integer and floating point numbers
        text = text.replace(/\b\d+\.?\d*f?\b/g, '<span class="syntax-number">$&</span>');
        
        // Hexadecimal numbers
        text = text.replace(/\b0x[0-9a-fA-F]+\b/g, '<span class="syntax-number">$&</span>');
        
        return text;
    }

    highlightOperators(text) {
        this.operators.forEach(operator => {
            const regex = new RegExp(operator, 'g');
            text = text.replace(regex, '<span class="syntax-operator">$&</span>');
        });
        return text;
    }

    highlightFunctions(text, language) {
        // Function calls (word followed by opening parenthesis)
        text = text.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, 
            '<span class="syntax-function">$1</span>(');
        
        return text;
    }

    highlightTypes(text, language) {
        const types = {
            cpp: [
                'vector', 'string', 'map', 'set', 'unordered_map', 'unordered_set',
                'queue', 'stack', 'priority_queue', 'deque', 'list', 'array',
                'pair', 'tuple', 'shared_ptr', 'unique_ptr', 'weak_ptr'
            ],
            java: [
                'String', 'Integer', 'Boolean', 'Character', 'Double', 'Float',
                'Long', 'Short', 'Byte', 'Object', 'Class', 'ArrayList', 'HashMap',
                'HashSet', 'LinkedList', 'TreeMap', 'TreeSet', 'PriorityQueue',
                'Stack', 'Vector', 'StringBuilder', 'StringBuffer'
            ]
        };

        const languageTypes = types[language] || [];
        languageTypes.forEach(type => {
            const regex = new RegExp(`\\b${type}\\b`, 'g');
            text = text.replace(regex, '<span class="syntax-type">$&</span>');
        });

        return text;
    }

    highlightBrackets(text) {
        text = text.replace(/[{}()\[\]]/g, '<span class="syntax-bracket">$&</span>');
        return text;
    }

    highlightConstants(text, language) {
        const constants = {
            cpp: ['NULL', 'nullptr', 'TRUE', 'FALSE', 'EOF', 'INFINITY', 'NAN'],
            java: ['null', 'TRUE', 'FALSE', 'MAX_VALUE', 'MIN_VALUE', 'POSITIVE_INFINITY', 'NEGATIVE_INFINITY', 'NaN']
        };

        const languageConstants = constants[language] || [];
        languageConstants.forEach(constant => {
            const regex = new RegExp(`\\b${constant}\\b`, 'g');
            text = text.replace(regex, '<span class="syntax-constant">$&</span>');
        });

        return text;
    }

    // Method to highlight specific lines (used for animation)
    highlightCodeLines(codeElement, lineNumbers, className = 'current') {
        const lines = codeElement.querySelectorAll('.code-line');
        
        // Remove previous highlights
        lines.forEach(line => {
            line.classList.remove('current', 'executed', 'highlighted');
        });

        // Add new highlights
        lineNumbers.forEach(lineNum => {
            const line = codeElement.querySelector(`[data-line="${lineNum}"]`);
            if (line) {
                line.classList.add(className);
            }
        });
    }

    // Method to get plain text from highlighted code
    getPlainText(highlightedHtml) {
        const div = document.createElement('div');
        div.innerHTML = highlightedHtml;
        return div.textContent || div.innerText || '';
    }

    // Method to add line numbers
    addLineNumbers(highlightedCode) {
        const lines = highlightedCode.split('\n');
        const numberedLines = lines.map((line, index) => {
            const lineNumber = (index + 1).toString().padStart(3, ' ');
            return `<span class="line-number">${lineNumber}</span>${line}`;
        });

        // Add line number styles
        if (!document.getElementById('line-number-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'line-number-styles';
            styleSheet.textContent = `
                .line-number {
                    color: #6272a4;
                    margin-right: 1em;
                    user-select: none;
                    display: inline-block;
                    text-align: right;
                    width: 3em;
                }
            `;
            document.head.appendChild(styleSheet);
        }

        return numberedLines.join('\n');
    }

    // Method to format code with proper indentation
    formatCode(code, language) {
        let formatted = code;
        
        // Basic formatting rules
        const lines = formatted.split('\n');
        let indentLevel = 0;
        const indentSize = 4;
        
        const formattedLines = lines.map(line => {
            const trimmed = line.trim();
            
            if (!trimmed) return '';
            
            // Decrease indent for closing braces
            if (trimmed.startsWith('}')) {
                indentLevel = Math.max(0, indentLevel - 1);
            }
            
            const indentedLine = ' '.repeat(indentLevel * indentSize) + trimmed;
            
            // Increase indent for opening braces
            if (trimmed.endsWith('{')) {
                indentLevel++;
            }
            
            return indentedLine;
        });
        
        return formattedLines.join('\n');
    }

    // Method to validate syntax (basic validation)
    validateSyntax(code, language) {
        const errors = [];
        const lines = code.split('\n');
        
        let braceCount = 0;
        let parenCount = 0;
        let bracketCount = 0;
        
        lines.forEach((line, index) => {
            const lineNum = index + 1;
            
            // Count brackets
            for (const char of line) {
                switch (char) {
                    case '{': braceCount++; break;
                    case '}': braceCount--; break;
                    case '(': parenCount++; break;
                    case ')': parenCount--; break;
                    case '[': bracketCount++; break;
                    case ']': bracketCount--; break;
                }
                
                // Check for negative counts (closing without opening)
                if (braceCount < 0) {
                    errors.push(`Line ${lineNum}: Unmatched closing brace '}'`);
                    braceCount = 0;
                }
                if (parenCount < 0) {
                    errors.push(`Line ${lineNum}: Unmatched closing parenthesis ')'`);
                    parenCount = 0;
                }
                if (bracketCount < 0) {
                    errors.push(`Line ${lineNum}: Unmatched closing bracket ']'`);
                    bracketCount = 0;
                }
            }
        });
        
        // Check for unclosed brackets at end
        if (braceCount > 0) errors.push('Unclosed braces detected');
        if (parenCount > 0) errors.push('Unclosed parentheses detected');
        if (bracketCount > 0) errors.push('Unclosed brackets detected');
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
}
