import React, { useState, useEffect, useContext } from 'react'
import { Navbar, Nav, Button, FormControl, Form, Image } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '~/App';
import Api, { endpoints } from '~/configs/Api';
import cookies from 'react-cookies'
import styles from './Header.module.scss'
import classNames from 'classnames/bind';
import './Header.scss'
const cx = classNames.bind(styles)
const Header = () => {
    const [categories, setCategories] = useState([])
    const [kw, setKw] = useState()
    const nav = useNavigate()
    const [user, dispatch] = useContext(UserContext)

    useEffect(() => {
        const loadCategories = async () => {
            let res = await Api.get(endpoints['categories'])
            setCategories(res.data)
            // let res = await fetch("/data.json")
            // let data = await res.json()
            // setCategories(data)
        }
        console.log(user)
        loadCategories()
    }, [])

    const search = (event) => {
        event.preventDefault()

        nav(`/?kw=${kw}`)
    }

    const logout = (event) => {
        event.preventDefault()
        cookies.remove('access_token')
        cookies.remove('current_user')
        dispatch({"type": "logout"})
        nav("/login")
    }

    let btn = <>
        
        <Link to="/login" className="nav-link text-info dang-nhap ">Dang nhap</Link>
        <Link to="/register" className="nav-link text-danger dang-ky">Dang ky</Link>
    </>
    if (user != null) {
        btn = <div className={cx('btn-wrapper')}>
            <Link to='/'> <Image className={cx('avatar')}  src={user.avatar} fluid width="50" roundedCircle ></Image></Link>
            <Link to="/" className={cx('user')}>{user.username}!</Link>
            <Link to="#" className={cx('logout')} onClick={logout} >Dang xuat</Link>
        </div>
    }
        

    return (
        <Navbar className={cx('wrapper')} collapseOnSelect expand="lg" bg="dark" variant="dark">
          
            <Navbar.Brand href="#home">e-Course Online</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Link to="/" className="nav-link">Trang chu</Link>

                    {categories.map(c => {
                        const url = `/?category_id=${c.id}`
                        return <Link to={url} className="nav-link">{c.name}</Link>
                    })}

                    
                </Nav>
                {btn}
                <Form onSubmit={search} className="d-flex">
                    <FormControl type="search" name="kw" value={kw}
                                 onChange={evt => setKw(evt.target.value)}
                                 placeholder="Nhap tu khoa" className="me-2" aria-label="Search" />
                    <Button type="submit" variant="outline-success">Tim</Button>
                </Form>
            </Navbar.Collapse>
           
        </Navbar>
 
    )
}

export default Header