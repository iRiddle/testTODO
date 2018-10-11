import React, { Component } from 'react';

import { connect } from 'react-redux'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      visitor: {
        fio: "",
        age: "",
        drink: ""
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.getLength = this.getLength.bind(this)
  }
  
  handleChange(e) {
    let data = e.target.value
    this.setState(prevState => ({
      visitor: {
        ...prevState.visitor,
        fio: data
      }
    }))
  }
  getLength(event) {
    let age = event.target.value
    this.setState(prevState => ({
      visitor: {
        ...prevState.visitor,
        age: age
      }
    }))
  }

  onSelectChanged(event) {
    let drinkUp = event.target.value
    let def = document.getElementById('default').value
    if (drinkUp.length > 0) {
      this.setState(prevState => ({
        visitor: {
          ...prevState.visitor,
          drink: def
        }
      }))
    }

    this.setState(prevState => ({
      visitor: {
        ...prevState.visitor,
        drink: drinkUp
      }
    }))

  }

  render() {
    return (
      <div className="container">
        <h1 align='center' className='pt-4'>ToDo List</h1>
        <form>
          <div className='form-row mt-4'>
            <div className='col'>
              <label htmlFor="fio_id">ФИО</label>
              <input
                type="text"
                className="form-control"
                id="fio_id"
                onChange={this.handleChange}
                placeholder="Введите ФИО"
                required />
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>
            <div className='col'>
              <label htmlFor="age">Возраст</label>
              <input
                type="number"
                className="form-control"
                onChange={this.getLength}
                min="12"
                max="120"
                id="age_id"
                placeholder="Введите возраст"
                required />
            </div>
            <div className='col'>
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Напиток</label>
                <select onChange={this.onSelectChanged.bind(this)} className="form-control" id="drinkForm">
                  <option value="Натуральный сок" id="default">Натуральный сок</option>
                  <option value="Кофе">Кофе</option>
                  <option value="Чай">Чай</option>
                </select>
              </div>
            </div>
          </div>
          <div className='form-row pt-4'>
            <div className='col' align='center'>
              <button type="button"
                onClick={() => {
                  this.props.add({
                    fio: this.state.visitor.fio,
                    age: this.state.visitor.age,
                    drink: this.state.visitor.drink === '' ? document.getElementById('default').value : this.state.visitor.drink
                  })
                }}
                className="btn btn-primary">
                Добавить
              </button>
            </div>
          </div>
        </form>
        <div className='row pt-4'>
          <div className='col' align='center'>
            <ul style={{ "listStyle": "none" }}>
              {
                this.props.list.map((item, index) =>
                  <li key={index}>
                    <div className='col pt-5'>
                      <span className='pr-5'>{item.fio === null}</span> <span className='pr-5'>{item.age}</span> <span className='pr-5'>{item.drink}</span>
                      <button className="btn btn-danger"
                        onClick={() => this.props.remove(index)}
                      >Delete</button>
                    </div>
                  </li>
                )
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    list: state.list
  }
}

function mapDispatchToProps(dispatch) {
  return {
    add: (value) => {
      dispatch({ type: 'ADD', payload: value })
    },
    remove: (index) => {
      dispatch({ type: 'REMOVE', payload: index })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App) 