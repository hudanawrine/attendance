import React from 'react';
import './Logs.css'

const Logs = () => {
    return (
        <>
            <div className="table-container">
                <div>
                    <h2 className='logs '>Logs</h2>
                </div>
                <table>
                    <tr className='head rounded '>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Check In Time</th>
                        <th>Check In Out</th>
                        <th>Status Today</th>
                    </tr>
                    <tr className='head hd hds '>
                        <td className='letters'>01</td>
                        <td className='letters'>Naina</td>
                        <td className='letters'>10:00.A.M.</td>
                        <td className='letters'>----</td>
                        <td className='letters'><button className='btn rounded button '>Present</button></td>
                    </tr>
                    <tr className='head hd '>
                        <td className='letters'>02</td>
                        <td className='letters'>Huda</td>
                        <td className='letters'>10:00.A.M.</td>
                        <td className='letters'>----</td>
                        <td className='letters'><button className='btn rounded btn2 '>Late</button></td>
                    </tr>
                    <tr className='head hd '>
                        <td className='letters'>03</td>
                        <td className='letters'>Anandu</td>
                        <td className='letters'>10:00.A.M.</td>
                        <td className='letters'>----</td>
                        <td className='letters'><button className='btn rounded btn3  '>Absent</button></td>
                    </tr>

                </table>
            </div>
        </>



    );
}

export default Logs;
