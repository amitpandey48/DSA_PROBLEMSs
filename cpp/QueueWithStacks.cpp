#include <stack>
#include <iostream>
using namespace std;

/**
 * Implement Queue using Stacks Problem Solution
 * 
 * Problem: Implement a first in first out (FIFO) queue using only two stacks. 
 * The implemented queue should support all the functions of a normal queue 
 * (push, peek, pop, and empty).
 * 
 * Time Complexity: O(1) amortized for all operations
 * Space Complexity: O(n)
 */
class MyQueue {
private:
    stack<int> inputStack;
    stack<int> outputStack;
    
    void transfer() {
        while (!inputStack.empty()) {
            outputStack.push(inputStack.top());
            inputStack.pop();
        }
    }
    
public:
    MyQueue() {}
    
    /**
     * Push element x to the back of queue.
     */
    void push(int x) {
        inputStack.push(x);
    }
    
    /**
     * Removes the element from in front of queue and returns that element.
     */
    int pop() {
        peek(); // Ensure output stack has elements
        int result = outputStack.top();
        outputStack.pop();
        return result;
    }
    
    /**
     * Get the front element.
     */
    int peek() {
        if (outputStack.empty()) {
            transfer();
        }
        return outputStack.top();
    }
    
    /**
     * Returns whether the queue is empty.
     */
    bool empty() {
        return inputStack.empty() && outputStack.empty();
    }
    
    /**
     * Get the size of the queue.
     */
    int size() {
        return inputStack.size() + outputStack.size();
    }
    
    /**
     * Display the current state of both stacks.
     */
    void displayStacks() {
        cout << "Input Stack: [";
        stack<int> tempInput = inputStack;
        stack<int> tempOutput = outputStack;
        
        // Display input stack (reverse order)
        stack<int> reversedInput;
        while (!tempInput.empty()) {
            reversedInput.push(tempInput.top());
            tempInput.pop();
        }
        while (!reversedInput.empty()) {
            cout << reversedInput.top();
            reversedInput.pop();
            if (!reversedInput.empty()) cout << ", ";
        }
        cout << "]" << endl;
        
        cout << "Output Stack: [";
        while (!tempOutput.empty()) {
            cout << tempOutput.top();
            tempOutput.pop();
            if (!tempOutput.empty()) cout << ", ";
        }
        cout << "]" << endl;
        
        cout << "Queue is empty: " << (empty() ? "true" : "false") << endl;
        cout << "Queue size: " << size() << endl;
        if (!empty()) {
            cout << "Front element: " << peek() << endl;
        }
        cout << endl;
    }
};

// Main function for testing
int main() {
    MyQueue queue;
    
    cout << "=== Queue Implementation using Stacks ===" << endl;
    cout << "Initial state:" << endl;
    queue.displayStacks();
    
    // Test push operations
    cout << "Pushing elements: 1, 2, 3, 4, 5" << endl;
    queue.push(1);
    queue.push(2);
    queue.push(3);
    queue.push(4);
    queue.push(5);
    queue.displayStacks();
    
    // Test peek operation
    cout << "Peeking front element:" << endl;
    cout << "Front element: " << queue.peek() << endl;
    queue.displayStacks();
    
    // Test pop operations
    cout << "Popping elements:" << endl;
    cout << "Popped: " << queue.pop() << endl;
    queue.displayStacks();
    
    cout << "Popped: " << queue.pop() << endl;
    queue.displayStacks();
    
    // Push more elements
    cout << "Pushing more elements: 6, 7" << endl;
    queue.push(6);
    queue.push(7);
    queue.displayStacks();
    
    // Pop remaining elements
    cout << "Popping remaining elements:" << endl;
    while (!queue.empty()) {
        cout << "Popped: " << queue.pop() << endl;
        queue.displayStacks();
    }
    
    cout << "Final state:" << endl;
    queue.displayStacks();
    
    // Test with empty queue
    cout << "Testing with empty queue:" << endl;
    cout << "Is empty: " << (queue.empty() ? "true" : "false") << endl;
    cout << "Size: " << queue.size() << endl;
    
    return 0;
}



