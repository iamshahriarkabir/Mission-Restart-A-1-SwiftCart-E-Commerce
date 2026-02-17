# 🛍️ SwiftCart - Modern E-Commerce Platform

SwiftCart is a responsive e-commerce web application built using Vanilla JavaScript, Tailwind CSS, and DaisyUI. It fetches real-time product data from the FakeStoreAPI and offers a seamless shopping experience with features like category filtering, a dynamic shopping cart, and product details.

🔗 **Live Link:** [https://swiftcart-z4code.netlify.app]  


---

## ✨ Features
- **Dynamic Product Fetching:** Loads products dynamically from an external API.
- **Category Filtering:** Filter products by categories (Electronics, Jewelry, Men's & Women's Clothing).
- **Interactive Cart:** 
  - Add items to the cart.
  - View cart items in a modal.
  - Remove items and see real-time total price updates.
  - Data persists in `localStorage` (Cart won't vanish on refresh).
- **Product Details:** Click "Details" to view full product information in a modal.
- **Responsive Design:** Fully mobile-responsive with a hamburger menu and optimized layout.

## 🛠️ Technology Stack
- **HTML5** (Semantic Structure)
- **CSS3** (Tailwind CSS + DaisyUI)
- **JavaScript** (ES6+, Fetch API, DOM Manipulation)
- **Tools:** VS Code, Git, GitHub

---


## ❓ JavaScript Basic Concepts Questions & Answers 

### 1. What is the difference between null and undefined?

`undefined` মানে একটি ভ্যারিয়েবল ডিক্লেয়ার করা হয়েছে কিন্তু তার কোনো মান এখনো সেট করা হয়নি।  
`null` মানে ইচ্ছাকৃতভাবে ভ্যারিয়েবলের মান খালি রাখা হয়েছে।  
অর্থাৎ, `undefined` স্বাভাবিকভাবে আসে, আর `null` ডেভেলপার নিজে সেট করে।

### 2. What is the use of the map() function in JavaScript? How is it different from forEach()?

`map()` ফাংশন একটি অ্যারের প্রতিটি উপাদানের ওপর লুপ চালায় এবং নির্দিষ্ট অপারেশন করে **নতুন একটি অ্যারে** রিটার্ন করে। মূল অ্যারে ঠিক থাকে।  
পার্থক্য হলো: `forEach()` শুধু লুপ চালায় এবং প্রতিটি উপাদানের ওপর কাজ করে কিন্তু **কিছু রিটার্ন করে না** (undefined রিটার্ন করে)। তাই ডেটা ট্রান্সফর্ম করে নতুন লিস্ট বানাতে চাইলে `map()` ব্যবহার করা হয়, আর শুধু লুপ চালিয়ে কিছু দেখাতে চাইলে `forEach()`।

### 3. What is the difference between == and ===?

`==` (Loose Equality) অপারেটর দুটি ভ্যালুর মান চেক করে, কিন্তু তাদের ডাটা টাইপ চেক করে না (প্রয়োজনে স্ট্রিংকে নাম্বারে কনভার্ট করে নেয়)।  
`===` (Strict Equality) অপারেটর দুটি ভ্যালুর মান এবং তাদের ডাটা টাইপ—উভয়ই চেক করে। টাইপ এবং মান দুটোই না মিললে এটি `false` দেয়। বেস্ট প্র্যাকটিস হলো `===` ব্যবহার করা।

### 4. What is the significance of async/await in fetching API data?

API থেকে ডাটা আসতে কিছুটা সময় লাগে (Asynchronous operation)। `async/await` ব্যবহার করলে আমরা কোডকে বলে দিতে পারি "ডাটা আসা পর্যন্ত অপেক্ষা করো, তারপর পরের লাইনে যাও"। এটি `.then()` চেইনিং এর চেয়ে কোড পড়তে এবং বুঝতে অনেক সহজ করে দেয়। এটি মূলত `Promise` হ্যান্ডেল করার আধুনিক ও ক্লিন উপায়।


### 5. Explain the concept of Scope in JavaScript (Global, Function, Block).

জাভাস্ক্রিপ্টে ভেরিয়েবল কোথায় এক্সেস করা যাবে তা স্কোপ নির্ধারণ করে:
*   **Global Scope:** কোনো ফাংশন বা ব্লকের বাইরে ডিক্লেয়ার করা ভেরিয়েবল, যা পুরো কোডের যেকোনো জায়গা থেকে ব্যবহার করা যায়।
*   **Function Scope:** ফাংশনের ভেতরে `var`, `let`, বা `const` দিয়ে ডিক্লেয়ার করা ভেরিয়েবল, যা শুধু ওই ফাংশনের ভেতরেই কাজ করে। বাইরে থেকে পাওয়া যায় না।
*   **Block Scope:** `{}` (সেকেন্ড ব্র্যাকেট) এর ভেতরে `let` বা `const` দিয়ে ডিক্লেয়ার করা ভেরিয়েবল, যা শুধু ওই নির্দিষ্ট ব্লকের (যেমন if, for loop) ভেতরেই কাজ করে।