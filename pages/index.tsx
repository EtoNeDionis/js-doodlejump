import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import { useEffect, useRef } from 'react'
import { Game } from '../models/Game';

export default function Home() {

    const canvasRef = useRef() as React.MutableRefObject<HTMLCanvasElement>;



    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        if (context?.font) {
            context.font = "Helvetica";
        }

        if (!context || !canvas) return;
        canvas.height = 700;
        canvas.width = 600;

        const game = new Game(canvas.width, canvas.height);

        const fps = 120;
        const animate = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            if (game.isStarted && !game.gameEnded) game.update();

            game.draw(context);

            setTimeout(() => {
                requestAnimationFrame(animate);
            }, 1000 / fps)
        }

        animate();
    }, []);

    return (
        <Layout title="DoodleJump main" >
            <main className={styles.main}>
                <canvas ref={canvasRef} className={styles.canvas} />
            </main>
        </Layout>
    )
}


