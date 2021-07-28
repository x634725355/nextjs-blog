import React, { useEffect, useState } from "react";
import { Input, Row, Col, Table } from "antd";

import Layout from "../../components/Layout/layout";
import { API } from "../../utils/fetchAPI";
import styles from "./mutualNest.module.css";

interface Book {
    name: string;
    describe?: string;
    year?: number;
    author?: string;
};

const formMap = [
    { name: '图书名称', key: 'name' },
    { name: '图书出版年份', key: 'year' },
    { name: '图书简介', key: 'describe' },
    { name: '图书作者', key: 'author' },
];

const columns = [
    { title: '图书名称', dataIndex: 'name', key: 'name' },
    { title: '图书出版年份', dataIndex: 'year', key: 'year' },
    { title: '图书简介', dataIndex: 'describe', key: 'describe' },
    { title: '图书作者', dataIndex: 'author', key: 'author' },
];

const MutualNest: React.FC<csc.Props> = (props) => {

    const [bookData, setBookData] = useState<Book>({
        name: '',
        year: null,
        describe: '',
        author: ''  
    });

    const [allBooks, setAllBooks] = useState<Book[]>();

    async function findAll() {
        const allBooks: Book[] = await API.get('book/consultBook');

        setAllBooks(allBooks);

        console.log("findAll", allBooks);
    }

    async function addBooks() {
        const resolve = await API.post('book/addBooks', bookData);

        console.log("POST MOMO", resolve);
    }

    async function deleteBooks() {
        const resolve = await API.delete("book/deleteBook", []);

        console.log('DELETE', resolve);
    }

    function changeInput(value, key) {        
        bookData[key] = value;
        setBookData({...bookData});
    }

    useEffect(() => {
        findAll();
        // deleteBooks();
    }, []);

    return (
        <Layout>
            <div onKeyUp={(e) => {if (e.code === 'Enter') {addBooks()}}} className={styles.main} >
                
                <Table columns={columns} dataSource={allBooks} />

                <Row gutter={[0, 16]} >
                    {
                        formMap.map(item => {
                            return (
                                <>
                                    <Col span={6} style={{textAlign: 'left'}} >{item.name}: </Col>
                                    <Col span={18} >
                                        {
                                            item.key === 'describe' ?
                                            (<Input.TextArea onChange={(e) => {changeInput(e.target.value, item.key)}} value={bookData[item.key]} ></Input.TextArea>)
                                            :
                                            (<Input type={item.key === 'year' ? 'number' : 'text'} onChange={(e) => {changeInput(e.target.value, item.key)}} value={bookData[item.key]} ></Input>)
                                        }
                                    </Col>
                                </>
                            )
                        })
                    }
                    <Col push={0} >
                        <button onClick={addBooks} >添加图书</button>
                    </Col>
                </Row>

            </div>
        </Layout>
    );
}

export default MutualNest;