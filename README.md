# DSA Solver - Data Structures and Algorithms Solutions

A comprehensive collection of Data Structures and Algorithms problems solved in Java and C++, along with an interactive web interface for learning and visualization.

## 📁 Project Structure

```
DsaSolver/
├── java/                    # Java solutions
│   ├── TwoSum.java
│   ├── ReverseLinkedList.java
│   ├── ValidParentheses.java
│   ├── MaximumSubarray.java
│   ├── BinaryTreeTraversal.java
│   ├── QueueWithStacks.java
│   ├── RemoveDuplicates.java
│   ├── RotateArray.java
│   ├── MergeSortedArray.java
│   └── MinStack.java
├── cpp/                     # C++ solutions
│   ├── TwoSum.cpp
│   ├── ReverseLinkedList.cpp
│   ├── ValidParentheses.cpp
│   ├── MaximumSubarray.cpp
│   ├── BinaryTreeTraversal.cpp
│   ├── QueueWithStacks.cpp
│   ├── RemoveDuplicates.cpp
│   ├── RotateArray.cpp
│   ├── MergeSortedArray.cpp
│   └── MinStack.cpp
├── data/                    # Problem and solution data
│   ├── problems.json
│   └── solutions.json
├── scripts/                 # JavaScript files
│   ├── main.js
│   ├── problemManager.js
│   ├── animationEngine.js
│   ├── syntaxHighlighter.js
│   └── submissionManager.js
├── styles/                  # CSS files
│   ├── main.css
│   └── animations.css
├── index.html              # Main web interface
├── compile_and_run.bat     # Windows compilation script
├── compile_and_run.sh      # Linux/Mac compilation script
└── README.md               # This file
```

## 🚀 Features

### Web Interface
- **Interactive Problem Browser**: Browse problems by category (Arrays, Linked Lists, Stacks, etc.)
- **Code Visualization**: Step-by-step algorithm visualization with animations
- **Multi-language Support**: Switch between Java and C++ implementations
- **Syntax Highlighting**: Beautiful code syntax highlighting
- **Progress Tracking**: Track your problem-solving progress
- **Search Functionality**: Search problems by title or tags
- **User Problem Submissions**: Submit your own problems for review
- **Admin Panel**: Manage and review user submissions
- **Responsive Design**: Works on desktop and mobile devices

### Code Solutions
- **Complete Implementations**: Full working solutions in Java and C++
- **Test Cases**: Each solution includes comprehensive test cases
- **Time & Space Complexity**: Detailed complexity analysis
- **Multiple Approaches**: Different algorithms for the same problem
- **Helper Functions**: Utility functions for testing and debugging

## 📚 Problem Categories

### 1. Arrays
- **Two Sum**: Find two numbers that add up to target
- **Maximum Subarray**: Kadane's algorithm implementation
- **Remove Duplicates from Sorted Array**: In-place duplicate removal
- **Rotate Array**: Array rotation by k steps
- **Merge Sorted Array**: Merge two sorted arrays
- **Contains Duplicate**: Check for duplicate elements
- **Best Time to Buy and Sell Stock**: Maximum profit calculation

### 2. Linked Lists
- **Reverse Linked List**: Iterative and recursive approaches
- **Merge Two Sorted Lists**: Merge sorted linked lists
- **Linked List Cycle**: Detect cycle using Floyd's algorithm

### 3. Stacks & Queues
- **Valid Parentheses**: Stack-based bracket matching
- **Implement Queue using Stacks**: Queue implementation with two stacks
- **Min Stack**: Stack with O(1) minimum retrieval
- **Evaluate Reverse Polish Notation**: Postfix expression evaluation

### 4. Trees
- **Binary Tree Traversal**: Inorder, Preorder, Postorder, Level-order
- **Binary Tree Level Order Traversal**: Breadth-first traversal
- **Maximum Depth of Binary Tree**: Find tree height
- **Symmetric Tree**: Check if tree is mirror of itself
- **Path Sum**: Find root-to-leaf path with given sum

### 5. Graphs
- **Number of Islands**: DFS/BFS for connected components
- **Course Schedule**: Topological sorting
- **Breadth First Search**: Graph traversal and shortest path
- **Depth First Search**: Graph traversal and reachability
- **Word Ladder**: Word transformation using BFS

### 6. Hashing
- **Contains Duplicate**: Hash set implementation
- **Group Anagrams**: Anagram grouping with hash maps
- **LRU Cache**: Least Recently Used cache implementation
- **Longest Substring Without Repeating Characters**: Sliding window with hash set

## 🛠️ How to Use

### Running Java Solutions
```bash
# Compile and run Java files
javac java/*.java
java -cp java TwoSum
java -cp java ReverseLinkedList
java -cp java ValidParentheses
java -cp java MaximumSubarray
java -cp java BinaryTreeTraversal
java -cp java QueueWithStacks
java -cp java RemoveDuplicates
java -cp java RotateArray
java -cp java MergeSortedArray
java -cp java MinStack
```

### Running C++ Solutions
```bash
# Compile and run C++ files
g++ -o cpp/TwoSum cpp/TwoSum.cpp
g++ -o cpp/ReverseLinkedList cpp/ReverseLinkedList.cpp
g++ -o cpp/ValidParentheses cpp/ValidParentheses.cpp
g++ -o cpp/MaximumSubarray cpp/MaximumSubarray.cpp
g++ -o cpp/BinaryTreeTraversal cpp/BinaryTreeTraversal.cpp
g++ -o cpp/QueueWithStacks cpp/QueueWithStacks.cpp
g++ -o cpp/RemoveDuplicates cpp/RemoveDuplicates.cpp
g++ -o cpp/RotateArray cpp/RotateArray.cpp
g++ -o cpp/MergeSortedArray cpp/MergeSortedArray.cpp
g++ -o cpp/MinStack cpp/MinStack.cpp

# Run the executables
./cpp/TwoSum
./cpp/ReverseLinkedList
./cpp/ValidParentheses
./cpp/MaximumSubarray
./cpp/BinaryTreeTraversal
./cpp/QueueWithStacks
./cpp/RemoveDuplicates
./cpp/RotateArray
./cpp/MergeSortedArray
./cpp/MinStack
```

### Using the Web Interface
1. Open `index.html` in a web browser
2. Browse problems by category using the sidebar
3. Click on any problem to view its details
4. Switch between Java and C++ implementations
5. Use the visualization tab to see step-by-step execution
6. Track your progress using the progress tracker
7. Submit your own problems using the "+" button
8. Access admin panel using the gear icon (for managing submissions)

## 🎯 Algorithm Implementations

### Two Sum (Hash Map Approach)
- **Time Complexity**: O(n)
- **Space Complexity**: O(n)
- **Approach**: Use hash map to store complements

### Reverse Linked List (Iterative)
- **Time Complexity**: O(n)
- **Space Complexity**: O(1)
- **Approach**: Three-pointer technique

### Valid Parentheses (Stack)
- **Time Complexity**: O(n)
- **Space Complexity**: O(n)
- **Approach**: Stack-based bracket matching

### Maximum Subarray (Kadane's Algorithm)
- **Time Complexity**: O(n)
- **Space Complexity**: O(1)
- **Approach**: Dynamic programming with optimal substructure

### Binary Tree Traversals
- **Inorder**: Left → Root → Right
- **Preorder**: Root → Left → Right
- **Postorder**: Left → Right → Root
- **Level Order**: Breadth-first using queue

## 🔧 Technical Details

### Web Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Interactive functionality and animations
- **Canvas API**: Custom algorithm visualizations

### Code Features
- **Modular Design**: Separated concerns with different modules
- **Error Handling**: Comprehensive error checking
- **Memory Management**: Proper memory cleanup in C++
- **Documentation**: Detailed comments and explanations

## 🎨 UI/UX Features

### Theme System
- **Dark Theme**: Modern dark interface with neon accents
- **Responsive Design**: Works on all screen sizes
- **Smooth Animations**: CSS transitions and JavaScript animations
- **Interactive Elements**: Hover effects and visual feedback

### Code Display
- **Syntax Highlighting**: Language-specific code coloring
- **Line Numbers**: Easy code navigation
- **Copy Functionality**: One-click code copying
- **Language Toggle**: Switch between Java and C++

## 📈 Progress Tracking

The web interface includes a comprehensive progress tracking system:
- **Solved Problems**: Track completed problems
- **Category Progress**: Progress by problem category
- **Difficulty Distribution**: Track progress by difficulty level
- **Visual Charts**: Progress visualization

## 🤝 Contributing

To add new problems or improve existing solutions:

1. **Add Problem Data**: Update `data/problems.json` with problem details
2. **Add Solutions**: Create Java and C++ solution files
3. **Update Solutions Data**: Add solution data to `data/solutions.json`
4. **Test Thoroughly**: Ensure all test cases pass
5. **Update Documentation**: Keep README and comments current

## 📝 License

This project is open source and available under the MIT License.

## 🎓 Learning Resources

This project is designed to help you learn DSA concepts through:
- **Interactive Visualizations**: See algorithms in action
- **Multiple Implementations**: Compare different approaches
- **Real-world Examples**: Practical problem-solving scenarios
- **Progressive Difficulty**: Start with easy problems and advance

---

**Happy Coding! 🚀**
#   D S A s l o v e r  
 #   D S A _ S L O V E R  
 