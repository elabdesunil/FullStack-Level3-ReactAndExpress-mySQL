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
      const res = await fetch(`/api/students`);
      const data = await res.json();
      this.setState({
        students: data,
        isLoaded: true
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return this.state.isLoaded ? (
      <ol>
        {this.state.students.map((el, index) => {
          return <li key={index}>{el.firstName}</li>;
        })}
      </ol>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default Students;
