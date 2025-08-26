#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;

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
class Solution {
public:
    /**
     * Method 1: Merge from end (In-place, Space O(1))
     */
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
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
     * Method 2: Using extra vector (Space O(m + n))
     */
    vector<int> mergeWithExtraVector(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        vector<int> result(m + n);
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
     * Method 3: Using STL algorithms
     */
    void mergeUsingSTL(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        // Copy nums2 to the end of nums1
        copy(nums2.begin(), nums2.end(), nums1.begin() + m);
        
        // Sort the entire array
        sort(nums1.begin(), nums1.end());
    }
};

// Helper function to print vector
void printVector(const vector<int>& vec, int length = -1) {
    if (length == -1) length = vec.size();
    cout << "[";
    for (int i = 0; i < length; i++) {
        cout << vec[i];
        if (i < length - 1) cout << ", ";
    }
    cout << "]";
}

// Helper function to create test vector with proper size
vector<int> createTestVector(const vector<int>& original, int size) {
    vector<int> result(size, 0);
    for (int i = 0; i < original.size() && i < size; i++) {
        result[i] = original[i];
    }
    return result;
}

// Main function for testing
int main() {
    Solution solution;
    
    // Test cases
    vector<vector<int>> testCases = {
        {1, 2, 3, 0, 0, 0},  // nums1 with extra space
        {2, 5, 6},           // nums2
        {1, 0},              // nums1 with extra space
        {},                  // nums2 (empty)
        {1, 2, 3, 4, 5, 0, 0, 0, 0, 0},  // nums1 with extra space
        {6, 7, 8, 9, 10}    // nums2
    };
    
    vector<int> mValues = {3, 1, 5};  // number of elements in nums1
    vector<int> nValues = {3, 0, 5};  // number of elements in nums2
    
    for (int i = 0; i < mValues.size(); i++) {
        int m = mValues[i];
        int n = nValues[i];
        
        cout << "Test " << (i + 1) << ":" << endl;
        
        // Prepare test vectors
        vector<int> nums1 = createTestVector(testCases[i * 2], m + n);
        vector<int> nums2 = testCases[i * 2 + 1];
        
        cout << "nums1: ";
        printVector(nums1, m);
        cout << endl;
        cout << "nums2: ";
        printVector(nums2, n);
        cout << endl;
        
        // Test Method 1: In-place merge
        vector<int> nums1Copy = nums1;
        solution.merge(nums1Copy, m, nums2, n);
        cout << "Method 1 (In-place): ";
        printVector(nums1Copy, m + n);
        cout << endl;
        
        // Test Method 2: Extra vector
        vector<int> result = solution.mergeWithExtraVector(nums1, m, nums2, n);
        cout << "Method 2 (Extra Vector): ";
        printVector(result, m + n);
        cout << endl;
        
        // Test Method 3: Using STL
        vector<int> nums1Copy2 = nums1;
        solution.mergeUsingSTL(nums1Copy2, m, nums2, n);
        cout << "Method 3 (STL): ";
        printVector(nums1Copy2, m + n);
        cout << endl << endl;
    }
    
    // Performance comparison
    cout << "=== Performance Comparison ===" << endl;
    vector<int> largeNums1(10000, 0);
    vector<int> largeNums2(5000);
    
    // Fill vectors with sorted data
    for (int i = 0; i < 5000; i++) {
        largeNums1[i] = i * 2;
        largeNums2[i] = i * 2 + 1;
    }
    
    clock_t startTime = clock();
    solution.merge(largeNums1, 5000, largeNums2, 5000);
    clock_t endTime = clock();
    double inPlaceTime = double(endTime - startTime) / CLOCKS_PER_SEC * 1000;
    cout << "In-place merge time: " << inPlaceTime << "ms" << endl;
    
    startTime = clock();
    solution.mergeWithExtraVector(largeNums1, 5000, largeNums2, 5000);
    endTime = clock();
    double extraVectorTime = double(endTime - startTime) / CLOCKS_PER_SEC * 1000;
    cout << "Extra vector merge time: " << extraVectorTime << "ms" << endl;
    
    startTime = clock();
    solution.mergeUsingSTL(largeNums1, 5000, largeNums2, 5000);
    endTime = clock();
    double stlTime = double(endTime - startTime) / CLOCKS_PER_SEC * 1000;
    cout << "STL merge time: " << stlTime << "ms" << endl;
    
    return 0;
}



