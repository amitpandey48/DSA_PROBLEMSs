import java.util.Stack;

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
public class QueueWithStacks {
    
    private Stack<Integer> inputStack;
    private Stack<Integer> outputStack;
    
    public QueueWithStacks() {
        inputStack = new Stack<>();
        outputStack = new Stack<>();
    }
    
    /**
     * Push element x to the back of queue.
     */
    public void push(int x) {
        inputStack.push(x);
    }
    
    /**
     * Removes the element from in front of queue and returns that element.
     */
    public int pop() {
        peek(); // Ensure output stack has elements
        return outputStack.pop();
    }
    
    /**
     * Get the front element.
     */
    public int peek() {
        if (outputStack.isEmpty()) {
            // Transfer all elements from input to output stack
            while (!inputStack.isEmpty()) {
                outputStack.push(inputStack.pop());
            }
        }
        return outputStack.peek();
    }
    
    /**
     * Returns whether the queue is empty.
     */
    public boolean empty() {
        return inputStack.isEmpty() && outputStack.isEmpty();
    }
    
    /**
     * Get the size of the queue.
     */
    public int size() {
        return inputStack.size() + outputStack.size();
    }
    
    /**
     * Display the current state of both stacks.
     */
    public void displayStacks() {
        System.out.println("Input Stack: " + inputStack);
        System.out.println("Output Stack: " + outputStack);
        System.out.println("Queue is empty: " + empty());
        System.out.println("Queue size: " + size());
        if (!empty()) {
            System.out.println("Front element: " + peek());
        }
        System.out.println();
    }
    
    // Main method for testing
    public static void main(String[] args) {
        QueueWithStacks queue = new QueueWithStacks();
        
        System.out.println("=== Queue Implementation using Stacks ===");
        System.out.println("Initial state:");
        queue.displayStacks();
        
        // Test push operations
        System.out.println("Pushing elements: 1, 2, 3, 4, 5");
        queue.push(1);
        queue.push(2);
        queue.push(3);
        queue.push(4);
        queue.push(5);
        queue.displayStacks();
        
        // Test peek operation
        System.out.println("Peeking front element:");
        System.out.println("Front element: " + queue.peek());
        queue.displayStacks();
        
        // Test pop operations
        System.out.println("Popping elements:");
        System.out.println("Popped: " + queue.pop());
        queue.displayStacks();
        
        System.out.println("Popped: " + queue.pop());
        queue.displayStacks();
        
        // Push more elements
        System.out.println("Pushing more elements: 6, 7");
        queue.push(6);
        queue.push(7);
        queue.displayStacks();
        
        // Pop remaining elements
        System.out.println("Popping remaining elements:");
        while (!queue.empty()) {
            System.out.println("Popped: " + queue.pop());
            queue.displayStacks();
        }
        
        System.out.println("Final state:");
        queue.displayStacks();
        
        // Test with empty queue
        System.out.println("Testing with empty queue:");
        System.out.println("Is empty: " + queue.empty());
        System.out.println("Size: " + queue.size());
    }
}



