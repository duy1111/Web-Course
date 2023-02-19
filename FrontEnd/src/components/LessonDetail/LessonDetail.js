import React, { useState, useEffect, useContext } from 'react';
import { Container, Col, Badge, Spinner, Row, Image, Button, ListGroup, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Api, { endpoints, authAxios } from '~/configs/Api';
import { UserContext } from '~/App';
import Rating from 'react-rating';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import CommentForm from './commentForm';

function LessonDetail() {
    const [lesson, setLesson] = useState(null);
    const [comments, setComments] = useState([]);
    const { lessonId } = useParams();
    const [user, dispatch] = useContext(UserContext);
    useEffect(() => {
        const loadLesson = async () => {
            let res = null;
            if (user != null) {
                res = await authAxios().get(endpoints['lesson-detail'](lessonId));
            } else {
                res = await Api.get(endpoints['lesson-detail'](lessonId));
            }

            setLesson(res.data);
        };

        loadLesson();
    }, []);

    useEffect(() => {
        const loadComments = async () => {
            const res = await Api.get(endpoints['lesson-comments'](lessonId));
            setComments(res.data);
        };
        loadComments();
    }, [comments]);
    const like = async () => {
        const res = await authAxios().post(endpoints['like-lesson'](lessonId));
        setLesson(res.data);
    };

    const rate = async (r) => {
        const res = await authAxios().post(endpoints['rate-lesson'](lessonId), {
            rate: r,
        });
        console.info(res.data);
        setLesson(res.data);
    };

    if (lesson === null)
        return (
            <Container>
                <Spinner animation="grow" />
            </Container>
        );

    return (
        <Container>
            <h1 className="text-center text-info">CHI TIET BAI HOC ({lessonId})</h1>
            <Row>
                <Col md={5} xs={12}>
                    <Image src={lesson.image} fluid />
                </Col>
                <Col md={7} xs={12}>
                    <h2>{lesson.subject}</h2>
                    {lesson.tags.map((t) => (
                        <Badge key={t.id} bg="info">
                            {t.name}
                        </Badge>
                    ))}

                    <div>
                        {user != null && (
                            <Button variant={lesson.like == true ? 'primary' : 'outline-primary'} onClick={like}>
                                <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
                            </Button>
                        )}

                        <br></br>
                        {user != null && <Rating initialRating={lesson.rating} onClick={rate} />}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div dangerouslySetInnerHTML={{ __html: lesson.content }}></div>
                </Col>
            </Row>
            <Row>
                <Col>
                    {user != null && <CommentForm lessonId={lessonId} comments={comments} setComments={setComments} />}
                    <ListGroup>
                        {comments.map((c) => (
                            <>
                                <ListGroup.Item>
                                    {console.log(c)}
                                    <>
                                        <Image src={c.user.avatar} fluid width="30" roundedCircle /> {c.content} -{' '}
                                        <Moment fromNow>{c.created_date}</Moment>
                                    </>
                                </ListGroup.Item>
                            </>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default LessonDetail;
