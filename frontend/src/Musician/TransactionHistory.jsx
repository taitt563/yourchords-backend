import SearchAppBar from '../component/SearchAppBar';
// import Button from '@mui/material/Button';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function TransactionHistory() {

    return (
        <>
            <SearchAppBar />
            <div className='d-flex flex-column align-items-center pt-2'>
                <div className='d-flex flex-column align-items-center pt-4'>
                    <h3 className="d-flex justify-content-center">Transaction History</h3>
                </div>
                <table className="table" style={{ marginLeft: "100px", marginRight: "200px", width: "1000px" }}>
                    <thead>
                        <tr style={{ border: "2px" }}>
                            <th scope="col">Transaction Time</th>
                            <th scope="col">Receipt No.</th>
                            <th scope="col">Customer  </th>
                            <th scope="col">Amount</th>
                            <th scope="col" style={{ textAlign: "center" }}>Payment methods</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ color: 'red' }}>2020-12-14 22:01:01</td>
                            <td>R000186</td>
                            <td>Cong Tu</td>
                            <td>MYR100</td>
                            <td style={{ textAlign: "center" }}>MOMO</td>
                        </tr>
                        <tr>
                            <td style={{ color: 'red' }}>2020-12-14 22:01:01</td>
                            <td>R000186</td>
                            <td>Cong Tu</td>
                            <td>MYR100</td>
                            <td style={{ textAlign: "center" }}>MOMO</td>
                        </tr>
                        <tr>
                            <td style={{ color: 'red' }}>2020-12-14 22:01:01</td>
                            <td>R000186</td>
                            <td>Cong Tu</td>
                            <td>MYR100</td>
                            <td style={{ textAlign: "center" }}>MOMO</td>
                        </tr>
                        <tr>
                            <td style={{ color: 'red' }}>2020-12-14 22:01:01</td>
                            <td>R000186</td>
                            <td>Cong Tu</td>
                            <td>MYR100</td>
                            <td style={{ textAlign: "center" }}>MOMO</td>
                        </tr>
                        <tr>
                            <td style={{ color: 'red' }}>2020-12-14 22:01:01</td>
                            <td>R000186</td>
                            <td>Cong Tu</td>
                            <td>MYR100</td>
                            <td style={{ textAlign: "center" }}>MOMO</td>
                        </tr>
                        <tr>
                            <td style={{ color: 'red' }}>2020-12-14 22:01:01</td>
                            <td>R000186</td>
                            <td>Cong Tu</td>
                            <td>MYR100</td>
                            <td style={{ textAlign: "center" }}>MOMO</td>
                        </tr>
                        <tr>
                            <td style={{ color: 'red' }}>2020-12-14 22:01:01</td>
                            <td>R000186</td>
                            <td>Cong Tu</td>
                            <td>MYR100</td>
                            <td style={{ textAlign: "center" }}>MOMO</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default TransactionHistory;