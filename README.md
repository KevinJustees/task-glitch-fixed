# Task Glitch – Bug Fix Submission (Full Stack Development Intern Assignment)

**Live Demo:** https://kevinjustees-taskglitch.netlify.app/
**GitHub Repository:** https://github.com/KevinJustees/task-glitch-fixed

This project is my completed submission for the **Full Stack Development Intern – SDE Assignment**, where I was required to fix 5 critical bugs in a Task Management Web App.  
The app allows users to create, edit, delete, sort, filter, and manage tasks based on ROI (Revenue ÷ Time).

---

## Summary of Bug Fixes

### **1. Double Fetch Issue**
- Fixed double data loading on page refresh.
- Adjusted useEffect and initialization logic to ensure tasks load **only once**.
- Removed unnecessary double-invocation triggers.

---

### **2. Undo Snackbar Issue**
- Fixed incorrect task restoration after snackbar closes.
- Reset `lastDeletedTask` and `isDeleted` state properly.
- Ensures undo only works during an active snackbar window.

---

### **3. Unstable Sorting (ROI & Priority Tie)**
- Added **deterministic tie-breaker** using alphabetical task title.
- Sorting is now stable and does not flicker or reshuffle randomly.

---

### **4. Double Dialog Opening**
- Added `stopPropagation()` on edit/delete buttons.
- Fixed event bubbling that caused both View and Edit/Delete dialogs to open.
- Ensures only one dialog opens for each user action.

---

### **5. ROI Calculation Errors**
- Added safe validation for invalid/empty/zero inputs.
- Prevented `Infinity`, `NaN`, and blank ROI values.
- ROI now displays correct formatted values consistently.

---

##  Deployment
The project is deployed on **Netlify** for public access.

- **Live App:** https://kevinjustees-taskglitch.netlify.app/
- Deployment includes:
  - Build optimization
  - Static asset handling via Vite
  - Production-ready UI

---

##  Tech Stack
- **React + Vite**
- **JavaScript**
- **Material UI**
- **LocalStorage Persistence**
- **CSV Import/Export**

---

##  Features of the App
- Add, edit, delete tasks  
- ROI calculation (Revenue ÷ Time Taken)  
- Search & filter by priority & status  
- Task insights summary  
- CSV import/export  
- Undo delete using snackbar  
- Stable and deterministic sorting  
- LocalStorage data persistence  

---

##  Author
**Kevin Justees**  
Full Stack Development Intern Applicant

---

## 📌 Notes
This repository contains only the fixes required for the assignment.  
Original base code is from the provided GitHub project.

