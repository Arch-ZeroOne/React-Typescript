# 🧠 TypeScript + React Learning Roadmap

This repository is a curated learning path of **React + TypeScript projects**, designed to teach TypeScript fundamentals **through real-world applications**.

Each project introduces new concepts step-by-step, building from beginner to advanced level.

---

## 🎯 Roadmap Goals

- ✅ Build TypeScript confidence while writing real React apps
- ✅ Apply core TypeScript concepts like interfaces, union types, generics, utility types
- ✅ Understand the relationship between React state, props, and TypeScript typings
- ✅ Learn how to write maintainable and scalable React apps using type safety

---

## 🛣️ Roadmap: Projects + Concepts (Beginner to Advanced)

---

### 🟢 **1. Task Manager App**
**📝 Description:** Create, mark as done, and delete tasks.

#### 🔑 Concepts:
- `interface` for Task structure  
- `useState<T>()` to type state  
- Type annotations for props and event handlers  
- `React.ChangeEvent` and `MouseEvent`  
- Rendering typed arrays

---

### 🟢 **2. Contact Form with Validation**
**📝 Description:** A simple contact form with real-time validation.

#### 🔑 Concepts:
- Typing form inputs with `React.FormEvent` and `ChangeEvent`  
- `type` vs `interface`  
- Handling controlled inputs with typed state  
- Conditional rendering for error messages  
- Optional properties in object types

---

### 🟡 **3. User List from API**
**📝 Description:** Fetch and render users from an external API.

#### 🔑 Concepts:
- Typing API responses with `interface`  
- `useEffect` with async logic  
- Union types: `"loading" | "success" | "error"`  
- Optional chaining  
- Axios response typing (`AxiosResponse<T>`)

---

### 🟡 **4. Shopping Cart App**
**📝 Description:** Add/remove items, update quantity, calculate totals.

#### 🔑 Concepts:
- Array of typed objects in state  
- Lifting state with typed props  
- Enum for product categories  
- Derived state (e.g., total price)  
- Nested type structures (e.g., `CartItem`, `Product`)

---

### 🔴 **5. Notes App with localStorage**
**📝 Description:** Create, save, delete notes and persist them in localStorage.

#### 🔑 Concepts:
- Generic custom hook: `useLocalStorage<T>()`  
- Utility types like `Record<string, string>`  
- Type assertions and JSON parsing  
- Effect dependencies with typed functions  
- Reusable typed functions/hooks

---

### 🔴 **6. Multi-Step Form Wizard**
**📝 Description:** A multi-step form flow with form validation and step transitions.

#### 🔑 Concepts:
- `useReducer` with typed actions  
- Discriminated unions for form step state  
- Component-level form validation  
- Complex type-safe component communication  
- Mapped types and partial data collection

---

### 🔴 **7. Dashboard with Filters and Charts**
**📝 Description:** A data dashboard with filters and charts (bonus if using a chart library like Recharts).

#### 🔑 Concepts:
- Advanced prop typing for reusable components  
- `Pick`, `Omit`, `Partial` to control prop inheritance  
- Filtering with `Record` and union types  
- Generics in custom filtering logic  
- Strong typing with third-party libraries

---

## 🛠️ Tools Recommended

- [Vite](https://vitejs.dev/) – Lightweight React + TS setup
- [Tailwind CSS](https://tailwindcss.com/) – Optional utility-first styling
- [Axios](https://axios-http.com/) – For typed API calls
- [Recharts](https://recharts.org/) – For visualization in the dashboard

---

## 📄 License

Open-source under the [MIT License](LICENSE)

---

## 🙋‍♂️ Author

Built by **Windyl P. Monton**  
[GitHub Profile →](https://github.com/MERNMagician)
