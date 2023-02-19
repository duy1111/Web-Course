import React, { memo } from 'react'
import { Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './ECourseCard.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
const Item = (props) => {
    let url = `/courses/${props.obj.id}/lessons`
    let txt = "Cac bai hoc"
    if (props.isLesson === true) {
        txt = "Chi tiet"
        url = `/lessons/${props.obj.id}`
    }

    return (
        <Col className={cx('container')} md={4}>
            <Card className={cx('card-item')}>
                <Card.Img className={cx('image-card')} variant="top" fluid="true" src={props.obj.image} />
                <Card.Body>
                    <Card.Text>{props.obj.subject}</Card.Text>
                    <Link to={url} className="btn btn-info">{txt}</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default memo(Item)