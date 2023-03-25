const Routes = () => {
    return <Routes>
        <Route path={"/signIn"} element={
            <UnProtected>
                <SignIn />
            </UnProtected>
        } />
        <Route path={"/signUp"} element={
            <UnProtected>
                <SignUp />
            </UnProtected>
        } />
        <Route path={"/"} element={
            <Protected>
                <Layout>
                    <Home />
                </Layout>
            </Protected>
        } />
        <Route path={"/new"} element={
            <Protected>
                <Layout>
                    <AddNew />
                </Layout>
            </Protected>
        } />
        <Route path={"/message"} element={
            <Protected>
                <Layout>
                    <Messenger />
                </Layout>
            </Protected>
        } />
    </Routes>
}