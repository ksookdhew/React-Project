import {Link} from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center self-center w-full h-full text-center gap-8">
            <h1 className="text-accent text-9xl">Ohh No!</h1>
            <h2 className="text-4xl">The page you were looking for could not be found</h2>
            <Link to="/" className="text-info text-2xl">Go home</Link>
        </div>
    );
}
export default ErrorPage