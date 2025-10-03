import { useState } from "react";
import GeneralInfo from "./GeneralInfo";
import Education from "./Education";
import "../css/MainContent.css";
import Experience from "./Experience";
import Preview from "./Preview";

function MainContent() {
  const [active, setActive] = useState("general-info");
  const [visibleSection, setVisibleSection] = useState("general-info");
  const [general, setGeneral] = useState({ name: "", email: "", phone: "" });
  const [education, setEducation] = useState({
    schoolName: "",
    studyTitle: "",
    startDate: "",
    endDate: "",
  });
  const [experience, setExperience] = useState({
    companyName: "",
    positionTitle: "",
    responsibility: "",
    startDate: "",
    endDate: "",
  });

  const selectSection = (e) => {
    const btn = e.currentTarget;
    setActive(btn.dataset.section);
    setVisibleSection(btn.dataset.section);
  };

  return (
    <>
      <div className="main-content container">
        <ul className="sections-links">
          <li
            className={active === "general-info" ? "active" : ""}
            data-section="general-info"
            onClick={selectSection}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>General Information</title>
              <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M12,13C14.67,13 20,14.33 20,17V20H4V17C4,14.33 9.33,13 12,13M12,14.9C9.03,14.9 5.9,16.36 5.9,17V18.1H18.1V17C18.1,16.36 14.97,14.9 12,14.9Z" />
            </svg>
          </li>
          <li
            className={active === "education" ? "active" : ""}
            data-section="education"
            onClick={selectSection}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Education</title>
              <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3M18.82 9L12 12.72L5.18 9L12 5.28L18.82 9M17 16L12 18.72L7 16V12.27L12 15L17 12.27V16Z" />
            </svg>
          </li>
          <li
            className={active === "experience" ? "active" : ""}
            data-section="experience"
            onClick={selectSection}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Experience</title>
              <path d="M20 7H16V5L14 3H10L8 5V7H4C2.9 7 2 7.9 2 9V14C2 14.75 2.4 15.38 3 15.73V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V15.72C21.59 15.37 22 14.73 22 14V9C22 7.9 21.1 7 20 7M10 5H14V7H10V5M4 9H20V14H15V11H9V14H4V9M13 15H11V13H13V15M19 19H5V16H9V17H15V16H19V19Z" />
            </svg>
          </li>
          <li
            className={active === "preview" ? "active" : ""}
            data-section="preview"
            onClick={selectSection}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Preview</title>
              <path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z" />
            </svg>
          </li>
        </ul>
        <div className="sections">
          <section>
            {visibleSection === "general-info" && (
              <GeneralInfo general={general} setGeneral={setGeneral} />
            )}
            {visibleSection === "education" && (
              <Education education={education} setEducation={setEducation} />
            )}
            {visibleSection === "experience" && (
              <Experience
                experience={experience}
                setExperience={setExperience}
              />
            )}
            {visibleSection === "preview" && (
              <Preview
                general={general}
                education={education}
                experience={experience}
              />
            )}
          </section>
        </div>
      </div>
    </>
  );
}

export default MainContent;
