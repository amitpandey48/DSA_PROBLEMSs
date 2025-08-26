@echo off
echo ========================================
echo DSA Solver - Compilation and Testing
echo ========================================
echo.

echo Creating directories if they don't exist...
if not exist "java" mkdir java
if not exist "cpp" mkdir cpp
if not exist "bin" mkdir bin

echo.
echo ========================================
echo Compiling Java Solutions...
echo ========================================

echo Compiling TwoSum.java...
javac -d bin java/TwoSum.java
if %errorlevel% equ 0 (
    echo ✓ TwoSum.java compiled successfully
) else (
    echo ✗ Error compiling TwoSum.java
)

echo Compiling ReverseLinkedList.java...
javac -d bin java/ReverseLinkedList.java
if %errorlevel% equ 0 (
    echo ✓ ReverseLinkedList.java compiled successfully
) else (
    echo ✗ Error compiling ReverseLinkedList.java
)

echo Compiling ValidParentheses.java...
javac -d bin java/ValidParentheses.java
if %errorlevel% equ 0 (
    echo ✓ ValidParentheses.java compiled successfully
) else (
    echo ✗ Error compiling ValidParentheses.java
)

echo Compiling MaximumSubarray.java...
javac -d bin java/MaximumSubarray.java
if %errorlevel% equ 0 (
    echo ✓ MaximumSubarray.java compiled successfully
) else (
    echo ✗ Error compiling MaximumSubarray.java
)

echo Compiling BinaryTreeTraversal.java...
javac -d bin java/BinaryTreeTraversal.java
if %errorlevel% equ 0 (
    echo ✓ BinaryTreeTraversal.java compiled successfully
) else (
    echo ✗ Error compiling BinaryTreeTraversal.java
)

echo Compiling QueueWithStacks.java...
javac -d bin java/QueueWithStacks.java
if %errorlevel% equ 0 (
    echo ✓ QueueWithStacks.java compiled successfully
) else (
    echo ✗ Error compiling QueueWithStacks.java
)

echo Compiling RemoveDuplicates.java...
javac -d bin java/RemoveDuplicates.java
if %errorlevel% equ 0 (
    echo ✓ RemoveDuplicates.java compiled successfully
) else (
    echo ✗ Error compiling RemoveDuplicates.java
)

echo Compiling RotateArray.java...
javac -d bin java/RotateArray.java
if %errorlevel% equ 0 (
    echo ✓ RotateArray.java compiled successfully
) else (
    echo ✗ Error compiling RotateArray.java
)

echo Compiling MergeSortedArray.java...
javac -d bin java/MergeSortedArray.java
if %errorlevel% equ 0 (
    echo ✓ MergeSortedArray.java compiled successfully
) else (
    echo ✗ Error compiling MergeSortedArray.java
)

echo Compiling MinStack.java...
javac -d bin java/MinStack.java
if %errorlevel% equ 0 (
    echo ✓ MinStack.java compiled successfully
) else (
    echo ✗ Error compiling MinStack.java
)

echo.
echo ========================================
echo Compiling C++ Solutions...
echo ========================================

echo Compiling TwoSum.cpp...
g++ -o bin/TwoSum cpp/TwoSum.cpp
if %errorlevel% equ 0 (
    echo ✓ TwoSum.cpp compiled successfully
) else (
    echo ✗ Error compiling TwoSum.cpp
)

echo Compiling ReverseLinkedList.cpp...
g++ -o bin/ReverseLinkedList cpp/ReverseLinkedList.cpp
if %errorlevel% equ 0 (
    echo ✓ ReverseLinkedList.cpp compiled successfully
) else (
    echo ✗ Error compiling ReverseLinkedList.cpp
)

echo Compiling ValidParentheses.cpp...
g++ -o bin/ValidParentheses cpp/ValidParentheses.cpp
if %errorlevel% equ 0 (
    echo ✓ ValidParentheses.cpp compiled successfully
) else (
    echo ✗ Error compiling ValidParentheses.cpp
)

echo Compiling MaximumSubarray.cpp...
g++ -o bin/MaximumSubarray cpp/MaximumSubarray.cpp
if %errorlevel% equ 0 (
    echo ✓ MaximumSubarray.cpp compiled successfully
) else (
    echo ✗ Error compiling MaximumSubarray.cpp
)

echo Compiling BinaryTreeTraversal.cpp...
g++ -o bin/BinaryTreeTraversal cpp/BinaryTreeTraversal.cpp
if %errorlevel% equ 0 (
    echo ✓ BinaryTreeTraversal.cpp compiled successfully
) else (
    echo ✗ Error compiling BinaryTreeTraversal.cpp
)

echo Compiling QueueWithStacks.cpp...
g++ -o bin/QueueWithStacks cpp/QueueWithStacks.cpp
if %errorlevel% equ 0 (
    echo ✓ QueueWithStacks.cpp compiled successfully
) else (
    echo ✗ Error compiling QueueWithStacks.cpp
)

echo Compiling RemoveDuplicates.cpp...
g++ -o bin/RemoveDuplicates cpp/RemoveDuplicates.cpp
if %errorlevel% equ 0 (
    echo ✓ RemoveDuplicates.cpp compiled successfully
) else (
    echo ✗ Error compiling RemoveDuplicates.cpp
)

echo Compiling RotateArray.cpp...
g++ -o bin/RotateArray cpp/RotateArray.cpp
if %errorlevel% equ 0 (
    echo ✓ RotateArray.cpp compiled successfully
) else (
    echo ✗ Error compiling RotateArray.cpp
)

echo Compiling MergeSortedArray.cpp...
g++ -o bin/MergeSortedArray cpp/MergeSortedArray.cpp
if %errorlevel% equ 0 (
    echo ✓ MergeSortedArray.cpp compiled successfully
) else (
    echo ✗ Error compiling MergeSortedArray.cpp
)

echo Compiling MinStack.cpp...
g++ -o bin/MinStack cpp/MinStack.cpp
if %errorlevel% equ 0 (
    echo ✓ MinStack.cpp compiled successfully
) else (
    echo ✗ Error compiling MinStack.cpp
)

echo.
echo ========================================
echo Compilation Complete!
echo ========================================
echo.
echo To run Java programs:
echo   java -cp bin TwoSum
echo   java -cp bin ReverseLinkedList
echo   java -cp bin ValidParentheses
echo   java -cp bin MaximumSubarray
echo   java -cp bin BinaryTreeTraversal
echo   java -cp bin QueueWithStacks
echo   java -cp bin RemoveDuplicates
echo   java -cp bin RotateArray
echo   java -cp bin MergeSortedArray
echo   java -cp bin MinStack
echo.
echo To run C++ programs:
echo   bin\TwoSum.exe
echo   bin\ReverseLinkedList.exe
echo   bin\ValidParentheses.exe
echo   bin\MaximumSubarray.exe
echo   bin\BinaryTreeTraversal.exe
echo   bin\QueueWithStacks.exe
echo   bin\RemoveDuplicates.exe
echo   bin\RotateArray.exe
echo   bin\MergeSortedArray.exe
echo   bin\MinStack.exe
echo.
echo To open the web interface:
echo   start index.html
echo.
pause
