import React from 'react'
import './Reporter.css';

const Reporter = () => {
    return (
        <div>
            <div className="reporter-mainbody">
                <h2 className='report-title  he'>Report list</h2>
                <table className='report-head'>
                    <tr className='reporter-tr'>
                        <th className='report-th'>No</th >
                        <th className='report-th'>Date</th >
                        <th className='report-th'>Time</th >
                        <th className='report-th'>Id Number</th >
                        <th className='report-th'>Message</th >
                        <th className='report-th'>status</th >
                    </tr>
                    <tr className='report-trtwo'>
                        <td className='report-td'>01</td>
                        <td className='report-td'>3/12/2024</td>
                        <td className='report-td'>10:25</td>
                        <td className='report-td'>045782</td>
                        <td className='report-td'>Not Working</td>
                        <td className='report-td'>read</td>
                    </tr>
                </table>
                <button className='reporter-btn'>DONE</button>
            </div>

        </div>
    )
}

export default Reporter