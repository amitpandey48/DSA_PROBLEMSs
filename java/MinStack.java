import java.util.Stack;

/**
 * Min Stack Problem Solution
 * 
 * Problem: Design a stack that supports push, pop, top, and retrieving the minimum element 
 * in constant time. Implement the MinStack class with the specified methods.
 * 
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(n)
 */
public class MinStack {
    
    private Stack<Integer> mainStack;
    private Stack<Integer> minStack;
    
    public MinStack() {
        mainStack = new Stack<>();
        minStack = new Stack<>();
    }
    
    /**
     * Push element x onto stack
     */
    public void push(int x) {
        mainStack.push(x);
        
        // Update min stack
        if (minStack.isEmpty() || x <= minStack.peek()) {
            minStack.push(x);
        }
    }
    
    /**
     * Removes the element on top of the stack
     */
    public void pop() {
        if (!mainStack.isEmpty()) {
            int popped = mainStack.pop();
            
            // Update min stack if the popped element was the minimum
            if (popped == minStack.peek()) {
                minStack.pop();
            }
        }
    }
    
    /**
     * Get the top element
     */
    public int top() {
        if (!mainStack.isEmpty()) {
            return mainStack.peek();
        }
        throw new IllegalStateException("Stack is empty");
    }
    
    /**
     * Retrieve the minimum element in the stack
     */
    public int getMin() {
        if (!minStack.isEmpty()) {
            return minStack.peek();
        }
        throw new IllegalStateException("Stack is empty");
    }
    
    /**
     * Check if stack is empty
     */
    public boolean isEmpty() {
        return mainStack.isEmpty();
    }
    
    /**
     * Get stack size
     */
    public int size() {
        return mainStack.size();
    }
    
    /**
     * Display current state of both stacks
     */
    public void displayStacks() {
        System.out.println("Main Stack: " + mainStack);
        System.out.println("Min Stack: " + minStack);
        if (!isEmpty()) {
            System.out.println("Top element: " + top());
            System.out.println("Minimum element: " + getMin());
        }
        System.out.println("Stack size: " + size());
        System.out.println();
    }
    
    // Alternative implementation using a single stack with pairs
    public static class MinStackSingleStack {
        private Stack<int[]> stack; // [value, minSoFar]
        
        public MinStackSingleStack() {
            stack = new Stack<>();
        }
        
        public void push(int x) {
            if (stack.isEmpty()) {
                stack.push(new int[]{x, x});
            } else {
                int minSoFar = Math.min(x, stack.peek()[1]);
                stack.push(new int[]{x, minSoFar});
            }
        }
        
        public void pop() {
            if (!stack.isEmpty()) {
                stack.pop();
            }
        }
        
        public int top() {
            if (!stack.isEmpty()) {
                return stack.peek()[0];
            }
            throw new IllegalStateException("Stack is empty");
        }
        
        public int getMin() {
            if (!stack.isEmpty()) {
                return stack.peek()[1];
            }
            throw new IllegalStateException("Stack is empty");
        }
        
        public boolean isEmpty() {
            return stack.isEmpty();
        }
        
        public int size() {
            return stack.size();
        }
        
        public void displayStack() {
            System.out.println("Stack with pairs: " + stack);
            if (!isEmpty()) {
                System.out.println("Top element: " + top());
                System.out.println("Minimum element: " + getMin());
            }
            System.out.println("Stack size: " + size());
            System.out.println();
        }
    }
    
    // Main method for testing
    public static void main(String[] args) {
        System.out.println("=== Testing Two-Stack Implementation ===");
        MinStack minStack = new MinStack();
        
        // Test operations
        System.out.println("Pushing elements: -2, 0, -3");
        minStack.push(-2);
        minStack.displayStacks();
        
        minStack.push(0);
        minStack.displayStacks();
        
        minStack.push(-3);
        minStack.displayStacks();
        
        System.out.println("Getting minimum: " + minStack.getMin());
        System.out.println("Getting top: " + minStack.top());
        
        System.out.println("Popping element");
        minStack.pop();
        minStack.displayStacks();
        
        System.out.println("Getting top: " + minStack.top());
        System.out.println("Getting minimum: " + minStack.getMin());
        
        System.out.println("\n=== Testing Single-Stack Implementation ===");
        MinStackSingleStack singleStack = new MinStackSingleStack();
        
        System.out.println("Pushing elements: -2, 0, -3");
        singleStack.push(-2);
        singleStack.displayStack();
        
        singleStack.push(0);
        singleStack.displayStack();
        
        singleStack.push(-3);
        singleStack.displayStack();
        
        System.out.println("Getting minimum: " + singleStack.getMin());
        System.out.println("Getting top: " + singleStack.top());
        
        System.out.println("Popping element");
        singleStack.pop();
        singleStack.displayStack();
        
        System.out.println("Getting top: " + singleStack.top());
        System.out.println("Getting minimum: " + singleStack.getMin());
        
        // Performance comparison
        System.out.println("\n=== Performance Comparison ===");
        MinStack twoStack = new MinStack();
        MinStackSingleStack oneStack = new MinStackSingleStack();
        
        int[] testData = {5, 3, 7, 1, 9, 2, 8, 4, 6, 0};
        
        // Test two-stack implementation
        long startTime = System.currentTimeMillis();
        for (int i = 0; i < 100000; i++) {
            for (int num : testData) {
                twoStack.push(num);
            }
            for (int j = 0; j < testData.length; j++) {
                twoStack.getMin();
                twoStack.top();
                twoStack.pop();
            }
        }
        long endTime = System.currentTimeMillis();
        System.out.println("Two-stack implementation time: " + (endTime - startTime) + "ms");
        
        // Test single-stack implementation
        startTime = System.currentTimeMillis();
        for (int i = 0; i < 100000; i++) {
            for (int num : testData) {
                oneStack.push(num);
            }
            for (int j = 0; j < testData.length; j++) {
                oneStack.getMin();
                oneStack.top();
                oneStack.pop();
            }
        }
        endTime = System.currentTimeMillis();
        System.out.println("Single-stack implementation time: " + (endTime - startTime) + "ms");
    }
}



