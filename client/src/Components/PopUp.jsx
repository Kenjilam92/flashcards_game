import React from 'react';

const PopUp = props =>{
  return(
    <div  className="modal fade" 
          id={props.id} 
          tabIndex="-1" 
          role="dialog" 
          aria-labelledby="exampleModalLabel" 
          aria-hidden="true"
          >
      <div  className="modal-dialog" 
            role="document"
            >
        <div className ="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" 
                id="exampleModalLabel"
                > {props.title}
            </h5>
            <button type="button" 
                    className="close" 
                    data-dismiss="modal" 
                    aria-label="Close"
                    >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {props.children}
          </div>
          <div className="modal-footer">
            <button type="button" 
                    className="btn btn-secondary" 
                    data-dismiss="modal"
                    >Close
            </button>
            <button type="submit"
                    form={props.form_id} 
                    className="btn btn-success"
                    >Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopUp