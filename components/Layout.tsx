import Head from "next/head";

interface Props {
    children: JSX.Element
    title: string,
}

const Layout = ({ children, title }: Props) => {

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name={"description"} content={"DoodleJump Game"} />
                <meta name={"viewport"} content={"initial-scale=1.0, width=device-width"} />
                <meta name={"keywords"} content={"DoodleJump, ДудлДжамп, Игра Doodle, Game DoodleJump"} />
                <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
                <meta charSet='utf-8' />
            </Head>
            <>
                {children}
            </>
        </>
    );
};

export default Layout;
