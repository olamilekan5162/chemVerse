# 🌐 ChemVerse || Universe of Chemistry

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/built%20with-React-61DAFB)
![TailwindCSS](https://img.shields.io/badge/styled%20with-TailwindCSS-38B2AC)

ChemVerse is a modern, interactive web application designed to simplify and gamify access to chemistry-related data. From exploring the periodic table to searching for compounds and drugs, ChemVerse leverages powerful public APIs to provide real-time, educational, and fun chemistry insights.

---

## 🚀 How It Works

ChemVerse integrates multiple public APIs like [PubChem PUG REST](https://pubchem.ncbi.nlm.nih.gov/docs/pug-rest), [OpenFDA](https://open.fda.gov/apis/) and [RapidApi](https://rapidapi.com/mukundKumar/api/periodictable) to deliver rich chemistry data and drug data. Users can:

- 🔍 **Search for elements and compounds** by name and get details such as IUPAC name, molecular mass, molecular weight, structure and other properties.
- 📘 **Explore the periodic table** visually, and click on any element to view its full properties.
- 💊 **Discover drugs** using the OpenFDA database with RxCUI data, purpose, usage indications etc.
- 🧠 **Test their knowledge** through interactive quizzes with multiple-choice questions and explanations, making learning chemistry engaging and insightful.

The app is built with **React** and **Tailwind CSS**, ChemVerse ensures a sleek, responsive, and smooth user experience.

---

## 🎯 Why Use ChemVerse?

ChemVerse stands out by combining **educational utility** with a **fun and user-friendly interface**. Whether you're a student, educator, researcher, or just curious:

- Instantly retrieve **real-time compound and drug data**.
- Easy lookup of **periodic table elements** and their properties
- **Learn chemistry concepts** in a fun and engaging way with an interactive quiz.
- Use it as a **teaching companion** or a **study tool**.
- Enjoy a clean, responsive interface that makes complex data easy to understand.

ChemVerse bridges the gap between scientific complexity and user accessibility, making it an excellent companion for modern science education.

---

## 📹 Demo Video

🎥 **Watch ChemVerse in action**:  
[🔗 Click to watch demo](https://drive.google.com/file/d/1HTizxvQEUxHi2rTgLLGgPTTvZldbtN_y/view?usp=drive_link)

---

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm
- A [RapidAPI](https://rapidapi.com/mukundKumar/api/periodictable) API key for the Periodic Table endpoint  
  _(No key is required for PubChem or OpenFDA)_

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/olamilekan5162/chemVerse.git
cd chemverse
```

### 2. Set up RapidApi key:

Get an API key from [RapidApi](rapidapi.com)

### 3. Set Up Environment Variables

Create a .env file in the root directory and add your RapidAPI key:

```
VITE_X_RAPID_API_KEY = your_x_rapid_api_key
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Start the development server

```bash
npm run dev
```

## 🧪 Built With

- [React](https://react.dev/)
- [Flowbite React](https://flowbite-react.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PubChem PUG REST API](https://pubchem.ncbi.nlm.nih.gov/docs/pug-rest)
- [OpenFDA DRUG API](https://open.fda.gov/apis/)
- [RapidAPI Periodic Table](https://rapidapi.com/mukundKumar/api/periodictable)

## 🧑‍💻 Collaborators

- [Opeyemi Olalekan](https://github.com/olamilekan5162)

## 🔗 Links

- 💻 Live Demo: [ChemVerse Live](https://chem-verse.vercel.app/)

- 📁 [GitHub Repository](https://github.com/olamilekan5162/chemVerse)

- 🗨️ Discord: [https://discordapp.com/users/oracle5163](@Oracle5163)

## 📄 License

This project is licensed under MIT. See the [LICENSE](https://choosealicense.com/licenses/mit/) file for details.
