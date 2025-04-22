# 🌐 ChemVerse || Universe of Chemistry

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/built%20with-React-61DAFB)
![TailwindCSS](https://img.shields.io/badge/styled%20with-TailwindCSS-38B2AC)

ChemVerse is a modern, interactive web application designed to simplify and gamify access to chemistry-related data. From exploring the periodic table to searching for compounds and drugs, ChemVerse leverages powerful public APIs to provide real-time, educational, and fun chemistry insights.

---

## 🚀 How It Works

ChemVerse integrates multiple public APIs like [PubChem PUG REST](https://pubchem.ncbi.nlm.nih.gov/docs/pug-rest), [OpenFDA](https://open.fda.gov/apis/) and [RapidApi](https://rapidapi.com/mukundKumar/api/periodictable) to deliver rich chemistry data and drug data. Users can:

- Compounds and Drugs Data are fetched in real-time from **PubChem** and **OpenFDA**.
- 3D molecular models are fetched in SDF (Structure Data File) format from PubChem and rendered using 3Dmol.js.
- For periodic table exploration, data is retrieved from **RapidAPI** with clickable UI elements.
- Quiz questions are preloaded and randomized to offer a fresh experience on each visit.
- React manages state changes efficiently, while Tailwind ensures smooth responsiveness and transitions.

This architecture allows ChemVerse to provide scientific accuracy with an intuitive UI, making it ideal for education, exploration, and quick reference.

---

## ✨ Features

| Feature                       | Description                                                                                                                   |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 🔍 Compound Search            | Search by element or compound name to retrieve IUPAC name, molecular mass, structure, and other key properties using PubChem. |
| 📘 Interactive Periodic Table | Explore all elements visually. Clicking on any element reveals detailed properties via RapidAPI.                              |
| 🌐 3D Molecular Viewer        | View 3D models of compounds retrieved from PubChem SDF data, rendered in-browser using 3Dmol.js.                              |
| 💊 Drug Information           | Fetch drug-related data including name, RxCUI, purpose, and usage from OpenFDA API.                                           |
| 🧠 Chemistry Quiz             | Engage with chemistry through multiple-choice quizzes and explanations that make learning fun.                                |
| 🎨 Responsive Design          | Clean and sleek UI built with React and Tailwind CSS that adapts to all screen sizes.                                         |
| ⚙️ Real-Time Data             | All data is retrieved in real-time from trusted open data APIs for accuracy and reliability.                                  |

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
🔗 [Click to watch demo](https://drive.google.com/file/d/1ALeuog0LptozHsNaHnvCLuH00SVovql4/view?usp=sharing)

---

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm
- A [RapidAPI](https://rapidapi.com/mukundKumar/api/periodictable) API key for the Periodic Table endpoint  
  _(No key is required for PubChem or OpenFDA)_

### Installation

**1. Clone the Repository**

```bash
git clone https://github.com/olamilekan5162/chemVerse.git
cd chemverse
```

**2. Set up RapidApi key:**

Get an API key from [RapidApi](rapidapi.com)

**3. Set Up Environment Variables**

Create a .env file in the root directory and add your RapidAPI key:

```
VITE_X_RAPID_API_KEY=your_x_rapid_api_key
```

**4. Install Dependencies**

```bash
npm install
```

**5. Start the development server**

```bash
npm run dev
```

## 🧪 Built With

- [React](https://react.dev/) – Frontend framework
- [Flowbite React](https://flowbite-react.com/) – UI components
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first styling
- [PubChem PUG REST API](https://pubchem.ncbi.nlm.nih.gov/docs/pug-rest) – Chemical compound data
- [OpenFDA DRUG API](https://open.fda.gov/apis/) – Drug and pharmaceutical data
- [RapidAPI Periodic Table](https://rapidapi.com/mukundKumar/api/periodictable) – Periodic table data

## 🧑‍💻 Collaborators

- [Opeyemi Olalekan](https://github.com/olamilekan5162)

## 🔗 Links

- 💻 Live Demo: [ChemVerse Live](https://chem-verse.vercel.app/)

- 📁 [GitHub Repository](https://github.com/olamilekan5162/chemVerse)

- 🗨️ Discord: [@Oracle5163](https://discordapp.com/users/oracle5163)

## 📄 License

This project is licensed under **MIT LICENSE**. See the [LICENSE](https://choosealicense.com/licenses/mit/) file for details.
