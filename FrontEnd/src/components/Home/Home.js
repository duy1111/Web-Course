import React, { useState, useEffect } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import Item from '~/layouts/Item';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Api, { endpoints } from '../../configs/Api';

const cx = classNames.bind(styles);
const Home = () => {
    const [courses, setCourses] = useState([]);
    const [q] = useSearchParams();
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const loadCourses = async () => {
            let query = '';

            if (query == '') {
                query = `?page=${page}`;
            } else {
                query += `&page=${page}`;
            }
            const cateId = q.get('category_id');
            if (cateId !== null) query = `?category_id=${cateId}`;
            const kw = q.get('kw');
            if (kw !== null) query = `?kw=${kw}`;
            const res = await Api.get(`${endpoints['courses']}${query}`);

            setCourses(res.data.results);
            setNext(res.data.next !== null);
            setPrev(res.data.previous !== null);
            // const res = await fetch("/courses.json")
            // let data = await res.json()

            // const cateId = q.get("category_id")
            // if (cateId != null)
            //     data = data.filter(d => d.category_id === parseInt(cateId))

            // const kw = q.get("kw")
            // if (kw != null)
            //     data = data.filter(d => d.subject.indexOf(kw) >= 0)

            // setCourses(data)
        };

        loadCourses();
    }, [q, page]);
    const paging = (inc) => {
        setPage(page + inc);
    };
    return (
        <Container className={cx('container')}>
            <h1 className={cx('title')}>DANH MUC KHOA HOC</h1>
            {courses.length === 0 && <Spinner animation="grow" />}

            <Row>
                {courses.map((c) => (
                    <Item obj={c} />
                ))}
            </Row>

            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    {!prev == true ? (
                        <li class="page-item disabled">
                            <a class="page-link">Previous</a>
                        </li>
                    ) : (
                        <li class="page-item " onClick={() => paging(-1)}>
                            <a class="page-link">Previous</a>
                        </li>
                    )}
                    {!next == true ? (
                        <li class="page-item  disabled">
                            <a class="page-link" href="#">
                                Next
                            </a>
                        </li>
                    ) : (
                        <li class="page-item" onClick={() => paging(1)}>
                            <a class="page-link" href="#">
                                Next
                            </a>
                        </li>
                    )}
                </ul>
            </nav>
        </Container>
    );
};

export default Home;
