import React from "react"

const Home = ({ toggleTheme, theme }) => {
    return (
        <section className={`home-section`}>
            <button onClick={toggleTheme}>Toggle Theme</button>
            <h1>Hello, world!</h1>
        </section>
    )
}

export default Home
