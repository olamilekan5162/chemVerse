const About = () => {
  return (
    <div className="bg-secondary dark:bg-primary dark:text-secondary text-primary mt-[100px] flex min-h-screen flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold">About ChemVerse</h1>
      <div className="max-w-3xl text-[20px]">
        ChemVerse is your all-in-one gateway to exploring the incredible world
        of chemistry. Whether you're a student, researcher, or curious mind,
        ChemVerse simplifies complex chemical data into an interactive and
        intuitive experience. We bring chemistry to life by combining science,
        search, and fun — all in one platform.
      </div>
      <h1 className="text-4xl font-bold">Key Features</h1>
      <div className="max-w-3xl text-[20px]">
        <ul className="flex list-disc flex-col gap-7">
          <li>
            Search for Elements, Compounds and Drugs, use our intelligent search
            to look up any chemical element, compound, or drug using real-time
            data from trusted public APIs like PubChem, DrugBank and RapidApi.
          </li>
          <li>
            Instantly view molecular images, IUPAC names, properties like
            boiling/melting points, molecular weights, and more — beautifully
            displayed.
          </li>
          <li>
            Explore the Periodic Table View a dynamic and clickable periodic
            table! Tap any element to see detailed info in a stylish modal
            without losing sight of the table layout.
          </li>
          <li>
            Take Chemistry Quizzes Put your chemistry knowledge to the test with
            fun, objective-based quizzes. Each question comes with multiple
            options and simple explanations — perfect for learning through play.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
