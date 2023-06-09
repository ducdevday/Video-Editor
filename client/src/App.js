import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/router/Router';
import DefaultLayout from '~/Layout/DefaultLayout';
import { useSelector } from 'react-redux';
import HeaderOnly from './Layout/HeaderOnly';
function App() {
    const user = useSelector((state) => state.auth.user);
    let Comp = publicRoutes;
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* <Route path="/" element={< />} /> */}
                    {Comp.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.Layout) {
                            Layout = route.Layout;
                        } else if (route.Layout === null) {
                            Layout = Fragment;
                        } else {
                            Layout = DefaultLayout;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
