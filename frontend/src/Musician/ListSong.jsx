import SearchAppBar from '../component/SearchAppBar';
// import Button from '@mui/material/Button';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function ListSong() {

    return (
        <>
            <div className="card mx-3 my-5">
                <div className="card-body">
                    <p className='headP'>Lạ lùng</p> <p className='headP'>- Vũ</p>
                    <p>Description</p>
                    <p className='headP'>Pic</p>
                    <p className='headP'>-Vũ</p>
                    <p className='headP'>-Ngày tháng năm</p>
                    <p className='headP' style={{ marginLeft: '50px' }}>Hợp âm</p>
                    <p className='headP' style={{ marginLeft: '50px' }}>Lượt xem</p>
                </div>
            </div>
        </>
    )
}
export default ListSong;