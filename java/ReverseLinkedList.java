/**
 * Reverse Linked List Problem Solution
 * 
 * Problem: Given the head of a singly linked list, reverse the list, 
 * and return the reversed list.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

public class ReverseLinkedList {
    
    public static ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode current = head;
        
        while (current != null) {
            ListNode nextTemp = current.next;
            current.next = prev;
            prev = current;
            current = nextTemp;
        }
        
        return prev;
    }
    
    // Helper method to create linked list from array
    public static ListNode createLinkedList(int[] arr) {
        if (arr.length == 0) return null;
        
        ListNode head = new ListNode(arr[0]);
        ListNode current = head;
        
        for (int i = 1; i < arr.length; i++) {
            current.next = new ListNode(arr[i]);
            current = current.next;
        }
        
        return head;
    }
    
    // Helper method to print linked list
    public static void printLinkedList(ListNode head) {
        ListNode current = head;
        System.out.print("[");
        while (current != null) {
            System.out.print(current.val);
            if (current.next != null) System.out.print(",");
            current = current.next;
        }
        System.out.println("]");
    }
    
    // Helper method to convert linked list to array
    public static int[] linkedListToArray(ListNode head) {
        if (head == null) return new int[0];
        
        // Count nodes
        int count = 0;
        ListNode current = head;
        while (current != null) {
            count++;
            current = current.next;
        }
        
        // Convert to array
        int[] arr = new int[count];
        current = head;
        int i = 0;
        while (current != null) {
            arr[i++] = current.val;
            current = current.next;
        }
        
        return arr;
    }
    
    // Main method for testing
    public static void main(String[] args) {
        // Test case 1
        int[] arr1 = {1, 2, 3, 4, 5};
        ListNode head1 = createLinkedList(arr1);
        System.out.println("Original list:");
        printLinkedList(head1);
        
        ListNode reversed1 = reverseList(head1);
        System.out.println("Reversed list:");
        printLinkedList(reversed1);
        
        // Test case 2
        int[] arr2 = {1, 2};
        ListNode head2 = createLinkedList(arr2);
        System.out.println("\nOriginal list:");
        printLinkedList(head2);
        
        ListNode reversed2 = reverseList(head2);
        System.out.println("Reversed list:");
        printLinkedList(reversed2);
    }
}



