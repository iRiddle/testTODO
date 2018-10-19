import React, { Component } from "react";
import { connect } from "react-redux";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitor: {
        fio: "",
        age: "",
        drink: ""
      },
      updIndex: null
    };
  }

  fetchDataFio = e => {
    let dataFio = e.target.value;
    this.setState(prevState => ({
      visitor: {
        ...prevState.visitor,
        fio: dataFio
      }
    }));
  };

  fetchDataAge = e => {
    let dataAge = e.target.value;
    this.setState(prevState => ({
      visitor: {
        ...prevState.visitor,
        age: dataAge
      }
    }));
  };

  fetchDataDrink = e => {
    let dataDrink = e.target.value;
    let defaultValue = document.getElementById("default").value;

    if (dataDrink.length > 0) {
      this.setState(prevState => ({
        visitor: {
          ...prevState.visitor,
          drink: defaultValue
        }
      }));
    }

    this.setState(prevState => ({
      visitor: {
        ...prevState.visitor,
        drink: dataDrink
      }
    }));
  };

  updateData = () => {  // in progress 
    const ADD_ID = document.getElementById("addItem");
    const UPD_ID = document.getElementById("updateItem");

    ADD_ID.style.display = "block";
    UPD_ID.style.display = "none";
    console.log(this.props.visitor)
    this.props.update(
      {
        fio: this.state.visitor.fio,
        age: this.state.visitor.age,
        drink: this.state.visitor.drink
      },
      this.state.updIndex
    );
  };

  render() {
    const { fio, age, drink } = this.state.visitor;
    return (
      <form>
        <div className="form-row mt-4">
          <div className="col">
            <label htmlFor="fio_id">ФИО</label>
            <input
              type="text"
              className="form-control"
              id="fio_id"
              onChange={this.fetchDataFio}
              placeholder="Введите ФИО"
              required
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col">
            <label htmlFor="age">Возраст</label>
            <input
              type="number"
              className="form-control"
              onChange={this.fetchDataAge}
              id="age_id"
              placeholder="Введите возраст"
              required
            />
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Напиток</label>
              <select
                onChange={this.fetchDataDrink}
                className="form-control"
                id="drinkForm"
              >
                <option value="Натуральный сок" id="default">
                  Натуральный сок
                </option>
                <option value="Кофе">Кофе</option>
                <option value="Чай">Чай</option>
              </select>
            </div>
          </div>
        </div>
        <div className="form-row pt-4">
          <div className="col" align="center" id="addItem">
            <button
              type="button"
              onClick={() => {
                this.props.add({
                  fio: fio,
                  age: age,
                  drink:
                    drink === ""
                      ? document.getElementById("default").value
                      : drink
                });
              }}
              className="btn btn-primary"
            >
              Добавить
            </button>
          </div>
          <div
            className="col"
            id="updateItem"
            align="center"
            style={{ display: "none" }}
          >
            <button
              type="button"
              onClick={this.updateData}
              className="btn btn-info"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.list
  };
}

function mapDispatchToProps(dispatch) {
  return {
    add: value => {
      dispatch({ type: "ADD", payload: value });
    },
    update: (value, index) => {
      dispatch({ type: "UPDATE", payload: index, upd_value: value });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
