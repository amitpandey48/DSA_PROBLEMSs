import java.util.*;

/**
 * Binary Tree Traversal Solutions
 * 
 * Contains implementations for:
 * - Inorder Traversal (Left -> Root -> Right)
 * - Preorder Traversal (Root -> Left -> Right)
 * - Postorder Traversal (Left -> Right -> Root)
 * - Level Order Traversal (Breadth-First)
 * 
 * Time Complexity: O(n) for all traversals
 * Space Complexity: O(h) for recursive, O(n) for iterative
 */
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

public class BinaryTreeTraversal {
    
    // ========== INORDER TRAVERSAL ==========
    
    // Recursive Inorder
    public static List<Integer> inorderTraversalRecursive(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        inorderHelper(root, result);
        return result;
    }
    
    private static void inorderHelper(TreeNode node, List<Integer> result) {
        if (node == null) return;
        
        inorderHelper(node.left, result);
        result.add(node.val);
        inorderHelper(node.right, result);
    }
    
    // Iterative Inorder using Stack
    public static List<Integer> inorderTraversalIterative(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        TreeNode current = root;
        
        while (current != null || !stack.isEmpty()) {
            // Reach the leftmost node
            while (current != null) {
                stack.push(current);
                current = current.left;
            }
            
            // Process current node
            current = stack.pop();
            result.add(current.val);
            
            // Move to right subtree
            current = current.right;
        }
        
        return result;
    }
    
    // ========== PREORDER TRAVERSAL ==========
    
    // Recursive Preorder
    public static List<Integer> preorderTraversalRecursive(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        preorderHelper(root, result);
        return result;
    }
    
    private static void preorderHelper(TreeNode node, List<Integer> result) {
        if (node == null) return;
        
        result.add(node.val);
        preorderHelper(node.left, result);
        preorderHelper(node.right, result);
    }
    
    // Iterative Preorder using Stack
    public static List<Integer> preorderTraversalIterative(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;
        
        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);
        
        while (!stack.isEmpty()) {
            TreeNode current = stack.pop();
            result.add(current.val);
            
            // Push right first, then left (so left is processed first)
            if (current.right != null) {
                stack.push(current.right);
            }
            if (current.left != null) {
                stack.push(current.left);
            }
        }
        
        return result;
    }
    
    // ========== POSTORDER TRAVERSAL ==========
    
    // Recursive Postorder
    public static List<Integer> postorderTraversalRecursive(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        postorderHelper(root, result);
        return result;
    }
    
    private static void postorderHelper(TreeNode node, List<Integer> result) {
        if (node == null) return;
        
        postorderHelper(node.left, result);
        postorderHelper(node.right, result);
        result.add(node.val);
    }
    
    // Iterative Postorder using Stack
    public static List<Integer> postorderTraversalIterative(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;
        
        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);
        
        while (!stack.isEmpty()) {
            TreeNode current = stack.pop();
            result.add(0, current.val); // Add to front for reverse order
            
            // Push left first, then right
            if (current.left != null) {
                stack.push(current.left);
            }
            if (current.right != null) {
                stack.push(current.right);
            }
        }
        
        return result;
    }
    
    // ========== LEVEL ORDER TRAVERSAL ==========
    
    // Level Order Traversal (Breadth-First)
    public static List<List<Integer>> levelOrderTraversal(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>();
            
            for (int i = 0; i < levelSize; i++) {
                TreeNode current = queue.poll();
                currentLevel.add(current.val);
                
                if (current.left != null) {
                    queue.offer(current.left);
                }
                if (current.right != null) {
                    queue.offer(current.right);
                }
            }
            
            result.add(currentLevel);
        }
        
        return result;
    }
    
    // ========== HELPER METHODS ==========
    
    // Create a sample binary tree
    public static TreeNode createSampleTree() {
        //       1
        //      / \
        //     2   3
        //    / \
        //   4   5
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.left.left = new TreeNode(4);
        root.left.right = new TreeNode(5);
        return root;
    }
    
    // Print list
    public static void printList(List<Integer> list, String traversal) {
        System.out.print(traversal + ": ");
        System.out.print("[");
        for (int i = 0; i < list.size(); i++) {
            System.out.print(list.get(i));
            if (i < list.size() - 1) System.out.print(", ");
        }
        System.out.println("]");
    }
    
    // Print level order result
    public static void printLevelOrder(List<List<Integer>> result) {
        System.out.print("Level Order: ");
        System.out.print("[");
        for (int i = 0; i < result.size(); i++) {
            System.out.print("[");
            List<Integer> level = result.get(i);
            for (int j = 0; j < level.size(); j++) {
                System.out.print(level.get(j));
                if (j < level.size() - 1) System.out.print(", ");
            }
            System.out.print("]");
            if (i < result.size() - 1) System.out.print(", ");
        }
        System.out.println("]");
    }
    
    // Main method for testing
    public static void main(String[] args) {
        TreeNode root = createSampleTree();
        
        System.out.println("Binary Tree Traversal Results:");
        System.out.println("Tree structure:");
        System.out.println("       1");
        System.out.println("      / \\");
        System.out.println("     2   3");
        System.out.println("    / \\");
        System.out.println("   4   5");
        System.out.println();
        
        // Test all traversals
        printList(inorderTraversalRecursive(root), "Inorder (Recursive)");
        printList(inorderTraversalIterative(root), "Inorder (Iterative)");
        printList(preorderTraversalRecursive(root), "Preorder (Recursive)");
        printList(preorderTraversalIterative(root), "Preorder (Iterative)");
        printList(postorderTraversalRecursive(root), "Postorder (Recursive)");
        printList(postorderTraversalIterative(root), "Postorder (Iterative)");
        printLevelOrder(levelOrderTraversal(root));
    }
}



