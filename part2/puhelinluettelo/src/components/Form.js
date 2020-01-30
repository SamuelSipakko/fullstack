import React from 'react'
import Button from './Button.js'


const tdStyle = {
    padding: '5px 10px 5px 0px',
    textAlign: 'right'
  }


const Form = ({handleAdd,name,handleName,num,handleNum}) => {
    return (
      <form onSubmit={handleAdd}>
        <table>
          <tbody>
            <tr>
              <td style={tdStyle}>name:</td>
              <td style={tdStyle}><input value={name} onChange={handleName}/></td>
            </tr>
            <tr>
              <td style={tdStyle}>number:</td>
              <td style={tdStyle}><input value={num} onChange={handleNum}/></td>
            </tr>
          </tbody>
        </table>
        <div>
          <Button type='submit' text='add new' />
        </div>
      </form>
    )
}

export default Form