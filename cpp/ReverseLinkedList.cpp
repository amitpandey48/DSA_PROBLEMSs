#include <iostream>
#include <vector>
using namespace std;

/**
 * Reverse Linked List Problem Solution
 * 
 * Problem: Given the head of a singly linked list, reverse the list, 
 * and return the reversed list.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* current = head;
        
        while (current != nullptr) {
            ListNode* nextTemp = current->next;
            current->next = prev;
            prev = current;
            current = nextTemp;
        }
        
        return prev;
    }
};

// Helper function to create linked list from array
ListNode* createLinkedList(const vector<int>& arr) {
    if (arr.empty()) return nullptr;
    
    ListNode* head = new ListNode(arr[0]);
    ListNode* current = head;
    
    for (int i = 1; i < arr.size(); i++) {
        current->next = new ListNode(arr[i]);
        current = current->next;
    }
    
    return head;
}

// Helper function to print linked list
void printLinkedList(ListNode* head) {
    ListNode* current = head;
    cout << "[";
    while (current != nullptr) {
        cout << current->val;
        if (current->next != nullptr) cout << ",";
        current = current->next;
    }
    cout << "]" << endl;
}

// Helper function to convert linked list to array
vector<int> linkedListToArray(ListNode* head) {
    vector<int> arr;
    ListNode* current = head;
    
    while (current != nullptr) {
        arr.push_back(current->val);
        current = current->next;
    }
    
    return arr;
}

// Helper function to free linked list memory
void freeLinkedList(ListNode* head) {
    ListNode* current = head;
    while (current != nullptr) {
        ListNode* temp = current;
        current = current->next;
        delete temp;
    }
}

// Main function for testing
int main() {
    Solution solution;
    
    // Test case 1
    vector<int> arr1 = {1, 2, 3, 4, 5};
    ListNode* head1 = createLinkedList(arr1);
    cout << "Original list:" << endl;
    printLinkedList(head1);
    
    ListNode* reversed1 = solution.reverseList(head1);
    cout << "Reversed list:" << endl;
    printLinkedList(reversed1);
    
    // Test case 2
    vector<int> arr2 = {1, 2};
    ListNode* head2 = createLinkedList(arr2);
    cout << "\nOriginal list:" << endl;
    printLinkedList(head2);
    
    ListNode* reversed2 = solution.reverseList(head2);
    cout << "Reversed list:" << endl;
    printLinkedList(reversed2);
    
    // Clean up memory
    freeLinkedList(reversed1);
    freeLinkedList(reversed2);
    
    return 0;
}



