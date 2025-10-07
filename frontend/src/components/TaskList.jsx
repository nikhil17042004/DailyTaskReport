import React from "react";


export default function TaskList({ tasks, onEdit, onDelete }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="card p-3">
        <p>No task reports yet.</p>
      </div>
    );
  }

  return (
    <div className="card p-3">
      <h3>Your Task Reports</h3>
      <ul className="task-list list-unstyled">
        {tasks.map((t) => (
          <li key={t._id} className="task-item border-bottom py-2 d-flex justify-content-between align-items-center">
            <div>
              <strong>{new Date(t.date).toLocaleDateString()}</strong>
              <div>{t.description}</div>
              <div>
                Hours: <strong>{t.hoursWorked}</strong> • Status: <strong>{t.status}</strong>
              </div>
            </div>
            <div className="actions">
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => onEdit(t)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this task?")) {
                    onDelete(t._id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
