import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.scss"
import "./Theme.scss"
import Header from "./Layout/Header/Header.jsx"
import Feed from "./Pages/Feed/Feed.jsx"
import Home from "./Pages/Home/Home.jsx"
import Login from "./Pages/Login/Login.jsx"
import Signup from "./Pages/Signup/Signup.jsx"
import ProtectedLayout from "./routes/ProtectedLayout.jsx"
import { UnProtecedLayout } from "./routes/UnprotectedLayout.jsx"
import useLocalStorage from "use-local-storage"
import { useDispatch, useSelector } from "react-redux"
import AnimationLayout from "./Layout/Animation/AnimationLayout.jsx"
import Verify from "./Pages/Verify.jsx"
import Profile from "./Pages/Profile/Profile.jsx"

function App() {
    const dispatch = useDispatch()

    const defaultDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches
    const [theme, setTheme] = useLocalStorage(
        "theme",
        defaultDark ? "dark" : "light"
    )

    // const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)
    }
    return (
        <div className="" data-theme={theme}>
            <Router>
                {/* <div style={{ marginTop: 56 }}>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/login">Login</Link>
                    <button onClick={toggleTheme}>
                        Switch to {theme === "light" ? "dark" : "light"} theme
                    </button>
                </div> */}

                <Routes>
                    <Route element={<AnimationLayout />}>
                        {/* <Route
                            element={
                                <Header
                                    toggleTheme={toggleTheme}
                                    theme={theme}
                                />
                            }
                        >
                            <Route
                                path="feeds"
                                element={<Feed theme={theme} />}
                            ></Route>
                            <Route
                                path="/user/profile/:id"
                                element={<Profile theme={theme} />}
                            ></Route>
                        </Route> */}
                        <Route element={<UnProtecedLayout />}>
                            <Route
                                path="/"
                                element={<Home toggleTheme={toggleTheme} />}
                            />

                            <Route
                                path="/login"
                                index
                                element={<Login toggleTheme={toggleTheme} />}
                            ></Route>

                            <Route
                                path="/signup"
                                element={<Signup toggleTheme={toggleTheme} />}
                            ></Route>
                        </Route>

                        <Route path="/user" element={<ProtectedLayout />}>
                            <Route
                                element={
                                    <Header
                                        toggleTheme={toggleTheme}
                                        theme={theme}
                                    />
                                }
                            >
                                <Route
                                    path="feeds"
                                    element={<Feed theme={theme} />}
                                ></Route>
                                <Route
                                    path="profile/:id"
                                    element={<Profile theme={theme} />}
                                ></Route>
                            </Route>
                        </Route>

                        {/* <Route
                            element={
                                <Header
                                    toggleTheme={toggleTheme}
                                    theme={theme}
                                />
                            }
                        >
                            <Route
                                path="/"
                                element={<Feed theme={theme} />}
                            ></Route>
                        </Route> */}

                        {/* <Route
                            path="*"
                            element={
                                <div>
                                    <h2>404 Page not found</h2>
                                </div>
                            }
                        /> */}
                    </Route>
                    <Route path="/verify" element={<Verify />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
