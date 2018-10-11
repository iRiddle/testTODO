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
      },
      updIndex: null
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
  updateObj(index, item) {

    let fio_id = document.getElementById('fio_id')
    let age_id = document.getElementById('age_id')
    let drink_id = document.getElementById('drinkForm')

    let add_id = document.getElementById('addItem')
    let upd_id = document.getElementById('updateItem')

    add_id.style.display = 'none'
    upd_id.style.display = 'block'

    fio_id.value = item.fio
    age_id.value = item.age
    drink_id.value = item.drink

    this.setState({
      visitor: {
        fio: item.fio,
        age: item.age,
        drink: item.drink,
      },
      updIndex: index
    })

    console.log(this.state.visitor.fio + " " + this.state.updIndex)
  }

  updData() {
    let add_id = document.getElementById('addItem')
    let upd_id = document.getElementById('updateItem')

    add_id.style.display = "block"
    upd_id.style.display = "none"

    this.props.update({
      fio: this.state.visitor.fio,
      age: this.state.visitor.age,
      drink: this.state.visitor.drink
    }, this.state.updIndex)
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
            <div className='col' align='center' id="addItem">
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
            <div className='col' id="updateItem" align='center' style={{ "display": "none" }}>
              <button type="button"
                onClick={this.updData.bind(this)}
                className="btn btn-info">
                Update
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
                      <span className='pr-5'>{item.fio}</span> <span className='pr-5'>{item.age}</span> <span className='pr-5'>{item.drink}</span>
                      <button className="btn btn-danger mr-2"
                        onClick={() => this.props.remove(index)}
                      >Delete</button>
                      <button className="btn btn-info"
                        onClick={() => this.updateObj(index, item)}
                      >Update</button>
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
    },
    update: (value, index) => {
      dispatch({ type: 'UPDATE', payload: index, upd_value: value })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App) 