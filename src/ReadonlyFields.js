import React from 'react'

class ReadonlyFields extends React.Component {
  submitData = () => {
    const payload = this.props.fields.map(({ uuid, value }) => ({
      uuid,
      value: value || false,
    }))
    console.log({ fields: payload })
  }

  render() {
    const { fields, heading, activeIndex, onClick } = this.props
    return (
      <div className="readonly-fields">
        <header>
          <h2 className="heading">{heading}</h2>
          <button onClick={this.submitData}>Submit data</button>
        </header>
        <ul className="fields">
          {fields.map((field, i) => (
            <li
              key={field.uuid}
              onClick={() => onClick(i)}
              className={i === activeIndex ? 'active' : ''}
            >
              <span className="label">{field.name}</span>
              <span className="value">{field.value || '-'}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default ReadonlyFields
