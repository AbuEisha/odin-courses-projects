import { useState } from "react";

export default function Education({ education, setEducation }) {
  const [isDisplay, setIsDisplay] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDisplay(true);
  };

  return (
    <>
      <h2>Educational Experience</h2>
      <div className="section-content">
        {!isDisplay && (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="school">University Name</label>
              <input
                type="text"
                name="school"
                id="school"
                value={education.schoolName}
                placeholder="Kafr Elsheikh University"
                onChange={(e) =>
                  setEducation({ ...education, schoolName: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="study-title">Title Of Study</label>
              <input
                type="text"
                name="study-title"
                id="study-title"
                value={education.studyTitle}
                placeholder="Bachelor of Computer Science"
                onChange={(e) =>
                  setEducation({ ...education, studyTitle: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="start-date">Start Date Of Study</label>
              <input
                type="date"
                name="start-date"
                id="start-date"
                value={education.startDate}
                onChange={(e) =>
                  setEducation({ ...education, startDate: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="end-date">End Date Of Study</label>
              <input
                type="date"
                name="end-date"
                id="end-date"
                value={education.endDate}
                onChange={(e) =>
                  setEducation({ ...education, endDate: e.target.value })
                }
              />
            </div>
            <button>Submit</button>
          </form>
        )}
        {isDisplay && (
          <div className="display-section">
            <div>
              <span>University Name:</span>{" "}
              {education.schoolName || "Unknown University"}
            </div>
            <div>
              <span>Title Of Study:</span>{" "}
              {education.studyTitle || "Unknown Study Title"}
            </div>
            <div>
              <span>Start Date Of Study:</span>{" "}
              {education.startDate || "Unknown Start Date"}
            </div>
            <div>
              <span>End Date Of Study:</span>{" "}
              {education.endDate || "Unknown End Date"}
            </div>
            <button id="edit" onClick={() => setIsDisplay(false)}>
              Edit
            </button>
          </div>
        )}
      </div>
    </>
  );
}
