const myReducer = (user, action) => {
    switch (action.type) {
        case "login":
            return action.payload
        case "logout":
            return null
        default:
    }

    return user
}

export default myReducer