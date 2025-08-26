#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;

/**
 * Rotate Array Problem Solution
 * 
 * Problem: Given an array, rotate the array to the right by k steps, where k is non-negative.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1) for in-place rotation
 */
class Solution {
public:
    /**
     * Method 1: Using Extra Array (Space O(n))
     */
    void rotateWithExtraArray(vector<int>& nums, int k) {
        if (nums.empty() || k == 0) {
            return;
        }
        
        int n = nums.size();
        k = k % n; // Handle cases where k > n
        
        vector<int> temp(n);
        
        // Copy elements to temp array
        for (int i = 0; i < n; i++) {
            temp[(i + k) % n] = nums[i];
        }
        
        // Copy back to original array
        nums = temp;
    }
    
    /**
     * Method 2: In-place rotation using reverse (Space O(1))
     */
    void rotateInPlace(vector<int>& nums, int k) {
        if (nums.empty() || k == 0) {
            return;
        }
        
        int n = nums.size();
        k = k % n; // Handle cases where k > n
        
        // Reverse entire array
        reverse(nums.begin(), nums.end());
        
        // Reverse first k elements
        reverse(nums.begin(), nums.begin() + k);
        
        // Reverse remaining elements
        reverse(nums.begin() + k, nums.end());
    }
    
    /**
     * Method 3: Using cyclic replacements (Space O(1))
     */
    void rotateCyclic(vector<int>& nums, int k) {
        if (nums.empty() || k == 0) {
            return;
        }
        
        int n = nums.size();
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
};

// Helper function to print vector
void printVector(const vector<int>& vec) {
    cout << "[";
    for (int i = 0; i < vec.size(); i++) {
        cout << vec[i];
        if (i < vec.size() - 1) cout << ", ";
    }
    cout << "]";
}

// Main function for testing
int main() {
    Solution solution;
    
    // Test cases
    vector<vector<int>> testCases = {
        {1, 2, 3, 4, 5, 6, 7},  // k = 3
        {-1, -100, 3, 99},      // k = 2
        {1, 2, 3, 4, 5},        // k = 1
        {1, 2, 3},              // k = 4 (k > n)
        {1},                    // k = 1
        {}                      // empty array
    };
    
    vector<int> kValues = {3, 2, 1, 4, 1, 1};
    
    for (int i = 0; i < testCases.size(); i++) {
        vector<int> nums = testCases[i];
        int k = kValues[i];
        
        cout << "Test " << (i + 1) << ":" << endl;
        cout << "Original array: ";
        printVector(nums);
        cout << endl;
        cout << "Rotate by " << k << " steps" << endl;
        
        // Test Method 1: Extra Array
        vector<int> nums1 = testCases[i];
        solution.rotateWithExtraArray(nums1, k);
        cout << "Method 1 (Extra Array): ";
        printVector(nums1);
        cout << endl;
        
        // Test Method 2: In-place with reverse
        vector<int> nums2 = testCases[i];
        solution.rotateInPlace(nums2, k);
        cout << "Method 2 (In-place): ";
        printVector(nums2);
        cout << endl;
        
        // Test Method 3: Cyclic replacements
        vector<int> nums3 = testCases[i];
        solution.rotateCyclic(nums3, k);
        cout << "Method 3 (Cyclic): ";
        printVector(nums3);
        cout << endl << endl;
    }
    
    // Performance comparison
    cout << "=== Performance Comparison ===" << endl;
    vector<int> largeArray(10000);
    for (int i = 0; i < largeArray.size(); i++) {
        largeArray[i] = i;
    }
    
    clock_t startTime = clock();
    solution.rotateInPlace(largeArray, 5000);
    clock_t endTime = clock();
    double inPlaceTime = double(endTime - startTime) / CLOCKS_PER_SEC * 1000;
    cout << "In-place rotation time: " << inPlaceTime << "ms" << endl;
    
    startTime = clock();
    solution.rotateWithExtraArray(largeArray, 5000);
    endTime = clock();
    double extraArrayTime = double(endTime - startTime) / CLOCKS_PER_SEC * 1000;
    cout << "Extra array rotation time: " << extraArrayTime << "ms" << endl;
    
    return 0;
}



