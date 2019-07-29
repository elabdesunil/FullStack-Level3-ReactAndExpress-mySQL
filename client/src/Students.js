import React, { Component } from "react";

class Students extends Component {
  constructor() {
    super();
    this.state = {
      students: [],
      isLoaded: false
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch(`/employees`);
      const data = await res.json();
      console.log(data)
      this.setState({
        students: data,
        isLoaded: true,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render(){
    return this.state.isLoaded ? (
        <table>
          <tbody>
          <tr>
            <th>EmpId</th>
            <th>Name</th>
            <th>EmpCode</th>
            <th>Salary</th>
            <th>Delete</th>
          </tr>
          {this.state.students.map((el, index) => {
          return (
          <tr key = {index}>
                <th>{el.EmpID}</th>
                <th>{el.Name}</th>
                <th>{el.EmpCode}</th>
                <th>{el.Salary}</th>
                <th><button type = 'button'>Delete</button></th>
          </tr>
          
          )
        })}
        </tbody>
          </table>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default Students;
