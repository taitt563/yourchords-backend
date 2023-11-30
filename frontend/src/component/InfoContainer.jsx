

import 'bootstrap/dist/css/bootstrap.min.css';


function InfoContainer() {
    return (
        <>
            <div className="project-info-container" style={{ width: '100%', textAlign: 'center' }}>
                <p style={{ padding: '10px', fontSize: '12px' }}>
                    Your Chord @2023
                    <br />
                    <a href="/introduction" style={{ textDecoration: 'none' }}> Introduction</a> |
                    <a href="/bug-report" style={{ textDecoration: 'none' }}> Report a Bug - Give Feedback</a> |
                    <a href="/terms" style={{ textDecoration: 'none' }}> Terms of Service</a> |
                    <a href="/copyright" style={{ textDecoration: 'none' }}> Copyright Policy</a> |
                    <a href="/guide" style={{ textDecoration: 'none' }}> How to Guide</a>
                </p>
            </div>
        </>

    )

}


export default InfoContainer;