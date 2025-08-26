#include <vector>
#include <iostream>
#include <unordered_set>
using namespace std;

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
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if (nums.empty()) {
            return 0;
        }
        
        int writeIndex = 1; // Position to write next unique element
        
        for (int readIndex = 1; readIndex < nums.size(); readIndex++) {
            // If current element is different from previous element
            if (nums[readIndex] != nums[readIndex - 1]) {
                nums[writeIndex] = nums[readIndex];
                writeIndex++;
            }
        }
        
        return writeIndex;
    }
    
    // Alternative approach using unordered_set (not in-place, but shows another method)
    int removeDuplicatesWithSet(vector<int>& nums) {
        if (nums.empty()) {
            return 0;
        }
        
        unordered_set<int> set;
        int writeIndex = 0;
        
        for (int num : nums) {
            if (set.find(num) == set.end()) {
                set.insert(num);
                nums[writeIndex] = num;
                writeIndex++;
            }
        }
        
        return writeIndex;
    }
};

// Helper function to print vector
void printVector(const vector<int>& vec, int length) {
    cout << "[";
    for (int i = 0; i < length; i++) {
        cout << vec[i];
        if (i < length - 1) cout << ", ";
    }
    cout << "]";
}

// Main function for testing
int main() {
    Solution solution;
    
    // Test cases
    vector<vector<int>> testCases = {
        {1, 1, 2},                    // Expected: 2, [1, 2]
        {0, 0, 1, 1, 1, 2, 2, 3, 3, 4}, // Expected: 5, [0, 1, 2, 3, 4]
        {1, 2, 3, 4, 5},              // Expected: 5, [1, 2, 3, 4, 5]
        {1, 1, 1, 1, 1},              // Expected: 1, [1]
        {1},                          // Expected: 1, [1]
        {}                            // Expected: 0, []
    };
    
    for (int i = 0; i < testCases.size(); i++) {
        vector<int> nums = testCases[i]; // Copy to preserve original
        
        cout << "Test " << (i + 1) << ":" << endl;
        cout << "Original array: ";
        printVector(nums, nums.size());
        cout << endl;
        
        int result = solution.removeDuplicates(nums);
        
        cout << "Length after removing duplicates: " << result << endl;
        cout << "Array after removing duplicates: ";
        printVector(nums, result);
        cout << endl << endl;
    }
    
    // Test with unordered_set approach
    cout << "=== Testing unordered_set Approach ===" << endl;
    vector<int> testArray = {0, 0, 1, 1, 1, 2, 2, 3, 3, 4};
    cout << "Original array: ";
    printVector(testArray, testArray.size());
    cout << endl;
    
    int result = solution.removeDuplicatesWithSet(testArray);
    
    cout << "Length after removing duplicates: " << result << endl;
    cout << "Array after removing duplicates: ";
    printVector(testArray, result);
    cout << endl;
    
    return 0;
}



