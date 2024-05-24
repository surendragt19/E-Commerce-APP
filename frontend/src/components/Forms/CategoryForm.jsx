import React from 'react'

const CategoryForm =  ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add New Category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-success d-flex justify-content-end">
          Submit
        </button>
      </form>
    </>
  )
}

export default CategoryForm