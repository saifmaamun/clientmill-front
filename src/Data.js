import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table, } from 'react-bootstrap';
import TableData from './TableData';
import "./Home"

const Data = () => {
    const [tableDatas, setTableDatas] = useState([]);
    let [sn, setSn] = useState(1);
    useEffect(() => {
        fetch('http://localhost:5000/data')
            .then(res => res.json())
            .then(data => setTableDatas(data))
    }, [tableDatas])
    
    const handleDelete = id => {
        console.log(id)
        const url = `http://localhost:5000/data/${id}`
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount) {
                    alert('this will be deleted')
                    const remaining = tableDatas.filter(tabledata => tabledata._id !== id)
                    setTableDatas(remaining)
                }
            })
    }

    return (
        <div className="">
            <Container>
                <div className="mx-2 my-5 p-2 bg-white shadow shadow-5 rounded rounded-3 ">

                <Table striped hover className="my-4 bg-white rounded">
                    <thead >
                        <tr>
                            <th>Sno/Order</th>
                            <th>Nut</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Result</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableDatas.map(tabledata => <tr
                                key={tabledata._id}
                                tableData={tabledata}
                                
                                >
                                <td>{sn++ }</td>
                                <td>{tabledata.nut}</td>
                                <td>{tabledata.start }</td>
                                <td>{tabledata.end }</td>
                                <td>{tabledata.result}</td>
                                <td><Button className="button"  onClick={() => handleDelete(tabledata._id)}>Remove</Button></td>
                                
                            </tr>)
                        }
                        </tbody>
                </Table>
                        </div>
            </Container>
        </div>
    );
};

export default Data;