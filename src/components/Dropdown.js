import React, { useState } from "react"

const Dropdown = ({ dropdownOptions, selected, onSelectedChange }) => {
  // state to manage toggle visibility
  const [open, setOpen] = useState(false)

  const renderedOptions = dropdownOptions.map(option => {
    // if current selection is equal to option do not generate div
    if (option.value === selected.value) {
      return null
    }

    return (
      <div
        key={option.value}
        className="item"
        // on click change selection to current option
        onClick={() => onSelectedChange(option)}
      >
        {option.label}
      </div>
    )
  })

  return (
    <div className="ui form">
      <div className="field">
        <label className="label">Select a Color</label>
        <div
          // on click set value of open to opposite of current value
          onClick={() => setOpen(!open)}
          className={`ui selection dropdown ${open ? "visible active" : ""}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div
            // on click set value of open to opposite of current value
            onClick={() => setOpen(!open)}
            className={`menu ${open ? "visible transition" : ""}`}
          >
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dropdown