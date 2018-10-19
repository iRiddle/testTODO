import React, { Component } from "react";
import { connect } from "react-redux";
class List extends Component {
  updateObj(index, item) {
    const FIO_ID = document.getElementById("fio_id");
    const AGE_ID = document.getElementById("age_id");
    const DRINK_ID = document.getElementById("drinkForm");

    const ADD_ID = document.getElementById("addItem");
    const UPD_ID = document.getElementById("updateItem");

    ADD_ID.style.display = "none";
    UPD_ID.style.display = "block";

    FIO_ID.value = item.fio;
    AGE_ID.value = item.age;
    DRINK_ID.value = item.drink;

    this.setState({
      visitor: {
        fio: item.fio,
        age: item.age,
        drink: item.drink
      },
      updIndex: index
    });
  }
  render() {
    return (
      <div className="row pt-4">
        <div className="col" align="center">
          <ul style={{ listStyle: "none" }}>
            {this.props.list.map((item, index) => (
              <li key={index}>
                <div className="col pt-5">
                  <span className="pr-5">{item.fio}</span>
                  <span className="pr-5">{item.age}</span>
                  <span className="pr-5">{item.drink}</span>
                  <button
                    className="btn btn-danger mr-2"
                    onClick={() => this.props.remove(index)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-info"
                    onClick={() => this.updateObj(index, item)}
                  >
                    Update
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    list: state.list
  };
}

function mapDispatchToProps(dispatch) {
  return {
    remove: index => {
      dispatch({ type: "REMOVE", payload: index });
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
