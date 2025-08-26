#!/bin/bash

echo "========================================"
echo "DSA Solver - Compilation and Testing"
echo "========================================"
echo

echo "Creating directories if they don't exist..."
mkdir -p java cpp bin

echo
echo "========================================"
echo "Compiling Java Solutions..."
echo "========================================"

echo "Compiling TwoSum.java..."
javac -d bin java/TwoSum.java
if [ $? -eq 0 ]; then
    echo "✓ TwoSum.java compiled successfully"
else
    echo "✗ Error compiling TwoSum.java"
fi

echo "Compiling ReverseLinkedList.java..."
javac -d bin java/ReverseLinkedList.java
if [ $? -eq 0 ]; then
    echo "✓ ReverseLinkedList.java compiled successfully"
else
    echo "✗ Error compiling ReverseLinkedList.java"
fi

echo "Compiling ValidParentheses.java..."
javac -d bin java/ValidParentheses.java
if [ $? -eq 0 ]; then
    echo "✓ ValidParentheses.java compiled successfully"
else
    echo "✗ Error compiling ValidParentheses.java"
fi

echo "Compiling MaximumSubarray.java..."
javac -d bin java/MaximumSubarray.java
if [ $? -eq 0 ]; then
    echo "✓ MaximumSubarray.java compiled successfully"
else
    echo "✗ Error compiling MaximumSubarray.java"
fi

echo "Compiling BinaryTreeTraversal.java..."
javac -d bin java/BinaryTreeTraversal.java
if [ $? -eq 0 ]; then
    echo "✓ BinaryTreeTraversal.java compiled successfully"
else
    echo "✗ Error compiling BinaryTreeTraversal.java"
fi

echo "Compiling QueueWithStacks.java..."
javac -d bin java/QueueWithStacks.java
if [ $? -eq 0 ]; then
    echo "✓ QueueWithStacks.java compiled successfully"
else
    echo "✗ Error compiling QueueWithStacks.java"
fi

echo
echo "========================================"
echo "Compiling C++ Solutions..."
echo "========================================"

echo "Compiling TwoSum.cpp..."
g++ -o bin/TwoSum cpp/TwoSum.cpp
if [ $? -eq 0 ]; then
    echo "✓ TwoSum.cpp compiled successfully"
else
    echo "✗ Error compiling TwoSum.cpp"
fi

echo "Compiling ReverseLinkedList.cpp..."
g++ -o bin/ReverseLinkedList cpp/ReverseLinkedList.cpp
if [ $? -eq 0 ]; then
    echo "✓ ReverseLinkedList.cpp compiled successfully"
else
    echo "✗ Error compiling ReverseLinkedList.cpp"
fi

echo "Compiling ValidParentheses.cpp..."
g++ -o bin/ValidParentheses cpp/ValidParentheses.cpp
if [ $? -eq 0 ]; then
    echo "✓ ValidParentheses.cpp compiled successfully"
else
    echo "✗ Error compiling ValidParentheses.cpp"
fi

echo "Compiling MaximumSubarray.cpp..."
g++ -o bin/MaximumSubarray cpp/MaximumSubarray.cpp
if [ $? -eq 0 ]; then
    echo "✓ MaximumSubarray.cpp compiled successfully"
else
    echo "✗ Error compiling MaximumSubarray.cpp"
fi

echo "Compiling BinaryTreeTraversal.cpp..."
g++ -o bin/BinaryTreeTraversal cpp/BinaryTreeTraversal.cpp
if [ $? -eq 0 ]; then
    echo "✓ BinaryTreeTraversal.cpp compiled successfully"
else
    echo "✗ Error compiling BinaryTreeTraversal.cpp"
fi

echo "Compiling QueueWithStacks.cpp..."
g++ -o bin/QueueWithStacks cpp/QueueWithStacks.cpp
if [ $? -eq 0 ]; then
    echo "✓ QueueWithStacks.cpp compiled successfully"
else
    echo "✗ Error compiling QueueWithStacks.cpp"
fi

echo
echo "========================================"
echo "Compilation Complete!"
echo "========================================"
echo
echo "To run Java programs:"
echo "  java -cp bin TwoSum"
echo "  java -cp bin ReverseLinkedList"
echo "  java -cp bin ValidParentheses"
echo "  java -cp bin MaximumSubarray"
echo "  java -cp bin BinaryTreeTraversal"
echo "  java -cp bin QueueWithStacks"
echo
echo "To run C++ programs:"
echo "  ./bin/TwoSum"
echo "  ./bin/ReverseLinkedList"
echo "  ./bin/ValidParentheses"
echo "  ./bin/MaximumSubarray"
echo "  ./bin/BinaryTreeTraversal"
echo "  ./bin/QueueWithStacks"
echo
echo "To open the web interface:"
echo "  open index.html  # macOS"
echo "  xdg-open index.html  # Linux"
echo



