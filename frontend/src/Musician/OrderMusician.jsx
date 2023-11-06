
import SearchAppBar from '../component/SearchAppBar';
// import Button from '@mui/material/Button';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
function OrderMusician() {
    return (
        <>
            <SearchAppBar />
            <div className='d-flex flex-column align-items-center pt-2'>
                <div className='d-flex flex-column align-items-center pt-4'>
                    <h3 className="d-flex justify-content-center">Receive Order</h3>
                </div>
                {/* <form className="form">
                    <label>Input text</label>
                    <input type="text" value={text} onChange={onTextchange} />

                    <label htmlFor="">Textarea</label>
                    <textarea
                        value={textarea}
                        cols="30"
                        rows="10"
                        onChange={onTextareaChange}
                    />

                    <label htmlFor="">Single select</label>
                    <select value={select} onChange={onSelectChange}>
                        <option value="apple">Apple</option>
                        <option value="orange">Orange</option>
                        <option value="watermelon">Watermelon</option>
                        <option value="avocado">Avocado</option>
                        <option value="pineapple">Pineapple</option>
                    </select>

        
                </form> */}

                
            </div>
        </>
    )
}
export default OrderMusician;