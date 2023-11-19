
import SearchAppBar from '../component/SearchAppBar';
// import Button from '@mui/material/Button';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function ListSong() {

    return (
        <>
            <div style={{ display: 'flex' }}>
                <div className="card mx-3 my-5" style={{ width: '50%' }}>
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
                <div className="card mx-3 my-5" style={{ width: '50%', marginRight: '20px' }}>
                    <p style={{ textAlign: 'center' }}>Thể loại</p>
                    <div style={{ display: 'flex', backgroundColor: 'grey', width: '100px' }}><p>Nhac tre </p><p> (so bai``)</p></div>
                </div>

            </div>
        </>
    )
}
export default ListSong;