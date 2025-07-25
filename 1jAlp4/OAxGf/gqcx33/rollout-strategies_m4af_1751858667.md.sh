以下是优化后的源代码文件：

```bash
#!/bin/bash

## Compile our two program files with optimization and debugging flags
g++ -std=c++11 -g -O3 -march=native -o bonus main_bonus.cpp node.cpp
```

以下是实现登录流程和校验管理员权限的伪代码：

```python
#!/usr/bin/env python3
import getpass

def login():
    username = input("Enter username: ")
    password = getpass.getpass("Enter password: ")

    # Simulate database lookup
    users = {"admin": "admin123", "user": "password123"}
    if username in users and users[username] == password:
        return True
    else:
        return False

def check_admin(username):
    # Simulate database lookup
    admins = ["admin"]
    return username in admins

def main():
    if login():
        username = input("Logged in successfully. Enter your username: ")
        if check_admin(username):
            print("You are an administrator.")
            # Perform admin-specific tasks
        else:
            print("You are not an administrator.")
            # Perform non-admin tasks
    else:
        print("Login failed. Please try again.")

if __name__ == "__main__":
    main()
```

以下是实现 JavaScript 排序算法的伪代码：

```javascript
function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

// Example usage:
const arr = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array:", arr);
console.log("Sorted array:", bubbleSort(arr));
```

以下是实现 Python 快速排序算法的伪代码：

```python
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

# Example usage:
arr = [3, 6, 8, 10, 1, 2, 1]
print("Original array:", arr)
print("Sorted array:", quicksort(arr))
```