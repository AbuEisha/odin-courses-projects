import { useState } from "react";

export default function GeneralInfo({ general, setGeneral }) {
  const [isDisplay, setIsDisplay] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDisplay(true);
  };

  return (
    <>
      <h2>General Information</h2>
      <div className="section-content">
        {!isDisplay && (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">
                Full Name <span>*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={general.name}
                placeholder="John Doe"
                required
                onChange={(e) =>
                  setGeneral({ ...general, name: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="email">
                Email Address <span>*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={general.email}
                placeholder="john@example.com"
                onChange={(e) =>
                  setGeneral({ ...general, email: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="phone">
                Phone Number <span>*</span>
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={general.phone}
                placeholder="(+200)555-333-222"
                required
                onChange={(e) =>
                  setGeneral({ ...general, phone: e.target.value })
                }
              />
            </div>
            <button>Submit</button>
          </form>
        )}
        {isDisplay && (
          <div className="display-section">
            <div>
              <span>Full Name:</span> {general.name}
            </div>
            <div>
              <span>Email Address:</span> {general.email}
            </div>
            <div>
              <span>Phone Number:</span> {general.phone}
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
