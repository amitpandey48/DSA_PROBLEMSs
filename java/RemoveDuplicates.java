/**
 * Remove Duplicates from Sorted Array Problem Solution
 * 
 * Problem: Given an integer array nums sorted in non-decreasing order, 
 * remove the duplicates in-place such that each unique element appears only once. 
 * The relative order of the elements should be kept the same.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
public class RemoveDuplicates {
    
    public static int removeDuplicates(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }
        
        int writeIndex = 1; // Position to write next unique element
        
        for (int readIndex = 1; readIndex < nums.length; readIndex++) {
            // If current element is different from previous element
            if (nums[readIndex] != nums[readIndex - 1]) {
                nums[writeIndex] = nums[readIndex];
                writeIndex++;
            }
        }
        
        return writeIndex;
    }
    
    // Alternative approach using HashSet (not in-place, but shows another method)
    public static int removeDuplicatesWithSet(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }
        
        java.util.HashSet<Integer> set = new java.util.HashSet<>();
        int writeIndex = 0;
        
        for (int num : nums) {
            if (!set.contains(num)) {
                set.add(num);
                nums[writeIndex] = num;
                writeIndex++;
            }
        }
        
        return writeIndex;
    }
    
    // Helper method to print array
    public static void printArray(int[] arr, int length) {
        System.out.print("[");
        for (int i = 0; i < length; i++) {
            System.out.print(arr[i]);
            if (i < length - 1) System.out.print(", ");
        }
        System.out.println("]");
    }
    
    // Main method for testing
    public static void main(String[] args) {
        // Test cases
        int[][] testCases = {
            {1, 1, 2},                    // Expected: 2, [1, 2]
            {0, 0, 1, 1, 1, 2, 2, 3, 3, 4}, // Expected: 5, [0, 1, 2, 3, 4]
            {1, 2, 3, 4, 5},              // Expected: 5, [1, 2, 3, 4, 5]
            {1, 1, 1, 1, 1},              // Expected: 1, [1]
            {1},                          // Expected: 1, [1]
            {}                            // Expected: 0, []
        };
        
        for (int i = 0; i < testCases.length; i++) {
            int[] nums = testCases[i].clone(); // Clone to preserve original
            
            System.out.println("Test " + (i + 1) + ":");
            System.out.print("Original array: ");
            printArray(nums, nums.length);
            
            int result = removeDuplicates(nums);
            
            System.out.println("Length after removing duplicates: " + result);
            System.out.print("Array after removing duplicates: ");
            printArray(nums, result);
            System.out.println();
        }
        
        // Test with HashSet approach
        System.out.println("=== Testing HashSet Approach ===");
        int[] testArray = {0, 0, 1, 1, 1, 2, 2, 3, 3, 4};
        System.out.print("Original array: ");
        printArray(testArray, testArray.length);
        
        int result = removeDuplicatesWithSet(testArray);
        
        System.out.println("Length after removing duplicates: " + result);
        System.out.print("Array after removing duplicates: ");
        printArray(testArray, result);
    }
}



