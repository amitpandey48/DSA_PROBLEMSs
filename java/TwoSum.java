import java.util.HashMap;
import java.util.Map;

/**
 * Two Sum Problem Solution
 * 
 * Problem: Given an array of integers nums and an integer target, 
 * return indices of the two numbers such that they add up to target.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
public class TwoSum {
    
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            
            map.put(nums[i], i);
        }
        
        return new int[]{}; // No solution found
    }
    
    // Main method for testing
    public static void main(String[] args) {
        // Test case 1
        int[] nums1 = {2, 7, 11, 15};
        int target1 = 9;
        int[] result1 = twoSum(nums1, target1);
        System.out.println("Test 1: nums = [2,7,11,15], target = 9");
        System.out.println("Result: [" + result1[0] + "," + result1[1] + "]");
        
        // Test case 2
        int[] nums2 = {3, 2, 4};
        int target2 = 6;
        int[] result2 = twoSum(nums2, target2);
        System.out.println("Test 2: nums = [3,2,4], target = 6");
        System.out.println("Result: [" + result2[0] + "," + result2[1] + "]");
    }
}



