import React, { useEffect, useState } from "react";
import { Input, Row, Col, Table, Space } from "antd";

import Layout from "../../components/Layout/layout";
import { API } from "../../utils/fetchAPI";
import styles from "./mutualNest.module.css";

interface Book {
    name: string;
    describe?: string;
    year?: number;
    author?: string;
};

const { Search } = Input;

const formMap = [
    { name: '图书名称', key: 'name' },
    { name: '图书出版年份', key: 'year' },
    { name: '图书简介', key: 'describe' },
    { name: '图书作者', key: 'author' },
];

const MutualNest: React.FC<csc.Props> = (props) => {

    const [bookData, setBookData] = useState<Book>({
        name: '',
        year: null,
        describe: '',
        author: ''  
    });

    const [allBooks, setAllBooks] = useState<Book[]>();
    const [searchValue, setSearchValue] = useState<string>();

    const columns = [
        { title: '图书名称', dataIndex: 'name', key: 'name' },
        { title: '图书出版年份', dataIndex: 'year', key: 'year' },
        { title: '图书简介', dataIndex: 'describe', key: 'describe' },
        { title: '图书作者', dataIndex: 'author', key: 'author' },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <Space size="middle">
                <a onClick={() => updateBooks(record._id, record)} >Update</a>
                <a onClick={() => deleteBooks(record._id)} >Delete</a>
              </Space>
            ),
        },
    ];

    async function findAll() {
        const allBooks: Book[] = await API.get('book/consultBook');

        setAllBooks(allBooks);

        console.log("findAll", allBooks);
    }

    async function demoAxios() {
        const resolve = await API.get('book/demoAxios');

        console.log('demoAxios', resolve);
    }

    async function addBooks() {
        const resolve = await API.post('book/addBooks', bookData);

        if (resolve.code !== 200) {
            return console.log('失败啦');
        }

        findAll();
    }

    async function findBook() {
        const getBooks = await API.post('book/findBook', { name:searchValue });

        setAllBooks(getBooks.data);

        console.log('findBook', getBooks);
    }

    async function deleteBooks(id) {
        const resolve = await API.delete("book/deleteBook", {ids: [id]});

        findAll();

        console.log('DELETE', resolve);
    }

    async function updateBooks(id, bookData) {
        const resolve = await API.put('book/updateBook', {ids: [id], bookData});

        findAll();

        console.log('updateBooks', resolve);
    }

    function changeInput(value, key) {        
        bookData[key] = value;
        setBookData({...bookData});
    }

    function searchValueChange(value) {
        setSearchValue(value);
    }

    function onSearch(value) {
        findBook();
    }

    useEffect(() => {
        findAll();
    }, []);

    return (
        <Layout>
            <div className={styles.main} >

                <div className={styles.search} >
                    <Search size="large" value={searchValue} onChange={(e) => searchValueChange(e.target.value)} placeholder="input search text" onSearch={onSearch} enterButton />
                </div>

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