import React from "react";
    const LabManager = () => {
      return (
        <div>
          <div className="container-fluid">
            <ul className="nav nav-pills justify-content-center" id="nav">
              <li className="nav-item">
                <a className="nav-link" href="#" id="open">Lab Manager</a>
              </li>
            </ul>
          </div>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Section</th>
                <th scope="col">Date</th>
                <th scope="col">Instructor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>NUR330L</td>
                <td>2023-12-05</td>
                <td>Dr. Jane Smith</td>
              </tr>
              <tr>
                <td>NUR301L</td>
                <td>2023-12-05</td>
                <td>Prof. Alan Brown</td>
              </tr>
              <tr>
                <td>NUR332L</td>
                <td>2023-12-05</td>
                <td>Dr. Maya Patel</td>
              </tr>
              <tr>
                <td>NUR333L</td>
                <td>2023-12-05</td>
                <td>Dr. Raj Singh</td>
              </tr><tr>
                <td>NUR334L</td>
                <td>2023-12-05</td>
                <td>Dr. Kevin Wong</td>
              </tr>
              <tr>
                <td>NUR335L</td>
                <td>2023-12-05</td>
                <td>Prof. Sarah Lee</td>
              </tr>
            </tbody>
          </table>
          <div className="buttons-container">
            <button type="button" id="editButton" className="btn btn-primary">Edit</button>
            <button type="button" id="saveButton" className="btn btn-secondary" style={{display: 'none'}}>Save</button>
          </div>
        </div>
      );
}