import React, { useState, useContext } from 'react';
import {  Button,  Form } from 'react-bootstrap';

import  { endpoints, authAxios } from '~/configs/Api';
import { UserContext } from '~/App';


const CommentForm = ({ lessonId, comments, setComments }) => {
    const [content, setContent] = useState();
    const [user, dispatch] = useContext(UserContext)

    const addComment = async (event) => {
        event.preventDefault();

        const res = await authAxios().post(endpoints['comments'], {
            'content': content,
            'lesson': lessonId,
            'user': user.id,
        });

        setComments([...comments, res.data]);
    };

    return (
        <Form onSubmit={addComment}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                    type="text"
                    value={content}
                    onChange={(evt) => setContent(evt.target.value)}
                    placeholder="Nhap binh luan"
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Them binh luan
            </Button>
        </Form>
    );
};

export default CommentForm;
