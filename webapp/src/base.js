import logo from "./img/uva-logo.png";

export function Nav() {
    return <nav className="flex-center">
        <img src={logo} alt="Uva"/>
    </nav>;
}

export function Footer() {
    return <footer className="flex-center">
        Vragen? Mail naar dinkvdplas@gmail.com
    </footer>;
}

export function Padding(props) {
    return <div style={{padding: props.padding}}></div>
}

