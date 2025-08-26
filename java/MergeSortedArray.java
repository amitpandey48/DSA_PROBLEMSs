/**
 * Merge Sorted Array Problem Solution
 * 
 * Problem: You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, 
 * and two integers m and n, representing the number of elements in nums1 and nums2 respectively. 
 * Merge nums1 and nums2 into a single array sorted in non-decreasing order.
 * 
 * Time Complexity: O(m + n)
 * Space Complexity: O(1) - merging in-place
 */
public class MergeSortedArray {
    
    /**
     * Method 1: Merge from end (In-place, Space O(1))
     */
    public static void merge(int[] nums1, int m, int[] nums2, int n) {
        int p1 = m - 1;  // Pointer for nums1
        int p2 = n - 1;  // Pointer for nums2
        int p = m + n - 1;  // Pointer for merged array
        
        // Compare elements from the end and place larger one at the end
        while (p1 >= 0 && p2 >= 0) {
            if (nums1[p1] > nums2[p2]) {
                nums1[p] = nums1[p1];
                p1--;
            } else {
                nums1[p] = nums2[p2];
                p2--;
            }
            p--;
        }
        
        // If there are remaining elements in nums2, copy them
        while (p2 >= 0) {
            nums1[p] = nums2[p2];
            p2--;
            p--;
        }
        // Note: We don't need to copy remaining elements from nums1
        // because they are already in their correct positions
    }
    
    /**
     * Method 2: Using extra array (Space O(m + n))
     */
    public static int[] mergeWithExtraArray(int[] nums1, int m, int[] nums2, int n) {
        int[] result = new int[m + n];
        int p1 = 0, p2 = 0, p = 0;
        
        // Merge while both arrays have elements
        while (p1 < m && p2 < n) {
            if (nums1[p1] <= nums2[p2]) {
                result[p] = nums1[p1];
                p1++;
            } else {
                result[p] = nums2[p2];
                p2++;
            }
            p++;
        }
        
        // Copy remaining elements from nums1
        while (p1 < m) {
            result[p] = nums1[p1];
            p1++;
            p++;
        }
        
        // Copy remaining elements from nums2
        while (p2 < n) {
            result[p] = nums2[p2];
            p2++;
            p++;
        }
        
        return result;
    }
    
    /**
     * Method 3: Using System.arraycopy (Java specific)
     */
    public static void mergeUsingArrayCopy(int[] nums1, int m, int[] nums2, int n) {
        // Copy nums2 to the end of nums1
        System.arraycopy(nums2, 0, nums1, m, n);
        
        // Sort the entire array
        java.util.Arrays.sort(nums1);
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
    
    // Helper method to create test array with proper size
    public static int[] createTestArray(int[] original, int size) {
        int[] result = new int[size];
        for (int i = 0; i < original.length && i < size; i++) {
            result[i] = original[i];
        }
        return result;
    }
    
    // Main method for testing
    public static void main(String[] args) {
        // Test cases
        int[][] testCases = {
            {1, 2, 3, 0, 0, 0},  // nums1 with extra space
            {2, 5, 6},           // nums2
            {1, 0},              // nums1 with extra space
            {},                  // nums2 (empty)
            {1, 2, 3, 4, 5, 0, 0, 0, 0, 0},  // nums1 with extra space
            {6, 7, 8, 9, 10}    // nums2
        };
        
        int[] mValues = {3, 1, 5};  // number of elements in nums1
        int[] nValues = {3, 0, 5};  // number of elements in nums2
        
        for (int i = 0; i < mValues.length; i++) {
            int m = mValues[i];
            int n = nValues[i];
            
            System.out.println("Test " + (i + 1) + ":");
            
            // Prepare test arrays
            int[] nums1 = createTestArray(testCases[i * 2], m + n);
            int[] nums2 = testCases[i * 2 + 1];
            
            System.out.print("nums1: ");
            printArray(nums1, m);
            System.out.print("nums2: ");
            printArray(nums2, n);
            
            // Test Method 1: In-place merge
            int[] nums1Copy = nums1.clone();
            merge(nums1Copy, m, nums2, n);
            System.out.print("Method 1 (In-place): ");
            printArray(nums1Copy, m + n);
            
            // Test Method 2: Extra array
            int[] result = mergeWithExtraArray(nums1, m, nums2, n);
            System.out.print("Method 2 (Extra Array): ");
            printArray(result, m + n);
            
            // Test Method 3: Using Arrays.sort
            int[] nums1Copy2 = nums1.clone();
            mergeUsingArrayCopy(nums1Copy2, m, nums2, n);
            System.out.print("Method 3 (ArrayCopy + Sort): ");
            printArray(nums1Copy2, m + n);
            
            System.out.println();
        }
        
        // Performance comparison
        System.out.println("=== Performance Comparison ===");
        int[] largeNums1 = new int[10000];
        int[] largeNums2 = new int[5000];
        
        // Fill arrays with sorted data
        for (int i = 0; i < 5000; i++) {
            largeNums1[i] = i * 2;
            largeNums2[i] = i * 2 + 1;
        }
        
        long startTime = System.currentTimeMillis();
        merge(largeNums1.clone(), 5000, largeNums2, 5000);
        long endTime = System.currentTimeMillis();
        System.out.println("In-place merge time: " + (endTime - startTime) + "ms");
        
        startTime = System.currentTimeMillis();
        mergeWithExtraArray(largeNums1, 5000, largeNums2, 5000);
        endTime = System.currentTimeMillis();
        System.out.println("Extra array merge time: " + (endTime - startTime) + "ms");
        
        startTime = System.currentTimeMillis();
        mergeUsingArrayCopy(largeNums1.clone(), 5000, largeNums2, 5000);
        endTime = System.currentTimeMillis();
        System.out.println("ArrayCopy + Sort time: " + (endTime - startTime) + "ms");
    }
}



