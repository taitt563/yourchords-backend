import React from 'react';
//bootstrap
 import 'bootstrap/dist/css/bootstrap.min.css';



function OrderCustomer() {
    return (
      <div className="maincontainer">
        <div className="container">
          <div className="py-5 text-center">
            <h2>ORDER</h2>
          </div>
          <div className="row">
            <div className="col-md-4 order-md-2 mb-4" style={{backgroundColor: "#EFFBEF",height: '270px'}}>
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Notes:</span>
              </h4>
              <ul className="list-group mb-3">
              <div className='notes' style={{marginLeft: '50px'}}>
                <li>Posts are not duplicated</li>
                <li>Write the full name of the song</li>
                <li>Type in English or Vietnamese with accents</li>
                <li>Enter full lyrics and chords. Avoid using "similar", "as above"...</li>
                <li>Do not post songs with reactionary or sensitive content that violate Vietnamese customs and traditions.</li>
                </div>
              </ul>
             
            
            </div>

            <div className="col-md-8 order-md-1">
            
              <form className="needs-validation" noValidate>
                <div className="row">
                  <div className="mb-3">
                    <label htmlFor="title">Song title</label>
                    <input type="text" className="form-control" id="title" placeholder="I see fire"/>
                    <div className="invalid-feedback">
                      Song title is required.
                    </div>
                  </div>
            
                </div>

                <div className="mb-3">
                  <label htmlFor="lyric">Lyric</label>
                  <div className="input-group">
                    <textarea id='lyric' rows={15} cols={100}></textarea>
                    <div className="invalid-feedback">
                     Lyric is required.
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="artist">Artist</label>
                  <input type="text" className="form-control" id="artist" placeholder="Ed sheeran" required/>
                  <div className="invalid-feedback">
                    Please enter artist!
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="composer">Composer</label>
                  <input type="text" className="form-control" id="composer" placeholder="Ed Sheeran" required />
                  <div className="invalid-feedback">
                    Please enter composer!
                  </div>
                </div>

            
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cc-genre">Genre</label>
                    <input type="text" className="form-control" id="cc-genre" placeholder="" required />
                    <div className="invalid-feedback">
                    Please enter genre!
                  </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cc-link">Link</label>
                    <input type="text" className="form-control" id="cc-link" placeholder="" required />
                    <div className="invalid-feedback">
                     Link is required!
                    </div>
                  </div>
                </div>
                <hr className="mb-4" />
                <button class="btn btn-primary btn-lg btn-block" type="button">Confirm order</button>
              </form>
            </div>
          </div>

          <footer className="my-5 pt-5 text-muted text-center text-small">
           
          </footer>
        </div>
     
      </div>
      
)

}


export default OrderCustomer;