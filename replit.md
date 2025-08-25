# DSA Problem Solver

## Overview

DSA Problem Solver is an interactive web application for learning data structures and algorithms through visual problem solving. The platform provides a comprehensive collection of algorithmic problems with step-by-step visualizations, syntax-highlighted code solutions, and progress tracking. Users can explore problems across different categories (arrays, linked lists, etc.), view solutions in multiple programming languages, and watch animated demonstrations of algorithm execution.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Single Page Application (SPA)**: Pure HTML/CSS/JavaScript implementation without frameworks
- **Modular JavaScript Design**: Class-based architecture with separate modules for different concerns:
  - `DSAApp`: Main application controller orchestrating all components
  - `ProblemManager`: Handles problem data loading and management
  - `AnimationEngine`: Manages algorithm visualization and step-by-step animations
  - `SyntaxHighlighter`: Provides code syntax highlighting for C++ and Java

### Data Management
- **JSON-based Data Storage**: Problems and solutions stored in static JSON files
  - `problems.json`: Contains problem definitions, constraints, examples, and metadata
  - `solutions.json`: Stores code solutions with complexity analysis and animation data
- **Client-side State Management**: Uses browser localStorage for user progress tracking
- **In-memory Caching**: Problems and solutions cached in JavaScript Maps for performance

### Animation System
- **Canvas-based Visualization**: Custom animation engine for algorithm step visualization
- **Step-by-step Execution**: Configurable animation speed with play/pause controls
- **Data Structure Rendering**: Visual representation of arrays, linked lists, and other structures
- **Interactive Controls**: Users can navigate through algorithm steps manually or automatically

### UI/UX Design
- **Responsive Grid Layout**: Flexbox-based responsive design for different screen sizes
- **Dark Theme**: Cyberpunk-inspired design with neon accents and custom CSS variables
- **Component-based CSS**: Modular stylesheet organization with animations and main styles separated
- **Interactive Elements**: Hover effects, transitions, and visual feedback throughout the interface

### Code Highlighting
- **Custom Syntax Highlighter**: Built-in syntax highlighting for C++ and Java
- **Multi-language Support**: Extensible system for adding more programming languages
- **Code Analysis Integration**: Complexity analysis display alongside highlighted code

### Search and Filtering
- **Real-time Search**: Instant problem filtering based on title and description
- **Category Navigation**: Problems organized by data structure types
- **Progress Tracking**: Visual indicators for solved vs unsolved problems

## External Dependencies

### Frontend Libraries
- **Font Awesome 6.0.0**: Icon library for UI elements and visual indicators
- **Google Fonts**: 
  - Orbitron: Primary display font for headers and branding
  - Roboto Mono: Monospace font for code display and technical content

### Browser APIs
- **localStorage**: Persistent storage for user progress and preferences
- **Fetch API**: HTTP requests for loading JSON data files
- **Canvas API**: (Prepared for) algorithm visualization rendering

### Asset Dependencies
- **Static JSON Files**: Problem and solution data served as static assets
- **CSS Custom Properties**: Modern CSS variables for theming system
- **ES6+ JavaScript**: Modern JavaScript features including classes, async/await, and modules

### Development Considerations
- **No Build Process**: Direct browser execution without compilation or bundling
- **Static File Serving**: Designed to work with simple HTTP servers
- **Progressive Enhancement**: Core functionality works without advanced browser features