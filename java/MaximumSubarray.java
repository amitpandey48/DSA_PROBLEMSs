/**
 * Maximum Subarray Problem Solution (Kadane's Algorithm)
 * 
 * Problem: Given an integer array nums, find the contiguous subarray 
 * (containing at least one number) which has the largest sum and return its sum.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
public class MaximumSubarray {
    
    public static int maxSubArray(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }
        
        int maxSoFar = nums[0];
        int maxEndingHere = nums[0];
        
        for (int i = 1; i < nums.length; i++) {
            // Either extend the previous subarray or start a new one
            maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
            maxSoFar = Math.max(maxSoFar, maxEndingHere);
        }
        
        return maxSoFar;
    }
    
    // Alternative implementation with more detailed tracking
    public static int[] maxSubArrayWithIndices(int[] nums) {
        if (nums == null || nums.length == 0) {
            return new int[]{0, -1, -1}; // {sum, start, end}
        }
        
        int maxSoFar = nums[0];
        int maxEndingHere = nums[0];
        int start = 0, end = 0;
        int tempStart = 0;
        
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] > maxEndingHere + nums[i]) {
                maxEndingHere = nums[i];
                tempStart = i;
            } else {
                maxEndingHere = maxEndingHere + nums[i];
            }
            
            if (maxEndingHere > maxSoFar) {
                maxSoFar = maxEndingHere;
                start = tempStart;
                end = i;
            }
        }
        
        return new int[]{maxSoFar, start, end};
    }
    
    // Helper method to print array
    public static void printArray(int[] arr) {
        System.out.print("[");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i]);
            if (i < arr.length - 1) System.out.print(",");
        }
        System.out.print("]");
    }
    
    // Main method for testing
    public static void main(String[] args) {
        // Test cases
        int[][] testCases = {
            {-2, 1, -3, 4, -1, 2, 1, -5, 4},  // Expected: 6
            {1},                               // Expected: 1
            {5, 4, -1, 7, 8},                 // Expected: 23
            {-1, -2, -3, -4},                 // Expected: -1
            {1, 2, 3, 4, 5},                  // Expected: 15
            {-2, -3, 4, -1, -2, 1, 5, -3}    // Expected: 7
        };
        
        for (int i = 0; i < testCases.length; i++) {
            int[] nums = testCases[i];
            int result = maxSubArray(nums);
            int[] resultWithIndices = maxSubArrayWithIndices(nums);
            
            System.out.println("Test " + (i + 1) + ":");
            System.out.print("Array: ");
            printArray(nums);
            System.out.println();
            System.out.println("Maximum subarray sum: " + result);
            System.out.println("Maximum subarray: [" + resultWithIndices[1] + ", " + resultWithIndices[2] + "]");
            System.out.println("Sum: " + resultWithIndices[0]);
            System.out.println();
        }
    }
}



