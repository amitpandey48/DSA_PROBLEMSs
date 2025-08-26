/**
 * Rotate Array Problem Solution
 * 
 * Problem: Given an array, rotate the array to the right by k steps, where k is non-negative.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1) for in-place rotation
 */
public class RotateArray {
    
    /**
     * Method 1: Using Extra Array (Space O(n))
     */
    public static void rotateWithExtraArray(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k == 0) {
            return;
        }
        
        int n = nums.length;
        k = k % n; // Handle cases where k > n
        
        int[] temp = new int[n];
        
        // Copy elements to temp array
        for (int i = 0; i < n; i++) {
            temp[(i + k) % n] = nums[i];
        }
        
        // Copy back to original array
        for (int i = 0; i < n; i++) {
            nums[i] = temp[i];
        }
    }
    
    /**
     * Method 2: In-place rotation using reverse (Space O(1))
     */
    public static void rotateInPlace(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k == 0) {
            return;
        }
        
        int n = nums.length;
        k = k % n; // Handle cases where k > n
        
        // Reverse entire array
        reverse(nums, 0, n - 1);
        
        // Reverse first k elements
        reverse(nums, 0, k - 1);
        
        // Reverse remaining elements
        reverse(nums, k, n - 1);
    }
    
    /**
     * Helper method to reverse array elements from start to end
     */
    private static void reverse(int[] nums, int start, int end) {
        while (start < end) {
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
            end--;
        }
    }
    
    /**
     * Method 3: Using cyclic replacements (Space O(1))
     */
    public static void rotateCyclic(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k == 0) {
            return;
        }
        
        int n = nums.length;
        k = k % n;
        
        int count = 0;
        for (int start = 0; count < n; start++) {
            int current = start;
            int prev = nums[start];
            
            do {
                int next = (current + k) % n;
                int temp = nums[next];
                nums[next] = prev;
                prev = temp;
                current = next;
                count++;
            } while (start != current);
        }
    }
    
    // Helper method to print array
    public static void printArray(int[] arr) {
        System.out.print("[");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i]);
            if (i < arr.length - 1) System.out.print(", ");
        }
        System.out.println("]");
    }
    
    // Main method for testing
    public static void main(String[] args) {
        // Test cases
        int[][] testCases = {
            {1, 2, 3, 4, 5, 6, 7},  // k = 3
            {-1, -100, 3, 99},      // k = 2
            {1, 2, 3, 4, 5},        // k = 1
            {1, 2, 3},              // k = 4 (k > n)
            {1},                    // k = 1
            {}                      // empty array
        };
        
        int[] kValues = {3, 2, 1, 4, 1, 1};
        
        for (int i = 0; i < testCases.length; i++) {
            int[] nums = testCases[i].clone();
            int k = kValues[i];
            
            System.out.println("Test " + (i + 1) + ":");
            System.out.print("Original array: ");
            printArray(nums);
            System.out.println("Rotate by " + k + " steps");
            
            // Test Method 1: Extra Array
            int[] nums1 = testCases[i].clone();
            rotateWithExtraArray(nums1, k);
            System.out.print("Method 1 (Extra Array): ");
            printArray(nums1);
            
            // Test Method 2: In-place with reverse
            int[] nums2 = testCases[i].clone();
            rotateInPlace(nums2, k);
            System.out.print("Method 2 (In-place): ");
            printArray(nums2);
            
            // Test Method 3: Cyclic replacements
            int[] nums3 = testCases[i].clone();
            rotateCyclic(nums3, k);
            System.out.print("Method 3 (Cyclic): ");
            printArray(nums3);
            
            System.out.println();
        }
        
        // Performance comparison
        System.out.println("=== Performance Comparison ===");
        int[] largeArray = new int[10000];
        for (int i = 0; i < largeArray.length; i++) {
            largeArray[i] = i;
        }
        
        long startTime = System.currentTimeMillis();
        rotateInPlace(largeArray.clone(), 5000);
        long endTime = System.currentTimeMillis();
        System.out.println("In-place rotation time: " + (endTime - startTime) + "ms");
        
        startTime = System.currentTimeMillis();
        rotateWithExtraArray(largeArray.clone(), 5000);
        endTime = System.currentTimeMillis();
        System.out.println("Extra array rotation time: " + (endTime - startTime) + "ms");
    }
}



