
import SearchAppBar from '../component/SearchAppBar';
// import Button from '@mui/material/Button';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function ListSong() {

    return (
        <>
            <div style={{ display: 'flex' }}>
                <div className="card mx-3 my-5" style={{ width: '60%' }}>
                    <div className="card-body" >
                        <p className='headP'>Lạ lùng</p> <p className='headP'>- Vũ</p>
                        <p>Description</p>
                        <p className='headP'>Pic</p>
                        <p className='headP'>-Vũ</p>
                        <p className='headP'>-Ngày tháng năm</p>
                        <p className='headP' style={{ marginLeft: '50px' }}>hợp âm</p>
                        <p className='headP' style={{ marginLeft: '50px' }}>Lượt xem</p>
                    </div>
                </div>
                <div className="card mx-3 my-5" style={{ width: '40%', marginRight: '20px', padding: '10px' }}>
                    <b style={{ textAlign: 'center' }}>Thể loại</b>
                    <div style={{ display: 'flex', backgroundColor: '#ddd', width: '164px', padding: '0 7px', borderRadius: '4px' }}><p>Nhac tre </p><p> (so bai``)</p></div>
                </div>

            </div>
        </>
    )
}
export default ListSong;