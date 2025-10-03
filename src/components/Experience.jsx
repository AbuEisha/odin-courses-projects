import { useState } from "react";

export default function Experience({ experience, setExperience }) {
  const [isDisplay, setIsDisplay] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDisplay(true);
  };

  return (
    <>
      <h2>Practical Experience</h2>
      <div className="section-content">
        {!isDisplay && (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="company">Company Name</label>
              <input
                type="text"
                name="company"
                id="company"
                value={experience.companyName}
                placeholder="Apple Company"
                onChange={(e) =>
                  setExperience({ ...experience, companyName: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="position-title">Position Title</label>
              <input
                type="text"
                name="position-title"
                id="position-title"
                value={experience.positionTitle}
                placeholder="General Manager"
                onChange={(e) =>
                  setExperience({
                    ...experience,
                    positionTitle: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="responsibility">Main Responsibilities</label>
              <textarea
                name="responsibility"
                id="responsibility"
                value={experience.responsibility}
                placeholder="Main Responsibilities Of Your Job"
                onChange={(e) =>
                  setExperience({
                    ...experience,
                    responsibility: e.target.value,
                  })
                }
              ></textarea>
            </div>
            <div>
              <label htmlFor="start-date">Start Date Of Work</label>
              <input
                type="date"
                name="start-date"
                id="start-date"
                value={experience.startDate}
                onChange={(e) =>
                  setExperience({ ...experience, startDate: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="end-date">End Date Of Work</label>
              <input
                type="date"
                name="end-date"
                id="end-date"
                value={experience.endDate}
                onChange={(e) =>
                  setExperience({ ...experience, endDate: e.target.value })
                }
              />
            </div>
            <button>Submit</button>
          </form>
        )}
        {isDisplay && (
          <div className="display-section">
            <div>
              <span>Company Name:</span>{" "}
              {experience.companyName || "Unknown Company"}
            </div>
            <div>
              <span>Position Title:</span>{" "}
              {experience.positionTitle || "Unknown Position Title"}
            </div>
            <div>
              <span>Main Responsibilities:</span>{" "}
              {experience.responsibility || "Unknown Main Responsibilities"}
            </div>
            <div>
              <span>Start Date Of Work:</span>{" "}
              {experience.startDate || "Start Date"}
            </div>
            <div>
              <span>End Date Of Work:</span> {experience.endDate || "End Date"}
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
