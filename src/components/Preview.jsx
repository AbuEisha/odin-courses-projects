export default function Preview({ general, education, experience }) {
  return (
    <>
      <div className="preview">
        <div className="general-info">
          <h3>{general.name || "Your Name"}</h3>
          <span>{general.email || "john@example.com"}</span> |{" "}
          <span>{general.phone || "(+200)555-333-222"}</span>
        </div>
        <h4>Educational Experience</h4>
        <h3>{education.schoolName || "Unknown University"}</h3>
        <p>{education.studyTitle || "Unknown Study Title"}</p>
        <span>{education.startDate || "Start Date"}</span> ---{" "}
        <span>{education.endDate || "End Date"}</span>
        <h4>Practical Experience</h4>
        <h3>{experience.companyName || "Unknown Company"}</h3>
        <p>{experience.positionTitle || "Unknown Position"}</p>
        <p>{experience.responsibility || "Unknown Main Responsibilities"}</p>
        <span>{experience.startDate || "Start Date"}</span> ---{" "}
        <span>{experience.endDate || "End Date"}</span>
        <button id="print" onClick={() => window.print()}>
          Print
        </button>
      </div>
    </>
  );
}
