#include <stack>
#include <iostream>
#include <climits>
using namespace std;

/**
 * Min Stack Problem Solution
 * 
 * Problem: Design a stack that supports push, pop, top, and retrieving the minimum element 
 * in constant time. Implement the MinStack class with the specified methods.
 * 
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(n)
 */
class MinStack {
private:
    stack<int> mainStack;
    stack<int> minStack;
    
public:
    MinStack() {}
    
    /**
     * Push element x onto stack
     */
    void push(int x) {
        mainStack.push(x);
        
        // Update min stack
        if (minStack.empty() || x <= minStack.top()) {
            minStack.push(x);
        }
    }
    
    /**
     * Removes the element on top of the stack
     */
    void pop() {
        if (!mainStack.empty()) {
            int popped = mainStack.top();
            mainStack.pop();
            
            // Update min stack if the popped element was the minimum
            if (popped == minStack.top()) {
                minStack.pop();
            }
        }
    }
    
    /**
     * Get the top element
     */
    int top() {
        if (!mainStack.empty()) {
            return mainStack.top();
        }
        throw runtime_error("Stack is empty");
    }
    
    /**
     * Retrieve the minimum element in the stack
     */
    int getMin() {
        if (!minStack.empty()) {
            return minStack.top();
        }
        throw runtime_error("Stack is empty");
    }
    
    /**
     * Check if stack is empty
     */
    bool empty() {
        return mainStack.empty();
    }
    
    /**
     * Get stack size
     */
    int size() {
        return mainStack.size();
    }
    
    /**
     * Display current state of both stacks
     */
    void displayStacks() {
        cout << "Main Stack: [";
        stack<int> tempMain = mainStack;
        stack<int> tempMin = minStack;
        
        // Display main stack (reverse order)
        stack<int> reversedMain;
        while (!tempMain.empty()) {
            reversedMain.push(tempMain.top());
            tempMain.pop();
        }
        while (!reversedMain.empty()) {
            cout << reversedMain.top();
            reversedMain.pop();
            if (!reversedMain.empty()) cout << ", ";
        }
        cout << "]" << endl;
        
        cout << "Min Stack: [";
        while (!tempMin.empty()) {
            cout << tempMin.top();
            tempMin.pop();
            if (!tempMin.empty()) cout << ", ";
        }
        cout << "]" << endl;
        
        if (!empty()) {
            cout << "Top element: " << top() << endl;
            cout << "Minimum element: " << getMin() << endl;
        }
        cout << "Stack size: " << size() << endl;
        cout << endl;
    }
};

// Alternative implementation using a single stack with pairs
class MinStackSingleStack {
private:
    stack<pair<int, int>> stack; // {value, minSoFar}
    
public:
    MinStackSingleStack() {}
    
    void push(int x) {
        if (stack.empty()) {
            stack.push({x, x});
        } else {
            int minSoFar = min(x, stack.top().second);
            stack.push({x, minSoFar});
        }
    }
    
    void pop() {
        if (!stack.empty()) {
            stack.pop();
        }
    }
    
    int top() {
        if (!stack.empty()) {
            return stack.top().first;
        }
        throw runtime_error("Stack is empty");
    }
    
    int getMin() {
        if (!stack.empty()) {
            return stack.top().second;
        }
        throw runtime_error("Stack is empty");
    }
    
    bool empty() {
        return stack.empty();
    }
    
    int size() {
        return stack.size();
    }
    
    void displayStack() {
        cout << "Stack with pairs: [";
        stack<pair<int, int>> temp = stack;
        stack<pair<int, int>> reversed;
        
        // Reverse the stack for display
        while (!temp.empty()) {
            reversed.push(temp.top());
            temp.pop();
        }
        
        while (!reversed.empty()) {
            cout << "(" << reversed.top().first << "," << reversed.top().second << ")";
            reversed.pop();
            if (!reversed.empty()) cout << ", ";
        }
        cout << "]" << endl;
        
        if (!empty()) {
            cout << "Top element: " << top() << endl;
            cout << "Minimum element: " << getMin() << endl;
        }
        cout << "Stack size: " << size() << endl;
        cout << endl;
    }
};

// Main function for testing
int main() {
    cout << "=== Testing Two-Stack Implementation ===" << endl;
    MinStack minStack;
    
    // Test operations
    cout << "Pushing elements: -2, 0, -3" << endl;
    minStack.push(-2);
    minStack.displayStacks();
    
    minStack.push(0);
    minStack.displayStacks();
    
    minStack.push(-3);
    minStack.displayStacks();
    
    cout << "Getting minimum: " << minStack.getMin() << endl;
    cout << "Getting top: " << minStack.top() << endl;
    
    cout << "Popping element" << endl;
    minStack.pop();
    minStack.displayStacks();
    
    cout << "Getting top: " << minStack.top() << endl;
    cout << "Getting minimum: " << minStack.getMin() << endl;
    
    cout << "\n=== Testing Single-Stack Implementation ===" << endl;
    MinStackSingleStack singleStack;
    
    cout << "Pushing elements: -2, 0, -3" << endl;
    singleStack.push(-2);
    singleStack.displayStack();
    
    singleStack.push(0);
    singleStack.displayStack();
    
    singleStack.push(-3);
    singleStack.displayStack();
    
    cout << "Getting minimum: " << singleStack.getMin() << endl;
    cout << "Getting top: " << singleStack.top() << endl;
    
    cout << "Popping element" << endl;
    singleStack.pop();
    singleStack.displayStack();
    
    cout << "Getting top: " << singleStack.top() << endl;
    cout << "Getting minimum: " << singleStack.getMin() << endl;
    
    // Performance comparison
    cout << "\n=== Performance Comparison ===" << endl;
    MinStack twoStack;
    MinStackSingleStack oneStack;
    
    int testData[] = {5, 3, 7, 1, 9, 2, 8, 4, 6, 0};
    int dataSize = sizeof(testData) / sizeof(testData[0]);
    
    // Test two-stack implementation
    clock_t startTime = clock();
    for (int i = 0; i < 100000; i++) {
        for (int j = 0; j < dataSize; j++) {
            twoStack.push(testData[j]);
        }
        for (int j = 0; j < dataSize; j++) {
            twoStack.getMin();
            twoStack.top();
            twoStack.pop();
        }
    }
    clock_t endTime = clock();
    double twoStackTime = double(endTime - startTime) / CLOCKS_PER_SEC * 1000;
    cout << "Two-stack implementation time: " << twoStackTime << "ms" << endl;
    
    // Test single-stack implementation
    startTime = clock();
    for (int i = 0; i < 100000; i++) {
        for (int j = 0; j < dataSize; j++) {
            oneStack.push(testData[j]);
        }
        for (int j = 0; j < dataSize; j++) {
            oneStack.getMin();
            oneStack.top();
            oneStack.pop();
        }
    }
    endTime = clock();
    double oneStackTime = double(endTime - startTime) / CLOCKS_PER_SEC * 1000;
    cout << "Single-stack implementation time: " << oneStackTime << "ms" << endl;
    
    return 0;
}



