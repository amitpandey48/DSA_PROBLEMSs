import java.util.Stack;

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
public class ValidParentheses {
    
    public static boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;
                
                char top = stack.pop();
                
                if ((c == ')' && top != '(') ||
                    (c == ']' && top != '[') ||
                    (c == '}' && top != '{')) {
                    return false;
                }
            }
        }
        
        return stack.isEmpty();
    }
    
    // Main method for testing
    public static void main(String[] args) {
        // Test cases
        String[] testCases = {
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
        
        for (String test : testCases) {
            boolean result = isValid(test);
            System.out.println("Input: \"" + test + "\" -> " + result);
        }
    }
}



