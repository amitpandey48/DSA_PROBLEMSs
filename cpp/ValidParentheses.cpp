#include <stack>
#include <string>
#include <iostream>
using namespace std;

/**
 * Valid Parentheses Problem Solution
 * 
 * Problem: Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', 
 * determine if the input string is valid. An input string is valid if:
 * - Open brackets must be closed by the same type of brackets.
 * - Open brackets must be closed in the correct order.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        
        for (char c : s) {
            if (c == '(' || c == '[' || c == '{') {
                st.push(c);
            } else {
                if (st.empty()) return false;
                
                char top = st.top();
                st.pop();
                
                if ((c == ')' && top != '(') ||
                    (c == ']' && top != '[') ||
                    (c == '}' && top != '{')) {
                    return false;
                }
            }
        }
        
        return st.empty();
    }
};

// Main function for testing
int main() {
    Solution solution;
    
    // Test cases
    string testCases[] = {
        "()",           // true
        "()[]{}",       // true
        "(]",           // false
        "([)]",         // false
        "{[]}",         // true
        "(((",          // false
        ")))",          // false
        "",             // true
        "({[]})"        // true
    };
    
    for (const string& test : testCases) {
        bool result = solution.isValid(test);
        cout << "Input: \"" << test << "\" -> " << (result ? "true" : "false") << endl;
    }
    
    return 0;
}



