#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;

/**
 * Maximum Subarray Problem Solution (Kadane's Algorithm)
 * 
 * Problem: Given an integer array nums, find the contiguous subarray 
 * (containing at least one number) which has the largest sum and return its sum.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        if (nums.empty()) {
            return 0;
        }
        
        int maxSoFar = nums[0];
        int maxEndingHere = nums[0];
        
        for (int i = 1; i < nums.size(); i++) {
            // Either extend the previous subarray or start a new one
            maxEndingHere = max(nums[i], maxEndingHere + nums[i]);
            maxSoFar = max(maxSoFar, maxEndingHere);
        }
        
        return maxSoFar;
    }
    
    // Alternative implementation with more detailed tracking
    vector<int> maxSubArrayWithIndices(vector<int>& nums) {
        if (nums.empty()) {
            return {0, -1, -1}; // {sum, start, end}
        }
        
        int maxSoFar = nums[0];
        int maxEndingHere = nums[0];
        int start = 0, end = 0;
        int tempStart = 0;
        
        for (int i = 1; i < nums.size(); i++) {
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
        
        return {maxSoFar, start, end};
    }
};

// Helper function to print vector
void printVector(const vector<int>& vec) {
    cout << "[";
    for (int i = 0; i < vec.size(); i++) {
        cout << vec[i];
        if (i < vec.size() - 1) cout << ",";
    }
    cout << "]";
}

// Main function for testing
int main() {
    Solution solution;
    
    // Test cases
    vector<vector<int>> testCases = {
        {-2, 1, -3, 4, -1, 2, 1, -5, 4},  // Expected: 6
        {1},                               // Expected: 1
        {5, 4, -1, 7, 8},                 // Expected: 23
        {-1, -2, -3, -4},                 // Expected: -1
        {1, 2, 3, 4, 5},                  // Expected: 15
        {-2, -3, 4, -1, -2, 1, 5, -3}    // Expected: 7
    };
    
    for (int i = 0; i < testCases.size(); i++) {
        vector<int> nums = testCases[i];
        int result = solution.maxSubArray(nums);
        vector<int> resultWithIndices = solution.maxSubArrayWithIndices(nums);
        
        cout << "Test " << (i + 1) << ":" << endl;
        cout << "Array: ";
        printVector(nums);
        cout << endl;
        cout << "Maximum subarray sum: " << result << endl;
        cout << "Maximum subarray: [" << resultWithIndices[1] << ", " << resultWithIndices[2] << "]" << endl;
        cout << "Sum: " << resultWithIndices[0] << endl;
        cout << endl;
    }
    
    return 0;
}



