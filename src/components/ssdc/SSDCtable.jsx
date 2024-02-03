import React from 'react';

function SSDCtable({ jobs }) {
  // if (!jobs || !jobs.data || !jobs.data.jobs || jobs.data.jobs.length === 0) {
  
  //   return <p>No jobs data available.</p>;
    
  // }

  return (
    <>
      <div className="ssdc-infotable container">
        <div className="ssdc-training-center-heading">{jobs.country} JOBS</div>

        <table className="table table-striped data-table">
          <thead>
            <tr>
              <th>No.</th>
              <th scope="col">Category</th>
              <th scope="col">Nos</th>
              <th scope="col">Salary</th>
            </tr>
          </thead>
          <tbody>
          {jobs.jobs.map((job, index) => (
              <tr key={job._id}>
                <th scope="row">{index + 1}</th>
                <td>{job.category}</td>
                <td>{job.nos}</td>
                <td>{job.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default SSDCtable;
